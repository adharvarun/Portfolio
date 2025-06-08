'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export default function ScrollAnimation({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = ''
}: ScrollAnimationProps) {
  const directions = {
    up: { initial: { y: 50, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    down: { initial: { y: -50, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    left: { initial: { x: 50, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    right: { initial: { x: -50, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  };

  return (
    <motion.div
      className={className}
      initial={directions[direction].initial}
      whileInView={directions[direction].animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
} 