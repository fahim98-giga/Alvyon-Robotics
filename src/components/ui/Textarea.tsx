import React from 'react';
import { cn } from '../../lib/utils';

export const Textarea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea 
    className={cn(
      'w-full bg-white/5 border border-white/10 rounded-3xl py-4 px-6 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-neon-blue/50 transition-all resize-none',
      className
    )}
    {...props}
  />
);
