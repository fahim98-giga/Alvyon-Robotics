import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Key, Shield, Bell, User, Save, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Settings = () => {
  const { geminiKey, setGeminiKey } = useAuth();
  const [keyInput, setKeyInput] = useState(geminiKey || '');
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSave = () => {
    setIsSaving(true);
    setStatus(null);
    
    // Simulate API validation or just save
    setTimeout(() => {
      setGeminiKey(keyInput);
      setIsSaving(false);
      setStatus({ type: 'success', message: 'Settings updated successfully!' });
      setTimeout(() => setStatus(null), 3000);
    }, 800);
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-display font-black tracking-tighter mb-2 uppercase">Platform <span className="text-neon-blue">Settings</span></h1>
          <p className="text-white/40">Configure your AI engine and account preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2">
            {[
              { id: 'general', label: 'General', icon: User },
              { id: 'api', label: 'API Configuration', icon: Key, active: true },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'notifications', label: 'Notifications', icon: Bell },
            ].map((item) => (
              <button
                key={item.id}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  item.active ? 'bg-neon-blue text-black' : 'text-white/50 hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="md:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-8 rounded-[32px] border-white/5"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-neon-blue/20 flex items-center justify-center">
                  <Key className="w-5 h-5 text-neon-blue" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl">Gemini AI Integration</h2>
                  <p className="text-white/40 text-xs">Your personal API key for advanced robotics generation.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Gemini API Key</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={keyInput}
                      onChange={(e) => setKeyInput(e.target.value)}
                      placeholder="Enter your Gemini API Key..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-neon-blue/50 transition-all font-mono"
                    />
                  </div>
                  <p className="text-[10px] text-white/20 mt-2">
                    Don't have a key? Get one at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-neon-blue hover:underline">Google AI Studio</a>.
                  </p>
                </div>

                <div className="p-4 bg-neon-blue/5 border border-neon-blue/20 rounded-2xl">
                  <p className="text-xs text-white/60 leading-relaxed">
                    <span className="text-neon-blue font-bold">Pro Tip:</span> Using your own API key unlocks higher rate limits and access to experimental models like Gemini 2.0 Flash.
                  </p>
                </div>

                {status && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-center ${
                      status.type === 'success' ? 'bg-neon-green/10 text-neon-green border border-neon-green/30' : 'bg-red-500/10 text-red-500 border border-red-500/30'
                    }`}
                  >
                    {status.message}
                  </motion.div>
                )}

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-neon-blue text-black px-8 py-3 rounded-xl font-black shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Configuration
                  </button>
                </div>
              </div>
            </motion.div>

            <div className="glass p-8 rounded-[32px] border-white/5">
              <h3 className="font-display font-bold text-lg mb-4">Model Preferences</h3>
              <div className="space-y-4">
                {[
                  { name: 'Gemini 3 Flash (Default)', desc: 'Fastest response for simple queries', active: true },
                  { name: 'Gemini 3.1 Pro', desc: 'Advanced reasoning for complex code', active: false },
                  { name: 'Gemini 2.5 Flash Image', desc: 'Optimized for visual circuit generation', active: false },
                ].map((model, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-white/5 hover:bg-white/5 transition-all cursor-pointer group">
                    <div>
                      <div className="text-sm font-bold mb-1 group-hover:text-neon-blue transition-all">{model.name}</div>
                      <div className="text-[10px] text-white/30 uppercase tracking-widest">{model.desc}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${model.active ? 'border-neon-blue' : 'border-white/10'}`}>
                      {model.active && <div className="w-2 h-2 rounded-full bg-neon-blue" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
