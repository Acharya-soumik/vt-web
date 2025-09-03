"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormContext } from "@/contexts/form-context";
import { SimpleProcess } from "../homepage/simple-process";

export function DocumentDraftingLanding() {
  const { openForm } = useFormContext();

  const features = [
    {
      title: "Business Contracts",
      description:
        "Professional drafting of business contracts, agreements, and legal documents",
      icon: "📄",
    },
    {
      title: "Employment Documents",
      description:
        "Employment contracts, policies, and HR-related legal documents",
      icon: "👥",
    },
    {
      title: "Compliance Documents",
      description:
        "Regulatory compliance documents and legal filings for businesses",
      icon: "📋",
    },
  ];

  const processSteps = [
    {
      icon: "💰",
      title: "Submit Requirements",
      description: "Pay ₹1,500 advance and submit your document requirements",
      svgPath: "/4-step-process/pay_advance.svg",
    },
    {
      icon: "👨‍💼",
      title: "Consult & Plan",
      description:
        "Discuss with legal expert to understand your specific needs",
      svgPath: "/4-step-process/connect_consult.svg",
    },
    {
      icon: "📝",
      title: "Document Drafting",
      description:
        "Expert drafts your legal document with proper legal compliance",
      svgPath: "/4-step-process/draft.svg",
    },
    {
      icon: "✅",
      title: "Review & Finalize",
      description: "Review, approve and get your finalized legal document",
      svgPath: "/4-step-process/approve_send.svg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Professional Document Drafting
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Expert legal document drafting for businesses. Get professionally
            crafted contracts, agreements, and legal documents tailored to your
            needs.
          </p>
          <div className="text-3xl font-bold text-primary mb-8">
            Starting from ₹1,500
          </div>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
            onClick={() => openForm("document-drafting")}
          >
            Draft Document
          </Button>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Document Drafting Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive legal document drafting solutions for your business
            needs
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
        subtitle="Professional document drafting service designed for simplicity and effectiveness"
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
            Starting from ₹1,500
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-muted-foreground">
                Expert legal professionals
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-muted-foreground">
                Legally compliant documents
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-muted-foreground">
                Customized to your needs
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-muted-foreground">
                Fast turnaround time
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-muted-foreground">Revision support</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span className="text-muted-foreground">No hidden charges</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Ready to Draft Your Document?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get started with professional document drafting today. Our experts
            will help you create legally sound documents tailored to your
            business needs.
          </p>
          <div className="space-x-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
              onClick={() => openForm("document-drafting")}
            >
              Draft Document
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
