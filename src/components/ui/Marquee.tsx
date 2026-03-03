import React from 'react';
import { motion } from 'motion/react';

export const Marquee = ({ children, speed = 20 }: { children: React.ReactNode, speed?: number }) => (
  <div className="overflow-hidden whitespace-nowrap flex">
    <motion.div 
      animate={{ x: [0, -1000] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      className="flex gap-8 items-center"
    >
      {children}
      {children}
      {children}
      {children}
    </motion.div>
  </div>
);
