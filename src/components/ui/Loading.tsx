import React from 'react';
import { cn } from '../../lib/utils';

export const Loading = () => (
  <div className="flex flex-col items-center justify-center gap-4 py-20">
    <div className="w-12 h-12 border-4 border-neon-blue border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(0,242,255,0.3)]" />
    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 animate-pulse">Initializing System...</span>
  </div>
);
