import { Metadata } from "next";

// Base metadata configuration
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://vakiltech.in";

// SEO metadata types
export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title: string;
    description: string;
    type: "website";
    url: string;
    siteName: string;
    images?: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  twitter?: {
    card: "summary_large_image";
    title: string;
    description: string;
    images?: string[];
  };
}

export interface ServicePageMetadata extends PageMetadata {
  service:
    | "consultation"
    | "document-drafting"
    | "corporate-retainer"
    | "send-a-legal-notice";
  pricing?: string;
  features?: string[];
}

// Default metadata for the site
export const defaultMetadata: Metadata = {
  title: {
    default: "Vakiltech | Built on the Calibre of Expert Lawyers",
    template: "%s | Vakiltech",
  },
  description:
    "Get instant legal help from expert lawyers! Legal consultation, document drafting, legal notices & corporate services. 10,000+ happy clients across India.",
  keywords: [
    "legal services",
    "legal consultation",
    "document drafting",
    "corporate legal",
    "legal notices",
    "lawyer",
    "legal advice",
  ],
  authors: [{ name: "Vakil Tech" }],
  creator: "Vakil Tech",
  publisher: "Vakil Tech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Vakiltech",
    title: "Vakiltech | Built on the Calibre of Expert Lawyers",
    description:
      "Get instant legal help from expert lawyers! Legal consultation, document drafting, legal notices & corporate services. 15,000+ happy clients across India.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Vakil Tech - Professional Legal Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vakiltech | Built on the Calibre of Expert Lawyers",
    description:
      "Get instant legal help from expert lawyers! Legal consultation, document drafting, legal notices & corporate services. 15,000+ happy clients across India.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Helper function to generate metadata for service pages
export function generateServiceMetadata(
  service: ServicePageMetadata["service"],
  customTitle?: string,
  customDescription?: string,
  options?: { city?: string; topic?: string; path?: string }
): Metadata {
  const serviceConfig = {
    consultation: {
      title: "Talk to Expert Lawyers Online | Get Legal Advice in Minutes",
      description:
        "Connect with top-rated lawyers instantly! Get expert legal consultation from experienced advocates. 24/7 support, affordable rates, trusted by 10,000+ clients.",
      keywords: [
        "online lawyer consultation",
        "legal advice online",
        "expert lawyers",
        "instant legal help",
        "lawyer consultation online",
      ],
    },
    "document-drafting": {
      title:
        "Professional Legal Document Drafting | Custom Legal Papers Online",
      description:
        "Get custom legal documents drafted by expert lawyers. Contracts, agreements, MOUs, and more. Quick turnaround, legally sound, affordable pricing.",
      keywords: [
        "legal document drafting",
        "custom legal documents",
        "contract drafting",
        "agreement drafting",
        "legal papers online",
      ],
    },
    "corporate-retainer": {
      title: "Corporate Legal Retainer | Complete Business Law Support",
      description:
        "Comprehensive legal retainer services for startups and enterprises. Dedicated legal team, compliance support, contract management. Scale your business confidently.",
      keywords: [
        "corporate legal retainer",
        "business legal services",
        "startup legal support",
        "corporate law firm",
        "legal compliance",
      ],
    },
    "send-a-legal-notice": {
      title:
        "Send Legal Notice Online in 24 Hours | Legally Valid & Affordable",
      description:
        "Send legally valid notices online without visiting any office. Expert lawyers, instant drafting, 24-hour delivery. Trusted by 15,000+ clients across India.",
      keywords: [
        "send legal notice online",
        "legal notice online",
        "legal notice drafting",
        "online legal notice",
        "legal notice india",
      ],
    },
  };

  const config = serviceConfig[service];
  const citySuffix = options?.city ? ` in ${options.city}` : "";
  const topicPrefix = options?.topic ? `${options.topic} ` : "";
  const title =
    customTitle || `${topicPrefix}${config.title}${citySuffix}`.trim();
  const description =
    customDescription ||
    `${config.description}${citySuffix ? ` in ${options?.city}` : ""}`.trim();

  return {
    title,
    description,
    keywords: [
      ...((defaultMetadata.keywords as string[]) || []),
      ...config.keywords,
    ],
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: `${BASE_URL}${options?.path || `/${service}`}`,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
    alternates: {
      canonical: options?.path || `/${service}`,
    },
  };
}

// Helper function to generate metadata for legal pages
export function generateLegalMetadata(
  page:
    | "terms-of-service"
    | "privacy-policy"
    | "terms-and-conditions"
    | "terms-of-use",
  customTitle?: string,
  customDescription?: string
): Metadata {
  const pageConfig = {
    "terms-of-service": {
      title: "Terms of Service",
      description: "Terms of Service for Vakil Tech legal services platform.",
      keywords: ["terms of service", "legal terms", "service agreement"],
    },
    "privacy-policy": {
      title: "Privacy Policy",
      description: "Privacy Policy for Vakil Tech legal services platform.",
      keywords: ["privacy policy", "data protection", "privacy"],
    },
    "terms-and-conditions": {
      title: "Terms and Conditions",
      description:
        "Terms and Conditions for Vakil Tech legal services platform.",
      keywords: ["terms and conditions", "legal terms", "service agreement"],
    },
    "terms-of-use": {
      title: "Terms of Use",
      description:
        "Terms of Use and Disclaimer for Vakil Tech legal services platform.",
      keywords: ["terms of use", "disclaimer", "legal terms", "platform terms"],
    },
  };

  const config = pageConfig[page];
  const title = customTitle || config.title;
  const description = customDescription || config.description;

  return {
    title,
    description,
    keywords: [
      ...((defaultMetadata.keywords as string[]) || []),
      ...config.keywords,
    ],
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: `${BASE_URL}/${page}`,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
    alternates: {
      canonical: `/${page}`,
    },
  };
}

// Helper function to generate metadata for other pages
export function generatePageMetadata(
  page: "about" | "contact" | "pricing" | "careers",
  customTitle?: string,
  customDescription?: string
): Metadata {
  const pageConfig = {
    about: {
      title: "About Vakiltech | India's Leading Online Legal Platform",
      description:
        "Discover how Vakiltech revolutionizes legal services in India. 15,000+ satisfied clients, ₹2Cr+ legal fees saved, 4.8/5 rating. Expert lawyers, instant solutions.",
      keywords: [
        "about vakiltech",
        "online legal platform",
        "legal services india",
        "expert lawyers",
        "legal innovation",
      ],
    },
    contact: {
      title: "Contact Expert Lawyers | Get Legal Help Now | Vakiltech",
      description:
        "Need legal help? Contact our expert lawyers instantly! 24/7 support, instant consultation, affordable rates. Get your legal questions answered today.",
      keywords: [
        "contact lawyers",
        "legal help",
        "instant consultation",
        "expert legal advice",
        "legal support",
      ],
    },
    pricing: {
      title: "Affordable Legal Services Pricing | No Hidden Fees | Vakiltech",
      description:
        "Transparent, affordable legal service pricing. Fixed rates, no hidden fees. Legal consultation from ₹500, documents from ₹1000. Compare packages now!",
      keywords: [
        "legal services pricing",
        "affordable lawyers",
        "legal consultation fees",
        "transparent pricing",
        "fixed legal rates",
      ],
    },
    careers: {
      title: "Careers - Join Our Expert Legal Team",
      description:
        "Join Vakil Tech's elite legal team. We're hiring expert lawyers to deliver exceptional legal services across India. Apply now to advance your career.",
      keywords: [
        "legal careers",
        "lawyer jobs",
        "legal employment",
        "expert lawyers",
        "legal team",
        "bar council",
        "legal practice",
      ],
    },
  };

  const config = pageConfig[page];
  const title = customTitle || config.title;
  const description = customDescription || config.description;

  return {
    title,
    description,
    keywords: [
      ...((defaultMetadata.keywords as string[]) || []),
      ...config.keywords,
    ],
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: `${BASE_URL}/${page}`,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
    alternates: {
      canonical: `/${page}`,
    },
  };
}
