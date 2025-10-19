import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

interface MasonryGridProps {
  children: ReactNode;
  className?: string;
}

export function MasonryGrid({ children, className }: MasonryGridProps) {
  return (
    <div
      className={cn(
        'grid gap-4 md:gap-6',
        'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
        'auto-rows-auto',
        className
      )}
    >
      {children}
    </div>
  );
}
