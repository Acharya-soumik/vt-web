/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://vakiltech.in",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: "public",
  exclude: ["/api/*", "/admin/*", "/_next/*", "/404", "/500"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*", "/admin/*", "/_next/*"],
      },
    ],
    additionalSitemaps: [
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "https://vakiltech.in"
      }/sitemap.xml`,
    ],
  },
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  additionalPaths: async (config) => {
    // Precomputed slugs to avoid importing TS at runtime
    const citySlugs = [
      "mumbai",
      "delhi",
      "bangalore",
      "hyderabad",
      "chennai",
      "kolkata",
      "pune",
      "ahmedabad",
      "jaipur",
      "surat",
      "lucknow",
      "kanpur",
      "nagpur",
      "indore",
      "thane",
      "bhopal",
      "visakhapatnam",
      "pimpri-chinchwad",
      "patna",
      "vadodara",
      "ghaziabad",
      "ludhiana",
      "agra",
      "nashik",
      "faridabad",
      "meerut",
      "rajkot",
      "kalyan-dombivali",
      "vasai-virar",
      "varanasi",
      "srinagar",
      "aurangabad",
      "dhanbad",
      "amritsar",
      "allahabad",
      "ranchi",
      "howrah",
      "coimbatore",
      "jabalpur",
      "gwalior",
      "vijayawada",
      "jodhpur",
      "madurai",
      "raipur",
      "kota",
      "guwahati",
      "chandigarh",
      "solapur",
      "hubballi-dharwad",
      "bareilly",
    ];
    const topicIds = [
      "demand-notice-recovery-of-money",
      "demand-notice-loan-repayment",
      "dishonoured-cheque",
      "unpaid-salary-wages",
      "security-deposit-recovery",
      "outstanding-invoice-dues",
      "professional-fees-recovery",
      "refund-from-builder",
      "recovery-tenant-landlord",
      "wrongful-termination",
      "non-payment-salary-benefits",
      "workplace-harassment",
      "employee-misconduct",
      "breach-employment-contract",
      "absenteeism-negligence",
      "recovery-company-assets",
      "property-partition",
      "tenant-eviction",
      "tenant-non-payment",
      "tenant-property-damage",
      "landlord-repairs",
      "possession-of-property",
      "encroachment-trespassing",
      "specific-performance",
      "stop-illegal-construction",
      "amenities-society-builder",
      "divorce",
      "restitution-conjugal-rights",
      "child-custody",
      "domestic-violence",
      "maintenance-alimony",
      "annulment-of-marriage",
      "defamation",
      "harassment-threats",
      "breach-of-contract",
      "termination-of-contract",
      "non-performance-of-contract",
      "recovery-of-advance-payment",
      "violation-of-nda",
      "recovery-supply-of-goods",
      "franchise-disputes",
      "agency-distribution-disputes",
      "builder-delay-possession",
      "deficiency-in-service",
      "faulty-defective-product",
      "insurance-claim-disputes",
      "bank-loan-settlement",
      "airlines-travel-disputes",
      "telecom-internet-disputes",
      "cheque-bounce-sec-138",
      "criminal-defamation",
      "criminal-intimidation",
      "recovery-of-stolen-property",
      "copyright-trademark",
      "patent-infringement",
      "data-privacy-breach",
      "cyber-defamation",
      "environmental-violations",
      "arbitration-clause",
      "notice-to-government",
    ];

    const iso = new Date().toISOString();
    const paths = [];
    citySlugs.forEach((city) => {
      paths.push({
        loc: `/consultation/${city}`,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: iso,
      });
    });
    topicIds.forEach((topic) => {
      paths.push({
        loc: `/send-a-legal-notice/${topic}`,
        changefreq: "weekly",
        priority: 0.85,
        lastmod: iso,
      });
    });
    topicIds.slice(0, 25).forEach((topic) => {
      citySlugs.slice(0, 40).forEach((city) => {
        paths.push({
          loc: `/send-a-legal-notice/${topic}/${city}`,
          changefreq: "weekly",
          priority: 0.8,
          lastmod: iso,
        });
      });
    });
    return paths;
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for different page types
    let priority = config.priority;
    let changefreq = config.changefreq;

    // Homepage gets highest priority
    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    }

    // Service pages get high priority
    else if (
      [
        "/consultation",
        "/document-drafting",
        "/corporate-retainer",
        "/legal-notice",
      ].includes(path)
    ) {
      priority = 0.9;
      changefreq = "weekly";
    }

    // Legal pages get medium priority
    else if (
      [
        "/terms-of-service",
        "/privacy-policy",
        "/terms-and-conditions",
        "/terms-of-use",
      ].includes(path)
    ) {
      priority = 0.5;
      changefreq = "monthly";
    }

    // Other pages get standard priority
    else if (["/about", "/contact", "/pricing"].includes(path)) {
      priority = 0.7;
      changefreq = "monthly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
