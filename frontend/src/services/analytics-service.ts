// Analytics Service for Google Analytics 4
import { GA_MEASUREMENT_ID } from "../lib/analytics-config";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const ANALYTICS_DEBUG = process.env.NODE_ENV !== "production";

// GA4 Event Categories for better organization
export const EVENT_CATEGORIES = {
  PAGE_VIEW: "page_view",
  USER_ENGAGEMENT: "user_engagement",
  FORM_INTERACTION: "form_interaction",
  SERVICE_SELECTION: "service_selection",
  PAYMENT: "payment",
  CONVERSION: "conversion",
  NAVIGATION: "navigation",
  SEARCH: "search",
  CONTENT_ENGAGEMENT: "content_engagement",
  ERROR: "error",
} as const;

// GA4 Event Names for consistent tracking
export const EVENT_NAMES = {
  // Page Views
  PAGE_VIEW: "page_view",

  // User Engagement
  SCROLL_DEPTH: "scroll_depth",
  TIME_ON_PAGE: "time_on_page",
  CLICK: "click",

  // Form Interactions
  FORM_START: "form_start",
  FORM_STEP_VIEWED: "form_step_viewed",
  FORM_STEP_COMPLETED: "form_step_completed",
  FORM_STEP_ABANDONED: "form_step_abandoned",
  FORM_FIELD_FOCUS: "form_field_focus",
  FORM_FIELD_BLUR: "form_field_blur",
  FORM_FIELD_INPUT: "form_field_input",
  FORM_VALIDATION_ERROR: "form_validation_error",
  FORM_SUBMITTED: "form_submitted",
  FORM_ABANDONED: "form_abandoned",

  // Service Selection
  SERVICE_VIEWED: "service_viewed",
  SERVICE_SELECTED: "service_selected",
  SERVICE_COMPARED: "service_compared",

  // Payment Events
  PAYMENT_STARTED: "payment_started",
  PAYMENT_COMPLETED: "payment_completed",
  PAYMENT_FAILED: "payment_failed",
  PAYMENT_ABANDONED: "payment_abandoned",

  // Conversion Events
  LEAD_GENERATED: "lead_generated",
  CONSULTATION_BOOKED: "consultation_booked",
  LEGAL_NOTICE_ORDERED: "legal_notice_ordered",
  DOCUMENT_DRAFTED: "document_drafted",
  CORPORATE_RETAINER_SIGNED: "corporate_retainer_signed",

  // Navigation
  NAVIGATION_CLICK: "navigation_click",
  PAYMENT_BANNER_DISMISSED: "payment_banner_dismissed",
  BREADCRUMB_CLICK: "breadcrumb_click",
  CTA_CLICK: "cta_click",

  // Search
  SEARCH_PERFORMED: "search_performed",
  SEARCH_RESULT_CLICK: "search_result_click",

  // Content Engagement
  CONTENT_VIEWED: "content_viewed",
  FAQ_EXPANDED: "faq_expanded",
  TESTIMONIAL_VIEWED: "testimonial_viewed",

  // Error Events
  ERROR_OCCURRED: "error_occurred",
  FORM_ERROR: "form_error",
  PAYMENT_ERROR: "payment_error",
} as const;

export function trackPageView(url: string, title?: string) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  try {
    window.gtag?.("config", GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title,
    });
    if (ANALYTICS_DEBUG) {
      // eslint-disable-next-line no-console
      console.log("[Analytics] Page view tracked:", url, title);
    }
  } catch (err) {
    if (ANALYTICS_DEBUG) {
      // eslint-disable-next-line no-console
      console.error("[Analytics] Failed to track page view:", err);
    }
  }
}

export function trackEvent(
  event: string,
  params: Record<string, unknown> = {}
) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, params);
    if (ANALYTICS_DEBUG) {
      // eslint-disable-next-line no-console
      console.log("[Analytics] Event tracked:", event, params);
    }
  } catch (err) {
    if (ANALYTICS_DEBUG) {
      // eslint-disable-next-line no-console
      console.error("[Analytics] Failed to track event:", event, err);
    }
  }
}

// Enhanced tracking functions for specific user journeys

// Page View Tracking with Enhanced Parameters
export function trackEnhancedPageView(
  url: string,
  title?: string,
  additionalParams?: Record<string, unknown>
) {
  const params = {
    page_path: url,
    page_title: title,
    page_location: typeof window !== "undefined" ? window.location.href : url,
    ...additionalParams,
  };
  trackEvent(EVENT_NAMES.PAGE_VIEW, params);
}

// Form Interaction Tracking
export function trackFormStart(serviceType?: string, source?: string) {
  trackEvent(EVENT_NAMES.FORM_START, {
    service_type: serviceType,
    source: source,
    page_type: source,
    page_url: typeof window !== "undefined" ? window.location.href : undefined,
    referrer:
      typeof document !== "undefined"
        ? document.referrer || undefined
        : undefined,
    timestamp: Date.now(),
  });
}

export function trackFormStepViewed(
  stepNumber: number,
  stepName: string,
  serviceType?: string
) {
  trackEvent(EVENT_NAMES.FORM_STEP_VIEWED, {
    step_number: stepNumber,
    step: String(stepNumber),
    step_name: stepName,
    service_type: serviceType,
    timestamp: Date.now(),
  });
}

export function trackFormStepCompleted(
  stepNumber: number,
  stepName: string,
  serviceType?: string,
  timeSpent?: number
) {
  trackEvent(EVENT_NAMES.FORM_STEP_COMPLETED, {
    step_number: stepNumber,
    step: String(stepNumber),
    step_name: stepName,
    service_type: serviceType,
    time_spent_seconds: timeSpent,
    timestamp: Date.now(),
  });
}

export function trackFormStepAbandoned(
  stepNumber: number,
  stepName: string,
  serviceType?: string,
  reason?: string
) {
  trackEvent(EVENT_NAMES.FORM_STEP_ABANDONED, {
    step_number: stepNumber,
    step: String(stepNumber),
    step_name: stepName,
    service_type: serviceType,
    abandonment_reason: reason,
    timestamp: Date.now(),
  });
}

export function trackFormFieldInteraction(
  fieldName: string,
  action: "focus" | "blur",
  stepNumber?: number
) {
  const eventName =
    action === "focus"
      ? EVENT_NAMES.FORM_FIELD_FOCUS
      : EVENT_NAMES.FORM_FIELD_BLUR;
  trackEvent(eventName, {
    field_name: fieldName,
    step_number: stepNumber,
    step: stepNumber != null ? String(stepNumber) : undefined,
    timestamp: Date.now(),
  });
}

export function trackFormFieldInput(
  fieldName: string,
  inputAction: "input_started" | "input_changed",
  stepNumber?: number
) {
  trackEvent(EVENT_NAMES.FORM_FIELD_INPUT, {
    field_name: fieldName,
    input_action: inputAction,
    step_number: stepNumber,
    step: stepNumber != null ? String(stepNumber) : undefined,
    timestamp: Date.now(),
  });
}

export function trackFormValidationError(
  fieldName: string,
  errorType: string,
  stepNumber?: number
) {
  trackEvent(EVENT_NAMES.FORM_VALIDATION_ERROR, {
    field_name: fieldName,
    error_type: errorType,
    step_number: stepNumber,
    step: stepNumber != null ? String(stepNumber) : undefined,
    timestamp: Date.now(),
  });
}

export function trackFormSubmitted(
  serviceType: string,
  paymentChoice: string,
  formStepCount: number
) {
  trackEvent(EVENT_NAMES.FORM_SUBMITTED, {
    service_type: serviceType,
    payment_choice: paymentChoice,
    form_step_count: formStepCount,
    step: String(formStepCount),
    timestamp: Date.now(),
  });
}

export function trackFormAbandoned(
  stepNumber: number,
  serviceType?: string,
  reason?: string
) {
  trackEvent(EVENT_NAMES.FORM_ABANDONED, {
    step_number: stepNumber,
    step: String(stepNumber),
    service_type: serviceType,
    abandonment_reason: reason,
    timestamp: Date.now(),
  });
}

// Service Selection Tracking
export function trackServiceViewed(serviceType: string, pageUrl?: string) {
  trackEvent(EVENT_NAMES.SERVICE_VIEWED, {
    service_type: serviceType,
    page_url: pageUrl,
    timestamp: Date.now(),
  });
}

export function trackServiceSelected(
  serviceType: string,
  stepNumber: number,
  source?: string
) {
  trackEvent(EVENT_NAMES.SERVICE_SELECTED, {
    service_type: serviceType,
    step_number: stepNumber,
    source: source,
    timestamp: Date.now(),
  });
}

// Payment Tracking
export function trackPaymentStarted(
  serviceType: string,
  amount: number,
  paymentMethod: string
) {
  trackEvent(EVENT_NAMES.PAYMENT_STARTED, {
    service_type: serviceType,
    payment_amount: amount,
    payment_method: paymentMethod,
    currency: "INR",
    timestamp: Date.now(),
  });
}

export function trackPaymentCompleted(
  serviceType: string,
  amount: number,
  paymentMethod: string,
  paymentId?: string
) {
  trackEvent(EVENT_NAMES.PAYMENT_COMPLETED, {
    service_type: serviceType,
    payment_amount: amount,
    payment_method: paymentMethod,
    payment_id: paymentId,
    currency: "INR",
    timestamp: Date.now(),
  });
}

export function trackPaymentFailed(
  serviceType: string,
  amount: number,
  paymentMethod: string,
  errorReason?: string
) {
  trackEvent(EVENT_NAMES.PAYMENT_FAILED, {
    service_type: serviceType,
    payment_amount: amount,
    payment_method: paymentMethod,
    error_reason: errorReason,
    currency: "INR",
    timestamp: Date.now(),
  });
}

export function trackPaymentAbandoned(
  serviceType: string,
  amount: number,
  paymentMethod: string,
  stepAbandoned?: string
) {
  trackEvent(EVENT_NAMES.PAYMENT_ABANDONED, {
    service_type: serviceType,
    payment_amount: amount,
    payment_method: paymentMethod,
    step_abandoned: stepAbandoned,
    currency: "INR",
    timestamp: Date.now(),
  });
}

// Conversion Tracking
export function trackLeadGenerated(
  serviceType: string,
  source?: string,
  utmParams?: Record<string, string>
) {
  trackEvent(EVENT_NAMES.LEAD_GENERATED, {
    service_type: serviceType,
    source: source,
    utm_source: utmParams?.utm_source,
    utm_medium: utmParams?.utm_medium,
    utm_campaign: utmParams?.utm_campaign,
    timestamp: Date.now(),
  });
}

export function trackConsultationBooked(
  serviceType: string,
  city?: string,
  source?: string
) {
  trackEvent(EVENT_NAMES.CONSULTATION_BOOKED, {
    service_type: serviceType,
    city: city,
    source: source,
    timestamp: Date.now(),
  });
}

export function trackLegalNoticeOrdered(
  noticeType: string,
  city?: string,
  source?: string
) {
  trackEvent(EVENT_NAMES.LEGAL_NOTICE_ORDERED, {
    notice_type: noticeType,
    city: city,
    source: source,
    timestamp: Date.now(),
  });
}

// Navigation Tracking
export function trackNavigationClick(
  elementType: string,
  elementText: string,
  destinationUrl?: string
) {
  trackEvent(EVENT_NAMES.NAVIGATION_CLICK, {
    element_type: elementType,
    element_text: elementText,
    destination_url: destinationUrl,
    timestamp: Date.now(),
  });
}

export function trackPaymentBannerDismissed(reason?: string) {
  trackEvent(EVENT_NAMES.PAYMENT_BANNER_DISMISSED, {
    reason,
    timestamp: Date.now(),
  });
}

export function trackCTAClick(
  ctaType: string,
  ctaText: string,
  pageUrl?: string,
  serviceType?: string
) {
  trackEvent(EVENT_NAMES.CTA_CLICK, {
    cta_type: ctaType,
    cta_text: ctaText,
    page_url: pageUrl,
    service_type: serviceType,
    timestamp: Date.now(),
  });
}

// Content Engagement Tracking
export function trackContentViewed(
  contentType: string,
  contentTitle: string,
  pageUrl?: string
) {
  trackEvent(EVENT_NAMES.CONTENT_VIEWED, {
    content_type: contentType,
    content_title: contentTitle,
    page_url: pageUrl,
    timestamp: Date.now(),
  });
}

export function trackFAQExpanded(faqQuestion: string, pageUrl?: string) {
  trackEvent(EVENT_NAMES.FAQ_EXPANDED, {
    faq_question: faqQuestion,
    page_url: pageUrl,
    timestamp: Date.now(),
  });
}

// Error Tracking
export function trackError(
  errorType: string,
  errorMessage: string,
  pageUrl?: string,
  userAction?: string
) {
  trackEvent(EVENT_NAMES.ERROR_OCCURRED, {
    error_type: errorType,
    error_message: errorMessage,
    page_url: pageUrl,
    user_action: userAction,
    timestamp: Date.now(),
  });
}

// Scroll Depth Tracking
export function trackScrollDepth(percentage: number, pageUrl?: string) {
  trackEvent(EVENT_NAMES.SCROLL_DEPTH, {
    scroll_percentage: percentage,
    page_url: pageUrl,
    timestamp: Date.now(),
  });
}

// Time on Page Tracking
export function trackTimeOnPage(timeSpentSeconds: number, pageUrl?: string) {
  trackEvent(EVENT_NAMES.TIME_ON_PAGE, {
    time_spent_seconds: timeSpentSeconds,
    page_url: pageUrl,
    timestamp: Date.now(),
  });
}

// Utility function to get UTM parameters
export function getUTMParams(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get("utm_source") || "",
    utm_medium: urlParams.get("utm_medium") || "",
    utm_campaign: urlParams.get("utm_campaign") || "",
    utm_term: urlParams.get("utm_term") || "",
    utm_content: urlParams.get("utm_content") || "",
  };
}

// Utility function to get page type from URL
export function getPageType(url: string): string {
  if (url.includes("/send-a-legal-notice")) return "legal_notice_page";
  if (url.includes("/consultation")) return "consultation_page";
  if (url.includes("/document-drafting")) return "document_drafting_page";
  if (url.includes("/corporate-retainer")) return "corporate_retainer_page";
  if (url.includes("/pricing")) return "pricing_page";
  if (url.includes("/about")) return "about_page";
  if (url.includes("/contact")) return "contact_page";
  if (url === "/") return "homepage";
  return "other_page";
}

export function validateAnalyticsSetup() {
  if (typeof window === "undefined") return;
  if (!window.gtag) {
    if (ANALYTICS_DEBUG) {
      // eslint-disable-next-line no-console
      console.warn(
        "[Analytics] gtag is not available. Analytics may not be working."
      );
    }
    return false;
  }
  return true;
}
