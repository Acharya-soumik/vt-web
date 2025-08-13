"use client";

import { useFormContext } from "@/contexts/form-context";
import Link from "next/link";
import { getLocalitiesByCity } from "@/data/localities";

interface ConsultationCityLandingProps {
  city: string;
}

export function ConsultationCityLanding({
  city,
}: ConsultationCityLandingProps) {
  const { openForm } = useFormContext();

  return (
    <div className="container mx-auto px-4 pb-8">
      {/* Hero */}
      <section className="text-center py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Legal Consultation Services in{" "}
            <span className="text-primary">{city}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Book affordable online legal consultations with verified lawyers in{" "}
            {city}. Get quick guidance on business, contracts, employment,
            property and dispute matters.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md"
              onClick={() => openForm("consultation")}
            >
              Book Consultation
            </button>
            <Link
              href={`?type=consultation`}
              className="border border-primary text-primary hover:bg-secondary px-6 py-3 rounded-md"
            >
              Quick Enquiry
            </Link>
          </div>
        </div>
      </section>

      {/* Two column: intro + pricing */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-semibold">
            Consult top lawyers in {city}
          </h2>
          <p className="text-muted-foreground">
            Instant slot booking, multi-language support and 100% private
            sessions. Get actionable guidance with clear next-steps and document
            checklist.
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>Verified advocates for your subject area</li>
            <li>Available 7 days a week</li>
            <li>Follow-up summary and action plan</li>
          </ul>
        </div>
        <div className="border rounded-xl p-4 bg-card shadow-sm h-max">
          <h3 className="text-lg font-semibold mb-2">Consultation Plans</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">15 mins quick consult</span>
              <span className="font-semibold">₹449</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">30 mins detailed consult</span>
              <span className="font-semibold">₹849</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">60 mins strategy session</span>
              <span className="font-semibold">₹1449</span>
            </div>
            <Link
              href={`?type=consultation`}
              className="block text-center bg-primary text-primary-foreground rounded-md py-2 mt-2"
            >
              Book a consultation
            </Link>
            <p className="text-xs text-muted-foreground mt-2">
              Free reschedule once.
            </p>
          </div>
        </div>
      </section>

      {/* Localities */}
      <section className="pt-8">
        <h3 className="text-xl font-semibold mb-3">Popular areas in {city}</h3>
        <div className="flex flex-wrap gap-3">
          {getLocalitiesByCity(city).map((loc) => (
            <span
              key={loc}
              className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
            >
              {loc}
            </span>
          ))}
        </div>
      </section>

      {/* Areas of expertise */}
      <section className="pt-8">
        <h3 className="text-xl font-semibold mb-3">Areas of expertise</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { icon: "🏠", label: "Property & Real Estate" },
            { icon: "👨‍👩‍👧", label: "Family & Matrimonial" },
            { icon: "📜", label: "Contracts & Agreements" },
            { icon: "👔", label: "Employment & HR" },
            { icon: "🏢", label: "Corporate & Startup" },
            { icon: "🧾", label: "Tax & GST" },
            { icon: "⚖️", label: "Civil & Recovery" },
            { icon: "🚨", label: "Criminal & Bail" },
          ].map((item) => (
            <div
              key={item.label}
              className="border rounded-lg p-4 flex items-center gap-3"
            >
              <span className="text-2xl" aria-hidden>
                {item.icon}
              </span>
              <span className="text-sm text-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Languages supported */}
      <section className="pt-8">
        <h3 className="text-xl font-semibold mb-3">Consult in your language</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Hindi",
            "English",
            "Marathi",
            "Tamil",
            "Telugu",
            "Kannada",
            "Malayalam",
            "Bengali",
          ].map((lang) => (
            <span
              key={lang}
              className="text-sm px-3 py-1 rounded-full border bg-card"
            >
              {lang}
            </span>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="pt-8">
        <h3 className="text-xl font-semibold mb-3">How it works</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            {
              icon: "🧭",
              title: "Raise a request",
              text: "Raise a request for consultation with a lawyer",
            },
            {
              icon: "💳",
              title: "Pay securely",
              text: "Confirm a slot with secure payment",
            },
            {
              icon: "📞",
              title: "Talk to lawyer",
              text: "Consult with a lawyer regarding your issue",
            },
            {
              icon: "✅",
              title: "Get next steps",
              text: "Action plan and document checklist",
            },
          ].map((step) => (
            <div key={step.title} className="border rounded-lg p-4">
              <div className="text-2xl" aria-hidden>
                {step.icon}
              </div>
              <div className="font-medium mt-2">{step.title}</div>
              <div className="text-sm text-muted-foreground">{step.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust metrics */}
      <section className="pt-8">
        <div className="grid sm:grid-cols-3 gap-4 text-center">
          <div className="border rounded-lg p-4">
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-sm text-muted-foreground">
              Consultation availability
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="text-2xl font-bold">730K+</div>
            <div className="text-sm text-muted-foreground">
              Calls handled across India
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="text-2xl font-bold">4.8/5</div>
            <div className="text-sm text-muted-foreground">
              Average lawyer rating
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pt-10 text-center">
        <button
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-md"
          onClick={() => openForm("consultation")}
        >
          Consult now
        </button>
        <div className="text-xs text-muted-foreground mt-2">
          Confidential and secure
        </div>
      </section>

      {/* Benefits */}
      <section className="pt-8">
        <h3 className="text-xl font-semibold mb-3">
          Benefits of online consultation
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-muted-foreground">
          <div className="border rounded-lg p-4">
            Save time and travel — get advice from anywhere
          </div>
          <div className="border rounded-lg p-4">
            Transparent pricing, no hidden charges
          </div>
          <div className="border rounded-lg p-4">
            Pick subject-matter experts for your issue
          </div>
        </div>
      </section>
    </div>
  );
}

export default ConsultationCityLanding;
