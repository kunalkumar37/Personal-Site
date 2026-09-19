import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SystemsWhatIDo } from './components/SystemsWhatIDo';
import { ProjectsSection } from './components/ProjectsSection';
import { AiEngineeringSection } from './components/AiEngineeringSection';
import { ResearchPapersSection } from './components/ResearchPapersSection';
import { SystemDesignSection } from './components/SystemDesignSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EngineeringLabSection } from './components/EngineeringLabSection';
import { TechStackSection } from './components/TechStackSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { BackendLocationTelemetryModal } from './components/BackendLocationTelemetryModal';
import { KunalChatBot, ChatBotFloatingTrigger } from './components/KunalChatBot';
import { sendVisitTelemetry } from './services/telemetry';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Send telemetry ping on initial visit
  useEffect(() => {
    sendVisitTelemetry(window.location.pathname);
  }, []);

  // Global keyboard shortcut to toggle terminal (`~` or `Ctrl+K`)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#08090c] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Navigation */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenTelemetry={() => setIsTelemetryOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* Hero Section with Interactive Architecture Trace / CLI */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* 1. What I Do: Systems Thinking */}
        <SystemsWhatIDo />

        {/* 2. Technical Case Studies: Featured Projects */}
        <ProjectsSection />

        {/* 3. AI Engineering: Multi-Agent Hierarchy & MCP */}
        <AiEngineeringSection />

        {/* 4. Academic & Theoretical Foundations: Seminal Research Papers */}
        <ResearchPapersSection />

        {/* 5. Distributed Systems & System Design */}
        <SystemDesignSection />

        {/* 5. Engineering Experience Timeline */}
        <ExperienceSection />

        {/* 6. Engineering Lab: Active Prototypes & Math Forces */}
        <EngineeringLabSection />

        {/* 7. Structured Technical Matrix */}
        <TechStackSection />

        {/* 8. Competitive Programming & Honors */}
        <AchievementsSection />

        {/* 9. Contact & Dispatch */}
        <ContactSection onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenTelemetry={() => setIsTelemetryOpen(true)}
      />

      {/* Verified Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Backend Location Telemetry Modal */}
      <BackendLocationTelemetryModal
        isOpen={isTelemetryOpen}
        onClose={() => setIsTelemetryOpen(false)}
      />

      {/* Floating CLI Terminal Modal */}
      {isTerminalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
          onClick={() => setIsTerminalOpen(false)}
        >
          <div className="w-full max-w-2xl cursor-default" onClick={(e) => e.stopPropagation()}>
            <InteractiveTerminal onClose={() => setIsTerminalOpen(false)} />
          </div>
        </div>
      )}

      {/* Floating AI Chat Trigger Button */}
      <ChatBotFloatingTrigger
        isOpen={isChatOpen}
        onClick={() => setIsChatOpen(true)}
      />

      {/* Interactive AI Chatbot Window */}
      <KunalChatBot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenResume={() => {
          setIsChatOpen(false);
          setIsResumeOpen(true);
        }}
        onOpenTerminal={() => {
          setIsChatOpen(false);
          setIsTerminalOpen(true);
        }}
      />
    </div>
  );
}
