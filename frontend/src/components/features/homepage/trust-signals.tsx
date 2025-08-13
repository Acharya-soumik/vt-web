import { TestimonialsSection } from "@/components/shared/testimonials-section";

export function TrustSignalsSection() {
  const stats = [
    { number: "150+", label: "Clients Served" },
    { number: "₹50L+", label: "Legal Fees Saved" },
    { number: "25+", label: "Expert Lawyers" },
    { number: "4.8/5", label: "Customer Rating" },
  ];

  return (
    <section id="trust-signals" className="bg-muted/30 py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Statistics */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Trusted by Indians
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join hundreds of Indian who trust vakiltech for all their legal
            needs.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <TestimonialsSection
          title="Real Stories from Indian Business Owners"
          subtitle="Hear from entrepreneurs who transformed their legal experience with Vakil-Tech"
          showBadge={false}
          className="my-0"
        />

        {/* Trust Badges */}
        <div className="text-center mt-12">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-sm font-semibold text-muted-foreground">
              Bar Council Registered Network Lawyers
            </div>
            <div className="text-sm font-semibold text-muted-foreground">
              Data Protection Compliant
            </div>
            <div className="text-sm font-semibold text-muted-foreground">
              24/7 Legal Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
