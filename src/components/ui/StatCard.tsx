import React from 'react';
import { cn } from '../../lib/utils';

export const StatCard = ({ label, value, icon: Icon, color = 'text-neon-blue' }: { label: string, value: string, icon: any, color?: string }) => (
  <div className="glass p-8 rounded-[32px] border border-white/5 relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-32 h-32 opacity-5 blur-3xl -mr-16 -mt-16 transition-all group-hover:opacity-10`} style={{ backgroundColor: 'currentColor' }} />
    <div className="flex items-center justify-between mb-4">
      <div className={cn('w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10', color)}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div className="text-3xl font-display font-black mb-1">{value}</div>
    <div className="text-white/40 text-xs font-bold uppercase tracking-widest">{label}</div>
  </div>
);
