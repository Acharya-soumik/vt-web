// Google Tag Manager configuration
export const ANALYTICS_PROVIDER = "google-tag-manager";
export const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID || "";
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID || "";
export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || process.env.NEXT_PUBLIC_ADS_ID || "";

// Microsoft Clarity configuration
export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "tahkx6q1d9";

// Validation
export const isAnalyticsConfigured = !!(GTM_CONTAINER_ID || GA_MEASUREMENT_ID || GOOGLE_ADS_ID);
export const isGAConfigured = !!GA_MEASUREMENT_ID;
export const isAdsConfigured = !!GOOGLE_ADS_ID;
export const isClarityConfigured = !!CLARITY_PROJECT_ID;

// Validation warnings (development only)
if (process.env.NODE_ENV === 'development') {
  if (!isAnalyticsConfigured) {
    console.warn('[Analytics] No GTM Container ID configured. Set NEXT_PUBLIC_GTM_CONTAINER_ID');
  }
}

// Documentation:
// ANALYTICS_PROVIDER: 'google-tag-manager' (GTM setup)
// GTM_CONTAINER_ID: Your GTM Container ID (e.g., GTM-XXXXXXXXX)
// GA_MEASUREMENT_ID: Your GA4 Measurement ID (e.g., G-XXXXXXXXXX) - managed via GTM
// GOOGLE_ADS_ID: Your Google Ads Conversion ID (e.g., AW-XXXXXXXXXX) - managed via GTM
// CLARITY_PROJECT_ID: Your Microsoft Clarity Project ID (e.g., tahkx6q1d9)
