import React from 'react';
import { cn } from '../../lib/utils';

export const Stepper = ({ steps, currentStep }: { steps: string[], currentStep: number }) => (
  <div className="flex items-center gap-4">
    {steps.map((step, i) => (
      <React.Fragment key={i}>
        {i > 0 && <div className={cn('h-px w-8 bg-white/10', i <= currentStep && 'bg-neon-blue')} />}
        <div className="flex items-center gap-2">
          <div className={cn(
            'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all',
            i < currentStep ? 'bg-neon-blue border-neon-blue text-black' : 
            i === currentStep ? 'border-neon-blue text-neon-blue shadow-[0_0_10px_rgba(0,242,255,0.5)]' : 
            'border-white/10 text-white/20'
          )}>
            {i + 1}
          </div>
          <span className={cn(
            'text-[10px] font-bold uppercase tracking-widest hidden sm:inline',
            i <= currentStep ? 'text-white' : 'text-white/20'
          )}>{step}</span>
        </div>
      </React.Fragment>
    ))}
  </div>
);
