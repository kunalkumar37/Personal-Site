import React from 'react';
import { FlaskConical, ArrowUpRight, Github, Sparkles, Terminal, Code2 } from 'lucide-react';
import { ENGINEERING_LAB } from '../data/portfolioData';

export const EngineeringLabSection: React.FC = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'BUILDING':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/20';
      case 'SHIPPED':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'OPEN SOURCE':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      case 'EXPERIMENT':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/20';
      default:
        return 'bg-white/[0.05] text-slate-300 border-white/[0.08]';
    }
  };

  return (
    <section id="lab" className="py-20 border-t border-white/[0.06] relative bg-[#0a0c10]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2 font-mono-code text-xs text-emerald-400 uppercase tracking-wider">
            <FlaskConical className="w-4 h-4" />
            Founder Mindset & Active Research
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
            Engineering Lab: Things I&apos;m Building
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
            Where curiosity turns into working software. Active experiments in competitive mathematics, local model gateways, protocol bridges, and concurrency harnesses.
          </p>
        </div>

        {/* Lab Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ENGINEERING_LAB.map((item) => (
            <div
              key={item.id}
              className="group rounded-xl border border-white/[0.08] bg-[#0d0f15] p-5 flex flex-col justify-between hover:border-emerald-500/40 hover:bg-[#10131b] transition-all"
            >
              <div>
                {/* Header metadata */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded-full border font-medium ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-white group-hover:text-emerald-300 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Engineering Insight / Takeaway */}
                <div className="p-3 rounded-lg bg-black/40 border border-white/[0.04] mb-4">
                  <span className="font-mono-code text-[10px] text-emerald-400 uppercase tracking-wider block font-semibold mb-0.5">
                    Lab Insight:
                  </span>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    {item.insights}
                  </p>
                </div>
              </div>

              {/* Stack & Links */}
              <div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.stack.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-[10px] font-mono-code text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs font-mono-code">
                  <span className="text-slate-500 text-[11px]">Lab Project</span>
                  {item.githubUrl && (
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-emerald-300 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
