import * as React from 'react';
import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

interface DialogSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4 transition-all',
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          'absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity',
          open ? 'opacity-100' : 'opacity-0',
        )}
        onClick={() => onOpenChange(false)}
      />
      <div
        className={cn(
          'relative z-10 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl transition-all',
          open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ className, ...props }: DialogSectionProps) {
  return <div className={cn('space-y-2 px-8 pt-8', className)} {...props} />;
}

export function DialogFooter({ className, ...props }: DialogSectionProps) {
  return <div className={cn('flex flex-col gap-3 border-t border-slate-200 px-8 py-6 sm:flex-row sm:justify-end', className)} {...props} />;
}

export function DialogTitle({ className, ...props }: DialogSectionProps) {
  return <h2 className={cn('text-2xl font-semibold text-slate-950', className)} {...props} />;
}

export function DialogDescription({ className, ...props }: DialogSectionProps) {
  return <p className={cn('max-w-2xl text-sm leading-6 text-slate-600', className)} {...props} />;
}

export function DialogContent({ className, ...props }: DialogSectionProps) {
  return <div className={cn('px-8 pb-8', className)} {...props} />;
}
