import React from 'react';
import { cn } from '../../lib/utils';

export const Table = ({ headers, rows }: { headers: string[], rows: any[][] }) => (
  <div className="w-full overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-white/10">
          {headers.map((h, i) => (
            <th key={i} className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-white/30">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-white/5 transition-all">
            {row.map((cell, j) => (
              <td key={j} className="py-4 px-6 text-sm text-white/70">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
