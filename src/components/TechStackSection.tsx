import React, { useState } from 'react';
import { Cpu, Terminal, CheckCircle2, Layers } from 'lucide-react';
import { TECH_STACK_MATRIX } from '../data/portfolioData';

export const TechStackSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', ...TECH_STACK_MATRIX.map((c) => c.category)];

  const displayedGroups = selectedCategory === 'ALL'
    ? TECH_STACK_MATRIX
    : TECH_STACK_MATRIX.filter((c) => c.category === selectedCategory);

  return (
    <section id="stack" className="py-20 border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono-code text-xs text-emerald-400 uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              Technical Stack & Tooling
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
              Tools Structured by Engineering Domain
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
              No superficial logo walls. Every tool here is tied to real production microservices, distributed queues, or agentic workflows.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-white/[0.03] p-1 rounded-lg border border-white/[0.06] self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded text-xs font-mono-code transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'ALL' ? 'All Domains' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Matrix */}
        <div className="space-y-8">
          {displayedGroups.map((group) => (
            <div key={group.category} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                <h3 className="font-display font-semibold text-base sm:text-lg text-white">
                  {group.category}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="p-4 rounded-xl border border-white/[0.06] bg-[#0c0e14] hover:border-emerald-500/30 hover:bg-[#0e1118] transition-colors flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4 className="font-display font-semibold text-sm text-white">
                        {item.name}
                      </h4>
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shrink-0">
                        {item.level}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.context}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
