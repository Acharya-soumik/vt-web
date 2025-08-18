"use client";

import { Button } from "@/components/ui/button";
import { useFormContext } from "@/contexts/form-context";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export function ServicesOverviewSection() {
  const services = [
    {
      title: "Send Legal Notice",
      description:
        "Professional legal notices drafted and sent my expert lawyers",
      icon: "📜",
      features: ["Payment Recovery", "Contract Breaches", "Compliance Issues"],
      pricing: "Starting from ₹1,999",
      cta: "Send Notice",
      url: "/send-a-legal-notice",
    },
    {
      title: "Book Legal Consultation",
      description:
        "Expert legal advice for all legal issues in your regional language.",
      icon: "💼",
      features: [
        "Business Strategy",
        "Compliance Review",
        "Dispute Resolution",
      ],
      pricing: "Starting from ₹299",
      cta: "Book Consultation",
      url: "/consultation",
    },
    {
      title: "Draft Document",
      description:
        "Explain your issues to our lawyers and draft a document in your favour.",
      icon: "📋",
      features: [
        "Employment Contracts",
        "Partnership Deeds",
        "Business Agreements",
      ],
      pricing: "Starting from ₹2,999",
      cta: "Draft Document",
      url: "/document-drafting",
    },
    {
      title: "Get Corporate Retainer",
      description:
        "Ongoing legal support for growing businesses with regular consultation and support.",
      icon: "🏢",
      features: [
        "Monthly Consultations",
        "Document Review",
        "Business Advisory",
      ],
      pricing: "Starting from ₹9,999/month",
      cta: "Get Retainer",
      url: "/corporate-retainer",
    },
  ];

  return (
    <section id="services" className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Legal Services for Indians
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing, expert legal support, and solutions designed
            specifically for Indian business needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary text-xl">{service.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {service.description}
                </p>
                <div className="text-primary font-semibold text-sm mb-4">
                  {service.pricing}
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <Link
                  href={service.url}
                  className="text-primary hover:text-primary/80 flex items-center gap-2 underline"
                >
                  {service.cta}
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm mb-4">
            All prices are final. No hidden charges.
          </p>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-secondary"
            onClick={() => {
              // Scroll to pricing section or navigate to pricing page
              const pricingSection = document.getElementById("pricing");
              if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: "smooth" });
              } else {
                // If no pricing section exists, we'll create one later
                window.location.href = "/pricing";
              }
            }}
          >
            View Complete Pricing
          </Button>
        </div>
      </div>
    </section>
  );
}
