import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bot, Send, Sparkles, Code, Cpu, Zap, Terminal, Copy, Play } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';

export const AIEngine = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim() || isLoading) return;
    setIsLoading(true);
    setResponse('');
    try {
      // @ts-ignore
      const apiKey = (typeof process !== 'undefined' && process.env.GEMINI_API_KEY) || import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is not configured.");
      }

      const ai = new GoogleGenAI({ apiKey });
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: input,
        config: {
          systemInstruction: "You are Alvyon AI, a specialized robotics engineer. Help users with code (Arduino C++, MicroPython), circuit diagrams, and parts selection. When asked for circuit diagrams or component layouts, provide clear text-based descriptions, pinout tables, or ASCII art representations of connections. Always provide clean, commented code.",
        },
      });
      
      const text = result.text;
      if (!text) {
        throw new Error("Empty response from AI");
      }
      setResponse(text);
    } catch (error: any) {
      console.error("AI Error:", error);
      setResponse(`**Error:** ${error.message}. Please check your API configuration.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 flex items-center justify-center mb-8">
              <Bot className="w-8 h-8 text-neon-blue" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6 uppercase">AI ROBOTICS <br /><span className="text-neon-blue">ENGINE</span></h1>
            <p className="text-white/60 text-lg mb-12 leading-relaxed">
              Generate production-ready firmware, circuit diagrams, and parts lists for your robotics projects in seconds.
            </p>

            <div className="space-y-6">
              <div className="relative">
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your project (e.g., 'Build a WiFi controlled car with ESP32 and L298N motor driver')"
                  className="w-full h-40 bg-white/5 border border-white/10 rounded-3xl p-6 text-white placeholder:text-white/20 focus:outline-none focus:border-neon-blue/50 transition-all resize-none"
                />
                <button 
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="absolute bottom-4 right-4 bg-neon-blue text-black px-6 py-3 rounded-2xl font-black shadow-[0_0_20px_rgba(0,242,255,0.4)] hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? 'Generating...' : 'Generate Code'} <Zap className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {['Arduino C++', 'MicroPython', 'Circuit Diagram', 'Parts List'].map((tag) => (
                  <button 
                    key={tag}
                    onClick={() => setInput(prev => `${prev} Generate ${tag} for `)}
                    className="glass py-3 rounded-2xl border-white/10 text-xs font-bold uppercase tracking-widest hover:text-neon-blue transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-[700px] glass rounded-[40px] border-white/5 flex flex-col overflow-hidden neon-border">
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-neon-blue" />
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">AI Output Terminal</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-all">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-all">
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-8 font-mono text-sm scrollbar-hide">
              {response ? (
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{response}</ReactMarkdown>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-white/10 text-center">
                  <Sparkles className="w-16 h-16 mb-4 opacity-20" />
                  <p className="max-w-xs">Describe your project and click generate to see the AI magic happen.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
