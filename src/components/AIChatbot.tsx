import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Ferrofluid from './Ferrofluid';

const MODELS = [
  "deepseek-ai/deepseek-r1",
  "meta/llama3-70b-instruct"
];

const API_BASE = import.meta.env.DEV ? 'http://localhost:8888/.netlify/functions' : '/.netlify/functions';

const FERROFLUID_COLORS = ["#4F46E5", "#06B6D4", "#E0F2FE"];

const SYSTEM_PROMPT = `You are the official AI Assistant for S-Web Hub, an elite digital agency.
Services:
1. Custom Website Development (premium, highly animated, Framer/Apple style)
2. AI Automation (custom agents, workflow automations)
3. Lead Generation Systems
4. Business Systems

Rules:
- Be highly professional, concise, and persuasive.
- Use Markdown to format your answers (bolding, lists, etc).
- Always position S-Web Hub as the ultimate solution for scaling their business.
- If they ask about prices, politely let them know we provide custom quotes based on scope.
- Analyze their requests intelligently and offer solutions.`;

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am the S-Web Hub AI. How can I help you scale your business today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 20-second popup logic
  useEffect(() => {
    if (isOpen) {
      setShowPopup(false);
      return;
    }

    const interval = setInterval(() => {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
    }, 20000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Lock body scroll when chat is open on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const fetchWithFallback = async (msgs: Message[], modelIndex = 0): Promise<string> => {
    if (modelIndex >= MODELS.length) {
      throw new Error("All AI models failed.");
    }

    try {
      let response;
      
      if (import.meta.env.DEV && import.meta.env.VITE_NVIDIA_API_KEY) {
        // Local dev bypass to avoid Netlify function errors when running `npm run dev`
        response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_NVIDIA_API_KEY}`
          },
          body: JSON.stringify({
            model: MODELS[modelIndex],
            messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...msgs],
            temperature: 0.7,
            max_tokens: 1024,
          })
        });
      } else {
        // Production secure call
        response = await fetch(`${API_BASE}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: MODELS[modelIndex],
            messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...msgs]
          })
        });
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.warn(`Model ${MODELS[modelIndex]} failed. Falling back...`);
      return fetchWithFallback(msgs, modelIndex + 1);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await fetchWithFallback([...messages, userMsg].filter(m => m.role !== 'system'));
      const cleanReply = reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
      
      setMessages(prev => [...prev, { role: 'assistant', content: cleanReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, our AI systems are currently unreachable. Please contact us directly!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating 20s Popup */}
      <AnimatePresence>
        {!isOpen && showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed right-4 md:right-8 bottom-[85px] md:bottom-[100px] z-[9999] bg-[#111] text-white px-4 py-2 rounded-full border border-white/10 shadow-2xl flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">S-Web Hub Support</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[9990] bg-[#111111] border border-white/10 shadow-2xl overflow-hidden
              bottom-20 right-4 left-4 h-[70svh] max-h-[500px] rounded-2xl md:inset-auto
              md:bottom-24 md:right-8 md:w-[350px] md:h-[480px] md:rounded-2xl flex flex-col"
            style={{
              paddingTop: 'env(safe-area-inset-top, 0px)',
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            }}
          >
            {/* Background Animation — desktop only for performance */}
            <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
              <Ferrofluid
                colors={FERROFLUID_COLORS}
                speed={0.5}
                scale={1}
                turbulence={1}
                fluidity={0.1}
                rimWidth={0.2}
                sharpness={3}
                shimmer={1}
                glow={2}
                flowDirection="up"
                opacity={1}
                mouseInteraction={false}
              />
            </div>

            {/* Chat Content Layer */}
            <div className="relative z-10 flex flex-col h-full w-full bg-black/30 md:backdrop-blur-sm">
              {/* Header */}
              <div className="h-14 md:h-16 border-b border-white/10 bg-black/40 flex items-center justify-between px-5 md:px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">S-Web AI</h3>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[11px] text-white/50">Online</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      msg.role === 'user' 
                        ? 'bg-white text-black rounded-br-sm' 
                        : 'bg-[#1a1a1a] text-white/90 rounded-bl-sm border border-white/5'
                    }`}>
                      {msg.role === 'assistant' ? (
                        <div className="prose prose-invert prose-sm max-w-none text-white">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm font-medium">{msg.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#1a1a1a] rounded-2xl rounded-bl-sm border border-white/5 px-4 py-3 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-white/50" />
                      <span className="text-sm text-white/50">Analyzing...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 md:p-4 border-t border-white/10 bg-[#111]/50 flex-shrink-0">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="relative flex items-center"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything about S-Web Hub..."
                    className="w-full bg-[#1a1a1a] text-white placeholder:text-white/30 border border-white/10 rounded-full pl-5 pr-12 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-sm"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 w-8 h-8 flex items-center justify-center bg-white text-black rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:opacity-90"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button — always visible, toggle between chat and close */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 md:right-8 bottom-5 md:bottom-8 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-300 z-[9999] group"
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-black group-hover:scale-110 transition-transform duration-300" />
        ) : (
          <MessageSquare className="w-6 h-6 text-black group-hover:scale-110 transition-transform duration-300" />
        )}
      </button>
    </>
  );
}
