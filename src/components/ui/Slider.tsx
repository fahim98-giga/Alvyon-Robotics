import React from 'react';
import { cn } from '../../lib/utils';

export const Slider = ({ value, min = 0, max = 100, onChange }: { value: number, min?: number, max?: number, onChange: (val: number) => void }) => (
  <input 
    type="range"
    min={min}
    max={max}
    value={value}
    onChange={(e) => onChange(parseInt(e.target.value))}
    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-blue"
  />
);
