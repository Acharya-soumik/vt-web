import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import ConsultationCityLanding from "@/components/features/landing-pages/consultation-city-landing";
import { generateServiceMetadata } from "@/lib/seo";
import { indianCities } from "@/data/indian-cities";
import { slugify } from "@/lib/slug";
import { getLocalitiesByCity } from "@/data/localities";
import { TrustSignalsSection } from "@/components/features/homepage/trust-signals";
import { FAQSection } from "@/components/shared/faq-section";
import { getConsultationCityFaqs } from "@/data/faqs";

export function generateStaticParams() {
  return indianCities
    .slice(0, 50)
    .map((city) => ({ city: slugify(city.city) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const cityName = city.replace(/-/g, " ");
  return generateServiceMetadata(
    "consultation",
    `Legal Consultation in ${cityName}`,
    undefined,
    {
      city: cityName,
      path: `/consultation/${city}`,
    }
  );
}

export default async function ConsultationCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityName = city.replace(/-/g, " ");
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Consultation", href: "/consultation" },
    { label: cityName, current: true },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/55">
      <div className="container mx-auto px-4 pt-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <ConsultationCityLanding city={cityName} />

      {/* City-specific intro */}
      <section className="container mx-auto px-4 pb-8">
        <div className="grid md:grid-cols-1 gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Consult top lawyers in {cityName}
            </h2>
            <p className="text-muted-foreground">
              Book affordable online legal consultations with verified lawyers
              in {cityName}. Get quick guidance on business, contracts,
              employment, property and dispute matters from experienced
              advocates.
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Instant slot booking, no waiting lines</li>
              <li>Multi-language support based on your preference</li>
              <li>100% private and secure consultation</li>
              <li>Clear next-steps and document checklist</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Popular localities within city */}
      <section className="container mx-auto px-4 pb-8">
        <h3 className="text-xl font-semibold mb-3">
          Popular areas in {cityName}
        </h3>
        <div className="flex flex-wrap gap-3">
          {getLocalitiesByCity(cityName).map((loc) => (
            <span
              key={loc}
              className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
            >
              {loc}
            </span>
          ))}
        </div>
      </section>

      {/* Advantages */}
      <section className="container mx-auto px-4 pb-8">
        <h3 className="text-xl font-semibold mb-3">
          Why consult a lawyer online
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-muted-foreground">
          <div className="border rounded-lg p-4">
            Talk in your language with verified lawyers
          </div>
          <div className="border rounded-lg p-4">
            Private, secure and recorded with consent
          </div>
          <div className="border rounded-lg p-4">
            Actionable guidance with next-steps checklist
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 pb-8">
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

      <TrustSignalsSection />
      <FAQSection
        faqs={getConsultationCityFaqs(cityName)}
        title={`Consultation in ${cityName} — FAQs`}
        subtitle="Common questions about booking and preparation"
      />
    </main>
  );
}
