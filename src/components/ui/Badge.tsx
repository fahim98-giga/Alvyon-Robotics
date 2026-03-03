import React from 'react';
import { cn } from '../../lib/utils';

export const Badge = ({ className, variant = 'default', children }: { className?: string, variant?: 'default' | 'neon' | 'outline', children: React.ReactNode }) => {
  const variants = {
    default: 'bg-white/10 text-white/70',
    neon: 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50',
    outline: 'bg-transparent text-white/50 border border-white/10',
  };

  return (
    <span className={cn('px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest', variants[variant], className)}>
      {children}
    </span>
  );
};
