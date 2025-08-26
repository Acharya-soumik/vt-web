"use client";

import { Button } from "@/components/ui/button";
import { useFormContext } from "@/contexts/form-context";

export function PricingCTA() {
  const { openForm } = useFormContext();

  return (
    <section className="text-center">
      <h2 className="text-3xl font-bold mb-6 text-foreground">
        Ready to Get Started?
      </h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Choose the service that fits your needs and get started with
        professional legal support today.
      </p>
      <div className="space-x-4">
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
          onClick={() => openForm("consultation")}
        >
          Book Consultation
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-primary text-primary hover:bg-secondary px-8 py-3"
          onClick={() => window.history.back()}
        >
          Back to Services
        </Button>
      </div>
    </section>
  );
}
