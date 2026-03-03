import React from 'react';
import { cn } from '../../lib/utils';

export const ScrollArea = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn('overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-2', className)}>
    {children}
  </div>
);
