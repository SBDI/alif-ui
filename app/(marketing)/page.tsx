import dynamic from 'next/dynamic';
import HeroSection from "@/components/marketing/hero-section";
import LogoCloud from "@/components/marketing/logo-cloud";
import Features from "@/components/marketing/features-section";
// import FaqSection from "@/components/marketing/faq-section";
// import IntegrationsSection from "@/components/marketing/integrations-section";
// import CallToAction from "@/components/marketing/call-to-action";

const IntegrationsSection = dynamic(() => import('@/components/marketing/integrations-section'));
const CallToAction = dynamic(() => import('@/components/marketing/call-to-action'));
const FaqSection = dynamic(() => import('@/components/marketing/faq-section'));

export default function MarketingRootPage() {
  return (
    <div className="space-y-20 pb-20">
      <HeroSection />
      <LogoCloud />
      <Features />
      <IntegrationsSection />
      <CallToAction />
      <FaqSection />
    </div>
  );
}
