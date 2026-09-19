import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Terminal, ShieldCheck, Globe } from 'lucide-react';
import { PERSONAL_DATA } from '../data/portfolioData';

interface FooterProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  onOpenTelemetry?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal, onOpenResume, onOpenTelemetry }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#07080b] py-12 text-slate-400 font-mono-code text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center font-bold text-xs text-emerald-400">
              KK
            </div>
            <div>
              <p className="font-display font-semibold text-sm text-white">
                {PERSONAL_DATA.name}
              </p>
              <p className="text-[11px] text-slate-500">
                {PERSONAL_DATA.specialization}
              </p>
            </div>
          </div>

          {/* Center Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400">
            <a href="#what-i-do" className="hover:text-white transition-colors">Systems</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#ai-engineering" className="hover:text-white transition-colors">AI Engineering</a>
            <a href="#system-design" className="hover:text-white transition-colors">System Design</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#lab" className="hover:text-white transition-colors">Lab</a>
            <button onClick={onOpenResume} className="hover:text-emerald-300 transition-colors">Resume</button>
            <button onClick={onOpenTerminal} className="hover:text-emerald-300 transition-colors flex items-center gap-1">
              <Terminal className="w-3 h-3 text-emerald-400" />
              CLI
            </button>
            {onOpenTelemetry && (
              <button onClick={onOpenTelemetry} className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer">
                <Globe className="w-3 h-3 text-emerald-400" />
                Global Reach
              </button>
            )}
          </div>

          {/* Right Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Built with precision: React 19, TypeScript, Tailwind CSS, Motion</span>
          </div>
          <div>
            <span>© {new Date().getFullYear()} Kunal Kumar • Bengaluru, Karnataka</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
