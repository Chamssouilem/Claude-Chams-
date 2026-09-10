'use client';

import type { ReactNode } from 'react';
import { CartProvider } from '@/lib/cart';
import { ConsentProvider } from '@/lib/consent';

/** Bündelt die beiden Kontexte, die die ganze Seite braucht. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ConsentProvider>
      <CartProvider>{children}</CartProvider>
    </ConsentProvider>
  );
}
