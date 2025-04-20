import { Metadata } from "next";
import React from 'react';
import { HeroHeader } from '@/components/marketing/hero5-header';
import MarketingFooter from '@/components/marketing/marketing-footer';

export const metadata: Metadata = {
  title: "Alif UI - AI-Powered Learning Platform",
  description: "Alif UI is an AI-powered learning platform that helps students learn more effectively.",
};

export default function RootMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroHeader />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}
