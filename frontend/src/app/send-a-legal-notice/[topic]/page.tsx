import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import LegalNoticeTopicLandingUniform from "@/components/features/landing-pages/legal-notice-topic-landing-uniform";
import { generateServiceMetadata } from "@/lib/seo";
import { legalNoticeTopics } from "@/data/legal-notice-topics";
import Link from "next/link";
import { TrustSignalsSection } from "@/components/features/homepage/trust-signals";
import { FAQSection } from "@/components/shared/faq-section";
import { getLegalNoticeTopicFaqs } from "@/data/faqs";

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
  // Create shorter breadcrumb label by removing common prefixes
  const getBreadcrumbLabel = (title: string) => {
    return title
      .replace(
        /^(Legal Notice for|Notice for|Demand Notice for|Legal Notice to)\s*/i,
        ""
      )
      .replace(/^(Recovery of|Recovery from)\s*/i, "")
      .trim();
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Legal Notice", href: "/send-a-legal-notice" },
    { label: topic ? getBreadcrumbLabel(topic.title) : "Topic", current: true },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/55">
      <div className="container mx-auto px-4 pt-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      {topic && (
        <LegalNoticeTopicLandingUniform
          topicTitle={topic.title}
          description={topic.description}
          topicKey={topic.id}
        />
      )}

      <TrustSignalsSection />
      <FAQSection
        faqs={getLegalNoticeTopicFaqs(topicId)}
        title={`${topic?.title} — FAQs`}
        subtitle="Answers to common questions about drafting and sending a legal notice"
      />

      {/* Popular Topics Section - After FAQ */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold text-foreground">
            Popular Legal Notice Topics
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our comprehensive legal notice services for various legal
            matters
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                id: "demand-notice-recovery-of-money",
                title: "Money Recovery",
              },
              { id: "dishonoured-cheque", title: "Cheque Bounce" },
              { id: "unpaid-salary-wages", title: "Unpaid Salary" },
              { id: "security-deposit-recovery", title: "Security Deposit" },
              { id: "tenant-eviction", title: "Tenant Eviction" },
              { id: "workplace-harassment", title: "Workplace Harassment" },
              { id: "breach-of-contract", title: "Contract Breach" },
              { id: "defamation", title: "Defamation" },
              { id: "property-partition", title: "Property Partition" },
            ]
              .filter((t) => t.id !== topicId)
              .slice(0, 6)
              .map((topic) => (
                <Link
                  key={topic.id}
                  href={`/send-a-legal-notice/${topic.id}`}
                  className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-md transition-all duration-300 group"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 group-hover:text-foreground transition-colors">
                    Legal Notice Service
                  </p>
                </Link>
              ))}
          </div>

          <div className="pt-6">
            <Link
              href="/send-a-legal-notice"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              View All Legal Notice Services
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular City Pages - At the bottom */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h3 className="text-xl font-semibold text-foreground">
            {topic?.title} services in popular cities
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "mumbai",
              "delhi",
              "bangalore",
              "chennai",
              "hyderabad",
              "kolkata",
              "pune",
              "ahmedabad",
            ].map((c) => (
              <Link
                key={c}
                href={`/send-a-legal-notice/${topicId}/${c}`}
                className="text-sm text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
              >
                {topic?.title} in {c.charAt(0).toUpperCase() + c.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
