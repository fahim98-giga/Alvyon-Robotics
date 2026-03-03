import React from 'react';
import { cn } from '../../lib/utils';

export const PageHeader = ({ title, description }: { title: string, description: string }) => (
  <div className="mb-16">
    <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-4 uppercase">{title}</h1>
    <p className="text-white/50 text-lg">{description}</p>
  </div>
);
