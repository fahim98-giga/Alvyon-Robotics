import React from 'react';
import { cn } from '../../lib/utils';

export const Separator = ({ className }: { className?: string }) => (
  <div className={cn('h-px bg-white/5 w-full', className)} />
);
