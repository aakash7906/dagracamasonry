import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  RotateCcw,
  ChevronDown,
  ArrowRight,
  SendHorizontal,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { sendChatMessageToGemini, ChatMessage } from '@/services/geminiChatService';

interface ChatHistoryItem {
  role: 'user' | 'model';
  parts: { text: string }[];
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome-msg',
  sender: 'assistant',
  text: "Hello! Welcome to **Da Graca Masonry & Stone**. I'm your AI Stone Concierge — here to assist you with your masonry project, estimates, materials, and services.\n\nHow can I help you today?",
  timestamp: 'Just now',
  actions: [
    { label: 'Book 1-On-1 On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
    { label: 'Request Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
    { label: 'Explore Our Services', actionType: 'navigate', target: '/services' },
    { label: 'About Da Graca Masonry', actionType: 'navigate', target: '/about' },
  ],
};

const SUGGESTION_PILLS = [
  'Book Free Consultation',
  'What services do you offer?',
  'Bluestone Patio Cost',
  'Retaining Wall Drainage',
  'Chimney & Fireplace Repair',
  'Service Areas in NJ',
  'About Da Graca Masonry',
  'View Completed Projects',
];

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem('dagraca_chat_messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return [INITIAL_MESSAGE];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pillsContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Save messages to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('dagraca_chat_messages', JSON.stringify(messages));
    } catch {
      // Ignore
    }
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const handlePillsScroll = () => {
    if (pillsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = pillsContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(scrollLeft / maxScroll);
      }
    }
  };

  const scrollPills = (direction: 'left' | 'right') => {
    if (pillsContainerRef.current) {
      const offset = direction === 'left' ? -150 : 150;
      pillsContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        ...INITIAL_MESSAGE,
        id: `welcome-${Date.now()}`,
        timestamp: 'Just now',
      },
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    // Build chat history for Gemini API context
    const history: ChatHistoryItem[] = messages.slice(-6).map((m) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    try {
      const response = await sendChatMessageToGemini(query, history);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: 'Just now',
        actions: response.actions,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: "We are delighted to assist you with your masonry project. You can request a Quick Free Estimate or schedule a complimentary On-Site Survey with our master mason.",
        timestamp: 'Just now',
        actions: [
          { label: 'Book On-Site Survey', actionType: 'onsite_survey', target: '/contact' },
          { label: 'Quick Free Estimate', actionType: 'quick_estimate', target: '/#consultation' },
        ],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: NonNullable<ChatMessage['actions']>[number]) => {
    if (action.actionType === 'call') {
      window.location.href = action.target || 'tel:9085557866';
      return;
    }

    if (action.actionType === 'cart') {
      navigate('/cart');
      return;
    }

    if (action.target) {
      if (action.target.startsWith('/#')) {
        const hash = action.target.replace('/', '');
        if (location.pathname === '/') {
          const el = document.querySelector(hash);
          if (el) {
            const header = document.querySelector('header');
            const headerHeight = header ? header.getBoundingClientRect().height : 108;
            const elementPosition = el.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: Math.max(0, elementPosition - headerHeight),
              behavior: 'smooth',
            });
          }
        } else {
          navigate(action.target);
        }
      } else {
        navigate(action.target);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Helper to render bold markdown and bullet points cleanly
  const renderFormattedText = (text: string) => {
    const paragraphs = text.split('\n\n');

    return (
      <div className="space-y-1.5 text-stone-800 text-[12.5px] leading-relaxed">
        {paragraphs.map((p, pIdx) => {
          if (p.includes('\n•') || p.startsWith('•')) {
            const lines = p.split('\n');
            return (
              <ul key={pIdx} className="space-y-1 my-1.5 pl-1">
                {lines.map((line, lIdx) => {
                  const cleaned = line.replace(/^[•\-\*]\s*/, '').trim();
                  if (!cleaned) return null;
                  return (
                    <li key={lIdx} className="flex items-start gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#B45309] mt-1.5 shrink-0" />
                      <span>{renderInlineMarkdown(cleaned)}</span>
                    </li>
                  );
                })}
              </ul>
            );
          }

          return (
            <p key={pIdx} className="whitespace-pre-line">
              {renderInlineMarkdown(p)}
            </p>
          );
        })}
      </div>
    );
  };

  const renderInlineMarkdown = (text: string) => {
    // Basic bold parsing: **text**
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-stone-950">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Widget Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 280 }}
            className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50"
          >
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open AI Concierge Chatbot"
              className="relative w-[54px] h-[54px] sm:w-[58px] sm:h-[58px] rounded-full bg-[#1E362F] flex items-center justify-center shadow-xl shadow-stone-900/35 border-2 border-[#D6C4B2] ring-3 ring-[#E8DFD5] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#B45309]"
            >
              {/* Chat Bubble Icon with Copper Dot as shown in template image */}
              <div className="relative">
                <svg
                  className="w-6 h-6 sm:w-[26px] sm:h-[26px] text-white transition-transform group-hover:scale-105"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>

                {/* Copper / Terracotta Notification Dot in Top Right */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#C47D52] rounded-full border-2 border-[#1E362F] shadow-xs" />
              </div>

              {/* Pulsing ring effect for subtle discovery */}
              {hasUnread && (
                <span className="absolute inset-0 rounded-full border-2 border-[#C47D52] animate-ping opacity-30 pointer-events-none" />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 w-[calc(100vw-1.25rem)] sm:w-[355px] md:w-[365px] h-[78vh] sm:h-[530px] max-h-[560px] rounded-[22px] overflow-hidden shadow-2xl border border-stone-300/80 flex flex-col bg-[#F9F7F4] font-sans"
            style={{
              boxShadow:
                '0 20px 45px -10px rgba(18, 30, 26, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            }}
          >
            {/* Header: Dark Green with Avatar, Name, Reset & Chevron Down */}
            <div className="bg-[#1E362F] text-white px-3.5 py-2.5 sm:px-4 sm:py-2.5 flex items-center justify-between shrink-0 shadow-md">
              {/* Left: Avatar with Ring + Online Dot + Name */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#D8C7B5] shadow-xs bg-stone-800">
                    <img
                      src="/images/concierge-avatar.jpg"
                      alt="Da Graca AI Concierge"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        // Fallback if image path differs
                        (e.currentTarget as HTMLImageElement).src =
                          '/images/masonry/craftsman-work.png';
                      }}
                    />
                  </div>
                  {/* Active Online Indicator */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#1E362F]" />
                </div>

                <div className="flex flex-col min-w-0">
                  <h3 className="font-heading font-bold text-white text-[14.5px] sm:text-[15.5px] tracking-tight truncate leading-tight">
                    Da Graca Concierge
                  </h3>
                  <span className="text-[10px] sm:text-[10.5px] text-stone-300 font-medium truncate flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    AI Stone & Masonry Specialist
                  </span>
                </div>
              </div>

              {/* Right: Reset and Minimize Buttons */}
              <div className="flex items-center gap-0.5 shrink-0">
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="p-1 sm:p-1.5 text-stone-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize chat"
                  aria-label="Minimize chat"
                  className="p-1 sm:p-1.5 text-stone-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                >
                  <ChevronDown className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Subheader Tag Pill: Fixed at top of body */}
            <div className="bg-[#F9F7F4] pt-2 pb-0.5 text-center shrink-0">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EBE5DC] text-stone-700 text-[10.5px] font-medium border border-stone-300/60 shadow-2xs">
                <Clock className="w-3 h-3 text-[#B45309]" />
                <span>Stone Concierge · 24/7 Advisory</span>
              </div>
            </div>

            {/* Scrollable Messages Area */}
            <div className="flex-1 overflow-y-auto px-3 py-1.5 space-y-3">
              {messages.map((message) => {
                const isAssistant = message.sender === 'assistant';

                return (
                  <div
                    key={message.id}
                    className={`flex flex-col ${
                      isAssistant ? 'items-start' : 'items-end'
                    }`}
                  >
                    {isAssistant ? (
                      /* Assistant Message Card */
                      <div className="max-w-[95%] bg-white rounded-xl rounded-tl-xs p-3 sm:p-3.5 shadow-xs border border-[#ECE5DC] space-y-2.5">
                        {renderFormattedText(message.text)}

                        {/* Action buttons inside bot card */}
                        {message.actions && message.actions.length > 0 && (
                          <div className="pt-1.5 border-t border-[#F2ECE4] space-y-1.5">
                            {message.actions.map((action, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleActionClick(action)}
                                className="w-full border border-[#E5D7CA] rounded-lg px-3 py-2 bg-white hover:bg-[#FAF6F0] hover:border-[#B45309]/60 active:scale-[0.99] transition-all flex items-center justify-between text-stone-800 hover:text-[#B45309] text-[12px] font-medium group cursor-pointer shadow-2xs text-left"
                              >
                                <span className="truncate pr-1.5">{action.label}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#B45309] group-hover:translate-x-0.5 transition-all shrink-0" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      /* User Message Bubble */
                      <div className="max-w-[85%] bg-[#1E362F] text-white rounded-xl rounded-tr-xs px-3.5 py-2 text-[12.5px] leading-relaxed shadow-xs">
                        {message.text}
                      </div>
                    )}

                    {/* Timestamp */}
                    <span
                      className={`text-[9.5px] text-stone-400 mt-0.5 px-1 ${
                        isAssistant ? 'self-start' : 'self-end'
                      }`}
                    >
                      {message.timestamp}
                    </span>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex flex-col items-start">
                  <div className="bg-white rounded-xl rounded-tl-xs px-3 py-2 shadow-xs border border-[#ECE5DC] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B45309] animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#B45309] animate-bounce"
                      style={{ animationDelay: '0.15s' }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#B45309] animate-bounce"
                      style={{ animationDelay: '0.3s' }}
                    />
                  </div>
                  <span className="text-[9.5px] text-stone-400 mt-0.5 pl-1">
                    Concierge is typing...
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Pills Horizontal Carousel */}
            <div className="bg-[#F9F7F4] border-t border-[#ECE5DC]/70 px-2 pt-1.5 pb-1 shrink-0">
              <div className="relative flex items-center">
                {/* Optional Left scroll arrow on touch/desktop */}
                <button
                  onClick={() => scrollPills('left')}
                  className="hidden sm:flex text-stone-400 hover:text-stone-700 p-0.5 shrink-0 cursor-pointer"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {/* Horizontal scroll pills */}
                <div
                  ref={pillsContainerRef}
                  onScroll={handlePillsScroll}
                  className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-1 scroll-smooth flex-1"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {SUGGESTION_PILLS.map((pill, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(pill)}
                      disabled={isLoading}
                      className="bg-white border border-[#DDD3C7] text-stone-800 hover:border-[#B45309] hover:text-[#B45309] active:scale-95 text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap shadow-2xs transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                    >
                      {pill}
                    </button>
                  ))}
                </div>

                {/* Optional Right scroll arrow */}
                <button
                  onClick={() => scrollPills('right')}
                  className="hidden sm:flex text-stone-400 hover:text-stone-700 p-0.5 shrink-0 cursor-pointer"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Delicate Scroll Track Indicator Bar (matching template image) */}
              <div className="flex items-center justify-center gap-1 pt-1 pb-0.5">
                <span className="text-[8px] text-stone-400 leading-none select-none">‹</span>
                <div className="w-20 h-0.5 bg-[#E3D9CD] rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-[#B89476] rounded-full transition-all duration-150"
                    style={{
                      width: '35%',
                      transform: `translateX(${scrollProgress * 185}%)`,
                    }}
                  />
                </div>
                <span className="text-[8px] text-stone-400 leading-none select-none">›</span>
              </div>
            </div>

            {/* Bottom Input Area */}
            <div className="p-2 sm:p-2.5 bg-[#F9F7F4] flex items-center gap-1.5 border-t border-[#ECE5DC]/60 shrink-0">
              <div className="flex-1 rounded-xl border border-[#C59B75] bg-white px-3 py-2 shadow-2xs focus-within:ring-2 focus-within:ring-[#B45309]/30 transition-all flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about stonework, patios, chimneys, estimates..."
                  disabled={isLoading}
                  className="w-full bg-transparent text-[12.5px] text-stone-900 placeholder:text-stone-400 placeholder:text-[11.5px] focus:outline-none disabled:opacity-50"
                />
              </div>

              {/* Send Button */}
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className={`w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                  input.trim() && !isLoading
                    ? 'bg-[#1E362F] hover:bg-[#152822] text-white shadow-md active:scale-95 cursor-pointer'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                <SendHorizontal className="w-4 h-4 -rotate-12 translate-x-0.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}