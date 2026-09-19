import React, { useState } from 'react';
import { GitBranch, ShieldAlert, Cpu, Database, RefreshCw, Layers, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';
import { SYSTEM_DESIGN_CASES, SystemDesignCase } from '../data/portfolioData';

export const SystemDesignSection: React.FC = () => {
  const [activeCaseId, setActiveCaseId] = useState<string>(SYSTEM_DESIGN_CASES[0].id);

  const activeCase = SYSTEM_DESIGN_CASES.find((c) => c.id === activeCaseId) || SYSTEM_DESIGN_CASES[0];

  return (
    <section id="system-design" className="py-20 border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2 font-mono-code text-xs text-emerald-400 uppercase tracking-wider">
            <GitBranch className="w-4 h-4" />
            Distributed Architecture Explorations
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
            How I Think About Systems
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
            Real systems live in a world of network partitions, race conditions, and failovers. Here is how I structure high-concurrency flows, isolate failure domains, and reason through architectural trade-offs.
          </p>
        </div>

        {/* Systems Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {SYSTEM_DESIGN_CASES.map((item) => {
            const isSelected = item.id === activeCaseId;
            return (
              <div
                key={item.id}
                onClick={() => setActiveCaseId(item.id)}
                className={`cursor-pointer p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-white/[0.05] border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded border ${
                    item.type === 'Production System'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                  }`}>
                    {item.type}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-sm text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {item.tagline}
                </p>
              </div>
            );
          })}
        </div>

        {/* Detailed Architecture Explorer */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e14] p-6 sm:p-8 space-y-8">
          {/* Header */}
          <div className="border-b border-white/[0.06] pb-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                {activeCase.title}
              </h3>
              <span className="font-mono-code text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                {activeCase.type}
              </span>
            </div>
            <p className="text-slate-300 text-sm mt-1.5 font-medium">
              {activeCase.tagline}
            </p>
          </div>

          {/* System Requirements */}
          <div>
            <span className="font-mono-code text-xs text-emerald-400 uppercase tracking-wider block mb-2.5">
              01 — System Requirements & Constraints
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeCase.requirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Data Flow */}
          <div>
            <span className="font-mono-code text-xs text-emerald-400 uppercase tracking-wider block mb-2.5">
              02 — End-to-End Execution Data Flow
            </span>
            <div className="space-y-2 p-4 rounded-xl bg-black/40 border border-white/[0.06] font-mono-code text-xs text-slate-300">
              {activeCase.dataFlow.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 py-1">
                  <span className="text-emerald-400 font-bold shrink-0">{idx + 1}.</span>
                  <span className="text-slate-200">{step.replace(/^\d+\.\s*/, '')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottlenecks vs Failure Modes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2 font-mono-code text-xs text-amber-400 font-semibold">
                <AlertTriangle className="w-4 h-4" />
                <span>Identified Bottlenecks</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                {activeCase.bottlenecks.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2 font-mono-code text-xs text-rose-400 font-semibold">
                <ShieldAlert className="w-4 h-4" />
                <span>Failure Modes & Fault Recovery</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                {activeCase.failureModes.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Architectural Trade-offs */}
          <div>
            <span className="font-mono-code text-xs text-emerald-400 uppercase tracking-wider block mb-2.5">
              03 — Architectural Trade-Off Analysis
            </span>
            <div className="space-y-3">
              {activeCase.tradeoffs.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-emerald-950/10 border border-emerald-500/20 text-xs text-slate-300 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono-code font-semibold">
                      Chosen: {item.choice}
                    </span>
                    <span className="text-slate-400 font-mono-code">vs.</span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.05] text-slate-400 font-mono-code line-through">
                      {item.alternative}
                    </span>
                  </div>
                  <p className="text-slate-200 leading-relaxed pt-1">
                    <strong className="text-emerald-300 font-mono-code">Rationale:</strong> {item.rationale}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
