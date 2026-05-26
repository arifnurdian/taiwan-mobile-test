import * as React from 'react';
import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SeparatorProps extends HTMLAttributes<HTMLHRElement> {}

const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(({ className, ...props }, ref) => (
  <hr ref={ref} className={cn('border-slate-200', className)} {...props} />
));
Separator.displayName = 'Separator';

export { Separator };}}]}