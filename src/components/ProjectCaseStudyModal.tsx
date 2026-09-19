import React, { useEffect } from 'react';
import { X, Github, ExternalLink, ArrowRight, Layers, ShieldCheck, Cpu, GitFork, Activity, CheckCircle2 } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0b0d13] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0f1219] shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono-code font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {project.category}
            </span>
            <span className="text-xs font-mono-code text-slate-400">
              {project.date} • Status: <strong className="text-white">{project.status}</strong>
            </span>
          </div>

          <button
            onClick={onClose}
            id="close-case-study-btn"
            className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-300 text-sm">
          {/* 01 — Overview */}
          <div>
            <span className="font-mono-code text-xs text-emerald-400 tracking-wider block mb-1">
              01 — OVERVIEW
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mb-2">
              {project.title}
            </h2>
            <p className="text-base text-slate-200 leading-relaxed font-normal">
              {project.tagline}
            </p>
          </div>

          {/* 02 — Problem & 03 — Why I Built It */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div>
              <span className="font-mono-code text-[11px] text-rose-400 uppercase tracking-wider block mb-1.5 font-semibold">
                02 — The Problem & Constraints
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>
            <div>
              <span className="font-mono-code text-[11px] text-emerald-400 uppercase tracking-wider block mb-1.5 font-semibold">
                03 — The Solution & Architecture
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* 04 — Architecture Pipeline Visual */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono-code text-xs text-emerald-400 tracking-wider">
                04 — ARCHITECTURE & DATA FLOW
              </span>
              <span className="text-[11px] font-mono-code text-slate-500">
                End-to-End Pipeline
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#07080b] border border-white/[0.08] space-y-3">
              <p className="font-mono-code text-xs text-slate-400 leading-relaxed border-b border-white/[0.06] pb-2">
                {project.architecture.overview}
              </p>

              {/* Node Sequence */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                {project.architecture.flowNodes.map((node, i) => (
                  <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                    <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-400 mb-1">
                      <span>Step 0{i + 1}</span>
                      {node.latency && <span className="text-emerald-400">{node.latency}</span>}
                    </div>
                    <h4 className="font-display font-semibold text-xs text-white mb-0.5">
                      {node.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {node.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 05 — Engineering Decisions & Trade-offs */}
          <div>
            <span className="font-mono-code text-xs text-emerald-400 tracking-wider block mb-3">
              05 — KEY ENGINEERING DECISIONS & TRADE-OFFS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyDecisions.map((dec, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <h4 className="font-display font-semibold text-sm text-white mb-1.5 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    {dec.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {dec.reasoning}
                  </p>
                </div>
              ))}
            </div>

            {project.architecture.tradeoffs.length > 0 && (
              <div className="mt-3 p-3.5 rounded-lg bg-emerald-950/10 border border-emerald-500/20 text-xs text-slate-300">
                <span className="font-mono-code text-emerald-400 font-semibold block mb-1 text-[11px]">
                  ARCHITECTURAL TRADE-OFF JUSTIFICATION:
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {project.architecture.tradeoffs.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 06 — Concurrency Safety & 07 — Telemetry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2 font-mono-code text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>06 — CONCURRENCY & INTEGRITY</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {project.architecture.concurrencyDetails}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2 font-mono-code text-xs text-emerald-400">
                <Activity className="w-4 h-4" />
                <span>07 — OBSERVABILITY & METRICS</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {project.architecture.telemetry}
              </p>
            </div>
          </div>

          {/* 08 — Technologies Used */}
          <div>
            <span className="font-mono-code text-xs text-slate-400 tracking-wider block mb-2">
              08 — TECHNOLOGY STACK
            </span>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono-code text-slate-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Links */}
        <div className="px-6 py-4 bg-[#0e1117] border-t border-white/[0.08] flex items-center justify-between shrink-0">
          <span className="text-xs font-mono-code text-slate-500">
            Source of Truth: Resume & GitHub Repository
          </span>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-mono-code text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Repository</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs font-mono-code transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live System</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
