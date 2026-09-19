import React, { useState } from 'react';
import { Server, Cpu, Brain, Cloud, Building2, CheckCircle2, ChevronRight, Layers, ArrowRight } from 'lucide-react';
import { SYSTEMS_CAPABILITIES } from '../data/portfolioData';

export const SystemsWhatIDo: React.FC = () => {
  const [activeSystemId, setActiveSystemId] = useState<string>(SYSTEMS_CAPABILITIES[0].id);

  const getSystemIcon = (id: string) => {
    switch (id) {
      case 'backend-systems':
        return <Server className="w-5 h-5 text-emerald-400" />;
      case 'distributed-systems':
        return <Layers className="w-5 h-5 text-emerald-400" />;
      case 'ai-engineering':
        return <Brain className="w-5 h-5 text-emerald-400" />;
      case 'cloud-infrastructure':
        return <Cloud className="w-5 h-5 text-emerald-400" />;
      case 'enterprise-engineering':
        return <Building2 className="w-5 h-5 text-emerald-400" />;
      default:
        return <Cpu className="w-5 h-5 text-emerald-400" />;
    }
  };

  const activeCapability = SYSTEMS_CAPABILITIES.find((c) => c.id === activeSystemId) || SYSTEMS_CAPABILITIES[0];

  return (
    <section id="what-i-do" className="py-20 border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2 font-mono-code text-xs text-emerald-400 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Core Competencies
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
            How I Think About Engineering Systems
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
            Engineering maturity is measured by systems architecture, concurrency safeguards, and fault tolerance — not a static list of keyword logos.
          </p>
        </div>

        {/* Master-Detail Systems Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Systems Navigation Cards */}
          <div className="lg:col-span-5 space-y-2.5">
            {SYSTEMS_CAPABILITIES.map((cap) => {
              const isSelected = cap.id === activeSystemId;
              return (
                <div
                  key={cap.id}
                  onClick={() => setActiveSystemId(cap.id)}
                  className={`cursor-pointer p-4 rounded-xl border text-left transition-all duration-200 ${
                    isSelected
                      ? 'bg-white/[0.05] border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.08)]'
                      : 'bg-white/[0.015] border-white/[0.06] hover:bg-white/[0.03] hover:border-white/[0.12]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border ${
                        isSelected
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : 'bg-white/[0.03] border-white/[0.08] text-slate-400'
                      }`}>
                        {getSystemIcon(cap.id)}
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-sm sm:text-base text-white">
                          {cap.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                          {cap.lead}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${isSelected ? 'rotate-90 text-emerald-400' : ''}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: In-Depth Architectural Inspection */}
          <div className="lg:col-span-7 rounded-2xl border border-white/[0.08] bg-[#0c0e14] p-6 sm:p-7 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  {getSystemIcon(activeCapability.id)}
                </div>
                <div>
                  <span className="text-[11px] font-mono-code text-emerald-400 uppercase tracking-wider block">
                    SYSTEM SPECIFICATION
                  </span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                    {activeCapability.title}
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium">
              {activeCapability.lead}
            </p>

            {/* Architecture Principles / Concrete Evidence */}
            <div className="space-y-3 mb-6">
              <span className="font-mono-code text-[11px] text-slate-400 uppercase tracking-wider block">
                Production Implementation Details
              </span>
              {activeCapability.points.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-normal">{pt}</span>
                </div>
              ))}
            </div>

            {/* Technology Primitives */}
            <div className="pt-4 border-t border-white/[0.06]">
              <span className="font-mono-code text-[11px] text-slate-400 uppercase tracking-wider block mb-2.5">
                Core Stack & Protocols
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeCapability.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300 font-mono-code text-xs hover:border-emerald-500/30 hover:text-emerald-300 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
