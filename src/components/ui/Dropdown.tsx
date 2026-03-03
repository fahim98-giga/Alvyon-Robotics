import React from 'react';
import { cn } from '../../lib/utils';

export const Dropdown = ({ label, items }: { label: React.ReactNode, items: { label: string, onClick: () => void }[] }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">{label}</div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-2 w-48 glass rounded-2xl border border-white/10 p-2 z-50 shadow-2xl">
            {items.map((item, i) => (
              <button 
                key={i} 
                onClick={() => { item.onClick(); setIsOpen(false); }}
                className="w-full p-3 text-left text-xs font-bold uppercase tracking-widest hover:bg-white/5 rounded-xl transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
