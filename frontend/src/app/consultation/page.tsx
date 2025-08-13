import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ConsultationLanding } from "@/components/features/landing-pages/consultation-landing";
import { FAQSection } from "@/components/shared/faq-section";
import { consultationFAQs } from "@/data/faqs";
import { generateServiceMetadata } from "@/lib/seo";
import Link from "next/link";
import { indianCities } from "@/data/indian-cities";
import { slugify } from "@/lib/slug";

export const metadata: Metadata = generateServiceMetadata("consultation");

export default function ConsultationPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Legal Consultation", current: true },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/55">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <ConsultationLanding />
      <section className="container mx-auto px-4 pb-12">
        <h2 className="text-xl font-semibold mb-4">Popular in cities</h2>
        <div className="flex flex-wrap gap-3">
          {indianCities.slice(0, 24).map((c) => (
            <Link
              key={c.city}
              href={`/consultation/${slugify(c.city)}`}
              className="text-sm text-primary underline underline-offset-4"
            >
              Consult a lawyer in {c.city}
            </Link>
          ))}
        </div>
      </section>
      <FAQSection
        faqs={consultationFAQs}
        title="Legal Consultation FAQs"
        subtitle="Common questions about our consultation services"
      />
    </main>
  );
}
