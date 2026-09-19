import React, { useState } from 'react';
import { ArrowUpRight, Github, Layers, ShieldCheck, Terminal, Cpu, Sparkles, BookOpen, ExternalLink, Globe } from 'lucide-react';
import { FEATURED_PROJECTS, Project } from '../data/portfolioData';
import { ProjectCaseStudyModal } from './ProjectCaseStudyModal';

export const ProjectsSection: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'AI Engineering' | 'Distributed Systems' | 'Experimental / Founder'>('ALL');

  const filteredProjects = filter === 'ALL'
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono-code text-xs text-emerald-400 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Technical Case Studies
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
              Featured Systems & Products
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
              Real code, deep architectural trade-offs, and proven concurrency mechanics — from decentralized inference networks to distributed flash-sale booking.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-white/[0.03] p-1 rounded-lg border border-white/[0.06] self-start md:self-auto">
            {(['ALL', 'AI Engineering', 'Distributed Systems', 'Experimental / Founder'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1 rounded-md text-xs font-mono-code transition-colors ${
                  filter === cat
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'ALL' ? 'All Systems' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Startup Spotlight Banner: SiliconWeave */}
        <div className="mb-10 p-6 sm:p-8 rounded-2xl border border-sky-500/30 bg-gradient-to-r from-sky-950/40 via-[#0c121e] to-[#080b12] relative overflow-hidden shadow-[0_0_40px_rgba(56,189,248,0.08)]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 font-mono-code text-xs text-sky-400 font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>Founder Venture • Active Early Build</span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-white">
                SiliconWeave – Private Distributed Inference Network
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Private LLM inference, woven from the world’s idle silicon. Connecting high-performance inference to attested machines people already own — eliminating cloud markups while strictly preserving zero-retention privacy.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 font-mono-code text-xs text-slate-400">
                <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">Decentralized Compute</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.08]">Hardware Attestation</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.08]">Zero-Retention Ephemeral Storage</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.08]">Drop-in API</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <a
                href="https://temporary-brisk-gust-tmk1i3y.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono-code font-bold text-xs transition-all shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:scale-[1.02]"
              >
                <span>Launch SiliconWeave Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => {
                  const sw = FEATURED_PROJECTS.find(p => p.id === 'silicon-weave');
                  if (sw) setActiveModalProject(sw);
                }}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 hover:text-white font-mono-code text-xs transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span>Architecture Deep-Dive</span>
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl border border-white/[0.08] bg-[#0c0e14] p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-500/40 hover:bg-[#0e1118] transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.06)]"
            >
              <div>
                {/* Card Top Metadata */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono-code font-medium bg-white/[0.04] text-slate-300 border border-white/[0.08]">
                      {project.category}
                    </span>
                    <span className="text-[11px] font-mono-code text-slate-400">
                      {project.date}
                    </span>
                  </div>

                  <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded-full border ${
                    project.status === 'SHIPPED'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : project.status === 'BUILDING'
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                      : 'bg-sky-500/10 text-sky-300 border-sky-500/20'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Title & One-line */}
                <h3 className="font-display font-bold text-xl text-white group-hover:text-emerald-300 transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {project.tagline}
                </p>

                {/* Problem vs Challenge Box */}
                <div className="space-y-2.5 p-3.5 rounded-xl bg-black/40 border border-white/[0.04] mb-5 text-xs">
                  <div>
                    <span className="font-mono-code text-[10px] text-rose-400 uppercase tracking-wider block font-semibold">
                      Core Challenge
                    </span>
                    <p className="text-slate-300 line-clamp-2 mt-0.5">
                      {project.technicalChallenge}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/[0.04]">
                    <span className="font-mono-code text-[10px] text-emerald-400 uppercase tracking-wider block font-semibold">
                      Engineered Solution
                    </span>
                    <p className="text-slate-300 line-clamp-2 mt-0.5">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.stack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono-code text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 5 && (
                    <span className="px-2 py-0.5 rounded bg-white/[0.02] text-[11px] font-mono-code text-slate-400">
                      +{project.stack.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono-code text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Inspect Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-mono-code transition-colors"
                      title="Visit Live App / Platform"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Live Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectCaseStudyModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
