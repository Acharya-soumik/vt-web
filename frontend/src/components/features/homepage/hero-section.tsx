"use client";

import { Button } from "@/components/ui/button";
import { WordRotate } from "@/components/ui/word-rotate";
import { useFormContext } from "@/contexts/form-context";
import { useAnalytics } from "@/hooks/use-analytics";

export function HeroSection() {
  const { openForm } = useFormContext();
  const { logCTAClick, logServiceViewed } = useAnalytics();

  const handleGetStarted = () => {
    logCTAClick("hero_cta", "Talk to a Lawyer", "/", "consultation");
    logServiceViewed("consultation", "/");
    openForm("consultation");
  };

  const handleSeeServices = () => {
    logCTAClick("hero_cta", "See Our Services", "/", undefined);
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center max-w-5xl mx-auto">
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-foreground leading-tight">
          Find the Right Lawyer,
          <br />
          <WordRotate
            className="text-primary text-3xl md:text-5xl"
            words={[
              "send a legal notice!",
              "get lawyer consultation!",
              "get corporate legal services!",
            ]}
          />
          {/* <span className="text-primary">Right Here!</span> */}
        </h1>

        {/* Tagline */}
        <p className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-6">
          Reimagine Legal Assistance At Your Fingertips
        </p>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed">
          Our team of top-tier lawyers delivers seamless legal solutions—fast,
          reliable, and effortless. <br />
          You ask. We handle. Done.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleGetStarted}
          >
            Talk to a Lawyer
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-secondary"
            onClick={handleSeeServices}
          >
            See Our Services
          </Button>
        </div>
        {/* Stats Section */}
        <div className="flex flex-wrap justify-center gap-12 mt-12 pt-8 border-t border-border/50">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
              15,000+
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Clients Served
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
              ₹2Cr+
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Legal Fees Saved
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
              4.8/5
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Customer Rating
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
