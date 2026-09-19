import React, { useEffect } from 'react';
import { X, Download, Printer, Copy, Check, ExternalLink, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { PERSONAL_DATA, WORK_EXPERIENCE, FEATURED_PROJECTS, AWARDS_AND_ACHIEVEMENTS, CERTIFICATIONS, EDUCATION } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
KUNAL KUMAR
Backend Focused Full Stack Engineer | Java, Spring Boot, AI & Cloud-Native Systems
Phone: ${PERSONAL_DATA.phone} | Email: ${PERSONAL_DATA.email}
LinkedIn: ${PERSONAL_DATA.linkedin} | GitHub: ${PERSONAL_DATA.github} | ${PERSONAL_DATA.location}

PROFESSIONAL SUMMARY
Java backend engineer with 3+ years of experience designing and delivering production-grade microservices using Spring Boot, Kafka, Redis, and Docker in enterprise environments at Infosys and Capgemini. Hands-on experience building and integrating AI systems including multi-agent orchestration, LLM API gateways, and agentic payment workflows - using Amazon Bedrock and locally-hosted models via Ollama. Proficient in OAuth2/JWT authentication, Spring Security, REST and event-driven API design, distributed locking, and AWS-based cloud infrastructure.

WORK EXPERIENCE
Software Engineer | Infosys, Bengaluru, Karnataka (March 2025 – Present)
- Designed and implemented secure authentication and authorization across 5+ Spring Boot microservices using OAuth 2.0, JWT, Spring Security, and RBAC.
- Designed and developed 10+ AI workflow agents to automate learning modules for Oracle HCM, using agentic workflows, tool/function calling, MCP-based integrations, and supervisor-agent orchestration.
- Implemented Redis caching for high-read database operations in a ticket-booking backend, reducing database read latency from ~180ms to <50ms and reducing read volume by 50% under 500+ concurrent users.
- Resolved race conditions and ticket overselling using distributed locking and idempotency keys, achieving zero duplicate-booking incidents across load tests with 1,000+ simultaneous requests.
- Improved API p95 latency from 900ms to 540ms through N+1 query optimization, HikariCP connection pooling, and G1GC tuning.
- Increased automated test coverage from <30% to 92% using JUnit 5, Mockito, and TDD; improved batch-processing throughput by 35% via ForkJoinPool.

Software Engineer | Capgemini, Noida, Uttar Pradesh (December 2023 – February 2025)
- Diagnosed JVM heap pressure causing API latency spikes by profiling with JProfiler; tuned G1GC settings, improving average response time by 20%.
- Worked on React and Spring Boot API integration across 3 product modules, defining shared OpenAPI contracts.
- Authored OpenAPI documentation and Postman test collections for 12+ REST endpoints.
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0e1117] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/[0.08] bg-[#121620] shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-sm text-white">
              Official Resume Viewer
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono-code text-slate-400">
              (Source of Truth Verified)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-mono-code transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono-code transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formatted Resume Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed bg-[#0b0d13]">
          {/* Resume Header */}
          <div className="border-b border-white/[0.08] pb-6 text-center space-y-2">
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase">
              {PERSONAL_DATA.name}
            </h1>
            <p className="font-mono-code text-xs text-emerald-400 font-medium">
              Backend Focused Full Stack Engineer | Java, Spring Boot, AI & Cloud-Native Systems
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-slate-400 font-mono-code text-[11px] pt-1">
              <span>{PERSONAL_DATA.phone}</span>
              <span>•</span>
              <a href={`mailto:${PERSONAL_DATA.email}`} className="text-emerald-300 hover:underline">{PERSONAL_DATA.email}</a>
              <span>•</span>
              <a href={PERSONAL_DATA.linkedin} target="_blank" rel="noreferrer" className="text-emerald-300 hover:underline">LinkedIn</a>
              <span>•</span>
              <a href={PERSONAL_DATA.github} target="_blank" rel="noreferrer" className="text-emerald-300 hover:underline">GitHub</a>
              <span>•</span>
              <span>{PERSONAL_DATA.location}</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-1.5">
            <h2 className="font-mono-code text-xs font-bold text-emerald-400 uppercase tracking-wider border-b border-white/[0.06] pb-1">
              Professional Summary
            </h2>
            <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed">
              Java backend engineer with 3+ years of experience designing and delivering production-grade microservices using Spring Boot, Kafka, Redis, and Docker in enterprise environments at Infosys and Capgemini. Hands-on experience building and integrating AI systems including multi-agent orchestration, LLM API gateways, and agentic payment workflows - using Amazon Bedrock and locally-hosted models via Ollama. Proficient in OAuth2/JWT authentication, Spring Security, REST and event-driven API design, distributed locking, and AWS-based cloud infrastructure.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-1.5">
            <h2 className="font-mono-code text-xs font-bold text-emerald-400 uppercase tracking-wider border-b border-white/[0.06] pb-1">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs">
              <p><strong className="text-white font-mono-code">Languages:</strong> Java 8/11/17+, JavaScript, C++</p>
              <p><strong className="text-white font-mono-code">Frontend:</strong> React.js, HTML5, CSS3, Material UI, API integration</p>
              <p><strong className="text-white font-mono-code">Backend & APIs:</strong> Spring Boot, Spring MVC, Spring Security, Hibernate, JPA, REST, gRPC, WebSockets, SSE</p>
              <p><strong className="text-white font-mono-code">Databases & Caching:</strong> MySQL, MongoDB, Oracle (PL/SQL), Redis, Vector Databases</p>
              <p><strong className="text-white font-mono-code">Distributed Systems:</strong> Apache Kafka, Kafka Streams, Distributed Locking, Idempotency, Concurrency</p>
              <p><strong className="text-white font-mono-code">Cloud & DevOps:</strong> AWS (EC2, S3, IAM, ECS, Lambda, DynamoDB), Docker, Kubernetes, CI/CD (GitHub Actions)</p>
              <p><strong className="text-white font-mono-code">Testing & Observability:</strong> JUnit 5, Mockito, TDD, Prometheus, Langsmith, Postman</p>
              <p><strong className="text-white font-mono-code">AI & LLM Integration:</strong> Amazon Bedrock, OpenAI SDK, Ollama, IBM Watsonx, LLM APIs, RAG, Agentic AI, Multi-Agent Orchestration</p>
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h2 className="font-mono-code text-xs font-bold text-emerald-400 uppercase tracking-wider border-b border-white/[0.06] pb-1">
              Work Experience
            </h2>

            {WORK_EXPERIENCE.map((exp) => (
              <div key={exp.company} className="space-y-1.5">
                <div className="flex flex-wrap items-baseline justify-between font-mono-code text-xs">
                  <span className="font-bold text-white text-sm">
                    {exp.role} <span className="font-normal text-emerald-400">| {exp.company}, {exp.location}</span>
                  </span>
                  <span className="text-slate-400 font-medium">{exp.period}</span>
                </div>

                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                  {exp.whatIWorkedOn.map((bullet, i) => (
                    <li key={i} className="leading-relaxed">
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h2 className="font-mono-code text-xs font-bold text-emerald-400 uppercase tracking-wider border-b border-white/[0.06] pb-1">
              Key Projects
            </h2>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between font-mono-code text-xs mb-1">
                  <span className="font-bold text-white">Ollama LLM API Gateway | [GitHub]</span>
                  <span className="text-slate-400">March 2026</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-300">
                  <li>Built a production-grade API gateway in Spring Boot for locally-hosted LLMs (Qwen 8B via Ollama) with multi-model request routing and API key authentication via Spring Security filter chain.</li>
                  <li>Implemented custom Token Bucket rate limiting algorithm using AtomicLong with per-key and per-model isolation.</li>
                  <li>Handled real-time LLM response streaming via Server-Sent Events (SSE) proxy using WebClient and StreamingResponseBody with sub-second first-token latency.</li>
                  <li>Built Prometheus-based telemetry and Grafana dashboards for GPU, CPU, memory and inference-service health.</li>
                </ul>
                <p className="text-[11px] font-mono-code text-slate-400 mt-1">
                  Tech: Spring Boot, Java, WebSockets, SSE, Redis, Prometheus, REST APIs, Ollama
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between font-mono-code text-xs mb-1">
                  <span className="font-bold text-white">Distributed Ticket Booking | BookMyShow Scale</span>
                  <span className="text-slate-400">November 2025</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-300">
                  <li>Designed a BookMyShow-style distributed ticketing system targeting 10,000+ concurrent booking requests with zero overselling guarantees.</li>
                  <li>Architected event-driven seat reservation flow using Kafka, ensuring reliable state transitions between reservation, payment, and confirmation stages.</li>
                  <li>Implemented Redis-based seat locking for high-concurrency access with TTL-based lock expiry to handle abandoned bookings automatically.</li>
                  <li>Used Snowflake ID generation for globally unique, time-sortable ticket identifiers across microservices.</li>
                </ul>
                <p className="text-[11px] font-mono-code text-slate-400 mt-1">
                  Tech: Spring Boot, Kafka, Redis, MySQL, Docker, Snowflake ID, Microservices, Java
                </p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-1.5">
            <h2 className="font-mono-code text-xs font-bold text-emerald-400 uppercase tracking-wider border-b border-white/[0.06] pb-1">
              Education
            </h2>
            <div className="flex flex-wrap items-baseline justify-between font-mono-code text-xs">
              <span className="text-white font-medium">
                {EDUCATION.degree} — <span className="text-slate-400">{EDUCATION.institution}, {EDUCATION.location}</span>
              </span>
              <span className="text-emerald-400 font-bold">CGPA: {EDUCATION.cgpa} ({EDUCATION.period})</span>
            </div>
          </div>

          {/* Awards & Achievements */}
          <div className="space-y-1.5">
            <h2 className="font-mono-code text-xs font-bold text-emerald-400 uppercase tracking-wider border-b border-white/[0.06] pb-1">
              Awards & Achievements
            </h2>
            <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-300">
              <li>Solved 700+ advanced algorithm and data structure problems on LeetCode.</li>
              <li>Built AI-powered HR workflow automation agent at IBM Watsonx Hackathon - awarded for production readiness.</li>
              <li>Developed AI-assisted AMS ticketing platform at GitHub Copilot Hackathon.</li>
              <li>Achieved AIR 6893 in Google CodeJam, Kick Start, and Facebook HackerCup (2021).</li>
              <li>Ranked 5th at TELOS 2020 national programming contest.</li>
              <li>Received Pre-Placement Offer (PPO) from Infosys by clearing HackWithInfy Advantage Round.</li>
              <li>Contributed to multiple open-source repositories during Hacktoberfest with 7+ merged pull requests.</li>
            </ul>
          </div>

          {/* Certifications */}
          <div className="space-y-1.5">
            <h2 className="font-mono-code text-xs font-bold text-emerald-400 uppercase tracking-wider border-b border-white/[0.06] pb-1">
              Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-300">
              {CERTIFICATIONS.map((c, idx) => (
                <p key={idx}>• {c.name} : <strong className="text-emerald-300">[{c.issuer}]</strong></p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
