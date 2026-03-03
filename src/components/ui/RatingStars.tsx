import React from 'react';
import { cn } from '../../lib/utils';

export const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg 
        key={i} 
        className={cn('w-4 h-4', i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/10')} 
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ))}
  </div>
);
