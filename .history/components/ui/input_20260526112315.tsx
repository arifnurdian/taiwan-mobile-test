import * as React from 'react';
import { type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'flex h-11 w-full rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm transition-colors',
      'placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20',
      className,
    )}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };