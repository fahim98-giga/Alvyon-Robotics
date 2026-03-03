import React from 'react';
import { cn } from '../../lib/utils';

export const Card = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn('glass rounded-[32px] border border-white/5 overflow-hidden', className)}>
    {children}
  </div>
);

export const CardHeader = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn('p-6 border-b border-white/5', className)}>
    {children}
  </div>
);

export const CardContent = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn('p-6', className)}>
    {children}
  </div>
);

export const CardFooter = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn('p-6 border-t border-white/5 bg-white/5', className)}>
    {children}
  </div>
);
