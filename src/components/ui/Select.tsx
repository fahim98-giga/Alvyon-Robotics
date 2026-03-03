import React from 'react';
import { cn } from '../../lib/utils';

export const Select = ({ options, value, onChange }: { options: { label: string, value: string }[], value: string, onChange: (val: string) => void }) => (
  <select 
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-neon-blue/50 transition-all appearance-none cursor-pointer"
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value} className="bg-black text-white">{opt.label}</option>
    ))}
  </select>
);
