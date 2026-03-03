import React from 'react';
import { cn } from '../../lib/utils';

export const Breadcrumb = ({ items }: { items: { label: string, href?: string }[] }) => (
  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
    {items.map((item, i) => (
      <React.Fragment key={i}>
        {i > 0 && <span>/</span>}
        {item.href ? (
          <a href={item.href} className="hover:text-neon-blue transition-colors">{item.label}</a>
        ) : (
          <span className="text-white/60">{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </div>
);
