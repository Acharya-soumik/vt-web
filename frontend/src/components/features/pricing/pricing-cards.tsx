"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormContext } from "@/contexts/form-context";

export function PricingCards() {
  const { openForm } = useFormContext();

  const pricingPlans = [
    {
      title: "Legal Notice",
      price: "₹1,499",
      originalPrice: "₹1,999",
      discount: "25% OFF",
      period: "per notice",
      description:
        "Professional legal notices for payment recovery and compliance",
      features: [
        "Payment recovery notices",
        "Contract breach notices",
        "Compliance violation notices",
        "Professional drafting",
        "Signed and posted",
        "Acknowledgment tracking",
      ],
      cta: "Send Notice",
      serviceType: "legal-notice",
    },
    {
      title: "Legal Consultation",
      price: "₹299",
      period: "per session",
      description:
        "Expert legal consultation for business decisions and strategy",
      features: [
        "1-hour consultation session",
        "Business legal advice",
        "Contract review",
        "Compliance guidance",
        "Written summary",
        "Follow-up support",
      ],
      cta: "Book Consultation",
      serviceType: "consultation",
    },
    {
      title: "Document Drafting",
      price: "₹2,999",
      period: "per document",
      description: "Professional legal document drafting and review",
      features: [
        "Employment contracts",
        "Partnership agreements",
        "Business contracts",
        "Legal compliance review",
        "Unlimited revisions",
        "Final document delivery",
      ],
      cta: "Draft Document",
      serviceType: "document-drafting",
    },
    {
      title: "Corporate Retainer",
      price: "₹9,999",
      period: "per month",
      description: "Ongoing legal support for growing businesses",
      features: [
        "Unlimited consultations",
        "Contract management",
        "Compliance monitoring",
        "Monthly legal reports",
        "Priority support",
        "Dedicated legal team",
      ],
      cta: "Get Retainer",
      serviceType: "corporate-retainer",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {pricingPlans.map((plan, index) => (
        <Card
          key={index}
          className="relative hover:shadow-lg transition-all duration-300"
        >
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              {plan.title}
            </CardTitle>
            <div className="mb-2">
              {plan.originalPrice && (
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-lg text-muted-foreground line-through">
                    {plan.originalPrice}
                  </span>
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                    {plan.discount}
                  </span>
                </div>
              )}
              <div className="text-4xl font-bold text-primary">
                {plan.price}
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              {plan.period}
            </div>
            <p className="text-sm text-muted-foreground">{plan.description}</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => openForm(plan.serviceType)}
            >
              {plan.cta}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
