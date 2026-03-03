import React from 'react';
import { cn } from '../../lib/utils';

export const Rating = ({ value, max = 5 }: { value: number, max?: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: max }).map((_, i) => (
      <div 
        key={i} 
        className={cn(
          'w-3 h-3 rounded-full',
          i < value ? 'bg-neon-blue shadow-[0_0_5px_rgba(0,242,255,0.5)]' : 'bg-white/10'
        )} 
      />
    ))}
  </div>
);
