// Google Analytics 4 configuration
export const ANALYTICS_PROVIDER =
  process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ||
  process.env.ANALYTICS_PROVIDER ||
  "google-analytics-4";
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID || "";
export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || process.env.NEXT_PUBLIC_ADS_ID || "";

// Microsoft Clarity configuration
export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "tahkx6q1d9";

// Validation
export const isAnalyticsConfigured = !!(GA_MEASUREMENT_ID || GOOGLE_ADS_ID);
export const isGAConfigured = !!GA_MEASUREMENT_ID;
export const isAdsConfigured = !!GOOGLE_ADS_ID;
export const isClarityConfigured = !!CLARITY_PROJECT_ID;

// Validation warnings (development only)
if (process.env.NODE_ENV === 'development') {
  if (!isAnalyticsConfigured) {
    console.warn('[Analytics] No GA4 or Google Ads ID configured. Set NEXT_PUBLIC_ANALYTICS_ID or NEXT_PUBLIC_GOOGLE_ADS_ID');
  }
}

// Documentation:
// ANALYTICS_PROVIDER: 'google-analytics-4' (default)
// GA_MEASUREMENT_ID: Your GA4 Measurement ID (e.g., G-XXXXXXXXXX)
// GOOGLE_ADS_ID: Your Google Ads Conversion ID (e.g., AW-XXXXXXXXXX)
// CLARITY_PROJECT_ID: Your Microsoft Clarity Project ID (e.g., tahkx6q1d9)
