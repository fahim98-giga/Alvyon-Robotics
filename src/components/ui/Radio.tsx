import React from 'react';
import { cn } from '../../lib/utils';

export const Radio = ({ options, value, onChange }: { options: { label: string, value: string }[], value: string, onChange: (val: string) => void }) => (
  <div className="space-y-3">
    {options.map((opt) => (
      <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
        <div 
          onClick={() => onChange(opt.value)}
          className={cn(
            'w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center',
            value === opt.value ? 'bg-neon-blue border-neon-blue shadow-[0_0_10px_rgba(0,242,255,0.5)]' : 'border-white/10 group-hover:border-white/30'
          )}
        >
          {value === opt.value && <div className="w-2 h-2 bg-black rounded-full" />}
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-all">{opt.label}</span>
      </label>
    ))}
  </div>
);
