import React from 'react';
import { cn } from '../../lib/utils';

export const Avatar = ({ src, fallback, className }: { src?: string, fallback: string, className?: string }) => (
  <div className={cn('w-10 h-10 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs uppercase', className)}>
    {src ? (
      <img src={src} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
    ) : (
      <span>{fallback}</span>
    )}
  </div>
);
