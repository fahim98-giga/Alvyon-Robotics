import React from 'react';
import { cn } from '../../lib/utils';

export const SuccessState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
    <div className="w-16 h-16 rounded-2xl bg-neon-green/10 flex items-center justify-center border border-neon-green/50">
      <div className="text-neon-green text-2xl font-bold">✓</div>
    </div>
    <div>
      <h3 className="font-bold text-lg mb-1">Operation Successful</h3>
      <p className="text-white/40 text-sm max-w-xs">{message}</p>
    </div>
  </div>
);
