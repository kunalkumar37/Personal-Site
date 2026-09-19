import React, { useState } from 'react';
import { ArrowDown, FileText, Github, Linkedin, Mail, Terminal as TerminalIcon, Cpu, Activity, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { PERSONAL_DATA } from '../data/portfolioData';
import { SystemDiagramVisualizer } from './SystemDiagramVisualizer';
import { InteractiveTerminal } from './InteractiveTerminal';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [heroMode, setHeroMode] = useState<'architecture' | 'terminal' | 'profile'>('architecture');

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial-fade pointer-events-none -z-10" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-radial-subtle pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow & Status */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono-code text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Bengaluru, India</span>
            <span className="text-slate-400">•</span>
            <span className="text-emerald-300 font-medium">Software Engineer @ Infosys</span>
            <span className="text-slate-400">•</span>
            <a
              href="https://temporary-brisk-gust-tmk1i3y.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 hover:text-sky-300 hover:underline inline-flex items-center gap-1 font-semibold"
            >
              <span>Founder @ SiliconWeave</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-sky-500/20 text-sky-300 rounded border border-sky-500/30">Early Build</span>
            </a>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/[0.06] border border-emerald-500/20 text-xs font-mono-code text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Open to High-Impact Backend & Systems Roles</span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="max-w-4xl space-y-5">
          <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
            I build systems that scale — and products worth using.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl">
            {PERSONAL_DATA.summarySupporting}
          </p>

          {/* Quick Engineering Proof Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 font-mono-code text-xs">
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <span className="text-emerald-400 font-bold block text-sm">3+ Years</span>
              <span className="text-slate-300 text-[11px]">Production Systems</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <span className="text-emerald-400 font-bold block text-sm">700+ Solved</span>
              <span className="text-slate-300 text-[11px]">Algorithms & LeetCode</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <span className="text-emerald-400 font-bold block text-sm">0 Oversell</span>
              <span className="text-slate-300 text-[11px]">Distributed Redis Locks</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <span className="text-emerald-400 font-bold block text-sm">10+ AI Agents</span>
              <span className="text-slate-300 text-[11px]">MCP & Orchestration</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              id="hero-explore-projects-btn"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#08090c] font-semibold text-xs font-mono-code transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)]"
            >
              <span>Explore Technical Case Studies</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onOpenResume}
              id="hero-view-resume-btn"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 hover:text-white font-mono-code text-xs font-medium transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>View Resume</span>
            </button>

            <a
              href="#research"
              id="hero-research-btn"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 hover:text-white font-mono-code text-xs font-medium transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Research Papers (7)</span>
            </a>

            <a
              href="#contact"
              id="hero-contact-btn"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 hover:text-white font-mono-code text-xs font-medium transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Get in Touch</span>
            </a>

            <div className="flex items-center gap-1.5 pl-2 sm:border-l border-white/[0.1]">
              <a
                href={PERSONAL_DATA.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_DATA.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Framed Engineering Workbench Container — Styled to match the screenshot's precise periwinkle border */}
        <div className="mt-12 lg:mt-14">
          <div className="relative rounded-2xl border-2 border-[#818cf8] bg-[#0c0e14]/95 shadow-[0_0_45px_rgba(129,140,248,0.2)] p-4 sm:p-6 transition-all duration-300">
            {/* Corner Decorative Tech Notches */}
            <div className="absolute -top-[5px] -left-[5px] w-2.5 h-2.5 bg-[#818cf8] rounded-sm" />
            <div className="absolute -top-[5px] -right-[5px] w-2.5 h-2.5 bg-[#818cf8] rounded-sm" />
            <div className="absolute -bottom-[5px] -left-[5px] w-2.5 h-2.5 bg-[#818cf8] rounded-sm" />
            <div className="absolute -bottom-[5px] -right-[5px] w-2.5 h-2.5 bg-[#818cf8] rounded-sm" />

            {/* Top Controller Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#818cf8] animate-pulse" />
                <span className="text-xs font-mono-code font-semibold text-[#818cf8] uppercase tracking-wider">
                  Engineering Systems Frame
                </span>
                <span className="text-[11px] font-mono-code text-slate-400 hidden md:inline">
                  • Production Architecture & Interactive CLI
                </span>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="inline-flex rounded-lg bg-white/[0.04] p-1 border border-white/[0.08] gap-1">
                <button
                  onClick={() => setHeroMode('architecture')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono-code transition-all cursor-pointer ${
                    heroMode === 'architecture'
                      ? 'bg-[#818cf8]/20 text-[#a5b4fc] border border-[#818cf8]/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Live System Trace</span>
                </button>

                <button
                  onClick={() => setHeroMode('terminal')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono-code transition-all cursor-pointer ${
                    heroMode === 'terminal'
                      ? 'bg-[#818cf8]/20 text-[#a5b4fc] border border-[#818cf8]/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <TerminalIcon className="w-3.5 h-3.5" />
                  <span>Interactive CLI</span>
                </button>

                <button
                  onClick={() => setHeroMode('profile')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono-code transition-all cursor-pointer ${
                    heroMode === 'profile'
                      ? 'bg-[#818cf8]/20 text-[#a5b4fc] border border-[#818cf8]/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Engineer & Founder Profile</span>
                </button>
              </div>
            </div>

            {/* Active Display Panel */}
            {heroMode === 'architecture' && <SystemDiagramVisualizer />}

            {heroMode === 'terminal' && <InteractiveTerminal isInline={true} />}

            {heroMode === 'profile' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-2 sm:p-4 text-slate-200">
                {/* Left: Portrait photo card */}
                <div className="md:col-span-4 flex justify-center">
                  <div className="relative group w-full max-w-[240px] rounded-xl bg-white/[0.03] p-2 border border-white/[0.08] shadow-lg">
                    <img
                      src="/kunal-profile.jpg"
                      alt="Kunal Kumar"
                      className="w-full h-auto rounded-lg object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="mt-2 text-center">
                      <p className="font-display font-bold text-white text-sm">Kunal Kumar</p>
                      <p className="font-mono-code text-[11px] text-emerald-400">Software Engineer @ Infosys</p>
                    </div>
                  </div>
                </div>

                {/* Right: Technical Highlights & Links */}
                <div className="md:col-span-8 space-y-4 font-mono-code text-xs">
                  <div>
                    <h4 className="font-display font-bold text-lg text-white font-sans">
                      Distributed Systems Builder & Founder
                    </h4>
                    <p className="text-slate-300 text-xs font-sans mt-1 leading-relaxed">
                      3+ years building mission-critical backend microservices, distributed concurrency locks, and enterprise LLM agent supervisors. Founder of SiliconWeave, a private distributed inference network.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-[#818cf8] font-bold block">Primary Stack</span>
                      <span className="text-slate-400">Java 17, Spring Boot, Kafka, Redis</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-sky-400 font-bold block">Startup</span>
                      <a
                        href="https://temporary-brisk-gust-tmk1i3y.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-300 hover:underline"
                      >
                        SiliconWeave (Early Build) →
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={onOpenResume}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs cursor-pointer transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Verified Resume</span>
                    </button>
                    <a
                      href="#projects"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 hover:text-white text-xs transition-colors"
                    >
                      <span>Explore Projects</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
