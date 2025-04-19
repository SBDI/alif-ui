import React from 'react';
import { HeroHeader } from '@/components/marketing/marketing-header';
import MarketingFooter from '@/components/marketing/marketing-footer';

// Basic layout structure - will add Header/Footer later
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeroHeader />
      <main>{children}</main>
      <MarketingFooter />
    </>
  );
} 