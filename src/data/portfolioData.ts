export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Distributed Systems' | 'AI Engineering' | 'Experimental / Founder';
  date: string;
  problem: string;
  solution: string;
  technicalChallenge: string;
  stack: string[];
  githubUrl?: string;
  demoUrl?: string;
  isFeatured: boolean;
  status: 'SHIPPED' | 'BUILDING' | 'EXPERIMENT' | 'OPEN SOURCE';
  architecture: {
    overview: string;
    flowNodes: { name: string; role: string; latency?: string }[];
    tradeoffs: string[];
    concurrencyDetails: string;
    telemetry: string;
  };
  keyDecisions: { title: string; reasoning: string }[];
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  isCurrent: boolean;
  summary: string;
  whatIWorkedOn: string[];
  systemsTouched: string[];
  problemsSolved: string[];
  technologies: string[];
  keyEngineeringAchievements: string[];
}

export interface SystemDesignCase {
  id: string;
  title: string;
  tagline: string;
  type: 'Production System' | 'Architecture Exercise';
  requirements: string[];
  components: { name: string; role: string }[];
  dataFlow: string[];
  bottlenecks: string[];
  failureModes: string[];
  scalingStrategy: string[];
  tradeoffs: { choice: string; alternative: string; rationale: string }[];
}

export interface LabItem {
  id: string;
  title: string;
  description: string;
  status: 'BUILDING' | 'EXPERIMENT' | 'SHIPPED' | 'OPEN SOURCE' | 'IDEA';
  category: string;
  stack: string[];
  insights: string;
  githubUrl?: string;
}

export interface Achievement {
  title: string;
  organization: string;
  badge: string;
  description: string;
  link?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  linkText: string;
  credentialUrl?: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  year: number;
  phase: 'Phase 1–2: Classical ML' | 'Phase 2: Deep Learning Core' | 'Phase 3: Transformers & LLMs';
  venue: string;
  url: string;
  takeaway: string;
  engineeringApplication: string;
  tag: string;
}

export const PERSONAL_DATA = {
  name: "Kunal Kumar",
  title: "Software Engineer",
  specialization: "Backend • Distributed Systems • AI Engineering",
  location: "Bengaluru, Karnataka, India",
  timezone: "IST (UTC+05:30)",
  email: "kunalkumar1.dev@gmail.com",
  phone: "+91-6203740061",
  github: "https://github.com/kunalkumar37",
  githubHandle: "kunalkumar37",
  linkedin: "https://linkedin.com/in/kunalkumar6/",
  linkedinHandle: "in/kunalkumar6",
  statusBadge: "Open to high-impact Software Engineer & Backend roles",
  summaryHeadline: "I build systems that scale — and products worth using.",
  summarySupporting:
    "Software Engineer focused on backend systems, distributed architecture, and AI-powered products. I work across Java, Spring Boot, cloud infrastructure, and modern AI systems — from production APIs to workflow agents.",
  coreNarrative:
    "Started by writing production software at enterprise scale, became obsessed with concurrency and distributed resilience, dove deep into agentic AI orchestration, and now building foundational systems and experimental products.",
};

export const SYSTEMS_CAPABILITIES = [
  {
    id: "backend-systems",
    title: "Backend Systems",
    lead: "Architecting high-throughput REST APIs, secure microservices, and reliable service boundaries.",
    points: [
      "Spring Boot microservices with OAuth 2.0, JWT stateless tokens, and granular RBAC",
      "Robust API contract design using OpenAPI 3.0 specs and automated integration suites",
      "Advanced concurrency orchestration with ForkJoinPool and workload-aware thread pools",
      "Data consistency across microservice boundaries with Spring Data JPA, Hibernate, and HikariCP"
    ],
    tech: ["Java 17+", "Spring Boot", "Spring Security", "OAuth 2.0 / JWT", "REST", "gRPC", "WebSockets"]
  },
  {
    id: "distributed-systems",
    title: "Distributed Systems",
    lead: "Designing fault-tolerant event streams, distributed state locking, and zero-loss pipelines.",
    points: [
      "Event-driven messaging topologies using Apache Kafka with partition-aware producers and consumer groups",
      "Distributed concurrency control and seat reservation with Redis locks, TTLs, and Redlock patterns",
      "Idempotency engines using unique idempotency keys to prevent duplicate transactions",
      "Distributed unique ID generation utilizing 64-bit Twitter Snowflake algorithm without central bottlenecks"
    ],
    tech: ["Apache Kafka", "Kafka Streams", "Redis", "Distributed Locking", "Idempotency", "Snowflake ID"]
  },
  {
    id: "ai-engineering",
    title: "AI Engineering & Multi-Agent Systems",
    lead: "Building autonomous agent workflows, model context bridges, and strict evaluation harnesses.",
    points: [
      "Supervisor-Agent orchestration routing complex enterprise queries to specialized autonomous sub-agents",
      "Model Context Protocol (MCP) integrations and dynamic tool/function calling with structured outputs",
      "Local LLM inference gateways (Ollama/Qwen) with Token-Bucket rate limiting and SSE streaming proxies",
      "Rigorous LLM evaluation and monitoring workflows validating task completion, hallucination mitigation, and tool invocation"
    ],
    tech: ["Amazon Bedrock", "Ollama (Qwen)", "MCP (Model Context Protocol)", "Multi-Agent Orchestration", "Langsmith", "SSE Streaming"]
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud & Infrastructure",
    lead: "Provisioning containerized services, CI/CD automation, and real-time observability telemetry.",
    points: [
      "Containerization using multi-stage Docker builds and Kubernetes cluster deployment manifests",
      "AWS cloud primitives including EC2, S3, IAM, ECS, Lambda, and DynamoDB architectures",
      "Automated CI/CD build, test, and container packaging pipelines using GitHub Actions",
      "Telemetry and system health dashboards powered by Prometheus metrics and Grafana visualizers"
    ],
    tech: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Prometheus", "Grafana", "Cloudflare"]
  },
  {
    id: "enterprise-engineering",
    title: "Enterprise Systems",
    lead: "Modernizing core enterprise domains through high-speed automation and asynchronous messaging.",
    points: [
      "Enterprise automation for Oracle HCM using autonomous workflow agents and custom learning modules",
      "High-performance transactional database access with Oracle Database, PL/SQL, and MySQL indexing",
      "Webhooks and WebSocket duplex channels enabling asynchronous notifications between services and clients",
      "Rigorous unit and integration test suites reaching 92% coverage using JUnit 5, Mockito, and TDD"
    ],
    tech: ["Oracle Fusion HCM", "PL/SQL", "Oracle Database", "MySQL", "WebSockets", "JUnit 5 / Mockito"]
  }
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "silicon-weave",
    title: "SiliconWeave – Distributed Private Inference Network",
    tagline: "Private LLM inference, woven from the world’s idle silicon. Connecting high-performance inference to attested machines people already own.",
    category: "Experimental / Founder",
    date: "2026 – Present (Early Build)",
    isFeatured: true,
    status: "BUILDING",
    demoUrl: "https://temporary-brisk-gust-tmk1i3y.vercel.app/",
    githubUrl: "https://github.com/kunalkumar37",
    problem:
      "Centralized cloud AI providers charge high markups ('cloud tax') while user prompts and proprietary weights remain exposed to centralized data retention. Concurrently, millions of high-performance GPUs and Apple Silicon chips sit idle across developer workstations worldwide.",
    solution:
      "Building SiliconWeave: a decentralized, privacy-preserving distributed inference network that matches inference demand to verified, attested consumer and developer hardware. Features end-to-end encrypted prompt routing, transient in-memory execution with zero data retention, attested node health protocols, and a unified drop-in OpenAI-compatible API for developers.",
    technicalChallenge:
      "Routing prompt tokens with sub-300ms time-to-first-token across a heterogeneous, dynamic edge network while guaranteeing cryptographic attestation and zero prompt inspection by host machines.",
    stack: ["Distributed Systems", "Decentralized Inference", "Hardware Attestation", "End-to-End Encryption", "P2P / Edge Routing", "React / Vite", "Node.js / Go", "Vercel"],
    architecture: {
      overview: "Client App -> SiliconWeave Encrypted Gateway -> Attestation & Capability Router -> Verified Edge Node (Inference Execution) -> Streaming Token Return -> Zero-Retention State Wipe",
      flowNodes: [
        { name: "Developer / Client", role: "Unified API call (OpenAI-compatible drop-in)", latency: "0ms" },
        { name: "SiliconWeave Router", role: "Matches request to verified attested node by proximity & VRAM", latency: "18ms" },
        { name: "Attested Edge Node", role: "Transient hardware execution (RTX 4090 / M-Series / H100)", latency: "~220ms TTFT" },
        { name: "Encrypted Streamer", role: "Direct token streaming back to client with zero router retention", latency: "10ms" },
        { name: "Transient Memory Purge", role: "Immediate VRAM and prompt buffer sanitization", latency: "<2ms" }
      ],
      tradeoffs: [
        "Prioritized strict zero-retention ephemeral routing over prompt caching to ensure military-grade privacy for enterprise inference",
        "Selected dynamic latency-weighted peer routing to overcome variance across residential and edge bandwidth nodes"
      ],
      concurrencyDetails:
        "Designed to handle high concurrent burst routing through an asynchronous node dispatch queue, dynamically re-routing if a peer node experiences jitter or load spikes.",
      telemetry: "Node availability heartbeat, attested VRAM pools, p95 TTFT, and transient stream verification."
    },
    keyDecisions: [
      {
        title: "Attested Hardware Identity Verification",
        reasoning: "Engineered cryptographically signed heartbeats and secure enclave verification so only vetted, tamper-proof hardware nodes can accept customer prompt payloads."
      },
      {
        title: "Transient Ephemeral Processing Standard",
        reasoning: "Enforced an architectural invariant where node memory is purged immediately after token generation, giving users complete certainty that prompts are never retained or trained upon."
      }
    ]
  },
  {
    id: "ollama-llm-gateway",
    title: "Ollama LLM API Gateway",
    tagline: "Production-grade Spring Boot API gateway for local LLM inference with isolated rate limiting and SSE streaming.",
    category: "AI Engineering",
    date: "March 2026",
    isFeatured: true,
    status: "SHIPPED",
    problem:
      "Running locally-hosted LLMs (such as Qwen 8B on Ollama) under multi-user concurrent traffic causes severe GPU VRAM starvation and uncoordinated request queueing without authentication or burst rate limits.",
    solution:
      "Engineered an enterprise-grade API gateway in Spring Boot that centralizes client authentication via Spring Security filter chains, isolates request rate limits using an AtomicLong token bucket algorithm, and proxies LLM responses via Server-Sent Events (SSE) with sub-second time-to-first-token.",
    technicalChallenge:
      "Preventing heavy concurrent prompt payloads from blocking server thread pools while streaming token streams in real time with low memory overhead.",
    stack: ["Spring Boot", "Java 17", "WebClient", "SSE (Server-Sent Events)", "AtomicLong Token Bucket", "Redis", "Prometheus", "Grafana", "Ollama (Qwen 8B)"],
    githubUrl: "https://github.com/kunalkumar37",
    architecture: {
      overview: "Client -> Spring Security Filter (API Key Auth) -> AtomicLong Token Bucket Rate Limiter -> Reactive WebClient -> Ollama Inference Engine (Qwen 8B) -> SSE Streaming Proxy -> Prometheus Telemetry",
      flowNodes: [
        { name: "Client / Consumer", role: "Sends inference prompt with API Key", latency: "0ms" },
        { name: "API Key Auth Filter", role: "Spring Security filter chain validation", latency: "2ms" },
        { name: "Token Bucket Limiter", role: "AtomicLong per-key & per-model quota isolation", latency: "1ms" },
        { name: "SSE Streaming Proxy", role: "Reactive WebClient / StreamingResponseBody", latency: "12ms" },
        { name: "Ollama Engine", role: "Locally-hosted Qwen 8B GPU inference", latency: "~280ms TTFT" },
        { name: "Telemetry Exporter", role: "Prometheus metrics for GPU, CPU, and token rate", latency: "Async" }
      ],
      tradeoffs: [
        "Chose AtomicLong in-memory token bucket over distributed Redis for sub-microsecond local decision speed under high load, with Redis synchronization for multi-instance scaling",
        "Adopted Server-Sent Events (SSE) instead of raw WebSockets for unidirectional token streaming to minimize connection overhead on HTTP/2"
      ],
      concurrencyDetails:
        "AtomicLong-based bucket replenishes tokens based on nanosecond clock differentials with lock-free compare-and-swap (CAS), eliminating thread contention even under 1,000+ concurrent bursts.",
      telemetry: "Exposes Prometheus counters for http_requests_total, prompt_tokens, completion_tokens, and p95 token generation latency in Grafana."
    },
    keyDecisions: [
      {
        title: "Lock-Free Rate Limiter",
        reasoning: "Eliminated synchronized locks in the request path by leveraging AtomicLong CAS operations, ensuring zero CPU stalls during traffic spikes."
      },
      {
        title: "Reactive SSE Streaming Pipeline",
        reasoning: "Utilized Spring WebClient with StreamingResponseBody to stream LLM tokens chunk-by-chunk without buffering entire responses in heap memory."
      }
    ]
  },
  {
    id: "distributed-ticket-booking",
    title: "Distributed Ticket Booking Engine",
    tagline: "BookMyShow-scale distributed ticketing architecture with Kafka event streaming and zero-overselling Redis distributed locks.",
    category: "Distributed Systems",
    date: "November 2025",
    isFeatured: true,
    status: "OPEN SOURCE",
    problem:
      "Flash ticket sales create extreme write spikes where thousands of users simultaneously race for identical seats. Traditional database row-locking results in severe lock contention, deadlocks, and catastrophic overselling.",
    solution:
      "Designed an event-driven seat reservation microservice targeting 10,000+ concurrent requests. Employs Redis-based distributed locking with automatic TTL expiry for abandoned checkouts, Kafka for asynchronous order state transitions, and 64-bit Snowflake IDs for globally unique ticket numbering.",
    technicalChallenge:
      "Guaranteeing strict zero overselling while keeping API p95 response time under 550ms under massive concurrent load.",
    stack: ["Spring Boot", "Apache Kafka", "Redis (Distributed Lock)", "MySQL", "Docker", "Snowflake ID", "HikariCP", "G1GC"],
    githubUrl: "https://github.com/kunalkumar37",
    architecture: {
      overview: "User Request -> API Gateway -> Seat Reservation Service -> Redis Distributed Lock (TTL) -> Kafka Order Topic -> Payment Orchestrator (Idempotent Webhook) -> MySQL Eventual State -> Confirmed Ticket",
      flowNodes: [
        { name: "10k+ Concurrent Users", role: "Concurrent seat selection bursts", latency: "0ms" },
        { name: "Seat Locking Engine", role: "Redis SETNX with 10-min TTL lock", latency: "4ms" },
        { name: "Snowflake Generator", role: "64-bit time-ordered ticket ID", latency: "<1ms" },
        { name: "Kafka Order Topic", role: "Partitioned by event_id for linear ordering", latency: "8ms" },
        { name: "Payment Processor", role: "Idempotent payment webhook consumer", latency: "350ms" },
        { name: "Inventory Database", role: "MySQL batch update with optimistic lock check", latency: "38ms" }
      ],
      tradeoffs: [
        "Opted for event-driven asynchronous reservation with Redis temporary locks rather than 2-phase commit (2PC), trading immediate consistency for 10x higher concurrency throughput",
        "Used Twitter Snowflake IDs rather than auto-increment DB keys to completely eliminate database bottleneck during reservation creation"
      ],
      concurrencyDetails:
        "Redis locks use SETNX key 'seat:{showId}:{seatNo}' with a unique UUID holder token and a 600s TTL. If payment webhook fails or times out, the lock expires automatically and seat returns to inventory without DB locks.",
      telemetry: "Monitored queue consumer lag on Kafka order partitions and Redis cache hit ratios under 1,000+ simultaneous mock clients."
    },
    keyDecisions: [
      {
        title: "Idempotency Key Verification",
        reasoning: "Stored payment idempotency tokens in Redis with atomic verification to ensure duplicate payment gateway retries never trigger double-issuing."
      },
      {
        title: "HikariCP Connection Pool & N+1 Query Elimination",
        reasoning: "Configured eager entity graph loading and tuned HikariCP pool sizes, driving p95 query latency down from 900ms to 540ms."
      }
    ]
  },
  {
    id: "glossa-ai-platform",
    title: "Glossa – Multilingual Speech Intelligence",
    tagline: "AI-powered real-time translation and multi-agent speech platform engineered during the WeMakeDevs AI Mixer.",
    category: "AI Engineering",
    date: "2025",
    isFeatured: true,
    status: "OPEN SOURCE",
    problem:
      "Cross-language conversations suffer from awkward delays, loss of contextual nuances, and disjointed speech synthesis during live communications.",
    solution:
      "Built an AI-native multilingual platform during the WeMakeDevs AI Engineer Mixer hackathon. Glossa coordinates speech-to-text pipelines, LLM translation agents that preserve colloquial idioms, and low-latency audio playback across varied conversational contexts.",
    technicalChallenge:
      "Minimizing end-to-end audio pipeline latency while preserving conversational speaker intent and terminology accuracy across multilingual translations.",
    stack: ["AI Multi-Agent Pipeline", "LLM APIs", "WebSockets", "Speech Recognition", "TypeScript", "Node.js / Spring APIs", "FastAPI"],
    githubUrl: "https://github.com/kunalkumar37/glossa",
    architecture: {
      overview: "Audio Input Stream -> WebSocket Gateway -> Speech Transcription Worker -> Contextual Translation Agent -> Synthesis Buffer -> Real-Time Output Stream",
      flowNodes: [
        { name: "Audio Capture", role: "Browser audio stream over WebSockets", latency: "20ms" },
        { name: "Transcription Engine", role: "Streaming voice-to-text conversion", latency: "140ms" },
        { name: "Context Agent", role: "LLM prompt pipeline for nuance & idiom translation", latency: "320ms" },
        { name: "Audio Synthesizer", role: "Naturalistic TTS audio buffer generation", latency: "180ms" }
      ],
      tradeoffs: [
        "Implemented streaming chunk translation instead of waiting for sentence completion to maintain conversational conversational cadence"
      ],
      concurrencyDetails:
        "Employed duplex WebSocket channels with backpressure buffers so that fast speech chunks do not overwhelm slower synthesis threads.",
      telemetry: "Tracked chunk-level round-trip latency and token utilization per translation turn."
    },
    keyDecisions: [
      {
        title: "Context-Aware Agent Prompts",
        reasoning: "Engineered prompt templates with sliding historical context windows to prevent direct literal translations of cultural idioms."
      }
    ]
  },
  {
    id: "math-forces",
    title: "Math Forces",
    tagline: "Founder project: A competitive programming platform reimagined specifically for advanced collegiate and olympiad mathematics.",
    category: "Experimental / Founder",
    date: "2025 - Present",
    isFeatured: true,
    status: "BUILDING",
    problem:
      "While competitive programming platforms like Codeforces exist for algorithmic code, there is no real-time competitive rated arena for advanced mathematics (calculus, number theory, linear algebra, and combinatorics) with automated step validation.",
    solution:
      "Building a dedicated competitive mathematics platform that serves real-time rated contests. Features automated algebraic verification engines, dynamic LaTeX rendering, difficulty rating algorithms (Elo-based), and competitive time-constrained match rooms.",
    technicalChallenge:
      "Automating the mathematical equivalence checking of open-ended algebraic answers and symbolic calculus expressions without false positives.",
    stack: ["Java / Spring Boot", "Symbolic Math Engine / Python Microservice", "Redis", "Kafka", "PostgreSQL", "React", "LaTeX / KaTeX", "WebSockets"],
    githubUrl: "https://github.com/kunalkumar37",
    architecture: {
      overview: "Contestant Client (KaTeX Input) -> WebSocket Contest Gateway -> Math Verification Engine -> Symbolic Evaluator -> Rating Engine (Elo/Glicko) -> Redis Leaderboard",
      flowNodes: [
        { name: "Contestant UI", role: "Dynamic LaTeX formula entry with instant rendering", latency: "0ms" },
        { name: "Contest Gateway", role: "WebSocket connection managing contest state & countdowns", latency: "15ms" },
        { name: "Math Verifier", role: "Symbolic equivalence parser and boundary condition checker", latency: "65ms" },
        { name: "Live Leaderboard", role: "Redis Sorted Sets for millisecond rank updates", latency: "2ms" }
      ],
      tradeoffs: [
        "Separated symbolic math evaluation into an isolated sandboxed worker to prevent unbounded recursive equation simplification from hogging CPU"
      ],
      concurrencyDetails:
        "Used Redis Sorted Sets (ZADD/ZRANGE) to maintain millisecond-level live leaderboards across thousands of concurrent contestants during contest finales.",
      telemetry: "Live contest participant count, submission verdicts, and compute time per symbolic check."
    },
    keyDecisions: [
      {
        title: "Symbolic Equivalence Sandbox",
        reasoning: "Architected a dual verification step combining AST expression simplification with multi-point random numerical evaluation to ensure rigorous correctness."
      }
    ]
  },
  {
    id: "x-twitter-writing-assistant",
    title: "Technical Post Architecture Studio",
    tagline: "Experimental LLM workflow for engineers and founders to structure high-signal technical threads and architecture breakdowns.",
    category: "Experimental / Founder",
    date: "2025",
    isFeatured: false,
    status: "EXPERIMENT",
    problem:
      "Engineers struggle to translate complex distributed systems architectures and engineering wins into compelling, high-signal technical posts without falling into marketing fluff or overly dry jargon.",
    solution:
      "Prototyped an agentic writing assistant that analyzes technical problem-solution arcs, scores hook engagement, checks technical density, and formats code snippets and architecture diagrams for maximum developer clarity.",
    technicalChallenge:
      "Structuring prompt chains that preserve deep technical credibility while pruning boilerplate and passive prose.",
    stack: ["LLM Tool Calling", "Prompt Engineering", "TypeScript", "Next.js / Vite", "OpenAI / Claude APIs"],
    githubUrl: "https://github.com/kunalkumar37",
    architecture: {
      overview: "Raw Engineering Notes -> Structure Agent -> Hook Optimizer -> Technical Density Scorer -> Markdown/Social Output",
      flowNodes: [
        { name: "Raw Note Intake", role: "Markdown notes or GitHub commit diffs", latency: "0ms" },
        { name: "Structure Agent", role: "Extracts problem, constraint, solution, and trade-off", latency: "420ms" },
        { name: "Hook & Clarity Evaluator", role: "Eliminates buzzwords and ensures active engineering voice", latency: "380ms" }
      ],
      tradeoffs: [
        "Hard-coded anti-buzzword constraints to strictly filter out generic phrases like 'passionate' or 'game-changer'"
      ],
      concurrencyDetails: "Stateless asynchronous execution pipeline with local caching of draft histories.",
      telemetry: "Post clarity metrics, hook strength index, and technical readability scores."
    },
    keyDecisions: [
      {
        title: "Anti-Fluff Guardrail Prompting",
        reasoning: "Embedded strict system prompts penalizing self-praise and demanding concrete technical nouns, system components, and measured outcomes."
      }
    ]
  }
];

export const WORK_EXPERIENCE: Experience[] = [
  {
    company: "Infosys",
    role: "Software Engineer",
    location: "Bengaluru, Karnataka",
    period: "March 2025 – Present",
    isCurrent: true,
    summary:
      "Leading backend microservices development, AI workflow automation for Oracle HCM, and distributed concurrency optimization across high-throughput enterprise systems.",
    whatIWorkedOn: [
      "Designed and implemented secure authentication and authorization across 5+ Spring Boot microservices using OAuth 2.0, JWT, Spring Security, and RBAC, standardizing token validation and access control across distributed services.",
      "Designed and developed 10+ AI workflow agents to automate learning modules for Oracle HCM, using agentic workflows, tool/function calling, MCP-based integrations, and supervisor-agent orchestration for multi-step enterprise automation.",
      "Engineered a supervisor agent to intelligently route user requests across specialized workflow agents, applying advanced prompt engineering to improve instruction following, agent coordination, tool selection, and response consistency.",
      "Built LLM evaluation and monitoring workflows to test agent behavior across diverse user prompts and edge cases, validating task completion, response quality, tool invocation, failure handling, and agent reliability before deployment.",
      "Built and integrated REST APIs, Webhooks, and WebSocket-based real-time communication for enterprise workflows, enabling asynchronous integrations and real-time data exchange.",
      "Implemented Redis caching for high-read database operations in a ticket-booking backend, reducing average database read latency from ~180ms to <50ms and cutting database read volume by 50% under 500+ concurrent users.",
      "Resolved race conditions and ticket overselling using distributed locking and idempotency keys, achieving zero duplicate-booking incidents across load tests with 1,000+ simultaneous requests.",
      "Improved API p95 latency from 900ms to 540ms through N+1 query optimization, HikariCP connection pooling, and G1GC tuning.",
      "Increased automated test coverage from <30% to 92% using JUnit 5, Mockito, and TDD, while improving multithreaded batch-processing throughput by 35% through ForkJoinPool-based parallel execution and workload-aware concurrency tuning."
    ],
    systemsTouched: [
      "Spring Boot Microservices Cluster",
      "OAuth 2.0 & Spring Security Gateway",
      "Oracle HCM Automation Pipeline",
      "Redis Distributed Caching & Lock Infrastructure",
      "Kafka Event Bus & Message Topics",
      "WebSocket Real-Time Notification Server",
      "ForkJoinPool Batch Processing Engine"
    ],
    problemsSolved: [
      "Zero Overselling under High Load: Eliminated concurrency race conditions using Redis distributed locks and unique idempotency keys under 1,000+ simultaneous booking attempts.",
      "Database Contention & Latency: Reduced DB read latency by 72% (180ms down to <50ms) using Redis caching with smart cache-invalidation strategies.",
      "Multi-Agent Coordination Drift: Engineered supervisor routing and MCP tool calling to prevent sub-agent hallucinations during complex enterprise workflows.",
      "Batch Processing Bottlenecks: Boosted throughput by 35% by rewriting sequential batch loops into ForkJoinPool parallel pipelines."
    ],
    technologies: [
      "Java 17",
      "Spring Boot",
      "Spring Security",
      "OAuth 2.0 / JWT",
      "Redis",
      "Apache Kafka",
      "Oracle HCM",
      "PL/SQL",
      "WebSockets",
      "MCP (Model Context Protocol)",
      "JUnit 5",
      "Mockito",
      "HikariCP",
      "G1GC"
    ],
    keyEngineeringAchievements: [
      "92% Automated test coverage achieved via TDD",
      "0 Duplicate booking incidents under 1,000+ concurrent requests",
      "72% DB read latency reduction (180ms -> <50ms)",
      "35% Multithreaded batch-processing throughput acceleration"
    ]
  },
  {
    company: "Capgemini",
    role: "Software Engineer",
    location: "Noida, Uttar Pradesh",
    period: "December 2023 – February 2025",
    isCurrent: false,
    summary:
      "Engineered core backend services, executed JVM performance profiling, tuned garbage collection on hot memory paths, and established standardized OpenAPI contracts.",
    whatIWorkedOn: [
      "Diagnosed JVM heap pressure causing API latency spikes under load by profiling with JProfiler; tuned G1GC settings and reduced object allocation in hot paths, improving average response time by 20%.",
      "Worked on React and Spring Boot API integration across 3 product modules, defining shared OpenAPI contracts and resolving CORS and serialization issues to deliver seamless cross-team feature delivery.",
      "Authored OpenAPI documentation and Postman test collections for 12+ REST endpoints, enabling QA and frontend teams to test independently and reducing integration bugs by eliminating undocumented contract assumptions.",
      "Built transactional backend endpoints and unit tests with Mockito and JUnit, ensuring compliance with strict enterprise SLAs."
    ],
    systemsTouched: [
      "JVM Runtime & Garbage Collector (G1GC)",
      "Spring Boot REST Application Servers",
      "OpenAPI 3.0 Contract Specifications",
      "JProfiler Heap Memory Diagnostics",
      "Postman Automation Test Suites"
    ],
    problemsSolved: [
      "Garbage Collection Latency Pauses: Pinpointed high allocation rates in request parsing paths using JProfiler; replaced temporary string concats with reusable byte buffers, boosting average response time by 20%.",
      "Cross-Team Contract Drift: Eliminated silent payload mismatch errors by implementing contract-first OpenAPI schemas validated during Maven builds."
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "JProfiler",
      "G1GC Garbage Collector",
      "OpenAPI / Swagger",
      "Postman",
      "JUnit",
      "Mockito",
      "React.js",
      "Maven"
    ],
    keyEngineeringAchievements: [
      "20% Response time improvement via JVM memory profiling and G1GC tuning",
      "12+ REST endpoints formally specified and automated in OpenAPI contracts",
      "Seamless integration across 3 cross-functional product modules"
    ]
  }
];

export const SYSTEM_DESIGN_CASES: SystemDesignCase[] = [
  {
    id: "distributed-ticket-booking-design",
    title: "High-Concurrency Seat Reservation & Payment Idempotency",
    tagline: "Architecture design for handling 10,000+ simultaneous booking requests without duplicate sales.",
    type: "Production System",
    requirements: [
      "Handle sudden 10k+ concurrent requests on popular event drop with zero overselling",
      "Provide 10-minute temporary seat holding while customer completes checkout",
      "Auto-release seat if payment fails, is abandoned, or network drops",
      "Prevent double billing on duplicate payment gateway webhooks"
    ],
    components: [
      { name: "API Gateway", role: "TLS termination, JWT validation, and token-bucket rate limiting" },
      { name: "Seat Reservation Service", role: "Validates seat state and acquires distributed Redis lock" },
      { name: "Redis Distributed Lock", role: "Atomic SETNX lock with 600s TTL and unique client tokens" },
      { name: "Kafka Order Topic", role: "Durable partitioned queue for seat reservation lifecycle events" },
      { name: "Payment Webhook Consumer", role: "Processes Stripe/Razorpay webhooks with idempotency keys" },
      { name: "Inventory Database (MySQL)", role: "Authoritative relational persistence with optimistic lock versions" }
    ],
    dataFlow: [
      "1. Client sends seat reservation request for Show A, Seat B12",
      "2. Gateway validates JWT and checks rate limit per IP/User",
      "3. Service executes Redis SETNX key 'seat:{showId}:{seatId}' with owner token and 600s TTL",
      "4. If key exists -> return 409 Conflict (Seat currently held)",
      "5. If acquired -> generate 64-bit Snowflake ID and publish 'SeatReservedEvent' to Kafka",
      "6. Client redirected to payment; on payment completion, webhook arrives with idempotency_key",
      "7. Webhook consumer checks Redis idempotency table; if already processed, immediately return 200 OK",
      "8. Confirmed transaction commits seat state to MySQL, and deletes Redis temporary lock"
    ],
    bottlenecks: [
      "Single Redis master throughput under extreme write bursts (solved via cluster sharding by show_id)",
      "Database write contention during the final checkout commit phase (solved via Kafka queue batching)"
    ],
    failureModes: [
      "Payment Webhook Drops: Solved via periodic reconciliation cron checking unconfirmed reservations past TTL",
      "Redis Node Crash: Solved via Redlock algorithm across multi-AZ master-replica pairs"
    ],
    scalingStrategy: [
      "Sharded Redis cluster partitioned by Hash(show_id) so massive concurrent drops on one event don't impact others",
      "Kafka consumer groups scaled horizontally based on partition lag metrics"
    ],
    tradeoffs: [
      {
        choice: "Redis Temporary Locks + Asynchronous Kafka writes",
        alternative: "Strict RDBMS row locking (SELECT FOR UPDATE)",
        rationale: "Database row locking results in deadlock cascades under 10k concurrent requests. Redis in-memory locks handle 80k+ ops/sec with sub-5ms latency."
      }
    ]
  },
  {
    id: "scalable-notification-system",
    title: "Scalable Multi-Channel Notification & Webhook Engine",
    tagline: "High-throughput asynchronous delivery pipeline supporting email, SMS, push, and partner webhooks.",
    type: "Architecture Exercise",
    requirements: [
      "Deliver millions of notifications daily across diverse providers (SES, Twilio, FCM, Webhooks)",
      "Support user-level notification preferences, rate limits, and quiet hours",
      "Exponential backoff retry policy for external webhook failures with dead-letter queue (DLQ)",
      "End-to-end delivery tracking and latency visibility"
    ],
    components: [
      { name: "Ingestion API", role: "Validates notification payload and enqueues to Kafka" },
      { name: "Preference & Rate Limit Filter", role: "Checks user opt-outs and frequency caps in Redis" },
      { name: "Dispatcher Workers", role: "Provider-specific consumers (Email, SMS, Push, Webhooks)" },
      { name: "Retry & DLQ Queue", role: "Kafka topics for 1m, 5m, 15m backoff before DLQ persistence" },
      { name: "Status Store (DynamoDB / Cassandra)", role: "Records delivery timestamps, provider response codes, and errors" }
    ],
    dataFlow: [
      "1. Internal microservices publish NotificationRequest(userId, type, payload) to Ingestion API",
      "2. API assigns UUID and pushes to Kafka topic 'notifications-raw'",
      "3. Preference Worker verifies user hasn't muted channel and verifies Redis sliding window rate limits",
      "4. Enqueued to channel-specific topic (e.g. 'notifications-email', 'notifications-webhook')",
      "5. Channel worker invokes 3rd-party provider API",
      "6. On 5xx failure: routes message to Kafka backoff topic with incremental delay header",
      "7. On terminal failure: routes to DLQ for manual inspection and alerts On-Call engineers"
    ],
    bottlenecks: [
      "Third-party provider rate limits (e.g. Twilio or partner webhook endpoints)",
      "Thundering herd during breaking platform announcements"
    ],
    failureModes: [
      "Partner Webhook Server Down: Handled via circuit breaker pattern to prevent worker starvation",
      "Kafka Consumer Crash: Automatic partition rebalance ensures zero message loss"
    ],
    scalingStrategy: [
      "Dedicated consumer pools for external webhooks with per-destination concurrency throttles",
      "Prometheus alerting on DLQ growth rates and consumer group lag"
    ],
    tradeoffs: [
      {
        choice: "Separate Kafka topics for retry delays",
        alternative: "In-memory thread sleep in consumer",
        rationale: "Thread sleep blocks consumer threads from processing other active messages, destroying pipeline throughput."
      }
    ]
  },
  {
    id: "ai-supervisor-mcp-engine",
    title: "Enterprise Multi-Agent Orchestration & MCP Tool Bridge",
    tagline: "Autonomous routing supervisor coordinating specialized AI agents with strict security boundaries.",
    type: "Production System",
    requirements: [
      "Allow non-technical enterprise users to request complex multi-step HR and LMS operations in natural language",
      "Dynamically route tasks to specialized sub-agents (Content, Assessment, Enrollment, Reporting)",
      "Enforce Model Context Protocol (MCP) access controls preventing unauthorized database mutations",
      "Log full prompt-completion audit trails with latency and token telemetry"
    ],
    components: [
      { name: "Supervisor Agent", role: "Intent classifier and plan generator powered by LLM reasoning" },
      { name: "Specialized Workflow Agents", role: "Domain experts with tailored prompt guidelines and tool access" },
      { name: "MCP Tool Server", role: "Standardized interface exposing Oracle HCM and internal REST APIs" },
      { name: "Evaluation & Guardrail Filter", role: "Validates schema outputs and detects hallucinated parameters" },
      { name: "Audit & Telemetry Store", role: "Stores execution graph, token usage, and latency in Langsmith/DB" }
    ],
    dataFlow: [
      "1. User prompt arrives: 'Create a compliance training module for Q2 and enroll all new engineering hires'",
      "2. Supervisor Agent decomposes prompt into a Directed Acyclic Graph (DAG) of execution steps",
      "3. Step 1 assigned to Learning Module Agent -> calls MCP tool 'create_course'",
      "4. Step 2 assigned to Employee Directory Agent -> calls MCP tool 'query_employees_by_department'",
      "5. Step 3 assigned to Enrollment Agent -> executes batch enrollment with rollback safety",
      "6. Guardrail engine validates all parameter types before final commit to Oracle HCM",
      "7. Formatted executive summary returned to user with execution trace ID"
    ],
    bottlenecks: [
      "Sequential LLM reasoning latency across multiple agent hops",
      "Token budget consumption during long iterative planning conversations"
    ],
    failureModes: [
      "Sub-agent tool hallucination: Trapped by JSON schema validation before calling real backend APIs",
      "Upstream LLM rate limit: Handled via exponential backoff and fallback model endpoints"
    ],
    scalingStrategy: [
      "Parallelize non-dependent DAG steps using asynchronous CompletableFuture / coroutine workers",
      "Cache common plan templates in Redis to bypass LLM supervisor calls for recurring requests"
    ],
    tradeoffs: [
      {
        choice: "Supervisor decomposition with explicit tool schema contracts",
        alternative: "Single massive prompt with all tools attached",
        rationale: "Single massive prompts degrade instruction following, increase token costs 4x, and significantly heighten hallucination risk."
      }
    ]
  }
];

export const ENGINEERING_LAB: LabItem[] = [
  {
    id: "math-forces-lab",
    title: "Math Forces",
    category: "Competitive Mathematics",
    status: "BUILDING",
    description: "A real-time competitive programming platform built for advanced collegiate mathematics and olympiad problem solving with automated symbolic answer verification.",
    stack: ["Spring Boot", "WebSockets", "Redis Sorted Sets", "KaTeX", "Python Symbolic Worker"],
    insights: "Investigating AST-based symbolic simplification vs multi-point numerical evaluation to solve equation verification at scale.",
    githubUrl: "https://github.com/kunalkumar37"
  },
  {
    id: "ollama-gateway-lab",
    title: "Local LLM Inference Gateway",
    category: "AI Infrastructure",
    status: "SHIPPED",
    description: "Production-grade Spring Boot API gateway proxying requests to local Ollama instances with Token Bucket rate limiting, API key auth, and SSE streaming.",
    stack: ["Spring Boot", "Java 17", "WebClient", "AtomicLong", "Ollama", "Prometheus"],
    insights: "Achieved sub-second first-token latency with zero thread pool blocking using reactive WebClient streaming.",
    githubUrl: "https://github.com/kunalkumar37"
  },
  {
    id: "x-writer-lab",
    title: "Technical Post Architecture Studio",
    category: "Developer Tools",
    status: "EXPERIMENT",
    description: "An LLM-driven post architect that strips buzzwords, emphasizes technical trade-offs, and turns messy engineering commits into crisp case studies.",
    stack: ["TypeScript", "Next.js", "Prompt Engineering", "LLM APIs"],
    insights: "Created an automated 'Anti-Fluff' score penalizing generic adjectives like 'passionate' or 'seamless'.",
    githubUrl: "https://github.com/kunalkumar37"
  },
  {
    id: "distributed-lock-bench",
    title: "Redis vs Database Lock Concurrency Harness",
    category: "Distributed Systems",
    status: "OPEN SOURCE",
    description: "Benchmarking harness comparing Redis SETNX distributed locking against MySQL pessimistic (SELECT FOR UPDATE) and optimistic (version column) locking.",
    stack: ["Java 17", "JMH (Java Microbenchmark Harness)", "Redis", "MySQL", "Docker"],
    insights: "Redis distributed locking achieved 12x higher throughput with 85% lower p99 latency during 1,000+ thread contention.",
    githubUrl: "https://github.com/kunalkumar37"
  },
  {
    id: "mcp-agent-bridge",
    title: "Model Context Protocol Enterprise Bridge",
    category: "AI / Agents",
    status: "BUILDING",
    description: "A lightweight Java/Spring implementation of the Model Context Protocol (MCP) enabling autonomous agents to safely introspect enterprise REST schemas.",
    stack: ["Java", "Spring Boot", "MCP", "JSON-RPC", "OpenAPI"],
    insights: "Standardizing tool definitions using OpenAPI specs dynamically translated to MCP JSON-RPC protocol.",
    githubUrl: "https://github.com/kunalkumar37"
  }
];

export const TECH_STACK_MATRIX = [
  {
    category: "Languages",
    items: [
      { name: "Java 8 / 11 / 17+", level: "Core Expertise", context: "Enterprise microservices, multithreading, concurrency, ForkJoinPool, memory management" },
      { name: "SQL", level: "Advanced", context: "Complex relational queries, indexing, query execution plan tuning, transactions" },
      { name: "PL/SQL", level: "Production", context: "Stored procedures, packages, database triggers, enterprise batch pipelines" },
      { name: "JavaScript / TypeScript", level: "Proficient", context: "Modern React.js frontends, API integration, interactive tooling" },
      { name: "C++", level: "Algorithmic", context: "Competitive programming, high-performance algorithms, memory control" }
    ]
  },
  {
    category: "Backend & Architecture",
    items: [
      { name: "Spring Boot", level: "Core Expertise", context: "Production microservices, REST APIs, dependency injection, application configuration" },
      { name: "Spring Security", level: "Production", context: "Stateless OAuth 2.0 / JWT filter chains, role-based access control (RBAC)" },
      { name: "Spring MVC & WebClient", level: "Production", context: "Reactive HTTP calls, SSE streaming, non-blocking asynchronous clients" },
      { name: "Hibernate / Spring Data JPA", level: "Production", context: "Entity modeling, criteria queries, HikariCP connection pooling, N+1 avoidance" },
      { name: "WebSockets & SSE", level: "Production", context: "Bi-directional real-time communication and token streaming pipelines" },
      { name: "REST & OpenAPI (Swagger)", level: "Production", context: "Strict contract-first design, payload versioning, backward compatibility" },
      { name: "gRPC", level: "Familiar", context: "Protobuf-based high-speed inter-service RPC communication" }
    ]
  },
  {
    category: "Distributed Systems & Caching",
    items: [
      { name: "Apache Kafka", level: "Production", context: "Event-driven pipelines, topics, partition key strategies, consumer groups" },
      { name: "Redis", level: "Production", context: "Sub-millisecond caching, distributed locks (SETNX/TTL), rate limiting, pub/sub" },
      { name: "Distributed Locking", level: "Production", context: "Preventing race conditions and overselling across concurrent service nodes" },
      { name: "Idempotency Engines", level: "Production", context: "Unique transaction key verification to safely handle network retries" },
      { name: "Snowflake ID Generation", level: "Production", context: "64-bit globally unique, time-sortable distributed identifiers" }
    ]
  },
  {
    category: "AI Engineering & Agents",
    items: [
      { name: "Multi-Agent Orchestration", level: "Production", context: "Supervisor agent patterns, sub-agent delegation, dynamic task planning" },
      { name: "Model Context Protocol (MCP)", level: "Production", context: "Standardized tool calling and enterprise API introspection" },
      { name: "Tool / Function Calling", level: "Production", context: "Structured JSON schema output validation and external API invocation" },
      { name: "Prompt Engineering & Evaluation", level: "Production", context: "Instruction tuning, automated test suites, hallucination defense" },
      { name: "Locally-Hosted LLMs (Ollama)", level: "Production", context: "Self-hosted Qwen 8B inference gateway, token streaming, rate throttling" },
      { name: "Amazon Bedrock / OpenAI SDK", level: "Production", context: "Enterprise cloud LLM integrations, embeddings, and RAG architectures" }
    ]
  },
  {
    category: "Cloud, DevOps & Observability",
    items: [
      { name: "AWS", level: "Production", context: "EC2, S3, IAM, ECS, Lambda, DynamoDB" },
      { name: "Docker", level: "Production", context: "Multi-stage reproducible container builds, minimal production images" },
      { name: "Kubernetes", level: "Working Knowledge", context: "Deployment manifests, pod scaling, services, ingress routing" },
      { name: "CI/CD (GitHub Actions)", level: "Production", context: "Automated test runs, Sonar analysis, Docker image publishing" },
      { name: "Prometheus & Grafana", level: "Production", context: "System telemetry, latency percentiles (p50/p95/p99), GPU/memory monitoring" },
      { name: "JProfiler", level: "Production", context: "JVM heap profiling, object allocation inspection, G1GC tuning" }
    ]
  },
  {
    category: "Databases & Storage",
    items: [
      { name: "MySQL", level: "Production", context: "InnoDB schema design, indexing, transaction isolation levels, query optimization" },
      { name: "Oracle Database", level: "Production", context: "Enterprise data models, PL/SQL stored routines, high-volume batch queries" },
      { name: "MongoDB", level: "Production", context: "Document storage, flexible metadata schemas, aggregation pipelines" },
      { name: "Vector Databases", level: "Working Knowledge", context: "Vector embeddings, semantic search, cosine similarity retrieval" }
    ]
  }
];

export const AWARDS_AND_ACHIEVEMENTS: Achievement[] = [
  {
    title: "Solved 700+ Advanced Algorithmic Problems",
    organization: "LeetCode",
    badge: "700+ Solved",
    description: "Demonstrated deep mastery of data structures, graph theory, dynamic programming, sliding window, and concurrency patterns.",
    link: "https://leetcode.com"
  },
  {
    title: "Awarded for Production Readiness",
    organization: "IBM Watsonx Hackathon",
    badge: "Production Winner",
    description: "Engineered an AI-powered HR workflow automation agent utilizing Watsonx and autonomous task execution.",
  },
  {
    title: "AI-Assisted AMS Ticketing Platform",
    organization: "GitHub Copilot Hackathon",
    badge: "Hackathon Finalist",
    description: "Built an intelligent application maintenance and ticket routing system integrating LLMs with issue tracking.",
  },
  {
    title: "AIR 6893 in Global Competitive Contests",
    organization: "Google CodeJam, Kick Start & Facebook HackerCup",
    badge: "AIR 6893",
    description: "Competed internationally in high-stakes timed algorithmic problem solving contests (2021).",
  },
  {
    title: "Ranked 5th Nationally",
    organization: "TELOS 2020 National Programming Contest",
    badge: "5th Rank",
    description: "Top 5 national rank out of thousands of participating collegiate programmers across India.",
  },
  {
    title: "100+ Rated Competitive Programming Contests",
    organization: "Codeforces & CodeChef",
    badge: "100+ Contests",
    description: "Consistent participant in live timed algorithmic contests, strengthening high-pressure problem solving.",
  },
  {
    title: "Pre-Placement Offer (PPO)",
    organization: "Infosys – HackWithInfy Advantage Round",
    badge: "National Finalist PPO",
    description: "Cleared the elite Advantage Round of HackWithInfy national competitive programming championship.",
  },
  {
    title: "Open-Source Contributor",
    organization: "Hacktoberfest",
    badge: "7+ Merged PRs",
    description: "Contributed code and optimizations to multiple open-source repositories with 7+ successfully merged pull requests.",
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Generative AI Leader Certification",
    issuer: "Google Cloud",
    year: "Verified",
    linkText: "Google Cloud"
  },
  {
    name: "Oracle Fusion AI Agent Studio Certified Developer Professional - Rel 1",
    issuer: "Oracle",
    year: "Verified",
    linkText: "Oracle"
  },
  {
    name: "Oracle Data Platform 2025 Foundations Associate",
    issuer: "Oracle",
    year: "2025",
    linkText: "Oracle"
  },
  {
    name: "Oracle AI Vector Search Professional",
    issuer: "Oracle",
    year: "Verified",
    linkText: "Oracle"
  },
  {
    name: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    year: "Verified",
    linkText: "Anthropic"
  }
];

export const EDUCATION = {
  degree: "Bachelor of Technology, Computer Science and Engineering",
  institution: "Dr. B.C Roy Engineering College",
  location: "Durgapur, West Bengal",
  period: "August 2019 – June 2023",
  cgpa: "8.87 / 10.0",
  secondary: {
    title: "Intermediate (Class XII)",
    institution: "Vidya Vihar Residential School",
    location: "Purnea, Bihar",
    period: "April 2016 – March 2018",
    score: "77.8%"
  }
};

export const AI_RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: "domingos-cacm-2012",
    title: "A Few Useful Things to Know About Machine Learning",
    authors: "Pedro Domingos",
    year: 2012,
    phase: "Phase 1–2: Classical ML",
    venue: "Communications of the ACM (CACM)",
    url: "https://homes.cs.washington.edu/~pedrod/papers/cacm12.pdf",
    takeaway: "Mastering practical ML truths: generalization is key, data alone is not enough without induction bias, overfitting has many faces, and feature engineering is the hardest leverage point.",
    engineeringApplication: "Essential foundational mindset for avoiding data leakage and understanding model generalization boundaries in production.",
    tag: "ML Foundations"
  },
  {
    id: "alexnet-nips-2012",
    title: "ImageNet Classification with Deep Convolutional Neural Networks (AlexNet)",
    authors: "Alex Krizhevsky, Ilya Sutskever, Geoffrey E. Hinton",
    year: 2012,
    phase: "Phase 2: Deep Learning Core",
    venue: "NeurIPS (NIPS 2012)",
    url: "https://papers.nips.cc/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf",
    takeaway: "Ignited the modern deep learning era with GPU parallelization, non-saturating ReLU activations, and dropout regularization across 60M parameters.",
    engineeringApplication: "Understanding GPU hardware acceleration and parallel tensor computing paradigms that modern LLM inference clusters depend upon.",
    tag: "Deep Learning"
  },
  {
    id: "batch-norm-icml-2015",
    title: "Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift",
    authors: "Sergey Ioffe, Christian Szegedy",
    year: 2015,
    phase: "Phase 2: Deep Learning Core",
    venue: "ICML 2015 / arXiv:1502.03167",
    url: "https://arxiv.org/abs/1502.03167",
    takeaway: "Normalizes layer inputs across mini-batches, stabilizing activation distributions and enabling significantly higher learning rates without vanishing/exploding gradients.",
    engineeringApplication: "Informs layer normalization (LayerNorm / RMSNorm) implementations used in modern Transformer block architectures.",
    tag: "Optimization"
  },
  {
    id: "resnet-cvpr-2016",
    title: "Deep Residual Learning for Image Recognition (ResNet)",
    authors: "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun",
    year: 2015,
    phase: "Phase 2: Deep Learning Core",
    venue: "CVPR 2016 / arXiv:1512.03385",
    url: "https://arxiv.org/abs/1512.03385",
    takeaway: "Introduced residual skip connections (H(x) = F(x) + x) allowing training of arbitrarily deep networks (152+ layers) by directly mitigating vanishing gradient bottlenecks.",
    engineeringApplication: "Skip connections remain the fundamental building block in every modern Transformer attention and MLP block.",
    tag: "Architecture"
  },
  {
    id: "transformer-neurips-2017",
    title: "Attention Is All You Need (The Transformer Paper)",
    authors: "Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin",
    year: 2017,
    phase: "Phase 3: Transformers & LLMs",
    venue: "NeurIPS 2017 / arXiv:1706.03762",
    url: "https://arxiv.org/abs/1706.03762",
    takeaway: "Eliminated recurrence and convolution entirely in favor of multi-head self-attention: Attention(Q, K, V) = softmax(QK^T / sqrt(d_k))V. Highly parallelizable across tensor cores.",
    engineeringApplication: "Non-negotiable foundational reading for all LLM engineering, KV-caching optimizations, token context window engineering, and attention mechanism implementations.",
    tag: "Transformer Milestone"
  },
  {
    id: "bert-naacl-2018",
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    authors: "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova",
    year: 2018,
    phase: "Phase 3: Transformers & LLMs",
    venue: "NAACL 2019 / arXiv:1810.04805",
    url: "https://arxiv.org/abs/1810.04805",
    takeaway: "Introduced bidirectional representations pre-trained with Masked Language Modeling (MLM) and Next Sentence Prediction (NSP), transforming modern NLP embedding quality.",
    engineeringApplication: "Directly underpins modern vector embedding models, semantic search retrieval, and vector database indexing used in enterprise RAG pipelines.",
    tag: "Bidirectional Embeddings"
  },
  {
    id: "gpt-series-openai",
    title: "Improving Language Understanding by Generative Pre-Training (GPT & GPT-2)",
    authors: "Radford, Narasimhan, Salimans, Sutskever (OpenAI)",
    year: 2018,
    phase: "Phase 3: Transformers & LLMs",
    venue: "OpenAI Research Paper / Technical Report",
    url: "https://arxiv.org/abs/1911.02116",
    takeaway: "Pioneered the autoregressive decoder-only Transformer lineage, proving that unsupervised pre-training on broad web corpora yields strong zero-shot and few-shot capabilities at scale.",
    engineeringApplication: "The architecture behind generative LLMs powering modern autonomous agent workflows, instruction following, and reasoning supervisor models.",
    tag: "Decoder-Only Lineage"
  }
];

