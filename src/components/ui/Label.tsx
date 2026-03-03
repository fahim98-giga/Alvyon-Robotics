import React from 'react';
import { cn } from '../../lib/utils';

export const Label = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <label className={cn('text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1', className)}>
    {children}
  </label>
);
