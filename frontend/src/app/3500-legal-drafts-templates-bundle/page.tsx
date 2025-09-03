import type { Metadata } from "next";
import { LegalDraftsBundleLanding } from "@/components/features/landing-pages/legal-drafts-bundle-landing";

export const metadata: Metadata = {
  title: "3500+ Legal Drafts Templates Bundle - Instant Download | Vakil Tech",
  description:
    "Get instant access to 3500+ professional legal drafts, agreements, contracts, notices, and more. Available in Hindi, English, and Marathi. Download immediately after payment.",
  keywords: [
    "legal drafts",
    "legal templates",
    "legal documents",
    "agreements",
    "contracts",
    "notices",
    "affidavits",
    "legal bundle",
    "instant download",
  ],
  openGraph: {
    title:
      "3500+ Legal Drafts Templates Bundle - Instant Download | Vakil Tech",
    description:
      "Get instant access to 3500+ professional legal drafts, agreements, contracts, notices, and more. Available in Hindi, English, and Marathi.",
    url: "/3500-legal-drafts-templates-bundle",
    type: "website",
    siteName: "Vakil Tech",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "3500+ Legal Drafts Templates Bundle - Instant Download | Vakil Tech",
    description:
      "Get instant access to 3500+ professional legal drafts, agreements, contracts, notices, and more.",
  },
  alternates: {
    canonical: "/3500-legal-drafts-templates-bundle",
  },
};

export default function LegalDraftsBundlePage() {
  return <LegalDraftsBundleLanding />;
}
