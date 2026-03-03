import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Send, Sparkles, Code, Cpu, Zap, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export const AIAssistant = () => {
  const { geminiKey: contextKey } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "Hello! I'm Alvyon AI. How can I help you with your robotics project today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // @ts-ignore
      const envKey = (typeof process !== 'undefined' && process.env.GEMINI_API_KEY) || import.meta.env.VITE_GEMINI_API_KEY;
      const apiKey = contextKey || envKey;
      
      if (!apiKey) {
        throw new Error("Gemini API key is not configured. Please add it in Settings.");
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: "You are Alvyon AI, a specialized robotics engineer. Help users with code (Arduino C++, MicroPython), circuit diagrams, and parts selection. When asked for circuit diagrams or component layouts, provide clear text-based descriptions, pinout tables, or ASCII art representations of connections. Always provide clean, commented code.",
        },
      });
      
      const text = response.text;
      if (!text) {
        throw new Error("Empty response from AI");
      }
      
      setMessages(prev => [...prev, { role: 'ai', content: text }]);
    } catch (error: any) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'ai', content: `**Error:** ${error.message}. Please check your API configuration.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-neon-blue flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.5)] z-50"
      >
        <Bot className="text-black w-8 h-8" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-28 right-8 w-[400px] h-[600px] glass rounded-2xl flex flex-col z-50 overflow-hidden neon-border"
          >
            <div className="p-4 border-bottom border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-neon-blue/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-neon-blue" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm">Alvyon AI</h3>
                  <p className="text-[10px] text-neon-blue">Robotics Specialist</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all border border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-widest">Exit</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[85%] p-3 rounded-2xl text-sm",
                    msg.role === 'user' 
                      ? "bg-neon-blue text-black rounded-tr-none" 
                      : "bg-white/10 text-white rounded-tl-none border border-white/5"
                  )}>
                    <div className="prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about ESP32, Arduino, Sensors..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-neon-blue/50 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-neon-blue flex items-center justify-center hover:brightness-110 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
