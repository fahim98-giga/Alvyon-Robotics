import React from 'react';
import { cn } from '../../lib/utils';

export const Progress = ({ value, className }: { value: number, className?: string }) => (
  <div className={cn('h-2 bg-white/5 rounded-full overflow-hidden', className)}>
    <div 
      className="h-full bg-neon-blue shadow-[0_0_10px_rgba(0,242,255,0.5)] transition-all duration-500" 
      style={{ width: `${value}%` }} 
    />
  </div>
);
