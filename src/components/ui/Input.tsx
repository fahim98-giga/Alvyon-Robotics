import React from 'react';
import { cn } from '../../lib/utils';

export const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input 
    className={cn(
      'w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-neon-blue/50 transition-all',
      className
    )}
    {...props}
  />
);
