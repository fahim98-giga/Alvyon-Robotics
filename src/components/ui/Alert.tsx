import React from 'react';
import { cn } from '../../lib/utils';

export const Alert = ({ variant = 'info', title, children }: { variant?: 'info' | 'error' | 'success', title: string, children: React.ReactNode }) => {
  const variants = {
    info: 'bg-neon-blue/10 border-neon-blue/50 text-neon-blue',
    error: 'bg-red-500/10 border-red-500/50 text-red-500',
    success: 'bg-neon-green/10 border-neon-green/50 text-neon-green',
  };

  return (
    <div className={cn('p-4 rounded-2xl border flex flex-col gap-1', variants[variant])}>
      <span className="text-[10px] font-bold uppercase tracking-widest">{title}</span>
      <p className="text-xs opacity-80">{children}</p>
    </div>
  );
};
