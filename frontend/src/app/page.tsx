import type { Metadata } from "next";
import { HeroSection } from "@/components/features/homepage/hero-section";
import { HowItWorksSection } from "@/components/features/homepage/how-it-works";
import { ServicesOverviewSection } from "@/components/features/homepage/services-overview";
import { TrustSignalsSection } from "@/components/features/homepage/trust-signals";
import { WhyChooseUsSection } from "@/components/features/homepage/why-choose-us";
import { LiveChatSection } from "@/components/features/homepage/live-chat-section";
import { FAQSection } from "@/components/shared/faq-section";
import { homepageFAQs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Vakiltech | Built on the Calibre of Expert Lawyers",
  description:
    "Get instant legal help from expert lawyers! Legal consultation, document drafting, legal notices & corporate services. 15,000+ happy clients. Start free consultation now!",
  keywords: [
    "instant legal help",
    "online lawyer consultation",
    "legal advice 24/7",
    "document drafting",
    "legal notices",
    "expert lawyers",
    "legal solutions",
    "legal consultation",
    "send legal notices",
    "legal notice",
    "legal notice online",
    "legal notice online india",
  ],
  openGraph: {
    title: "Vakiltech | Built on the Calibre of Expert Lawyers",
    description:
      "Get instant legal help from expert lawyers! Legal consultation, document drafting, legal notices & corporate services. 15,000+ happy clients. Start free consultation now!",
    url: "/",
    type: "website",
    siteName: "Vakil Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vakiltech | Built on the Calibre of Expert Lawyers",
    description:
      "Get instant legal help from expert lawyers! Legal consultation, document drafting, legal notices & corporate services. 15,000+ happy clients. Start free consultation now!",
  },
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background max-w-screen-2xl mx-auto overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Services Overview Section */}
      <ServicesOverviewSection />

      {/* Trust Signals Section */}
      <TrustSignalsSection />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Live Chat Section */}
      <LiveChatSection />

      {/* FAQ Section */}
      <FAQSection
        faqs={homepageFAQs}
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about our legal services"
      />
    </div>
  );
}
