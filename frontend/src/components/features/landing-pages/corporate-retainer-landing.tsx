"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormContext } from "@/contexts/form-context";
import { SimpleProcess } from "../homepage/simple-process";

export function CorporateRetainerLanding() {
  const { openForm } = useFormContext();

  const features = [
    {
      title: "Ongoing Legal Support",
      description:
        "Continuous legal consultation and support for your business operations",
      icon: "🔄",
    },
    {
      title: "Contract Management",
      description:
        "Comprehensive contract review, drafting, and management services",
      icon: "📋",
    },
    {
      title: "Compliance Monitoring",
      description:
        "Regular compliance checks and regulatory guidance for your business",
      icon: "⚖️",
    },
  ];

  const processSteps = [
    {
      icon: "💰",
      title: "Choose Plan",
      description: "Select retainer plan starting from ₹9,999/month",
      svgPath: "/4-step-process/pay_advance.svg",
    },
    {
      icon: "👥",
      title: "Onboard & Setup",
      description:
        "Get assigned dedicated legal team and setup initial consultation",
      svgPath: "/4-step-process/connect_consult.svg",
    },
    {
      icon: "🔄",
      title: "Ongoing Support",
      description:
        "Receive continuous legal support, consultations and document review",
      svgPath: "/4-step-process/draft.svg",
    },
    {
      icon: "✅",
      title: "Regular Updates",
      description:
        "Get monthly reports and proactive legal advice for your business",
      svgPath: "/4-step-process/approve_send.svg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Corporate Legal Retainer
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Dedicated legal support for your business. Get ongoing legal
            consultation, contract management, and compliance monitoring with
            our retainer services.
          </p>
          <div className="text-3xl font-bold text-primary mb-8">
            Starting from ₹9,999/month
          </div>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
            onClick={() => openForm("corporate-retainer")}
          >
            Get Retainer
          </Button>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Retainer Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive ongoing legal support solutions for your business
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 4-Step Process */}
      <SimpleProcess
        title="Simple 4-Step Process"
        subtitle="Professional corporate retainer service designed for ongoing legal support"
        steps={processSteps}
      />
      <br />
      {/* Pricing & Value Proposition */}
      <section className="py-16 bg-card border rounded-lg">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
            Transparent Pricing
          </h2>
          <div className="text-4xl font-bold text-primary mb-8">
            Starting from ₹9,999/month
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-muted-foreground">
                Dedicated legal team
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-muted-foreground">
                Unlimited consultations
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-muted-foreground">Contract management</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-muted-foreground">
                Compliance monitoring
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-muted-foreground">Monthly reports</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-muted-foreground">Priority support</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Ready for Dedicated Legal Support?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get started with our corporate retainer service today. Our dedicated
            legal team will provide ongoing support for all your business legal
            needs.
          </p>
          <div className="space-x-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
              onClick={() => openForm("corporate-retainer")}
            >
              Get Retainer
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-secondary px-8 py-3"
              onClick={() => {
                // Expand service details or show FAQ
                const serviceDetails =
                  document.getElementById("service-details");
                if (serviceDetails) {
                  serviceDetails.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
