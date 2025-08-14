import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import LegalNoticeTopicLanding from "@/components/features/landing-pages/legal-notice-topic-landing";
import { generateServiceMetadata } from "@/lib/seo";
import { legalNoticeTopics } from "@/data/legal-notice-topics";
import Link from "next/link";
import TestimonialsSection from "@/components/shared/testimonials-section";
import { TrustSignalsSection } from "@/components/features/homepage/trust-signals";
import { FAQSection } from "@/components/shared/faq-section";
import { legalNoticeFAQs, getLegalNoticeTopicFaqs } from "@/data/faqs";

export function generateStaticParams() {
  return legalNoticeTopics.map((t) => ({ topic: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic: topicId } = await params;
  const topic = legalNoticeTopics.find((t) => t.id === topicId);
  const title = topic ? `${topic.title} - Legal Notice` : "Legal Notice";
  const description = topic?.description;
  return generateServiceMetadata("send-a-legal-notice", title, description, {
    topic: topic?.title,
    path: `/send-a-legal-notice/${topicId}`,
  });
}

export default async function LegalNoticeTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: topicId } = await params;
  const topic = legalNoticeTopics.find((t) => t.id === topicId);
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Legal Notice", href: "/send-a-legal-notice" },
    { label: topic?.title || "Topic", current: true },
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
          topicKey={topic.id}
        />
      )}

      {/* Topic specific explainer */}
      <section className="container mx-auto px-4 pb-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-semibold">About {topic?.title}</h2>
            <p className="text-muted-foreground">{topic?.description}</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Drafted by experienced advocates</li>
              <li>Compliant with Indian law and procedure</li>
              <li>Signed and dispatched with proof of delivery</li>
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

      {/* Popular city suggestions cross-linking */}
      <section className="container mx-auto px-4 pb-8">
        <h3 className="text-xl font-semibold mb-3">Popular city pages</h3>
        <div className="flex flex-wrap gap-3">
          {[
            "mumbai",
            "delhi",
            "bangalore",
            "chennai",
            "hyderabad",
            "kolkata",
          ].map((c) => (
            <Link
              key={c}
              href={`/send-a-legal-notice/${topicId}/${c}`}
              className="text-sm text-primary underline underline-offset-4"
            >
              {topic?.title} in {c.charAt(0).toUpperCase() + c.slice(1)}
            </Link>
          ))}
        </div>
      </section>

      <TrustSignalsSection />
      <FAQSection
        faqs={getLegalNoticeTopicFaqs(topicId)}
        title={`${topic?.title} — FAQs`}
        subtitle="Answers to common questions about drafting and sending a legal notice"
      />
    </main>
  );
}
