import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  X,
  Minus,
  ChevronUp,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
  MessageSquare,
  Cpu,
  Mail,
  ExternalLink,
  Terminal,
  FileText,
  Code2
} from 'lucide-react';
import { PERSONAL_DATA } from '../data/portfolioData';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
}

const INITIAL_SUGGESTIONS = [
  'What are Kunal\'s core systems strengths?',
  'Explain the HyperVector-Engine architecture',
  'What research papers does Kunal study?',
  'Is Kunal open to Staff/Lead engineering roles?',
  'What tech stack & databases does he scale?'
];

const INITIAL_GREETING: ChatMessage = {
  id: 'greeting',
  role: 'assistant',
  content: `Hello! I'm **Kunal AI**, an interactive systems assistant for **Kunal Kumar**—Staff Backend & AI Systems Engineer based in Bengaluru, India.

I can answer in-depth questions about:
- **Distributed Systems & Concurrency**: Kafka partitioning, Raft consensus, zero-downtime microservices.
- **AI / LLM Systems**: GPU memory virtualization, vLLM / TensorRT-LLM pipelines, vector search (AVX-512).
- **Core Projects**: *HyperVector-Engine*, *CortexFlow-Orchestrator*, *ChronosDB*, *NeuroAST-Verifier*.
- **Foundational Research & Theory**: Seminal AI literature Kunal studies (Transformers, AlexNet, ResNet, Batch Normalization) and how he applies theoretical insights to production systems.
- **Hiring & Consulting**: Background, compensation expectations, availability, and direct contact details.

Select a quick topic below or ask anything!`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  suggestions: INITIAL_SUGGESTIONS
};

interface KunalChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume?: () => void;
  onOpenTerminal?: () => void;
}

export function KunalChatBot({
  isOpen,
  onClose,
  onOpenResume,
  onOpenTerminal
}: KunalChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend !== undefined ? textToSend : inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_user`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send conversation history to backend Express API proxy
      const payloadMessages = updatedMessages
        .filter((m) => m.id !== 'greeting')
        .map((m) => ({
          role: m.role,
          content: m.content
        }));

      // If only greeting was there, send userMessage
      if (payloadMessages.length === 0) {
        payloadMessages.push({ role: 'user', content: text });
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: payloadMessages })
      });

      if (!response.ok) {
        throw new Error(`Server status ${response.status}`);
      }

      const data = await response.json();
      const replyContent = data?.reply || 'I could not generate a response. Please try again.';

      // Generate contextual suggestions based on topic
      let dynamicSuggestions: string[] = [];
      const lower = replyContent.toLowerCase();
      if (lower.includes('hypervector') || lower.includes('cortexflow') || lower.includes('project')) {
        dynamicSuggestions = ['Compare HyperVector vs CortexFlow', 'What papers does he study in Research?', 'Send Kunal an email'];
      } else if (lower.includes('raft') || lower.includes('kv cache') || lower.includes('research') || lower.includes('paper')) {
        dynamicSuggestions = ['What research papers does Kunal study?', 'Show me the Engineering Lab demo', 'Download Kunal\'s Resume'];
      } else if (lower.includes('hiring') || lower.includes('contact') || lower.includes('salary') || lower.includes('role')) {
        dynamicSuggestions = ['Open Resume Viewer', 'Draft email to Kunal', 'Check GitHub repositories'];
      } else {
        dynamicSuggestions = ['Tell me about his distributed Kafka stack', 'What is his experience at Stealth AI Lab?', 'Contact Kunal'];
      }

      const assistantMessage: ChatMessage = {
        id: `msg_${Date.now()}_assistant`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: dynamicSuggestions
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.warn('[Kunal Chatbot] Fallback triggered:', err);
      // Fallback friendly reply
      const fallbackReply: ChatMessage = {
        id: `msg_${Date.now()}_fallback`,
        role: 'assistant',
        content: `I'm currently running in low-latency offline mode. **Kunal Kumar** is a **Staff Backend & AI Systems Engineer** in Bengaluru specializing in:

- **Distributed Systems**: Kafka event architectures, high-throughput microservices in Go & Rust, and Raft consensus.
- **AI Infrastructure**: KV Cache memory eviction for long-context LLMs, vLLM/TRT-LLM orchestration, and high-performance vector retrieval.
- **Direct Contact**: Feel free to reach him directly at **[${PERSONAL_DATA.email}](mailto:${PERSONAL_DATA.email})** or inspect his verified projects below.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['View Resume', 'Email Kunal', 'Explore Projects']
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_GREETING]);
    inputRef.current?.focus();
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderFormattedContent = (content: string) => {
    // Simple markdown line formatter
    const lines = content.split('\n');
    return (
      <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed break-words font-sans">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1.5" />;
          }

          // Bullet item
          if (line.startsWith('- ') || line.startsWith('* ')) {
            const cleanLine = line.substring(2);
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-emerald-400 mt-1 text-[10px] select-none">•</span>
                <span>{parseInlineFormatting(cleanLine)}</span>
              </div>
            );
          }

          // Numbered list item (e.g. "1. ")
          const matchNum = line.match(/^(\d+)\.\s+(.*)/);
          if (matchNum) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="font-mono-code text-[11px] text-emerald-400 select-none font-semibold">
                  {matchNum[1]}.
                </span>
                <span>{parseInlineFormatting(matchNum[2])}</span>
              </div>
            );
          }

          // Heading ###
          if (line.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-semibold text-white pt-1 text-xs sm:text-sm text-emerald-300">
                {parseInlineFormatting(line.replace('### ', ''))}
              </h4>
            );
          }
          if (line.startsWith('## ')) {
            return (
              <h3 key={idx} className="font-semibold text-white pt-1 text-sm sm:text-base text-cyan-300 border-b border-white/[0.08] pb-1">
                {parseInlineFormatting(line.replace('## ', ''))}
              </h3>
            );
          }

          return <p key={idx}>{parseInlineFormatting(line)}</p>;
        })}
      </div>
    );
  };

  const parseInlineFormatting = (text: string) => {
    // Replace markdown bold, backticks, and links
    const parts = [];
    let remaining = text;
    let keyIndex = 0;

    while (remaining.length > 0) {
      // Check for code backtick `code`
      const codeMatch = remaining.match(/`([^`]+)`/);
      // Check for bold **bold**
      const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
      // Check for link [text](url)
      const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

      // Find which comes first
      const matches = [
        codeMatch ? { type: 'code', index: codeMatch.index!, text: codeMatch[1], full: codeMatch[0] } : null,
        boldMatch ? { type: 'bold', index: boldMatch.index!, text: boldMatch[1], full: boldMatch[0] } : null,
        linkMatch ? { type: 'link', index: linkMatch.index!, text: linkMatch[1], url: linkMatch[2], full: linkMatch[0] } : null
      ].filter(Boolean).sort((a, b) => a!.index - b!.index);

      if (matches.length === 0) {
        parts.push(remaining);
        break;
      }

      const first = matches[0]!;
      if (first.index > 0) {
        parts.push(remaining.substring(0, first.index));
      }

      if (first.type === 'code') {
        parts.push(
          <code key={keyIndex++} className="px-1.5 py-0.5 rounded bg-white/[0.08] text-emerald-300 font-mono-code text-[11px] border border-white/[0.08]">
            {first.text}
          </code>
        );
      } else if (first.type === 'bold') {
        parts.push(
          <strong key={keyIndex++} className="font-semibold text-white">
            {first.text}
          </strong>
        );
      } else if (first.type === 'link') {
        parts.push(
          <a
            key={keyIndex++}
            href={first.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors font-medium inline-flex items-center gap-0.5"
          >
            {first.text}
            <ExternalLink className="w-2.5 h-2.5 inline" />
          </a>
        );
      }

      remaining = remaining.substring(first.index + first.full.length);
    }

    return parts;
  };

  if (!isOpen) return null;

  return (
    <aside
      id="kunal-chatbot-window"
      aria-label="Kunal AI Assistant"
      className={`fixed z-50 bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[380px] ${
        isMinimized ? 'h-[52px]' : 'h-[490px] max-h-[80vh]'
      } bg-[#0c0e17]/98 border border-white/[0.14] rounded-2xl shadow-[0_12px_45px_rgba(0,0,0,0.85)] backdrop-blur-xl flex flex-col overflow-hidden transition-all duration-300 ease-out origin-bottom-right`}
    >
      {/* Header Bar */}
      <div
        onClick={() => isMinimized && setIsMinimized(false)}
        className={`px-3.5 py-2.5 bg-[#0f121a] border-b border-white/[0.08] flex items-center justify-between gap-2 shrink-0 ${
          isMinimized ? 'cursor-pointer hover:bg-[#131722]' : ''
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-indigo-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
              <Bot className="w-4 h-4 text-emerald-400 animate-pulse" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#0f121a]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-display font-semibold text-xs sm:text-sm text-white truncate">
                Kunal AI
              </h3>
              <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                Gemini 3.8
              </span>
            </div>
            <p className="text-[10px] font-mono-code text-slate-400 truncate">
              {isMinimized ? 'Click to expand' : 'Staff Systems & AI Assistant'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
          {!isMinimized && (
            <button
              onClick={handleClearChat}
              title="Reset conversation"
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? 'Expand window' : 'Minimize to corner'}
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            {isMinimized ? <ChevronUp className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onClose}
            title="Close chat"
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Action Shortcuts Bar */}
          <div className="px-3 py-1.5 bg-[#090b10] border-b border-white/[0.04] flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono-code shrink-0 scrollbar-none">
            <span className="text-slate-500 uppercase tracking-wider font-semibold text-[9px]">Quick:</span>
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.06] transition-colors whitespace-nowrap cursor-pointer"
              >
                <FileText className="w-2.5 h-2.5 text-emerald-400" />
                Resume
              </button>
            )}

            {onOpenTerminal && (
              <button
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.06] transition-colors whitespace-nowrap cursor-pointer"
              >
                <Terminal className="w-2.5 h-2.5 text-cyan-400" />
                CLI
              </button>
            )}

            <a
              href="#research"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.06] transition-colors whitespace-nowrap"
            >
              <Cpu className="w-2.5 h-2.5 text-purple-400" />
              Research
            </a>

            <a
              href={`mailto:${PERSONAL_DATA.email}?subject=Engineering%20Opportunity%20-%20Kunal%20Kumar`}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.06] transition-colors whitespace-nowrap ml-auto"
            >
              <Mail className="w-2.5 h-2.5 text-emerald-400" />
              Email
            </a>
          </div>

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 font-sans scroll-smooth text-xs">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div className="flex items-center gap-1.5 px-1 text-[9px] font-mono-code text-slate-400">
                    <span className="font-semibold text-slate-300">
                      {isUser ? 'You' : 'Kunal AI'}
                    </span>
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => copyToClipboard(msg.id, msg.content)}
                        title="Copy response"
                        className="p-0.5 rounded text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors ml-0.5 cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-2.5 h-2.5" />
                        )}
                      </button>
                    )}
                  </div>

                  <div
                    className={`max-w-[92%] rounded-xl p-3 text-xs shadow-sm ${
                      isUser
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-xs border border-emerald-400/30'
                        : 'bg-[#131722] text-slate-200 rounded-tl-xs border border-white/[0.08]'
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    ) : (
                      renderFormattedContent(msg.content)
                    )}
                  </div>

                  {/* Suggestions / Follow-ups */}
                  {!isUser && msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-0.5 pl-0.5 max-w-[95%]">
                      {msg.suggestions.map((sug, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleSendMessage(sug)}
                          disabled={isLoading}
                          className="text-[10px] font-mono-code text-slate-300 hover:text-emerald-300 bg-white/[0.04] hover:bg-emerald-500/10 border border-white/[0.08] hover:border-emerald-500/30 px-2 py-0.5 rounded-full transition-all text-left flex items-center gap-1 disabled:opacity-50 cursor-pointer"
                        >
                          <Sparkles className="w-2 h-2 text-emerald-400 shrink-0" />
                          <span>{sug}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex flex-col items-start space-y-1">
                <div className="flex items-center gap-1.5 px-1 text-[9px] font-mono-code text-slate-400">
                  <span className="font-semibold text-emerald-400">Kunal AI</span>
                  <span>Thinking...</span>
                </div>
                <div className="bg-[#131722] border border-white/[0.08] rounded-xl rounded-tl-xs p-3 flex items-center gap-2.5">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
                  </div>
                  <span className="text-[11px] font-mono-code text-slate-400">
                    Thinking...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input & Dispatch Area */}
          <div className="p-2.5 bg-[#0e1119] border-t border-white/[0.08] shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-1.5 relative"
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask Kunal AI about systems, papers, code..."
                className="flex-1 bg-black/40 border border-white/[0.12] focus:border-emerald-500/50 rounded-lg px-2.5 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 resize-none max-h-24 transition-colors font-sans"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-8 h-8 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-white/[0.06] disabled:text-slate-600 text-black font-bold flex items-center justify-center transition-colors shadow-sm shrink-0 cursor-pointer disabled:cursor-not-allowed"
                title="Send message (Enter)"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex items-center justify-between pt-1.5 px-0.5 text-[9px] font-mono-code text-slate-500">
              <span>Gemini 3.8 Flash</span>
              <span>Press Enter ↵</span>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}

/**
 * Floating trigger button component to easily open the chat bot from any location on the page.
 */
export function ChatBotFloatingTrigger({
  onClick,
  isOpen
}: {
  onClick: () => void;
  isOpen: boolean;
}) {
  if (isOpen) return null;

  return (
    <button
      onClick={onClick}
      id="floating-chat-trigger"
      aria-label="Ask Kunal AI"
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 pl-3.5 pr-4 py-2.5 rounded-full bg-[#0d1117] hover:bg-[#131822] border border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer"
    >
      <div className="relative flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/30 transition-colors">
          <Bot className="w-4 h-4 text-emerald-400 animate-pulse" />
        </div>
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0d1117]" />
      </div>

      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className="font-display font-semibold text-xs text-white group-hover:text-emerald-300 transition-colors">
            Ask Kunal AI
          </span>
          <Sparkles className="w-3 h-3 text-emerald-400" />
        </div>
        <span className="text-[10px] font-mono-code text-slate-400 hidden sm:inline">
          Systems & AI Assistant
        </span>
      </div>
    </button>
  );
}
