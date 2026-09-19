import React, { useState } from 'react';
import { BookOpen, ExternalLink, Filter, Sparkles, Brain, Cpu, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { AI_RESEARCH_PAPERS, ResearchPaper } from '../data/portfolioData';

export const ResearchPapersSection: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<string>('All');

  const phases = ['All', 'Phase 1–2: Classical ML', 'Phase 2: Deep Learning Core', 'Phase 3: Transformers & LLMs'];

  const filteredPapers = selectedPhase === 'All'
    ? AI_RESEARCH_PAPERS
    : AI_RESEARCH_PAPERS.filter((paper) => paper.phase === selectedPhase);

  return (
    <section id="research" className="py-20 border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono-code text-xs text-purple-400 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              Academic & Theoretical Foundations
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
              Foundational Research Papers & Literature
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Every production AI architecture rests on fundamental mathematical and systems breakthroughs. Here is the curated progression of seminal literature I study — from classical learning theory to modern autoregressive Transformer dynamics.
            </p>
          </div>

          {/* Phase Filter Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap bg-white/[0.03] p-1.5 rounded-xl border border-white/[0.06] self-start md:self-auto">
            <span className="text-[11px] font-mono-code text-slate-400 px-2 flex items-center gap-1">
              <Filter className="w-3 h-3 text-purple-400" />
              Phase:
            </span>
            {phases.map((phase) => (
              <button
                key={phase}
                onClick={() => setSelectedPhase(phase)}
                className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-colors cursor-pointer ${
                  selectedPhase === phase
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {phase === 'All' ? `All (${AI_RESEARCH_PAPERS.length})` : phase.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="rounded-2xl border border-white/[0.08] bg-[#0c0e14] p-5 sm:p-6 flex flex-col justify-between hover:border-purple-500/40 hover:bg-[#0e1017] transition-all duration-300 shadow-md group"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono-code font-semibold border ${
                    paper.phase.includes('Phase 1')
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                      : paper.phase.includes('Phase 2')
                      ? 'bg-sky-500/10 text-sky-300 border-sky-500/20'
                      : 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {paper.phase}
                  </span>

                  <span className="text-[11px] font-mono-code text-slate-400">
                    {paper.year}
                  </span>
                </div>

                {/* Paper Title */}
                <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-purple-300 transition-colors leading-snug mb-1.5">
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline inline-flex items-start gap-1"
                  >
                    <span>{paper.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-400 shrink-0 mt-1" />
                  </a>
                </h3>

                {/* Authors and Venue */}
                <p className="text-xs font-mono-code text-slate-400 mb-4">
                  {paper.authors}
                  <span className="block text-slate-400 font-sans text-[11px] mt-0.5">
                    Venue: {paper.venue}
                  </span>
                </p>

                {/* Core Discovery */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.04] space-y-2 mb-4 text-xs">
                  <div>
                    <span className="font-mono-code text-[10px] text-purple-400 uppercase tracking-wider block font-semibold">
                      Core Discovery
                    </span>
                    <p className="text-slate-300 leading-relaxed mt-0.5">
                      {paper.takeaway}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/[0.04]">
                    <span className="font-mono-code text-[10px] text-emerald-400 uppercase tracking-wider block font-semibold">
                      Engineering Application
                    </span>
                    <p className="text-slate-300 leading-relaxed mt-0.5">
                      {paper.engineeringApplication}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[10px] font-mono-code text-slate-400 px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.04]">
                  {paper.tag}
                </span>

                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono-code text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Paper PDF</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Synthesis Callout: The Bridge from Theory to Production */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm sm:text-base text-white">
                Why Grounding in Original Literature Matters
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5 max-w-3xl leading-relaxed">
                Understanding self-attention complexity <span className="font-mono-code text-purple-300">O(N²)</span>, internal covariate shifts, and skip connection gradients directly dictates how we optimize KV caching in Ollama, shard distributed model weights, and build latency-sensitive agent pipelines.
              </p>
            </div>
          </div>

          <a
            href="#ai-engineering"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono-code text-slate-300 hover:text-white transition-colors shrink-0"
          >
            <span>See Live Multi-Agent Architecture</span>
            <ArrowUpRight className="w-3 h-3 text-purple-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
