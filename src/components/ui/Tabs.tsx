import React from 'react';
import { cn } from '../../lib/utils';

export const Tabs = ({ tabs, activeTab, onChange }: { tabs: { id: string, label: string }[], activeTab: string, onChange: (id: string) => void }) => (
  <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={cn(
          'flex-1 py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all',
          activeTab === tab.id ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'
        )}
      >
        {tab.label}
      </button>
    ))}
  </div>
);
