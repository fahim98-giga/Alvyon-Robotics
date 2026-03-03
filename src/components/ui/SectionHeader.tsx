import React from 'react';
import { cn } from '../../lib/utils';

export const SectionHeader = ({ title, subtitle, align = 'left' }: { title: string, subtitle?: string, align?: 'left' | 'center' }) => (
  <div className={cn('mb-16', align === 'center' ? 'text-center' : 'text-left')}>
    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 uppercase tracking-tighter">{title}</h2>
    {subtitle && <p className="text-white/40 text-lg max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);
