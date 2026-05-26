import * as React from 'react';
import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-soft',
      className,
    )}
    {...props}
  />
));
Card.displayName = 'Card';

export { Card };