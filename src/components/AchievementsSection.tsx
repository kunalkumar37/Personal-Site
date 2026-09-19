import React from 'react';
import { Award, Trophy, GraduationCap, CheckCircle2, ExternalLink, Code2 } from 'lucide-react';
import { AWARDS_AND_ACHIEVEMENTS, CERTIFICATIONS, EDUCATION } from '../data/portfolioData';

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="py-20 border-t border-white/[0.06] relative bg-[#090a0e]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2 font-mono-code text-xs text-emerald-400 uppercase tracking-wider">
            <Trophy className="w-4 h-4" />
            Proof of Work & Milestones
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
            Competitive Programming & Honors
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
            A rigorous foundation in algorithm complexity, national-level programming contests, hackathon honors, and verified enterprise cloud certifications.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Awards & Competitive Programming */}
          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono-code text-xs text-slate-400 uppercase tracking-wider block">
              Competitive Programming & Hackathons
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AWARDS_AND_ACHIEVEMENTS.map((ach, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-white/[0.06] bg-[#0c0e14] hover:border-emerald-500/30 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                        {ach.badge}
                      </span>
                      <span className="text-[10px] font-mono-code text-slate-400">
                        {ach.organization}
                      </span>
                    </div>

                    <h4 className="font-display font-semibold text-sm text-white mb-1">
                      {ach.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications & Education */}
          <div className="lg:col-span-5 space-y-6">
            {/* Certifications */}
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c0e14] space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-mono-code text-xs">
                <Award className="w-4 h-4" />
                <span>VERIFIED PROFESSIONAL CERTIFICATIONS</span>
              </div>

              <div className="space-y-2.5">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start justify-between gap-2 hover:border-emerald-500/20 transition-colors"
                  >
                    <div>
                      <h5 className="font-display font-semibold text-xs sm:text-sm text-white">
                        {cert.name}
                      </h5>
                      <span className="text-[11px] font-mono-code text-slate-400 block mt-0.5">
                        Issuer: <span className="text-emerald-300">{cert.issuer}</span>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono-code text-slate-400 px-2 py-0.5 rounded bg-white/[0.04]">
                      {cert.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c0e14] space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-mono-code text-xs">
                <GraduationCap className="w-4 h-4" />
                <span>ACADEMIC FOUNDATION</span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono-code text-emerald-400 font-semibold">
                      CGPA: {EDUCATION.cgpa}
                    </span>
                    <span className="text-[11px] font-mono-code text-slate-400">
                      {EDUCATION.period}
                    </span>
                  </div>
                  <h5 className="font-display font-semibold text-sm text-white">
                    {EDUCATION.degree}
                  </h5>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {EDUCATION.institution} • {EDUCATION.location}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.015] border border-white/[0.04]">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-mono-code text-slate-300 font-medium">
                      Score: {EDUCATION.secondary.score}
                    </span>
                    <span className="text-[11px] font-mono-code text-slate-400">
                      {EDUCATION.secondary.period}
                    </span>
                  </div>
                  <h6 className="font-display font-medium text-xs text-white">
                    {EDUCATION.secondary.title}
                  </h6>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {EDUCATION.secondary.institution} • {EDUCATION.secondary.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
