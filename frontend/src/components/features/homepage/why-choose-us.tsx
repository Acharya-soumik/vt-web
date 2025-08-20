"use client";

import { Button } from "@/components/ui/button";
import { useFormContext } from "@/contexts/form-context";

export function WhyChooseUsSection() {
  const { openForm } = useFormContext();
  const reasons = [
    {
      title: "Transparent Pricing",
      description:
        "No hidden fees, no surprises. We show you exactly what you'll pay upfront - from ₹1,999 legal notices to comprehensive retainers.",
      icon: "🔍",
    },
    {
      title: "Indian Legal Expertise",
      description:
        "Our lawyers understand Indian problems, local regulations, and speak your language- English and regional languages.",
      icon: "🇮🇳",
    },
    {
      title: "Modern & Simple",
      description:
        "Skip the traditional law firm complexity. Get legal help through our simple online platform with real-time updates.",
      icon: "✨",
    },
    {
      title: "Results That Matter",
      description:
        "We focus on outcomes - whether it's recovering payments, getting compliance, or protecting your business interests.",
      icon: "🎯",
    },
  ];

  return (
    <section id="about" className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Why choose vakiltech
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We understand the unique challenges that you face and provide legal
            solutions through out network of lawyers across India.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-primary text-xl">{reason.icon}</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cultural Context Section */}
        <div className="bg-muted/30 rounded-lg p-8 mb-12 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6 text-foreground">
            Built for Indian Problems
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">🏢</div>
              <h4 className="font-semibold mb-2">Individual Focused</h4>
              <p className="text-sm text-muted-foreground">
                Solutions designed for individuals and businesses
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">💼</div>
              <h4 className="font-semibold mb-2">Local Expertise</h4>
              <p className="text-sm text-muted-foreground">
                Understanding of Indian legal and business culture
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">📱</div>
              <h4 className="font-semibold mb-2">Digital First</h4>
              <p className="text-sm text-muted-foreground">
                Modern platform with traditional legal expertise
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-lg p-8 md:p-12 max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Ready to Transform Your Legal Experience?
          </h3>
          <p className="text-lg text-muted-foreground mb-6">
            Join 15000+ Indians who trust vakiltech for their legal needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => openForm("consultation")}
            >
              Book Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-secondary"
              onClick={() => {
                const trustSignalsSection =
                  document.getElementById("trust-signals");
                if (trustSignalsSection) {
                  trustSignalsSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              See Our Success Stories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
