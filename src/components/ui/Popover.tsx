import React from 'react';
import { cn } from '../../lib/utils';

export const Popover = ({ trigger, children }: { trigger: React.ReactNode, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">{trigger}</div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 glass rounded-[32px] border border-white/10 p-6 z-50 shadow-2xl">
            {children}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white/10" />
          </div>
        </>
      )}
    </div>
  );
};
