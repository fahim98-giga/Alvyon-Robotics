import React from 'react';
import { cn } from '../../lib/utils';

export const Calendar = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const dates = Array.from({ length: 31 }).map((_, i) => i + 1);

  return (
    <div className="p-6 glass rounded-[32px] border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-bold uppercase tracking-widest">March 2026</span>
        <div className="flex gap-2">
          <button className="p-1 hover:text-neon-blue transition-all">←</button>
          <button className="p-1 hover:text-neon-blue transition-all">→</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center mb-4">
        {days.map(d => <span key={d} className="text-[10px] font-bold text-white/20">{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {dates.map(d => (
          <button key={d} className={cn(
            'w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all',
            d === 3 ? 'bg-neon-blue text-black shadow-lg' : 'hover:bg-white/5 text-white/40 hover:text-white'
          )}>
            {d}
          </button>
        ))}
      </div>
    </div>
  );
};
