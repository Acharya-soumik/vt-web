import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import LegalNoticeTopicLanding from "@/components/features/landing-pages/legal-notice-topic-landing";
import { generateServiceMetadata } from "@/lib/seo";
import { indianCities } from "@/data/indian-cities";
import { legalNoticeTopics } from "@/data/legal-notice-topics";
import { slugify } from "@/lib/slug";
import Link from "next/link";
import { getLocalitiesByCity } from "@/data/localities";
import { TrustSignalsSection } from "@/components/features/homepage/trust-signals";
import { FAQSection } from "@/components/shared/faq-section";
import { getLegalNoticeTopicFaqs } from "@/data/faqs";

export function generateStaticParams() {
  const topics = legalNoticeTopics.map((t) => t.id);
  const cities = indianCities.slice(0, 30).map((c) => slugify(c.city));
  const params: Array<{ topic: string; city: string }> = [];
  topics.forEach((topic) => {
    cities.forEach((city) => params.push({ topic, city }));
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string; city: string }>;
}): Promise<Metadata> {
  const { topic: topicId, city } = await params;
  const topic = legalNoticeTopics.find((t) => t.id === topicId);
  const cityName = city.replace(/-/g, " ");
  const title = topic
    ? `${topic.title} in ${cityName}`
    : `Legal Notice in ${cityName}`;
  const description = topic?.description;
  return generateServiceMetadata("send-a-legal-notice", title, description, {
    topic: topic?.title,
    city: cityName,
    path: `/send-a-legal-notice/${topicId}/${city}`,
  });
}

export default async function LegalNoticeTopicCityPage({
  params,
}: {
  params: Promise<{ topic: string; city: string }>;
}) {
  const { topic: topicId, city } = await params;
  const topic = legalNoticeTopics.find((t) => t.id === topicId);
  const cityName = city.replace(/-/g, " ");
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Legal Notice", href: "/send-a-legal-notice" },
    { label: topic?.title || "Topic", href: `/send-a-legal-notice/${topicId}` },
    { label: cityName, current: true },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/55">
      <div className="container mx-auto px-4 pt-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      {topic && (
        <LegalNoticeTopicLanding
          topicTitle={topic.title}
          description={topic.description}
          city={cityName}
          topicKey={topic.id}
        />
      )}

      {/* Topic + City explainer */}
      <section className="container mx-auto px-4 pb-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-semibold">
              {topic?.title} in {cityName}
            </h2>
            <p className="text-muted-foreground">{topic?.description}</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Draft prepared by experienced advocates in {cityName}</li>
              <li>Legally compliant format with annexures</li>
              <li>Dispatched via speed post/courier with acknowledgment</li>
            </ul>
          </div>
          {/* CTA widget */}
          <div className="border rounded-xl p-4 bg-card shadow-sm h-max">
            <h3 className="text-lg font-semibold mb-2">Start now</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Advance to initiate case</span>
                <span className="font-semibold">₹400</span>
              </div>
              <Link
                href={`?type=legal-notice`}
                className="block text-center bg-primary text-primary-foreground rounded-md py-2 mt-2"
              >
                Raise a request
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Balance due only after draft approval.
            </p>
          </div>
        </div>
      </section>

      {/* Localities pills */}
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

      {/* Cross-links to topic or city variations */}
      <section className="container mx-auto px-4 pb-8">
        <h3 className="text-xl font-semibold mb-3">Explore more</h3>
        <div className="flex flex-wrap gap-3">
          {["mumbai", "delhi", "bangalore", "chennai", "hyderabad", "kolkata"]
            .filter((c) => c !== city.toLowerCase())
            .map((c) => (
              <Link
                key={c}
                href={`/send-a-legal-notice/${topicId}/${c}`}
                className="text-sm text-primary underline underline-offset-4"
              >
                {topic?.title} in {c.charAt(0).toUpperCase() + c.slice(1)}
              </Link>
            ))}
          <Link
            href={`/send-a-legal-notice/${topicId}`}
            className="text-sm text-primary underline underline-offset-4"
          >
            Read about {topic?.title}
          </Link>
        </div>
      </section>

      <TrustSignalsSection />
      <FAQSection
        faqs={getLegalNoticeTopicFaqs(topicId, cityName)}
        title={`${topic?.title} in ${cityName} — FAQs`}
        subtitle="Common questions about drafting, dispatch and timelines"
      />
    </main>
  );
}
