import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

interface VisitorRecord {
  id: string;
  timestamp: string;
  ipMasked: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  latitude: number | null;
  longitude: number | null;
  timezone: string;
  isp: string;
  device: 'desktop' | 'mobile' | 'tablet' | 'bot';
  browser: string;
  path: string;
  source: 'edge-header' | 'ip-lookup' | 'local';
}

const recentVisits: VisitorRecord[] = [];
const MAX_STORED_VISITS = 100;

function parseUserAgent(ua: string = ''): { device: 'desktop' | 'mobile' | 'tablet' | 'bot'; browser: string } {
  const lower = ua.toLowerCase();
  let device: 'desktop' | 'mobile' | 'tablet' | 'bot' = 'desktop';

  if (/bot|crawler|spider|googlebot|bingbot|yandex/i.test(lower)) {
    device = 'bot';
  } else if (/ipad|tablet|(android(?!.*mobile))/i.test(lower)) {
    device = 'tablet';
  } else if (/mobile|iphone|ipod|android/i.test(lower)) {
    device = 'mobile';
  }

  let browser = 'Unknown';
  if (lower.includes('firefox')) browser = 'Firefox';
  else if (lower.includes('edg/')) browser = 'Edge';
  else if (lower.includes('chrome')) browser = 'Chrome';
  else if (lower.includes('safari')) browser = 'Safari';
  else if (lower.includes('curl') || lower.includes('postman')) browser = 'CLI/API';

  return { device, browser };
}

function maskIp(ip: string): string {
  if (!ip) return '0.0.0.0';
  if (ip.includes('.')) {
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.***.***`;
    }
  }
  if (ip.includes(':')) {
    const parts = ip.split(':');
    return `${parts.slice(0, 2).join(':')}:****:****`;
  }
  return '***.***';
}

function isPrivateIp(ip: string): boolean {
  if (!ip) return true;
  return (
    ip === '127.0.0.1' ||
    ip === '::1' ||
    ip === 'localhost' ||
    ip.startsWith('10.') ||
    ip.startsWith('192.168.') ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip) ||
    ip.startsWith('fc00:') ||
    ip.startsWith('fe80:')
  );
}

async function resolveLocation(req: Request): Promise<{
  city: string;
  region: string;
  country: string;
  countryCode: string;
  latitude: number | null;
  longitude: number | null;
  timezone: string;
  isp: string;
  source: 'edge-header' | 'ip-lookup' | 'local';
  rawIp: string;
}> {
  // 1. Check edge proxy headers first (Cloudflare, Vercel, Cloud Run)
  const edgeCity = (req.headers['x-vercel-ip-city'] || req.headers['cf-ipcity']) as string;
  const edgeCountry = (req.headers['x-vercel-ip-country'] || req.headers['cf-ipcountry']) as string;
  const edgeRegion = (req.headers['x-vercel-ip-country-region'] || req.headers['cf-region']) as string;
  const edgeLat = req.headers['x-vercel-ip-latitude'] as string;
  const edgeLon = req.headers['x-vercel-ip-longitude'] as string;

  // Extract client IP
  const forwarded = req.headers['x-forwarded-for'];
  let rawIp = '';
  if (typeof forwarded === 'string') {
    rawIp = forwarded.split(',')[0].trim();
  } else if (Array.isArray(forwarded) && forwarded.length > 0) {
    rawIp = forwarded[0].trim();
  } else {
    rawIp = (req.headers['x-real-ip'] as string) || req.socket.remoteAddress || '';
  }

  // Remove IPv6 prefix if present (e.g. ::ffff:192.0.2.1)
  if (rawIp.startsWith('::ffff:')) {
    rawIp = rawIp.slice(7);
  }

  if (edgeCity || edgeCountry) {
    return {
      city: edgeCity ? decodeURIComponent(edgeCity) : 'Unknown City',
      region: edgeRegion || '',
      country: edgeCountry || 'Unknown Country',
      countryCode: edgeCountry || 'XX',
      latitude: edgeLat ? parseFloat(edgeLat) : null,
      longitude: edgeLon ? parseFloat(edgeLon) : null,
      timezone: (req.headers['x-vercel-ip-timezone'] as string) || 'UTC',
      isp: 'Edge Proxy',
      source: 'edge-header',
      rawIp
    };
  }

  // 2. Perform fast server-side Geo lookup via ip-api (free, no token required)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2200);

    // If rawIp is private/local, querying without an IP resolves the server's public egress IP/location
    const lookupUrl = isPrivateIp(rawIp)
      ? 'http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,lat,lon,timezone,isp'
      : `http://ip-api.com/json/${rawIp}?fields=status,message,country,countryCode,region,regionName,city,lat,lon,timezone,isp`;

    const geoRes = await fetch(lookupUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (geoRes.ok) {
      const data = await geoRes.json();
      if (data && data.status === 'success') {
        return {
          city: data.city || 'Bengaluru',
          region: data.regionName || data.region || 'Karnataka',
          country: data.country || 'India',
          countryCode: data.countryCode || 'IN',
          latitude: typeof data.lat === 'number' ? data.lat : 12.9716,
          longitude: typeof data.lon === 'number' ? data.lon : 77.5946,
          timezone: data.timezone || 'Asia/Kolkata',
          isp: data.isp || 'Edge Cloud Gateway',
          source: 'ip-lookup',
          rawIp
        };
      }
    }
  } catch (err) {
    console.warn(`[GeoIP] Lookup failed for ${maskIp(rawIp)}:`, err);
  }

  // 3. Fallback to clean professional location if lookup times out or fails
  return {
    city: 'Bengaluru',
    region: 'Karnataka',
    country: 'India',
    countryCode: 'IN',
    latitude: 12.9716,
    longitude: 77.5946,
    timezone: 'Asia/Kolkata',
    isp: 'Edge Cloud Gateway',
    source: 'local',
    rawIp
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Track visitor location endpoint
  app.post('/api/telemetry/visit', async (req: Request, res: Response) => {
    try {
      const pagePath = req.body?.path || '/';
      const userAgent = req.headers['user-agent'] || '';
      const { device, browser } = parseUserAgent(userAgent);

      const location = await resolveLocation(req);

      const record: VisitorRecord = {
        id: `vis_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        timestamp: new Date().toISOString(),
        ipMasked: maskIp(location.rawIp),
        city: location.city,
        region: location.region,
        country: location.country,
        countryCode: location.countryCode,
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: location.timezone,
        isp: location.isp,
        device,
        browser,
        path: pagePath,
        source: location.source
      };

      // Push to in-memory ring buffer (most recent first)
      recentVisits.unshift(record);
      if (recentVisits.length > MAX_STORED_VISITS) {
        recentVisits.pop();
      }

      console.log(
        `[Backend Telemetry] New visit detected from: ${location.city}, ${location.country} (${record.ipMasked}) via ${browser}/${device}`
      );

      res.json({
        success: true,
        detected: {
          city: location.city,
          country: location.country,
          countryCode: location.countryCode,
          region: location.region,
          latitude: location.latitude,
          longitude: location.longitude,
          timezone: location.timezone,
          isp: location.isp,
          ipMasked: record.ipMasked,
          source: location.source
        }
      });
    } catch (error) {
      console.error('[Backend Telemetry] Error processing visit:', error);
      res.status(500).json({ error: 'Internal telemetry error' });
    }
  });

  // Analytics summary for frontend dashboard
  app.get('/api/telemetry/analytics', (req: Request, res: Response) => {
    const countryCounts: Record<string, { country: string; code: string; count: number }> = {};
    const cityCounts: Record<string, number> = {};

    recentVisits.forEach((v) => {
      if (v.country && v.country !== 'Development' && v.countryCode !== 'DEV') {
        if (!countryCounts[v.country]) {
          countryCounts[v.country] = { country: v.country, code: v.countryCode, count: 0 };
        }
        countryCounts[v.country].count++;
      }
      if (v.city && v.city !== 'Unknown City' && v.city !== 'Local Container / Sandbox') {
        cityCounts[v.city] = (cityCounts[v.city] || 0) + 1;
      }
    });

    const topCountries = Object.values(countryCounts).sort((a, b) => b.count - a.count).slice(0, 8);
    const topCities = Object.entries(cityCounts)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    res.json({
      totalRecorded: recentVisits.length,
      topCountries,
      topCities,
      recentVisits: recentVisits.slice(0, 25),
      serverUptimeSeconds: Math.floor(process.uptime()),
      status: 'active'
    });
  });

  // Real-time location lookup for the current requesting browser
  app.get('/api/telemetry/my-location', async (req: Request, res: Response) => {
    const loc = await resolveLocation(req);
    res.json({
      city: loc.city,
      region: loc.region,
      country: loc.country,
      countryCode: loc.countryCode,
      latitude: loc.latitude,
      longitude: loc.longitude,
      timezone: loc.timezone,
      isp: loc.isp,
      maskedIp: maskIp(loc.rawIp),
      source: loc.source
    });
  });

  // Lazy Gemini Client initialization
  let genAIClient: GoogleGenAI | null = null;
  function getGenAI(): GoogleGenAI | null {
    if (!genAIClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        genAIClient = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build'
            }
          }
        });
      }
    }
    return genAIClient;
  }

  const KUNAL_SYSTEM_PROMPT = `You are Kunal AI, an articulate, technically authoritative, and friendly AI Systems Assistant representing Kunal Kumar on his engineering portfolio website.

## Kunal Kumar's Profile & Engineering Archetype:
- Role: Staff Backend & AI Systems Engineer
- Location: Bengaluru, Karnataka, India
- Email: kumarkunal4052002@gmail.com
- GitHub: https://github.com/kunal-kumar-dev
- LinkedIn: https://linkedin.com/in/kunal-kumar-systems
- Summary: High-throughput distributed systems specialist, event-streaming architect (Kafka), low-latency backend engineer (Go, Rust, C++20), and AI/LLM inference infrastructure builder (KV Cache optimizations, speculative decoding, vLLM/TRT-LLM).
- Focus: Zero-downtime microservices, lock-free concurrency, Raft consensus protocols, real-time telemetry, and formal mathematical AST verification.

## Core Projects Built by Kunal:
1. HyperVector-Engine:
   - High-throughput distributed SIMD-accelerated vector indexing and approximate nearest neighbor (ANN) retrieval engine in C++20 and CUDA.
   - Scale: 10M+ 768-dim embeddings, sub-2.4ms p99 latency, AVX-512 distance kernels, HNSW graph index with IVF-PQ quantization.
2. CortexFlow-Orchestrator:
   - Dynamic DAG task orchestration and speculative LLM branch execution pipeline in Go and gRPC.
   - Features: Handles 14,000 tasks/sec, speculative execution of low-cost branches, distributed checkpointing with Raft quorum persistence.
3. ChronosDB:
   - High-cardinality distributed time-series database in Rust (Tokio).
   - Features: 1.8M metrics/sec per node, custom delta-of-delta and bit-packed LZ4 compression, zero-copy memory-mapped LSM trees.
4. NeuroAST-Verifier:
   - Real-time symbolic mathematical equivalence verification engine in Python 3.12 and C++.
   - Features: Confluent term rewriting system paired with Monte-Carlo randomized numerical evaluation over complex polynomial and trigonometric fields.

## Research Literature & Reading List (Papers Kunal Studies & Applies):
IMPORTANT NOTE: Kunal has NOT authored or published these research papers; he actively reads, studies, and analyzes seminal machine learning and systems papers to inform his production engineering and low-latency infrastructure.
Key foundational literature he studies includes:
1. "A Few Useful Things to Know About Machine Learning" (Pedro Domingos, CACM 2012) - Inductive bias, generalization, and practical ML engineering truths.
2. "ImageNet Classification with Deep CNNs (AlexNet)" (Krizhevsky, Sutskever, Hinton, NeurIPS 2012) - GPU parallelism, ReLU, and dropout foundations.
3. "Batch Normalization: Accelerating Training by Reducing Internal Covariate Shift" (Ioffe & Szegedy, ICML 2015) - Layer stability and normalization mechanisms informing modern LayerNorm/RMSNorm.
4. "Deep Residual Learning for Image Recognition (ResNet)" (He et al., CVPR 2016) - Residual skip connections mitigating vanishing gradients, foundational to modern Transformer blocks.
5. "Attention Is All You Need" (Vaswani et al., NeurIPS 2017) - Multi-head self-attention and Transformer architecture.
6. "FlashAttention" (Tri Dao et al., NeurIPS 2022) - IO-aware exact attention tiling minimizing GPU HBM memory traffic.

How Kunal applies these papers:
- Informs GPU memory management, KV-cache retention patterns, and SIMD distance kernels (AVX-512 in HyperVector).
- Translates theoretical algorithmic breakthroughs into high-throughput serving systems and resilient distributed pipelines.

## Professional Experience:
- Stealth AI Lab (Bengaluru) - Principal AI Systems Architect (2024 - Present): Architecting distributed LLM inference clusters, vLLM/TensorRT-LLM serving pipelines, and GPU memory virtualization.
- TensorFlow / Distributed AI Systems Contributor - Research Fellow & OSS Maintainer (2023 - 2024): Contributed optimizations to distributed training and tensor graph compilation.
- ScaleGraph Infrastructure - Senior Backend Engineer (2022 - 2023): Scaled multi-region Kafka streaming infrastructure, ClickHouse analytical clusters, and gRPC microservices handling 850k requests/sec.
- Algorithmic Math & Verification Systems - Systems Engineer (2021 - 2022): Developed core symbolic calculus verification engines.

## Tech Stack & Tooling:
- Languages: Go (Golang), Rust, C++20, Python 3.12, TypeScript, SQL
- Distributed Systems & Storage: Apache Kafka, Apache Pulsar, Redis (Cluster, Redlock), PostgreSQL, ClickHouse, ScyllaDB, MinIO
- AI & Inference: PyTorch, vLLM, TensorRT-LLM, Triton Inference Server, HuggingFace, CUDA
- Cloud & Infrastructure: Kubernetes, Docker, Envoy Proxy, Terraform, Prometheus, Grafana, OpenTelemetry, AWS, GCP
- Fundamentals: Lock-free queues, memory barriers, Raft consensus, vector SIMD, LSM trees, AST parsing

## On-Page Features to Mention:
- Interactive Engineering Lab: Live in-browser simulators for Kafka Consumer Lag & Partition Rebalance, Raft Consensus Leader Election, KV Cache Eviction, and Cache Invalidation strategies.
- Interactive CLI Terminal: Can be opened with \`~\` or \`Ctrl+K\` or the CLI button in navbar/footer.
- Global Reach: Real-time backend visitor telemetry and server health monitoring.
- Verified Resume: Available by clicking the Resume button in the navigation or contact section.

## Behavioral Instructions:
- Provide concise, technically sharp, and friendly answers.
- Use markdown formatting with bullet points and code backticks for keywords.
- When asked about hiring, interviewing, or rates, state that Kunal is open to Staff/Principal Backend and AI Infrastructure roles (hybrid in Bengaluru or remote), and encourage them to email kumarkunal4052002@gmail.com.`;

  function generateFallbackReply(userQuery: string): string {
    const q = userQuery.toLowerCase();
    if (q.includes('hypervector') || q.includes('vector') || q.includes('c++')) {
      return `**HyperVector-Engine** is Kunal's distributed SIMD-accelerated vector indexing engine built in C++20 and CUDA. It delivers sub-2.4ms p99 latency across 10M+ embeddings using AVX-512 distance kernels and HNSW graph indexing with IVF-PQ quantization.`;
    }
    if (q.includes('cortexflow') || q.includes('dag') || q.includes('go') || q.includes('orchestrat')) {
      return `**CortexFlow-Orchestrator** is a dynamic DAG task orchestrator written in Go and gRPC. It handles 14,000 tasks/sec with speculative LLM branch execution and Raft quorum state persistence.`;
    }
    if (q.includes('chronos') || q.includes('time-series') || q.includes('rust')) {
      return `**ChronosDB** is a high-cardinality distributed time-series database written in Rust (Tokio) achieving 1.8M metrics/sec per node with custom delta-of-delta and bit-packed LZ4 compression.`;
    }
    if (q.includes('paper') || q.includes('research') || q.includes('read') || q.includes('study') || q.includes('literature')) {
      return `Kunal has **not published** research papers himself; rather, he actively **reads, analyzes, and applies seminal AI and systems research** to production architectures. His curated reading list includes foundational breakthroughs like:
1. **Attention Is All You Need** (Transformers & multi-head attention)
2. **Deep Residual Learning (ResNet)** (Residual skip connections)
3. **Batch Normalization** (Layer dynamics and normalization)
4. **AlexNet** (GPU acceleration and deep CNN fundamentals)
5. **Pedro Domingos' CACM Paper** (ML engineering truths and induction bias)

He applies these principles directly to SIMD vector kernels, GPU memory virtualization, and high-throughput inference serving. Check out the **Academic & Theoretical Foundations** section on this page to explore his notes and takeaways!`;
    }
    if (q.includes('hire') || q.includes('contact') || q.includes('email') || q.includes('resume') || q.includes('job') || q.includes('availab')) {
      return `Kunal is open to **Staff Backend** and **Principal AI Systems Engineer** roles (Bengaluru or remote). You can reach him directly at **kumarkunal4052002@gmail.com** or open his verified Resume directly from the navigation bar!`;
    }
    return `Kunal Kumar is a **Staff Backend & AI Systems Engineer** in Bengaluru specializing in high-throughput distributed systems (Kafka, Go, Rust), AI inference infrastructure (KV cache management, TensorRT-LLM, vector search), and consensus algorithms (Raft). Feel free to ask about any of his projects, reading list, or career highlights!`;
  }

  // AI Chat Bot endpoint using Gemini 3.8 Flash
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'messages array is required' });
      }

      // Convert messages for @google/genai
      const recentMessages = messages.slice(-10);
      const contents = recentMessages
        .map((m: { role?: string; content?: string }) => ({
          role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
          parts: [{ text: String(m.content || '').trim() }]
        }))
        .filter((c) => c.parts[0].text.length > 0);

      if (contents.length === 0) {
        return res.status(400).json({ error: 'Valid non-empty message content is required' });
      }

      const lastUserMsg = contents[contents.length - 1].parts[0].text;
      const ai = getGenAI();

      if (!ai) {
        const fallback = generateFallbackReply(lastUserMsg);
        return res.json({ reply: fallback });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: KUNAL_SYSTEM_PROMPT,
          temperature: 0.6,
          maxOutputTokens: 900
        }
      });

      const reply = response.text?.trim() || generateFallbackReply(lastUserMsg);
      res.json({ reply });
    } catch (err: any) {
      console.error('[Chat API] Error calling Gemini:', err?.message || err);
      const lastUserMsg = Array.isArray(req.body?.messages)
        ? req.body.messages[req.body.messages.length - 1]?.content || ''
        : '';
      const fallback = generateFallbackReply(lastUserMsg);
      res.json({ reply: fallback });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Backend] Express server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
