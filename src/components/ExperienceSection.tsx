import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Cpu, Layers, ShieldCheck, Activity } from 'lucide-react';
import { WORK_EXPERIENCE, Experience } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>(WORK_EXPERIENCE[0].company);
  const [activeTab, setActiveTab] = useState<'what-i-did' | 'systems' | 'problems' | 'achievements'>('what-i-did');

  const currentExp = WORK_EXPERIENCE.find((e) => e.company === selectedCompany) || WORK_EXPERIENCE[0];

  return (
    <section id="experience" className="py-20 border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2 font-mono-code text-xs text-emerald-400 uppercase tracking-wider">
            <Briefcase className="w-4 h-4" />
            Track Record & Career
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
            Engineering Experience
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
            Delivering high-concurrency microservices, tuning JVM heap allocations under real load, and building autonomous agent workflows across enterprise codebases.
          </p>
        </div>

        {/* Experience Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Company Timeline Selector */}
          <div className="lg:col-span-4 space-y-3">
            {WORK_EXPERIENCE.map((exp) => {
              const isSelected = exp.company === selectedCompany;
              return (
                <div
                  key={exp.company}
                  onClick={() => {
                    setSelectedCompany(exp.company);
                    setActiveTab('what-i-did');
                  }}
                  className={`cursor-pointer p-4 sm:p-5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-white/[0.05] border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display font-bold text-base sm:text-lg text-white">
                      {exp.company}
                    </span>
                    {exp.isCurrent && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                        CURRENT
                      </span>
                    )}
                  </div>

                  <p className="font-mono-code text-xs text-emerald-300 font-medium mb-2">
                    {exp.role}
                  </p>

                  <div className="flex flex-col gap-1 text-[11px] font-mono-code text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Experience Inspector */}
          <div className="lg:col-span-8 rounded-2xl border border-white/[0.08] bg-[#0c0e14] p-6 sm:p-8 space-y-6">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/[0.06]">
              <div>
                <h3 className="font-display font-bold text-xl text-white">
                  {currentExp.role} @ <span className="text-emerald-400">{currentExp.company}</span>
                </h3>
                <p className="text-xs font-mono-code text-slate-400 mt-1">
                  {currentExp.period} • {currentExp.location}
                </p>
              </div>

              {/* View Tabs */}
              <div className="flex flex-wrap gap-1 bg-white/[0.03] p-1 rounded-lg border border-white/[0.06]">
                {[
                  { id: 'what-i-did', label: 'Work Log' },
                  { id: 'problems', label: 'Problems Solved' },
                  { id: 'systems', label: 'Systems Touched' },
                  { id: 'achievements', label: 'Key Metrics' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-1 rounded text-xs font-mono-code transition-colors ${
                      activeTab === tab.id
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab 1: What I worked on */}
            {activeTab === 'what-i-did' && (
              <div className="space-y-3">
                <span className="font-mono-code text-xs text-slate-400 uppercase tracking-wider block">
                  Responsibilities & Implementation
                </span>
                <ul className="space-y-2.5">
                  {currentExp.whatIWorkedOn.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tab 2: Problems Solved */}
            {activeTab === 'problems' && (
              <div className="space-y-3">
                <span className="font-mono-code text-xs text-slate-400 uppercase tracking-wider block">
                  Technical Hard Problems Solved
                </span>
                <div className="space-y-3">
                  {currentExp.problemsSolved.map((prob, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs sm:text-sm text-slate-300">
                      {prob}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Systems Touched */}
            {activeTab === 'systems' && (
              <div className="space-y-3">
                <span className="font-mono-code text-xs text-slate-400 uppercase tracking-wider block">
                  Architectural Boundaries & Systems
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentExp.systemsTouched.map((sys, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs font-mono-code text-emerald-300">
                      <Cpu className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{sys}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Achievements & Metrics */}
            {activeTab === 'achievements' && (
              <div className="space-y-3">
                <span className="font-mono-code text-xs text-slate-400 uppercase tracking-wider block">
                  Measured Performance & Quality Metrics
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentExp.keyEngineeringAchievements.map((ach, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-emerald-950/15 border border-emerald-500/20 text-xs sm:text-sm text-emerald-200 font-medium">
                      {ach}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Footer */}
            <div className="pt-4 border-t border-white/[0.06]">
              <span className="font-mono-code text-[11px] text-slate-400 uppercase tracking-wider block mb-2">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentExp.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-xs font-mono-code text-slate-300"
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
