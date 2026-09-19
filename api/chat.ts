import { GoogleGenAI } from '@google/genai';

const SYSTEM_PROMPT = `You are Kunal AI, a concise and friendly assistant representing Kunal Kumar, a Software Engineer focused on backend systems, distributed architecture, and AI-powered products.

Profile:
- Location: Bengaluru, Karnataka, India
- Email: kunalkumar1.dev@gmail.com
- Stack: Java, Spring Boot, Go, Rust, C++20, TypeScript, Kafka, Redis, PostgreSQL, Kubernetes, Docker, and modern AI infrastructure.
- Focus: high-throughput APIs, concurrency, fault tolerance, event streaming, Raft consensus, vector search, and LLM agent orchestration.

Answer questions about Kunal, his projects, experience, research reading list, technical stack, hiring availability, and the portfolio website. Be accurate, concise, and use markdown when useful. When asked about hiring, say he is open to Staff Backend and Principal AI Systems Engineer roles in Bengaluru or remotely, and provide kunalkumar1.dev@gmail.com.`;

function fallbackReply(query: string): string {
  const normalized = query.toLowerCase();
  if (normalized.includes('contact') || normalized.includes('email') || normalized.includes('hire') || normalized.includes('role')) {
    return 'Kunal is open to Staff Backend and Principal AI Systems Engineer roles in Bengaluru or remotely. Contact him at **kunalkumar1.dev@gmail.com**.';
  }
  if (normalized.includes('stack') || normalized.includes('technology')) {
    return 'Kunal works across Java, Spring Boot, Go, Rust, C++20, Kafka, Redis, PostgreSQL, Kubernetes, Docker, and AI inference infrastructure.';
  }
  return 'Kunal Kumar is a Software Engineer focused on high-throughput backend systems, distributed architecture, and AI-powered products.';
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const messages = req.body?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  const contents = messages
    .slice(-10)
    .map((message: { role?: string; content?: string }) => ({
      role: message.role === 'assistant' || message.role === 'model' ? 'model' : 'user',
      parts: [{ text: String(message.content || '').trim() }]
    }))
    .filter((message: { parts: Array<{ text: string }> }) => message.parts[0].text.length > 0);

  if (contents.length === 0) {
    return res.status(400).json({ error: 'Valid non-empty message content is required' });
  }

  const lastMessage = contents[contents.length - 1].parts[0].text;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.json({ reply: fallbackReply(lastMessage), mode: 'fallback' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    let response;
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.6,
            maxOutputTokens: 900
          }
        });
        break;
      } catch (error) {
        if (attempt === 1) throw error;
        await new Promise((resolve) => setTimeout(resolve, 700));
      }
    }

    return res.json({ reply: response?.text?.trim() || fallbackReply(lastMessage) });
  } catch (error) {
    console.error('[Vercel Chat API] Gemini request failed:', error);
    return res.json({ reply: fallbackReply(lastMessage), mode: 'fallback' });
  }
}
