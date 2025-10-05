'use client';

import { ReactNode } from 'react';
import { FontPreloader } from './font-preloader';

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <FontPreloader />
      {children}
    </>
  );
}
