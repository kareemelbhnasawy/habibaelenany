import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: 'section' | 'div';
  animate?: boolean;
}

export function Section({
  children,
  className,
  id,
  as: Component = 'section',
  animate = true,
}: SectionProps) {
  const content = animate ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  ) : (
    children
  );

  return (
    <Component id={id} className={cn('section-padding', className)}>
      {content}
    </Component>
  );
}
