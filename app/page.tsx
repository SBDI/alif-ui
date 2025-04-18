import HeroSection from "@/components/hero-section";
import LogoCloud from "@/components/logo-cloud";
import Features from "@/components/features-1";
import FaqSection from "@/components/faq-section";
import IntegrationsSection from "@/components/integrations-section";
import CallToAction from "@/components/call-to-action";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogoCloud />
      <Features />
      <IntegrationsSection />
      <CallToAction />
      <FaqSection />
      <Footer />
    </>
  );
}
