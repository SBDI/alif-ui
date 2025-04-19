import React from 'react';
import { HeroHeader as MarketingHeader } from '@/components/marketing/marketing-header'; // Use named import and alias
import MarketingFooter from '@/components/marketing/marketing-footer'; // Correct default import alias

// Basic layout structure - will add Header/Footer later
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingHeader />
      <main>{children}</main>
      <MarketingFooter />
    </>
  );
} 