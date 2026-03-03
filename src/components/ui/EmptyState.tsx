import React from 'react';
import { cn } from '../../lib/utils';

export const EmptyState = ({ title, desc, icon: Icon }: { title: string, desc: string, icon: any }) => (
  <div className="flex flex-col items-center justify-center gap-4 py-20 text-center opacity-50">
    <Icon className="w-12 h-12 text-white/20" />
    <div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-white/40 text-sm max-w-xs">{desc}</p>
    </div>
  </div>
);
