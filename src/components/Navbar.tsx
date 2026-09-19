import React, { useState, useEffect } from 'react';
import { Terminal, FileText, Github, Linkedin, Mail, Menu, X, ArrowUpRight, Cpu, Radio, Globe, Bot } from 'lucide-react';
import { PERSONAL_DATA } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenTerminal?: () => void;
  onOpenTelemetry?: () => void;
  onOpenChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenTerminal, onOpenTelemetry, onOpenChat }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Systems', href: '#what-i-do' },
    { label: 'Projects', href: '#projects' },
    { label: 'AI Engineering', href: '#ai-engineering' },
    { label: 'Research', href: '#research' },
    { label: 'System Design', href: '#system-design' },
    { label: 'Experience', href: '#experience' },
    { label: 'Lab', href: '#lab' },
    { label: 'Stack', href: '#stack' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#090a0d]/90 backdrop-blur-md border-b border-white/[0.08] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Monogram */}
        <a
          href="#"
          id="nav-logo"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center font-mono-code font-bold text-sm text-emerald-400 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 transition-colors">
            KK
          </div>
          <div className="flex flex-col">
            <span className="font-display font-semibold text-sm tracking-tight text-white flex items-center gap-2">
              {PERSONAL_DATA.name}
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono-code font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Systems
              </span>
            </span>
            <span className="text-[11px] font-mono-code text-slate-400 hidden sm:block">
              Backend • Distributed • AI
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1.5 shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-mono-code text-slate-300 hover:text-white hover:bg-white/[0.06] px-3 py-1.5 rounded-full transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              id="nav-chat-btn"
              title="Chat with Kunal AI Assistant"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/[0.08] hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50 text-cyan-300 text-xs font-mono-code transition-all cursor-pointer shadow-sm group"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400 group-hover:animate-pulse" />
              <span>Ask AI</span>
            </button>
          )}

          {onOpenTelemetry && (
            <button
              onClick={onOpenTelemetry}
              id="nav-telemetry-btn"
              title="Global Visitor Activity"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/[0.06] hover:bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-xs font-mono-code transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Global Reach</span>
            </button>
          )}

          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              id="nav-terminal-btn"
              title="Open Interactive Terminal"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-mono-code transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>CLI</span>
            </button>
          )}

          <a
            href={PERSONAL_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-github-link"
            aria-label="GitHub Profile"
            className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-linkedin-link"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenResume}
            id="nav-resume-btn"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono-code font-medium transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-2">
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono-code flex items-center gap-1"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI</span>
            </button>
          )}
          <button
            onClick={onOpenResume}
            className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono-code"
          >
            Resume
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0a0c10] border-b border-white/[0.08] px-4 py-5 shadow-2xl animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono-code text-slate-300 hover:text-emerald-400 py-2 border-b border-white/[0.04]"
              >
                {link.label}
              </a>
            ))}
            {onOpenChat && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChat();
                }}
                className="flex items-center gap-2 text-sm font-mono-code text-cyan-400 py-2 border-b border-white/[0.04] text-left"
              >
                <Bot className="w-4 h-4" />
                <span>Ask Kunal AI Assistant</span>
              </button>
            )}
            {onOpenTelemetry && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTelemetry();
                }}
                className="flex items-center gap-2 text-sm font-mono-code text-emerald-400 py-2 border-b border-white/[0.04] text-left"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Global Visitor Reach</span>
              </button>
            )}
            <div className="flex items-center gap-3 pt-3 mt-1">
              <a
                href={PERSONAL_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono-code text-slate-300 hover:text-white"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={PERSONAL_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono-code text-slate-300 hover:text-white"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href={`mailto:${PERSONAL_DATA.email}`}
                className="flex items-center gap-2 text-xs font-mono-code text-slate-300 hover:text-white"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
