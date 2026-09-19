import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, Github, Linkedin, FileText, Sparkles, MessageSquare, ExternalLink, Loader2, CheckCircle2 } from 'lucide-react';
import { PERSONAL_DATA } from '../data/portfolioData';

interface ContactSectionProps {
  onOpenResume: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'api' | 'fallback'>('api');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const getEmailContent = () => {
    const subject = `Engineering Discussion / Opportunity - ${formData.name || 'Visitor'}`;
    const body = `Hi Kunal,\n\n${formData.message}\n\n---\nSender: ${formData.name || 'Anonymous'}\nContact Email: ${formData.email}\nSent via kunalkumar.dev`;
    const mailtoUrl = `mailto:${PERSONAL_DATA.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSONAL_DATA.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return { subject, body, mailtoUrl, gmailUrl };
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyDraft = () => {
    const { subject, body } = getEmailContent();
    const textToCopy = `To: ${PERSONAL_DATA.email}\nSubject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Send real email directly to Kunal's inbox using FormSubmit AJAX API
      const response = await fetch(`https://formsubmit.co/ajax/${PERSONAL_DATA.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name || 'Anonymous Visitor',
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Message from ${formData.name || 'Visitor'} (kunalkumar.dev)`,
          _template: 'table'
        })
      });

      if (response.ok) {
        setDeliveryMethod('api');
      } else {
        setDeliveryMethod('fallback');
      }
    } catch (err) {
      // Network/adblocker fallback
      setDeliveryMethod('fallback');
    } finally {
      setIsSubmitting(false);
      setFormSent(true);
    }
  };

  return (
    <section id="contact" className="py-24 border-t border-white/[0.08] relative bg-[#090b0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Strong Closing Statement & Direct Channels */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono-code text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Technical Discussions & Roles</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Have a hard problem? <br />
              <span className="text-emerald-400">Let&apos;s build it.</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg">
              Whether you&apos;re architecting high-throughput backend services, untangling distributed concurrency locks, or deploying production-grade AI agent workflows — I&apos;d love to connect.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0d0f16] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider block">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${PERSONAL_DATA.email}`}
                      className="text-xs sm:text-sm font-mono-code text-white hover:text-emerald-300 transition-colors"
                    >
                      {PERSONAL_DATA.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono-code text-slate-300 hover:text-white transition-colors"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PERSONAL_DATA.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl border border-white/[0.08] bg-[#0d0f16] hover:border-white/[0.2] flex items-center gap-3 transition-colors"
                >
                  <Github className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="text-[10px] font-mono-code text-slate-400 block">GitHub</span>
                    <span className="text-xs font-mono-code text-white">/{PERSONAL_DATA.githubHandle}</span>
                  </div>
                </a>

                <a
                  href={PERSONAL_DATA.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl border border-white/[0.08] bg-[#0d0f16] hover:border-white/[0.2] flex items-center gap-3 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="text-[10px] font-mono-code text-slate-400 block">LinkedIn</span>
                    <span className="text-xs font-mono-code text-white">{PERSONAL_DATA.linkedinHandle}</span>
                  </div>
                </a>
              </div>

              <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {PERSONAL_DATA.location}
                </span>
                <span>Timezone: {PERSONAL_DATA.timezone}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Composer */}
          <div className="lg:col-span-6 rounded-2xl border border-white/[0.08] bg-[#0c0e15] p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <h3 className="font-display font-semibold text-base text-white">
                  Send a Direct Engineering Note
                </h3>
              </div>
              <span className="text-[11px] font-mono-code text-slate-400">
                Direct to Inbox
              </span>
            </div>

            {formSent ? (
              <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-white">
                    {deliveryMethod === 'api' ? 'Message Sent to Kunal!' : 'Message Ready to Dispatch'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto mt-1">
                    {deliveryMethod === 'api'
                      ? `Your message has been delivered directly to ${PERSONAL_DATA.email}. Kunal will reply to you at ${formData.email} shortly.`
                      : `Your message to ${PERSONAL_DATA.email} is prepared. Click below to launch your email client or copy the formatted text.`}
                  </p>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                  <a
                    href={getEmailContent().gmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs font-mono-code transition-colors shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Gmail Web</span>
                  </a>

                  <a
                    href={getEmailContent().mailtoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white text-xs font-mono-code transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Open in Mail App</span>
                  </a>

                  <button
                    onClick={handleCopyDraft}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-mono-code transition-colors"
                  >
                    {copiedDraft ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Draft Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Draft</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-3 border-t border-white/[0.06]">
                  <button
                    onClick={() => {
                      setFormSent(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="text-xs font-mono-code text-slate-400 hover:text-white transition-colors"
                  >
                    ← Edit or write another note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono-code">
                {/* Form header helper */}
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-1">
                  <span>Recipient: <strong className="text-emerald-400 font-medium">{PERSONAL_DATA.email}</strong></span>
                  <span className="text-[10px] text-emerald-400/90 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Direct Delivery Enabled
                  </span>
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] uppercase tracking-wider mb-1.5">
                    Your Name / Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Vance, Engineering Lead"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/[0.08] text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] uppercase tracking-wider mb-1.5">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/[0.08] text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] uppercase tracking-wider mb-1.5">
                    System Architecture / Topic / Opportunity
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe the challenge, system design, or engineering role you'd like to discuss..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/[0.08] text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onOpenResume}
                      className="text-slate-400 hover:text-emerald-300 text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Resume</span>
                    </button>
                    <span className="text-slate-600">•</span>
                    <button
                      type="button"
                      onClick={handleCopyDraft}
                      className="text-slate-400 hover:text-emerald-300 text-[11px] flex items-center gap-1 transition-colors"
                      title="Copy prefilled message"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedDraft ? 'Copied!' : 'Copy Draft'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={getEmailContent().gmailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 hover:text-white text-xs font-mono-code transition-colors"
                      title="Open directly in Gmail web composer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Gmail</span>
                    </a>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs font-mono-code transition-colors cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.2)] disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Sending to Inbox...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
