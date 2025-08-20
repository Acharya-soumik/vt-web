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
    default: "Vakil Tech - Professional Legal Services",
    template: "%s | Vakil Tech",
  },
  description:
    "Professional legal services and consultation platform. Expert legal advice, document drafting, corporate retainers, and legal notices.",
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
    siteName: "Vakil Tech",
    title: "Vakil Tech - Professional Legal Services",
    description:
      "Professional legal services and consultation platform. Expert legal advice, document drafting, corporate retainers, and legal notices.",
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
    title: "Vakil Tech - Professional Legal Services",
    description:
      "Professional legal services and consultation platform. Expert legal advice, document drafting, corporate retainers, and legal notices.",
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
      title: "Legal Consultation Services",
      description:
        "Get expert legal consultation from experienced lawyers. Professional advice for all your legal needs.",
      keywords: [
        "legal consultation",
        "lawyer consultation",
        "legal advice",
        "legal expert",
      ],
    },
    "document-drafting": {
      title: "Legal Document Drafting Services",
      description:
        "Professional legal document drafting services. Contracts, agreements, notices, and legal documents.",
      keywords: [
        "document drafting",
        "legal documents",
        "contracts",
        "agreements",
        "legal notices",
      ],
    },
    "corporate-retainer": {
      title: "Corporate Legal Retainer Services",
      description:
        "Comprehensive corporate legal retainer services for businesses. Ongoing legal support and consultation.",
      keywords: [
        "corporate legal",
        "legal retainer",
        "business legal",
        "corporate law",
      ],
    },
    "send-a-legal-notice": {
      title: "Legal Notice Services",
      description:
        "Professional legal notice drafting and filing services. Cease and desist, demand letters, and legal notices.",
      keywords: [
        "legal notices",
        "cease and desist",
        "demand letters",
        "legal filing",
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
      title: "About Us",
      description:
        "Learn about Vakil Tech and our commitment to providing professional legal services.",
      keywords: ["about us", "legal services", "company"],
    },
    contact: {
      title: "Contact Us",
      description:
        "Get in touch with Vakil Tech for professional legal services and consultation.",
      keywords: ["contact us", "legal consultation", "get help"],
    },
    pricing: {
      title: "Pricing",
      description:
        "Transparent pricing for Vakil Tech legal services. View our service packages and rates.",
      keywords: ["pricing", "legal services cost", "service rates"],
    },
    careers: {
      title: "Careers - Join Our Expert Legal Team",
      description:
        "Join Vakil Tech's elite legal team. We're hiring expert lawyers to deliver exceptional legal services across India. Apply now to advance your career.",
      keywords: ["legal careers", "lawyer jobs", "legal employment", "expert lawyers", "legal team", "bar council", "legal practice"],
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
