import React from 'react';
import { cn } from '../../lib/utils';

export const Accordion = ({ items }: { items: { title: string, content: React.ReactNode }[] }) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="glass rounded-2xl border border-white/5 overflow-hidden">
          <button 
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-all"
          >
            <span className="font-bold text-sm uppercase tracking-widest">{item.title}</span>
            <div className={cn('w-4 h-px bg-white/50 transition-all', openIndex === i ? 'rotate-0' : 'rotate-90')} />
          </button>
          {openIndex === i && (
            <div className="p-6 pt-0 text-sm text-white/40 leading-relaxed border-t border-white/5">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
