"use client";

import { useFormContext } from "@/contexts/form-context";
import Link from "next/link";

interface LegalNoticeTopicLandingProps {
  topicTitle: string;
  description?: string;
  city?: string;
  topicKey?: string;
}

function selectContent(topicTitle: string) {
  const t = topicTitle.toLowerCase();
  if (t.includes("dishonour") || t.includes("cheque") || t.includes("bounce")) {
    return {
      heroImage: "/legal-notice/consumer-disputes.png",
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
  const c = selectContent(topicKey || topicTitle);
  return (
    <div className="container mx-auto px-4 pb-8">
      {/* Hero */}
      <section className="text-center py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            <span className="text-primary">Send {headingTitle}</span>
            {city ? (
              <>
                {" "}
                in <span className="text-primary">{city}</span>
              </>
            ) : null}
          </h1>
          {description ? (
            <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              {description}
            </p>
          ) : null}
          <div className="flex items-center justify-center gap-3">
            <button
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md"
              onClick={() => openForm("legal-notice")}
            >
              Start Now
            </button>
            <Link
              href={`?type=legal-notice`}
              className="border border-primary text-primary hover:bg-secondary px-6 py-3 rounded-md"
            >
              Quick Enquiry
            </Link>
          </div>
        </div>
      </section>

      {/* Explainer + CTA card */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="w-full h-52 rounded-xl overflow-hidden bg-muted/30 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.heroImage}
              alt="topic"
              className="h-full object-contain"
            />
          </div>
          <h2 className="text-2xl font-semibold">Who is this for</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            {c.who.map((w: string) => (
              <li key={w}>{w}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold pt-4">
            Documents you will need
          </h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            {c.documents.map((d: string) => (
              <li key={d}>{d}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold pt-4">What you will get</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            {c.deliverables.map((d: string) => (
              <li key={d}>{d}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold pt-4">How it works</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {c.process.map(
              (p: { icon: string; title: string; text: string }) => (
                <div
                  key={p.title}
                  className="border rounded-lg p-4 flex gap-3 items-start"
                >
                  <span className="text-2xl" aria-hidden>
                    {p.icon}
                  </span>
                  <div>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-muted-foreground text-sm">
                      {p.text}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          <h2 className="text-2xl font-semibold pt-4">Timelines & outcomes</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {c.timeline.map((t: { label: string; value: string }) => (
              <div key={t.label} className="border rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground">{t.label}</div>
                <div className="font-semibold">{t.value}</div>
              </div>
            ))}
          </div>

          {c.notes?.length ? (
            <div className="mt-3 text-xs text-muted-foreground">
              {c.notes.map((n: string) => (
                <div key={n}>• {n}</div>
              ))}
            </div>
          ) : null}
        </div>
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
            <p className="text-xs text-muted-foreground mt-2">
              Balance due only after draft approval.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LegalNoticeTopicLanding;
