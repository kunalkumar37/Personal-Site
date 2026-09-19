import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, X } from 'lucide-react';
import { PERSONAL_DATA, FEATURED_PROJECTS, WORK_EXPERIENCE, TECH_STACK_MATRIX } from '../data/portfolioData';

interface TerminalProps {
  onClose?: () => void;
  isInline?: boolean;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC<TerminalProps> = ({ onClose, isInline = false }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'whoami',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-emerald-400 font-semibold">{PERSONAL_DATA.name}</p>
          <p>{PERSONAL_DATA.title} — {PERSONAL_DATA.specialization}</p>
          <p className="text-slate-400 text-xs">Bengaluru, Karnataka • Infosys • 3+ Years Building Distributed Systems</p>
        </div>
      ),
    },
    {
      command: 'focus',
      output: (
        <div className="space-y-1 text-slate-300 text-xs font-mono-code">
          <p className="text-emerald-300 font-medium">1. High-Concurrency Backend Architecture (Java 17 / Spring Boot)</p>
          <p className="text-emerald-300 font-medium">2. Distributed Systems & Event Streaming (Apache Kafka / Redis)</p>
          <p className="text-emerald-300 font-medium">3. Agentic AI & Supervisor Orchestration (MCP / Tool Calling / Ollama)</p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-emerald-400 font-medium">Available commands:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 font-mono-code pt-1">
              <span><strong className="text-white">whoami</strong> — Identity</span>
              <span><strong className="text-white">focus</strong> — Engineering focus</span>
              <span><strong className="text-white">projects</strong> — Production work</span>
              <span><strong className="text-white">experience</strong> — Work history</span>
              <span><strong className="text-white">stack</strong> — Technical tools</span>
              <span><strong className="text-white">metrics</strong> — Performance wins</span>
              <span><strong className="text-white">location</strong> — Regional visitor presence</span>
              <span><strong className="text-white">contact</strong> — Get in touch</span>
              <span><strong className="text-white">clear</strong> — Reset screen</span>
            </div>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="space-y-1 text-slate-300 text-xs">
            <p className="text-emerald-400 font-semibold">{PERSONAL_DATA.name}</p>
            <p>{PERSONAL_DATA.summarySupporting}</p>
          </div>
        );
        break;

      case 'focus':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-emerald-300 font-medium">Core Technical Identity:</p>
            <p className="text-slate-400">
              Java 17, Spring Boot, Microservices, Kafka, Redis, Distributed Locks, Idempotency, Snowflake IDs,
              Multi-Agent Orchestration, MCP, Tool Calling, Ollama Qwen 8B.
            </p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs">
            {FEATURED_PROJECTS.map((p) => (
              <div key={p.id} className="border-l-2 border-emerald-500/40 pl-2">
                <p className="font-semibold text-white">{p.title} <span className="text-[10px] text-emerald-400">({p.status})</span></p>
                <p className="text-slate-400">{p.tagline}</p>
                <p className="text-slate-500 text-[10px] font-mono-code">{p.stack.slice(0, 4).join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="space-y-2 text-xs">
            {WORK_EXPERIENCE.map((exp) => (
              <div key={exp.company} className="border-l-2 border-white/20 pl-2">
                <p className="font-semibold text-white">{exp.role} @ {exp.company}</p>
                <p className="text-slate-400 text-[11px]">{exp.period} • {exp.location}</p>
                <p className="text-slate-300 text-[11px] mt-0.5">{exp.summary}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'stack':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            {TECH_STACK_MATRIX.map((cat) => (
              <p key={cat.category} className="text-[11px]">
                <strong className="text-emerald-400 font-mono-code">{cat.category}:</strong>{' '}
                {cat.items.map((i) => i.name).join(', ')}
              </p>
            ))}
          </div>
        );
        break;

      case 'metrics':
        output = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-emerald-400 font-medium">Verified Engineering Benchmarks:</p>
            <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-[11px]">
              <li>API p95 latency improved from 900ms to 540ms via N+1 tuning and G1GC</li>
              <li>Database read latency reduced from ~180ms to &lt;50ms using Redis caching</li>
              <li>Zero duplicate-booking incidents across load tests with 1,000+ concurrent requests</li>
              <li>Batch processing throughput boosted by 35% via ForkJoinPool parallel pipelines</li>
              <li>Automated test coverage elevated from &lt;30% to 92% using TDD and Mockito</li>
              <li>700+ LeetCode problems solved across algorithms, graphs & dynamic programming</li>
            </ul>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <p>Email: <a href={`mailto:${PERSONAL_DATA.email}`} className="text-emerald-400 hover:underline">{PERSONAL_DATA.email}</a></p>
            <p>Phone: <span className="text-white">{PERSONAL_DATA.phone}</span></p>
            <p>LinkedIn: <a href={PERSONAL_DATA.linkedin} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">{PERSONAL_DATA.linkedinHandle}</a></p>
            <p>GitHub: <a href={PERSONAL_DATA.github} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">{PERSONAL_DATA.githubHandle}</a></p>
          </div>
        );
        break;

      case 'location':
      case 'telemetry':
      case 'geo':
        output = (
          <div className="space-y-1.5 text-xs text-slate-300 font-mono-code bg-black/40 p-3 rounded-lg border border-emerald-500/20">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Visitor Presence Active</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Connection verified across global edge network.
            </p>
            <div className="pt-1 text-[11px] text-slate-300 space-y-0.5">
              <p>• Ingress: <span className="text-emerald-400 font-medium">Secure Edge Gateway</span></p>
              <p>• Privacy: <span className="text-white">IP Anonymized • Zero Tracking</span></p>
              <p>• Analytics: Click <strong className="text-emerald-300">Global Reach</strong> in the header to view worldwide activity.</p>
            </div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        output = (
          <p className="text-rose-400 text-xs">
            Command not recognized: &quot;{cmd}&quot;. Type <span className="underline cursor-pointer" onClick={() => setInput('help')}>help</span> for available commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput('');
  };

  return (
    <div className={`rounded-xl border border-white/[0.08] bg-[#090b10] font-mono-code text-xs text-slate-200 overflow-hidden shadow-2xl ${isInline ? 'w-full' : 'max-w-2xl mx-auto'}`}>
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e1117] border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-slate-400 text-[11px] ml-2 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
            kunal@engine:~$ (zsh)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400 hidden sm:inline-block">Type &apos;help&apos; for commands</span>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-white/[0.05]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 space-y-3 max-h-72 overflow-y-auto" onClick={() => inputRef.current?.focus()}>
        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-white">{item.command}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}

        {/* Input line */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help', 'projects', 'metrics'..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-slate-600 font-mono-code text-xs"
            autoFocus
          />
          <button type="submit" className="text-slate-500 hover:text-emerald-400">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>

        <div ref={terminalEndRef} />
      </div>

      {/* Shortcut bar */}
      <div className="px-4 py-2 bg-[#0a0d13] border-t border-white/[0.04] flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
        <span>Quick:</span>
        {['whoami', 'projects', 'metrics', 'stack', 'contact'].map((c) => (
          <button
            key={c}
            onClick={() => {
              setInput(c);
              inputRef.current?.focus();
            }}
            className="px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] hover:text-emerald-300 transition-colors"
          >
            ${c}
          </button>
        ))}
      </div>
    </div>
  );
};
