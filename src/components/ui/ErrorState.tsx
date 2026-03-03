import React from 'react';
import { cn } from '../../lib/utils';

export const ErrorState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
    <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/50">
      <div className="text-red-500 text-2xl font-bold">!</div>
    </div>
    <div>
      <h3 className="font-bold text-lg mb-1">System Error</h3>
      <p className="text-white/40 text-sm max-w-xs">{message}</p>
    </div>
    <button className="text-xs font-bold text-neon-blue uppercase tracking-widest hover:underline">Retry Connection</button>
  </div>
);
