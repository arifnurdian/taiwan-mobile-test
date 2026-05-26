import * as React from 'react';
import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (
    <div className={cn('overflow-y-auto pr-2', className)} {...props}>
      {children}
    </div>
  );
}
