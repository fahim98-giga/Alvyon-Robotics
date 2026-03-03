import React from 'react';
import { cn } from '../../lib/utils';

export const Switch = ({ checked, onChange }: { checked: boolean, onChange: (val: boolean) => void }) => (
  <button
    onClick={() => onChange(!checked)}
    className={cn(
      'w-12 h-6 rounded-full transition-all relative',
      checked ? 'bg-neon-blue' : 'bg-white/10'
    )}
  >
    <div className={cn(
      'absolute top-1 w-4 h-4 rounded-full bg-white transition-all',
      checked ? 'left-7' : 'left-1'
    )} />
  </button>
);
