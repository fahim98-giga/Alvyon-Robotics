import React from 'react';
import { cn } from '../../lib/utils';

export const Timeline = ({ items }: { items: { title: string, date: string, desc: string }[] }) => (
  <div className="space-y-8 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
    {items.map((item, i) => (
      <div key={i} className="relative pl-8">
        <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-black border-2 border-neon-blue shadow-[0_0_10px_rgba(0,242,255,0.5)]" />
        <div className="text-[10px] font-bold text-neon-blue uppercase tracking-widest mb-1">{item.date}</div>
        <h4 className="font-bold text-sm mb-1">{item.title}</h4>
        <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
      </div>
    ))}
  </div>
);
