import React, { useState } from 'react';
import { Brain, Cpu, ShieldCheck, CheckCircle2, ArrowDown, Activity, Sparkles, Workflow, Layers, Terminal, BookOpen, ExternalLink, Filter } from 'lucide-react';
import { AI_RESEARCH_PAPERS } from '../data/portfolioData';

export const AiEngineeringSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'evaluation' | 'mcp' | 'research'>('architecture');
  const [selectedPhase, setSelectedPhase] = useState<string>('All');

  const agentSteps = [
    {
      level: 'Input',
      name: 'User Natural Language Request',
      detail: '"Create an onboarding compliance course for Q2 engineering hires and auto-enroll them"',
      tech: 'Enterprise UI / Slack / Teams Webhook'
    },
    {
      level: 'Supervisor',
      name: 'Supervisor Agent & Intent Classifier',
      detail: 'Decomposes unstructured requests into an execution DAG; applies advanced prompt engineering to guarantee instruction adherence',
      tech: 'LLM Reasoning Engine • Dynamic Task Planner'
    },
    {
      level: 'Specialized Agents',
      name: 'Specialized Autonomous Workflow Agents',
      detail: 'Curriculum Agent (Course Builder) • Directory Agent (Employee Filter) • Enrollment Agent (Batch Registrations)',
      tech: 'Domain-Isolated Prompts • Role Constraints'
    },
    {
      level: 'Protocols & Tools',
      name: 'Model Context Protocol (MCP) & Tool Calling',
      detail: 'Standardized JSON-RPC tool contracts with strict JSON schema validation preventing parameter hallucination',
      tech: 'MCP Server • Function Calling • Guardrails'
    },
    {
      level: 'Enterprise Core',
      name: 'Enterprise Backend & Persistence',
      detail: 'Transactional commits to Oracle HCM modules, PL/SQL batch procedures, and WebSocket notification dispatch',
      tech: 'Oracle Fusion HCM • REST APIs • Spring Boot'
    }
  ];

  return (
    <section id="ai-engineering" className="py-20 border-t border-white/[0.06] relative bg-[#090b0f]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2 font-mono-code text-xs text-emerald-400 uppercase tracking-wider">
            <Brain className="w-4 h-4" />
            AI Architecture & Multi-Agent Systems
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
            Building with AI, not just using AI.
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-3xl">
            At Infosys, I architected and deployed 10+ autonomous workflow agents for Oracle HCM, built supervisor-agent routing, implemented Model Context Protocol (MCP) integrations, and built regression evaluation test harnesses for production reliability.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2 rounded-lg text-xs font-mono-code transition-all ${
              activeTab === 'architecture'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
            }`}
          >
            Supervisor Agent Hierarchy
          </button>
          <button
            onClick={() => setActiveTab('evaluation')}
            className={`px-4 py-2 rounded-lg text-xs font-mono-code transition-all ${
              activeTab === 'evaluation'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
            }`}
          >
            LLM Evaluation & Monitoring Harness
          </button>
          <button
            onClick={() => setActiveTab('mcp')}
            className={`px-4 py-2 rounded-lg text-xs font-mono-code transition-all ${
              activeTab === 'mcp'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
            }`}
          >
            Model Context Protocol (MCP) Integration
          </button>
          <button
            onClick={() => setActiveTab('research')}
            className={`px-4 py-2 rounded-lg text-xs font-mono-code transition-all flex items-center gap-1.5 ${
              activeTab === 'research'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Foundational Literature & Papers ({AI_RESEARCH_PAPERS.length})</span>
          </button>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'architecture' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Agent Flow Diagram */}
            <div className="lg:col-span-7 space-y-3">
              {agentSteps.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c0e14] hover:border-emerald-500/40 transition-colors">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-mono-code text-[10px] text-emerald-400 uppercase tracking-wider font-semibold">
                        LEVEL {idx + 1} — {step.level}
                      </span>
                      <span className="font-mono-code text-[10px] text-slate-300 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.04]">
                        {step.tech}
                      </span>
                    </div>
                    <h4 className="font-display font-semibold text-sm sm:text-base text-white">
                      {step.name}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>

                  {idx < agentSteps.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ArrowDown className="w-3.5 h-3.5 text-emerald-400/60" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Architectural Highlights Sidebar */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c0e14] space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-mono-code text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>SUPERVISOR PATTERN</span>
                </div>
                <h3 className="font-display font-bold text-lg text-white">
                  Why A Single Monolithic Prompt Fails
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Attaching dozens of tools to a single LLM prompt causes severe tool-selection confusion, catastrophic token bloat, and uncontrolled hallucinated parameters under enterprise loads.
                </p>
                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-200">
                  <strong>The Solution:</strong> The Supervisor Agent acts as an orchestrator only. It resolves intent, plans the workflow steps, and dispatches to isolated specialized agents equipped with strictly scoped schemas.
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#0c0e14] space-y-3">
                <span className="font-mono-code text-xs text-slate-300 uppercase tracking-wider block">
                  Production Impact at Infosys
                </span>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>10+ AI Workflow Agents shipped for Oracle HCM learning modules</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Zero unvalidated API mutations through JSON schema tool gating</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Real-time WebSocket event streaming to notify users of step completions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'evaluation' && (
          <div className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#0c0e14]">
            <div className="max-w-3xl mb-6">
              <span className="font-mono-code text-xs text-emerald-400 uppercase tracking-wider block mb-1">
                EVALUATION METHODOLOGY
              </span>
              <h3 className="font-display font-bold text-xl text-white mb-2">
                Automated Testing For Probabilistic Systems
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Before deploying agents to production at Infosys, I built evaluation suites testing agent behavior across hundreds of diverse edge-case prompts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono-code text-xs">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <span className="text-emerald-400 font-bold block">1. Task Completion Validation</span>
                <p className="text-slate-300 font-sans text-xs">
                  Validates whether the agent accomplished the user goal through exact state checks in Oracle HCM staging instances.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <span className="text-emerald-400 font-bold block">2. Tool Invocation Accuracy</span>
                <p className="text-slate-300 font-sans text-xs">
                  Tests that the agent invokes the exact required tool with correct strongly-typed arguments, preventing parameter drift.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <span className="text-emerald-400 font-bold block">3. Graceful Failure Handling</span>
                <p className="text-slate-300 font-sans text-xs">
                  Simulates upstream API outages and 5xx errors to verify that agents report clean diagnostic messages rather than inventing responses.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mcp' && (
          <div className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#0c0e14]">
            <div className="max-w-3xl mb-6">
              <span className="font-mono-code text-xs text-emerald-400 uppercase tracking-wider block mb-1">
                STANDARDIZED PROTOCOLS
              </span>
              <h3 className="font-display font-bold text-xl text-white mb-2">
                Model Context Protocol (MCP) in Enterprise Workflows
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Rather than writing brittle, custom API wrappers for every agent, I integrated the Model Context Protocol (MCP) to standardize tool discovery, authentication, and execution across enterprise boundaries.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] font-mono-code text-xs text-slate-300 space-y-2">
              <div className="text-emerald-400 font-semibold">// Sample MCP Tool Execution Contract</div>
              <pre className="text-slate-400 overflow-x-auto p-2 bg-black/40 rounded">
{`{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "oracle_hcm_enroll_learning_module",
    "arguments": {
      "courseId": "CRS-2026-ENG-09",
      "department": "ENGINEERING",
      "mandatoryDeadline": "2026-06-30"
    }
  }
}`}
              </pre>
              <p className="text-[11px] text-slate-400 pt-1">
                Guarantees typed parameter verification before any write operation touches the database.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'research' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#0c0e14]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 font-mono-code text-xs text-emerald-400 uppercase tracking-wider mb-1">
                    <BookOpen className="w-4 h-4" />
                    <span>Deep Learning & LLM Reading List</span>
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                    Foundational Research & Mathematical Papers
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                    A rigorous study progression through classical statistical learning, deep representation learning, and modern autoregressive & bidirectional Transformer mechanics.
                  </p>
                </div>

                {/* Phase Filter */}
                <div className="flex items-center gap-1.5 flex-wrap bg-white/[0.02] p-1.5 rounded-xl border border-white/[0.06] shrink-0">
                  <span className="text-[11px] font-mono-code text-slate-400 px-2 flex items-center gap-1">
                    <Filter className="w-3 h-3 text-emerald-400" />
                    Phase:
                  </span>
                  {['All', 'Phase 1–2: Classical ML', 'Phase 2: Deep Learning Core', 'Phase 3: Transformers & LLMs'].map((phase) => (
                    <button
                      key={phase}
                      onClick={() => setSelectedPhase(phase)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono-code transition-colors ${
                        selectedPhase === phase
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      {phase === 'All' ? 'All (7)' : phase.split(':')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Papers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {AI_RESEARCH_PAPERS.filter(
                  (paper) => selectedPhase === 'All' || paper.phase === selectedPhase
                ).map((paper) => (
                  <div
                    key={paper.id}
                    className="p-5 rounded-xl border border-white/[0.08] bg-[#090b0f] hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Meta header */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono-code font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {paper.phase}
                        </span>
                        <span className="text-[10px] font-mono-code text-slate-400">
                          {paper.year} • {paper.tag}
                        </span>
                      </div>

                      {/* Paper title & link */}
                      <h4 className="font-display font-semibold text-sm sm:text-base text-white group-hover:text-emerald-300 transition-colors">
                        <a
                          href={paper.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-start gap-1.5 hover:underline"
                        >
                          <span>{paper.title}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 shrink-0 mt-1" />
                        </a>
                      </h4>

                      <p className="text-xs font-mono-code text-slate-400 mt-1">
                        {paper.authors} • <span className="text-slate-500">{paper.venue}</span>
                      </p>

                      {/* Key takeaway */}
                      <div className="mt-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-1.5">
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <strong className="text-white font-medium">Core Discovery: </strong>
                          {paper.takeaway}
                        </p>
                        <p className="text-[11px] text-emerald-400/90 font-mono-code leading-relaxed">
                          <span className="text-slate-400 font-sans font-medium">Engineering Relevance: </span>
                          {paper.engineeringApplication}
                        </p>
                      </div>
                    </div>

                    {/* Bottom paper link action */}
                    <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
                      <span className="text-[10px] font-mono-code text-slate-400">
                        Peer-reviewed / ArXiv citation
                      </span>
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono-code text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        <span>Read Paper PDF</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
