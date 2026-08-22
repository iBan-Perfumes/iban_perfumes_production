'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { ScrollToTop } from '@/components/ScrollToTop';

export function StorefrontChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <ScrollToTop />
      {children}
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
