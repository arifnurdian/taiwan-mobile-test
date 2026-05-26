'use client';

import { Toaster } from 'sonner';

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      <Toaster richColors position="bottom-right" closeButton />
      {children}
    </>
  );
}
