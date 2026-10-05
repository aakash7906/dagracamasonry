import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  RotateCcw,
  ChevronDown,
  ArrowRight,
  SendHorizontal,
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
  text: "Hello! Welcome to **Da Graca Masonry & Stone**. I’m your AI assistant, here to help with your masonry and stonework needs. How can I assist you today?",
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

  // Focus input when opened & ESC key listener
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
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
        text: "I'd be happy to help with your project! Would you like a quick estimate or an in-person site survey?",
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
      <div className="space-y-1.5 text-stone-800 text-[11px] sm:text-[12.5px] leading-relaxed break-words">
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
                      <span className="h-1.5 w-1.5 rounded-full bg-stone-700 mt-1.5 shrink-0" />
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
          <strong key={index} className="font-semibold text-gray-950">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="sm:hidden fixed inset-0 z-40 bg-stone-950/40 backdrop-blur-2xs"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Floating Widget Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 280 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2.5 pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)]"
          >
            {/* Discovery Pill Label on Desktop */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              onClick={() => setIsOpen(true)}
              className="hidden md:flex items-center px-3.5 py-1.5 bg-white/95 backdrop-blur-md text-stone-800 text-xs font-semibold rounded-full border border-amber-200/90 shadow-xl shadow-amber-950/10 cursor-pointer hover:bg-white hover:border-amber-500 hover:text-stone-950 hover:scale-105 active:scale-95 transition-all select-none"
            >
              <span>Ask Me</span>
            </motion.div>

            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open AI Concierge Chatbot"
              className="relative w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-full bg-gradient-to-tr from-amber-700 via-amber-600 to-amber-500 flex items-center justify-center shadow-xl shadow-amber-600/35 border-2 border-white ring-4 ring-amber-100 hover:ring-amber-200 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400"
            >
              {/* Chat Bubble Icon with Dot matching template */}
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

                {/* Notification Dot in Top Right */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-300 rounded-full border-2 border-white shadow-xs" />
              </div>

              {/* Pulsing ring effect for subtle discovery */}
              {hasUnread && (
                <span className="absolute inset-0 rounded-full border-2 border-amber-400 animate-ping opacity-35 pointer-events-none" />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Window Modal - Responsive for all screens */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="fixed z-50 flex flex-col bg-white font-sans overflow-hidden border border-stone-200/90 shadow-2xl
              right-2.5 bottom-2.5 w-[65vw] h-[60dvh] max-h-[60dvh] rounded-lg
              sm:right-5 sm:bottom-5 sm:w-[380px] md:w-[395px] sm:h-[560px] sm:max-h-[min(620px,calc(100dvh-4.5rem))] sm:rounded-xl"
            style={{
              boxShadow:
                '0 20px 50px -12px rgba(217, 119, 6, 0.22), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            }}
          >
            {/* Header: Clean White with Subtle Border & Brand Badges */}
            <div className="bg-white text-stone-900 px-2.5 py-2 sm:px-4 sm:py-3.5 flex items-center justify-between shrink-0 border-b border-stone-100 shadow-2xs">
              {/* Left: Avatar with Ring + Online Dot + Name */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-amber-200 sm:border-2 shadow-xs bg-amber-50 ring-1 sm:ring-2 ring-amber-100/60">
                    <img
                      src="/images/concierge-avatar.jpg"
                      alt="Da Graca AI Concierge"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          '/images/masonry/craftsman-work.png';
                      }}
                    />
                  </div>
                  {/* Active Online Indicator */}
                  <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 rounded-full ring-1.5 sm:ring-2 ring-white shadow-xs" />
                </div>

                <div className="flex flex-col min-w-0">
                  <h3 className="font-heading font-extrabold text-stone-900 text-[11.5px] sm:text-[15px] tracking-tight truncate leading-tight flex items-center gap-1">
                    Da Graca Assistant
                    <span className="hidden xs:inline-block px-1 sm:px-1.5 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 text-[8px] sm:text-[9px] font-bold rounded-sm tracking-wide uppercase">
                      AI
                    </span>
                  </h3>
                  <span className="text-[8.5px] sm:text-[10.5px] text-stone-500 font-medium truncate flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse shrink-0" />
                    <span className="truncate">AI Stone Specialist</span>
                  </span>
                </div>
              </div>

              {/* Right: Reset and Minimize Buttons */}
              <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="p-1 sm:p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize chat"
                  aria-label="Minimize chat"
                  className="p-1 sm:p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
                >
                  <ChevronDown className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
                </button>
              </div>
            </div>

            {/* Scrollable Messages Area */}
            <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-2 sm:py-3 space-y-2 sm:space-y-3 bg-white overscroll-contain">
              {messages.map((message) => {
                const isAssistant = message.sender === 'assistant';

                return (
                  <div
                    key={message.id}
                    className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'
                      }`}
                  >
                    {isAssistant ? (
                      /* Assistant Message Card */
                      <div className="max-w-[96%] sm:max-w-[92%] bg-[#FAF8F5] rounded-xl sm:rounded-2xl rounded-tl-xs p-2 sm:p-3.5 shadow-2xs border border-[#EFEBE4] space-y-1.5 sm:space-y-2.5">
                        {renderFormattedText(message.text)}

                        {/* Action buttons inside bot card */}
                        {message.actions && message.actions.length > 0 && (
                          <div className="pt-1.5 border-t border-amber-200/50 space-y-1 sm:space-y-1.5">
                            {message.actions.map((action, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleActionClick(action)}
                                className="w-full border border-stone-200 hover:border-amber-500/60 bg-white hover:bg-amber-50/50 rounded-lg sm:rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 text-left flex items-center justify-between text-stone-800 hover:text-stone-950 text-[10px] sm:text-[12px] font-medium transition-all group/btn shadow-2xs cursor-pointer active:scale-[0.99]"
                              >
                                <span className="truncate pr-1 font-medium">{action.label}</span>
                                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-stone-400 group-hover/btn:text-amber-700 group-hover/btn:translate-x-0.5 transition-all shrink-0" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      /* User Message Bubble */
                      <div className="max-w-[88%] sm:max-w-[85%] bg-stone-100 border border-stone-200/90 text-stone-900 rounded-xl sm:rounded-2xl rounded-tr-xs px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-[12.5px] leading-relaxed shadow-xs">
                        {message.text}
                      </div>
                    )}

                    {/* Timestamp */}
                    <span
                      className={`text-[8.5px] sm:text-[9.5px] text-stone-400 mt-0.5 px-0.5 ${isAssistant ? 'self-start' : 'self-end'
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
                  <div className="bg-[#FAF8F5] rounded-xl rounded-tl-xs px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-2xs border border-[#EFEBE4] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce"
                      style={{ animationDelay: '0.15s' }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce"
                      style={{ animationDelay: '0.3s' }}
                    />
                  </div>
                  <span className="text-[8.5px] sm:text-[9.5px] text-stone-500 mt-0.5 pl-0.5">
                    Concierge is typing...
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Pills Horizontal Carousel */}
            <div className="bg-white border-t border-stone-100 px-1.5 sm:px-3 pt-1.5 sm:pt-2 pb-1 sm:pb-1.5 shrink-0">
              <div className="relative flex items-center">
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
                  className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5 sm:px-1 scroll-smooth flex-1 overscroll-x-contain"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {SUGGESTION_PILLS.map((pill, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(pill)}
                      disabled={isLoading}
                      className="bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200/80 text-stone-800 hover:text-stone-950 active:scale-95 text-[9.5px] sm:text-[11px] font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full whitespace-nowrap shadow-2xs transition-all cursor-pointer shrink-0 disabled:opacity-50"
                    >
                      {pill}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => scrollPills('right')}
                  className="hidden sm:flex text-stone-400 hover:text-stone-700 p-0.5 shrink-0 cursor-pointer"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Delicate Scroll Track Indicator Bar */}
              <div className="flex items-center justify-center gap-1 pt-0.5 sm:pt-1 pb-0.5">
                <span className="text-[7px] sm:text-[8px] text-stone-300 leading-none select-none">‹</span>
                <div className="w-12 sm:w-20 h-0.5 bg-stone-100 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-amber-600 rounded-full transition-all duration-150"
                    style={{
                      width: '35%',
                      transform: `translateX(${scrollProgress * 185}%)`,
                    }}
                  />
                </div>
                <span className="text-[7px] sm:text-[8px] text-stone-300 leading-none select-none">›</span>
              </div>
            </div>

            {/* Bottom Input Area: Warm Amber Accent & Send Button */}
            <div className="p-1.5 sm:p-2.5 pb-[max(0.4rem,env(safe-area-inset-bottom))] bg-white flex flex-col gap-1 border-t border-stone-100 shrink-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <div className="flex-1 rounded-lg sm:rounded-xl border border-stone-300 focus-within:border-amber-600 focus-within:ring-2 focus-within:ring-amber-500/20 bg-white px-2 py-1.5 sm:px-3 sm:py-2 shadow-2xs transition-all flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about masonry..."
                    disabled={isLoading}
                    className="w-full bg-transparent text-[11px] sm:text-[12.5px] text-stone-900 placeholder:text-stone-400 placeholder:text-[10px] sm:placeholder:text-[11.5px] focus:outline-none disabled:opacity-50"
                  />
                </div>

                {/* Send Button: Amber Send Button */}
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className={`w-7.5 h-7.5 sm:w-9.5 sm:h-9.5 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${input.trim() && !isLoading
                    ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs active:scale-95 cursor-pointer'
                    : 'bg-stone-100 text-stone-300 cursor-not-allowed'
                    }`}
                >
                  <SendHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 -rotate-12 translate-x-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}