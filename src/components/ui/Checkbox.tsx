import React from 'react';
import { cn } from '../../lib/utils';

export const Checkbox = ({ checked, onChange, label }: { checked: boolean, onChange: (val: boolean) => void, label: string }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div 
      onClick={() => onChange(!checked)}
      className={cn(
        'w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center',
        checked ? 'bg-neon-blue border-neon-blue shadow-[0_0_10px_rgba(0,242,255,0.5)]' : 'border-white/10 group-hover:border-white/30'
      )}
    >
      {checked && <div className="w-2 h-2 bg-black rounded-sm" />}
    </div>
    <span className="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-all">{label}</span>
  </label>
);
