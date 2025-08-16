"use client";

import { useFormContext } from "@/contexts/form-context";
import Link from "next/link";
import { getTopicContent } from "@/data/topic-content";

interface LegalNoticeTopicLandingProps {
  topicTitle: string;
  description?: string;
  city?: string;
  topicKey?: string;
}

// Type guard to narrow enhanced TopicContent
function isTopicContent(
  x: unknown
): x is import("@/data/topic-content").TopicContent {
  return (
    !!x &&
    typeof x === "object" &&
    "heroTitle" in (x as Record<string, unknown>) &&
    "leadContent" in (x as Record<string, unknown>)
  );
}

function selectContent(topicTitle: string, topicKey?: string) {
  const t = topicTitle.toLowerCase();
  const key = topicKey?.toLowerCase() || t;

  // Demand Notice for Recovery of Money
  if (
    key.includes("demand-notice-recovery-of-money") ||
    key.includes("recovery-of-money") ||
    t.includes("demand notice for recovery of money")
  ) {
    return {
      heroImage: "/legal-notice/consumer-disputes.png",
      hero: {
        title: "Recover Your Money Legally",
        subtitle:
          "Professional legal notice to demand payment of outstanding dues with statutory backing",
        benefits: [
          "✓ Drafted by experienced advocates",
          "✓ Compliant with Indian legal standards",
          "✓ Trackable delivery with proof",
          "✓ 95% success rate in recovery",
        ],
      },
      who: [
        "Someone owes you money and is not responding to your calls or messages",
        "You have lent money personally or through your business",
        "You want to recover dues without going to court immediately",
        "You need formal documentation before filing a lawsuit",
      ],
      documents: [
        "Loan agreement, promissory note, or acknowledgment receipt",
        "Bank transfer records, cheque copies, or payment proof",
        "WhatsApp chats, emails, or SMS showing acknowledgment of debt",
        "Debtor's complete name, address, and contact details",
      ],
      deliverables: [
        "Professionally drafted legal demand notice citing relevant laws",
        "Registered post/courier delivery with acknowledgment receipt",
        "Legal strategy for next steps if payment is not received",
        "Template for follow-up communications and escalation",
      ],
      process: [
        {
          icon: "📋",
          title: "Document Review",
          text: "We analyze your documents and assess the strength of your claim",
        },
        {
          icon: "⚖️",
          title: "Legal Drafting",
          text: "Expert lawyers draft a compelling notice citing relevant legal provisions",
        },
        {
          icon: "📮",
          title: "Professional Dispatch",
          text: "Notice served via registered post with delivery confirmation",
        },
        {
          icon: "📞",
          title: "Follow-up Support",
          text: "Guidance on next legal steps if payment is not received",
        },
      ],
      timeline: [
        { label: "Document Review", value: "Same day" },
        { label: "Notice Drafting", value: "24-48 hours" },
        { label: "Dispatch & Delivery", value: "2-3 days" },
        { label: "Response Period", value: "15-30 days" },
      ],
      notes: [
        "Legal notice is often the most cost-effective way to recover money without litigation.",
        "A well-drafted notice has high psychological impact and often leads to settlement.",
        "Proper service of notice is crucial for admissibility in future legal proceedings.",
      ],
    };
  }

  if (t.includes("dishonour") || t.includes("cheque") || t.includes("bounce")) {
    return {
      heroImage: "/legal-notice/consumer-disputes.png",
      hero: {
        title: "Cheque Bounce Legal Notice",
        subtitle:
          "Swift action under Section 138 NI Act for dishonoured cheques",
        benefits: [
          "✓ Section 138 NI Act compliant",
          "✓ Statutory 15-day notice period",
          "✓ Criminal case ready documentation",
          "✓ Expert legal guidance",
        ],
      },
      who: [
        "Your cheque was returned unpaid (insufficient funds/stop payment)",
        "You received bank memo within the last 30 days",
        "You want to demand payment under Sec 138 NI Act",
      ],
      documents: [
        "Bank return memo and cheque copy",
        "Any invoice/loan agreement proving liability",
        "Drawer details (name, address, bank branch)",
      ],
      deliverables: [
        "Statutory demand notice under Sec 138 NI Act",
        "Dispatch via speed post/courier with acknowledgment",
        "Escalation guidance if payment not received in 15 days",
      ],
      process: [
        {
          icon: "📑",
          title: "Collect proofs",
          text: "Upload bank memo, cheque and transaction proof",
        },
        {
          icon: "🧾",
          title: "Draft notice",
          text: "Lawyer drafts NI Act compliant demand notice",
        },
        {
          icon: "✉️",
          title: "Serve notice",
          text: "Notice sent to drawer with proof of delivery",
        },
        {
          icon: "⚖️",
          title: "Next steps",
          text: "If unpaid in 15 days, file complaint within 1 month",
        },
      ],
      timeline: [
        { label: "Drafting", value: "24–48 hrs" },
        { label: "Dispatch", value: "1–2 days" },
        { label: "Response window", value: "15 days (statutory)" },
      ],
      notes: [
        "Send notice within 30 days of receiving return memo.",
        "Maintain delivery proof and timeline to preserve cause of action.",
      ],
    };
  }

  if (
    t.includes("divorce") ||
    t.includes("matrimon") ||
    t.includes("conjugal")
  ) {
    return {
      heroImage: "/legal-notice/matrimonial-disputes.png",
      who: [
        "You are considering divorce or separation",
        "You want to formally communicate grounds and intent",
        "You wish to claim maintenance, custody or residence rights",
      ],
      documents: [
        "Marriage certificate and ID/address proof",
        "Summary of facts and incidents (timeline)",
        "Evidence of cruelty/desertion/financial abuse (if any)",
      ],
      deliverables: [
        "Well‑structured legal notice stating grounds and demands",
        "Proposal for mediation/mutual settlement, if applicable",
        "Guidance on next lawful steps and jurisdiction",
      ],
      process: [
        {
          icon: "🗣️",
          title: "Consult",
          text: "Private call to understand background and objectives",
        },
        {
          icon: "📝",
          title: "Draft",
          text: "Lawyer prepares notice with appropriate legal grounds",
        },
        {
          icon: "📮",
          title: "Serve",
          text: "Notice dispatched and acknowledgment preserved",
        },
        {
          icon: "🤝",
          title: "Resolve",
          text: "Assist with negotiation/filing as per your choice",
        },
      ],
      timeline: [
        { label: "First draft", value: "24–48 hrs" },
        { label: "Revisions", value: "Same day" },
        { label: "Dispatch", value: "1 day" },
      ],
      notes: [
        "Contents are tailored to your personal situation and laws in your state.",
        "We maintain strict confidentiality and privacy.",
      ],
    };
  }

  if (t.includes("eviction") || t.includes("tenant")) {
    return {
      heroImage: "/legal-notice/consumer-disputes.png",
      who: [
        "Tenant defaulted on rent or violated terms",
        "You need to recover possession or dues",
        "You require a valid pre‑litigation eviction notice",
      ],
      documents: [
        "Rent agreement and KYC",
        "Payment history/arrears calculation",
        "Any correspondence or evidence of breach",
      ],
      deliverables: [
        "Eviction/arrears demand notice as per local Rent Act",
        "Correct notice period and service method",
        "Guidance on filing eviction suit if unresolved",
      ],
      process: [
        {
          icon: "📄",
          title: "Review",
          text: "We review agreement and arrears",
        },
        {
          icon: "✍️",
          title: "Draft",
          text: "Notice drafted with statutory grounds",
        },
        { icon: "📬", title: "Serve", text: "Delivered with proof of service" },
        {
          icon: "🏛️",
          title: "Follow‑up",
          text: "Assist with suit/settlement if required",
        },
      ],
      timeline: [
        { label: "Drafting", value: "24–48 hrs" },
        {
          label: "Notice period",
          value: "Typically 15–30 days (state‑specific)",
        },
      ],
      notes: ["State‑specific rules apply; timelines may vary."],
    };
  }

  if (
    t.includes("breach") ||
    t.includes("contract") ||
    t.includes("specific performance")
  ) {
    return {
      heroImage: "/legal-notice/consumer-disputes.png",
      who: [
        "Counter‑party failed to perform contractual duties",
        "You seek performance or damages under the Contract Act",
      ],
      documents: [
        "Executed contract/PO/SOW",
        "Communication evidencing breach",
        "Loss computation and milestones",
      ],
      deliverables: [
        "Breach notice citing relevant clauses and Sections 73/74",
        "Demand for cure within stipulated time",
        "Readiness to initiate arbitration/civil action",
      ],
      process: [
        {
          icon: "📑",
          title: "Assess",
          text: "We map breach to contract obligations",
        },
        {
          icon: "🖋️",
          title: "Draft",
          text: "Detailed legal notice with reliefs sought",
        },
        { icon: "📤", title: "Serve", text: "Dispatch with acknowledgment" },
        {
          icon: "⚖️",
          title: "Act",
          text: "Escalate via arbitration/court if no cure",
        },
      ],
      timeline: [
        { label: "Drafting", value: "2–3 days for complex contracts" },
        { label: "Cure period", value: "7–15 days (typical)" },
      ],
      notes: [
        "Keep an evidence trail. Avoid fresh breaches while enforcing rights.",
      ],
    };
  }

  // Generic fallback
  return {
    heroImage: "/legal-notice/request-a-callback.png",
    hero: {
      title: "Professional Legal Notice Service",
      subtitle:
        "Expert legal notice drafting and delivery for all legal matters",
      benefits: [
        "✓ Expert legal drafting",
        "✓ Proper legal service",
        "✓ Strategic guidance",
        "✓ Comprehensive support",
      ],
    },
    who: [
      "You want to formally demand action or payment",
      "You prefer a pre‑litigation resolution first",
    ],
    documents: [
      "Agreement/communications supporting your claim",
      "ID/address of parties",
    ],
    deliverables: [
      "Lawyer‑drafted legal notice",
      "Proper service with proof",
      "Next‑step strategy",
    ],
    process: [
      { icon: "🗓️", title: "Book", text: "Place request and share documents" },
      { icon: "📝", title: "Draft", text: "Notice prepared for your approval" },
      { icon: "📮", title: "Serve", text: "We dispatch and track delivery" },
      { icon: "🧭", title: "Next", text: "Assist with negotiation/escalation" },
    ],
    timeline: [
      { label: "Drafting", value: "24–48 hrs" },
      { label: "Dispatch", value: "1 day" },
    ],
    notes: ["Timelines vary by case complexity and serviceability."],
  };
}

export function LegalNoticeTopicLanding({
  topicTitle,
  description,
  city,
  topicKey,
}: LegalNoticeTopicLandingProps) {
  const { openForm } = useFormContext();
  const normalized = topicTitle.trim();
  const startsWithLegalNotice = normalized
    .toLowerCase()
    .startsWith("legal notice");
  const headingTitle = startsWithLegalNotice ? normalized : `${normalized}`;

  // Try to get enhanced content first, then fall back to legacy content
  const enhancedContent = topicKey ? getTopicContent(topicKey) : null;
  const c = enhancedContent ?? selectContent(topicKey || topicTitle, topicKey);
  const isEnhanced = isTopicContent(c);
  const benefitsList: string[] | undefined = isEnhanced
    ? c.benefits
    : c.hero?.benefits;
  const heroImageUrl: string | undefined = isEnhanced ? undefined : c.heroImage;
  const leadContentText: string | undefined = isEnhanced
    ? c.leadContent
    : undefined;
  return (
    <div className="container mx-auto px-4 pb-8">
      {/* Enhanced Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[800px] bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl opacity-20" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  Professional Legal Service
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  {(isEnhanced ? c.heroTitle : c.hero?.title) ||
                    `Send ${headingTitle}`}
                  {city && (
                    <span className="block text-primary mt-2">in {city}</span>
                  )}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {(isEnhanced ? c.heroSubtitle : c.hero?.subtitle) ||
                    description ||
                    "Professional legal notice drafting and delivery service with expert guidance."}
                </p>

                {/* Benefits */}
                {benefitsList && (
                  <div className="grid grid-cols-2 gap-3">
                    {(benefitsList || []).map(
                      (benefit: string, index: number) => (
                        <div
                          key={index}
                          className="text-sm text-foreground font-medium"
                        >
                          {benefit}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => openForm("legal-notice")}
                >
                  Start Recovery Process
                </button>
                <Link
                  href={`?type=legal-notice`}
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 text-center"
                >
                  Get Free Consultation
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span>Expert Lawyers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span>24-48 Hour Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span>95% Success Rate</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center">
                <img
                  src={heroImageUrl}
                  alt={`${headingTitle} illustration`}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Lead Generation Content Section */}
      {leadContentText && (
        <section className="bg-gradient-to-r from-secondary/50 to-secondary/30 py-12 my-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Why Choose Legal Notice for {headingTitle}?
              </h2>
              <div className="text-lg text-muted-foreground leading-relaxed text-left">
                {leadContentText
                  .split(". ")
                  .map((sentence: string, index: number) => (
                    <p key={index} className="mb-4">
                      {sentence}
                      {sentence.endsWith(".") ? "" : "."}
                    </p>
                  ))}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => openForm("legal-notice")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Your Legal Notice Today
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Explainer + CTA card */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="w-full h-52 rounded-xl overflow-hidden bg-muted/30 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImageUrl}
              alt="topic"
              className="h-full object-contain"
            />
          </div>
          {/* Enhanced content sections */}
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-blue-600">👥</span>
                Who is this service for?
              </h2>
              <div className="grid gap-3">
                {c.who.map((w: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-background/60 rounded-lg"
                  >
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-foreground">{w}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-amber-600">📄</span>
                Documents you&apos;ll need
              </h2>
              <div className="grid gap-3">
                {c.documents.map((d: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-background/60 rounded-lg"
                  >
                    <span className="text-amber-500 mt-0.5">📋</span>
                    <span className="text-foreground">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-green-600">🎯</span>
                What you&apos;ll receive
              </h2>
              <div className="grid gap-3">
                {c.deliverables.map((d: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-background/60 rounded-lg"
                  >
                    <span className="text-green-500 mt-0.5">🚀</span>
                    <span className="text-foreground">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground text-center">
              How our process works
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Simple, transparent process to get your money back legally
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {c.process.map(
                (
                  p: { icon: string; title: string; text: string },
                  index: number
                ) => (
                  <div
                    key={p.title}
                    className="relative bg-gradient-to-br from-card to-primary/5 border border-primary/10 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                        {p.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-bold">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <h3 className="font-bold text-foreground">
                            {p.title}
                          </h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {p.text}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground text-center">
              Timeline & Expected Outcomes
            </h2>

            <div className="grid md:grid-cols-4 gap-4">
              {c.timeline.map(
                (t: { label: string; value: string }, index: number) => (
                  <div key={t.label} className="relative">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 text-primary font-bold">
                        {index + 1}
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {t.label}
                      </div>
                      <div className="font-bold text-lg text-primary">
                        {t.value}
                      </div>
                    </div>
                    {index < c.timeline.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-primary/30" />
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          {c.notes?.length ? (
            <div className="mt-3 text-xs text-muted-foreground">
              {c.notes.map((n: string) => (
                <div key={n}>• {n}</div>
              ))}
            </div>
          ) : null}
        </div>
        {/* Enhanced CTA Card */}
        <div className="sticky top-8">
          <div className="border border-primary/20 rounded-2xl p-6 bg-gradient-to-br from-card to-primary/5 shadow-xl backdrop-blur-sm">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Get Started Today
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <span className="text-sm font-medium">Advance Payment</span>
                  <span className="text-2xl font-bold text-primary">₹400</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Balance due only after draft approval
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => openForm("legal-notice")}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Start Recovery Process
                </button>
                <Link
                  href={`?type=legal-notice`}
                  className="block w-full text-center border border-primary/20 text-primary hover:bg-primary/5 rounded-lg py-3 font-medium transition-all duration-300"
                >
                  Get Free Consultation
                </Link>
              </div>

              {/* Trust badges */}
              <div className="pt-4 border-t border-border/50 space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <span>🛡️</span>
                  <span>100% Confidential</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <span>⚖️</span>
                  <span>Expert Legal Team</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <span>📞</span>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LegalNoticeTopicLanding;
