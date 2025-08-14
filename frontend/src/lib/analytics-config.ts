// Google Analytics 4 configuration
export const ANALYTICS_PROVIDER =
  process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ||
  process.env.ANALYTICS_PROVIDER ||
  "google-analytics-4";
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID || "";
export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || process.env.NEXT_PUBLIC_ADS_ID || "";

// Documentation:
// ANALYTICS_PROVIDER: 'google-analytics-4' (default)
// GA_MEASUREMENT_ID: Your GA4 Measurement ID (e.g., G-XXXXXXXXXX)
// GOOGLE_ADS_ID: Your Google Ads Conversion ID (e.g., AW-XXXXXXXXXX)
