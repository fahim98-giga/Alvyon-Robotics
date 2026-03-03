import React from 'react';
import { cn } from '../../lib/utils';

export const Command = ({ placeholder, items }: { placeholder: string, items: { label: string, icon: any, onClick: () => void }[] }) => (
  <div className="glass rounded-[32px] border border-white/10 overflow-hidden">
    <div className="p-4 border-b border-white/10">
      <input 
        type="text" 
        placeholder={placeholder} 
        className="w-full bg-transparent text-sm focus:outline-none placeholder:text-white/20"
      />
    </div>
    <div className="p-2">
      {items.map((item, i) => (
        <button 
          key={i} 
          onClick={item.onClick}
          className="w-full p-4 flex items-center gap-4 hover:bg-white/5 rounded-2xl transition-all group text-left"
        >
          <item.icon className="w-5 h-5 text-white/20 group-hover:text-neon-blue transition-all" />
          <span className="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-all">{item.label}</span>
        </button>
      ))}
    </div>
  </div>
);
