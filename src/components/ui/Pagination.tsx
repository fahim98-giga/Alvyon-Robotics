import React from 'react';
import { cn } from '../../lib/utils';

export const Pagination = ({ current, total, onChange }: { current: number, total: number, onChange: (page: number) => void }) => (
  <div className="flex items-center gap-2">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onChange(i + 1)}
        className={cn(
          'w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all',
          current === i + 1 ? 'bg-neon-blue text-black shadow-lg' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
        )}
      >
        {i + 1}
      </button>
    ))}
  </div>
);
