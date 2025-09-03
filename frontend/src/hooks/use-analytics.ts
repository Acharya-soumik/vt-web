import { useCallback } from "react";
import {
  trackPageView,
  trackEvent,
  ANALYTICS_DEBUG,
  validateAnalyticsSetup,
  trackEnhancedPageView,
  trackFormStart,
  trackFormStepCompleted,
  trackFormStepViewed,
  trackFormStepAbandoned,
  trackFormFieldInteraction,
  trackFormFieldInput,
  trackFormValidationError,
  trackFormSubmitted,
  trackFormAbandoned,
  trackServiceViewed,
  trackServiceSelected,
  trackPaymentStarted,
  trackPaymentCompleted,
  trackPaymentFailed,
  trackPaymentAbandoned,
  trackLeadGenerated,
  trackConsultationBooked,
  trackLegalNoticeOrdered,
  trackNavigationClick,
  trackPaymentBannerDismissed,
  trackCTAClick,
  trackContentViewed,
  trackFAQExpanded,
  trackError,
  trackScrollDepth,
  trackTimeOnPage,
  getUTMParams as getUTMParamsFromService,
  getPageType as getPageTypeFromService,
} from "../services/analytics-service";

export function useAnalytics() {
  const logPageView = useCallback((url: string, title?: string) => {
    trackPageView(url, title);
  }, []);

  const logEvent = useCallback(
    (event: string, params?: Record<string, unknown>) => {
      trackEvent(event, params);
    },
    []
  );

  // Enhanced page view tracking
  const logEnhancedPageView = useCallback(
    (
      url: string,
      title?: string,
      additionalParams?: Record<string, unknown>
    ) => {
      trackEnhancedPageView(url, title, additionalParams);
    },
    []
  );

  // Form interaction tracking
  const logFormStart = useCallback((serviceType?: string, source?: string) => {
    trackFormStart(serviceType, source);
  }, []);

  const logFormStepViewed = useCallback(
    (stepNumber: number, stepName: string, serviceType?: string) => {
      trackFormStepViewed(stepNumber, stepName, serviceType);
    },
    []
  );

  const logFormStepCompleted = useCallback(
    (
      stepNumber: number,
      stepName: string,
      serviceType?: string,
      timeSpent?: number
    ) => {
      trackFormStepCompleted(stepNumber, stepName, serviceType, timeSpent);
    },
    []
  );

  const logFormStepAbandoned = useCallback(
    (
      stepNumber: number,
      stepName: string,
      serviceType?: string,
      reason?: string
    ) => {
      trackFormStepAbandoned(stepNumber, stepName, serviceType, reason);
    },
    []
  );

  const logFormFieldInteraction = useCallback(
    (fieldName: string, action: "focus" | "blur", stepNumber?: number) => {
      trackFormFieldInteraction(fieldName, action, stepNumber);
    },
    []
  );

  const logFormFieldInput = useCallback(
    (
      fieldName: string,
      inputAction: "input_started" | "input_changed",
      stepNumber?: number
    ) => {
      trackFormFieldInput(fieldName, inputAction, stepNumber);
    },
    []
  );

  const logFormValidationError = useCallback(
    (fieldName: string, errorType: string, stepNumber?: number) => {
      trackFormValidationError(fieldName, errorType, stepNumber);
    },
    []
  );

  const logFormSubmitted = useCallback(
    (serviceType: string, paymentChoice: string, formStepCount: number) => {
      trackFormSubmitted(serviceType, paymentChoice, formStepCount);
    },
    []
  );

  const logFormAbandoned = useCallback(
    (stepNumber: number, serviceType?: string, reason?: string) => {
      trackFormAbandoned(stepNumber, serviceType, reason);
    },
    []
  );

  // Service selection tracking
  const logServiceViewed = useCallback(
    (serviceType: string, pageUrl?: string) => {
      trackServiceViewed(serviceType, pageUrl);
    },
    []
  );

  const logServiceSelected = useCallback(
    (serviceType: string, stepNumber: number, source?: string) => {
      trackServiceSelected(serviceType, stepNumber, source);
    },
    []
  );

  // Payment tracking
  const logPaymentStarted = useCallback(
    (serviceType: string, amount: number, paymentMethod: string) => {
      trackPaymentStarted(serviceType, amount, paymentMethod);
    },
    []
  );

  const logPaymentCompleted = useCallback(
    (
      serviceType: string,
      amount: number,
      paymentMethod: string,
      paymentId?: string
    ) => {
      trackPaymentCompleted(serviceType, amount, paymentMethod, paymentId);
    },
    []
  );

  const logPaymentFailed = useCallback(
    (
      serviceType: string,
      amount: number,
      paymentMethod: string,
      errorReason?: string
    ) => {
      trackPaymentFailed(serviceType, amount, paymentMethod, errorReason);
    },
    []
  );

  const logPaymentAbandoned = useCallback(
    (
      serviceType: string,
      amount: number,
      paymentMethod: string,
      stepAbandoned?: string
    ) => {
      trackPaymentAbandoned(serviceType, amount, paymentMethod, stepAbandoned);
    },
    []
  );

  // Conversion tracking
  const logLeadGenerated = useCallback(
    (
      serviceType: string,
      source?: string,
      utmParams?: Record<string, string>
    ) => {
      trackLeadGenerated(serviceType, source, utmParams);
    },
    []
  );

  const logConsultationBooked = useCallback(
    (serviceType: string, city?: string, source?: string) => {
      trackConsultationBooked(serviceType, city, source);
    },
    []
  );

  const logLegalNoticeOrdered = useCallback(
    (noticeType: string, city?: string, source?: string) => {
      trackLegalNoticeOrdered(noticeType, city, source);
    },
    []
  );

  // Navigation tracking
  const logNavigationClick = useCallback(
    (elementType: string, elementText: string, destinationUrl?: string) => {
      trackNavigationClick(elementType, elementText, destinationUrl);
    },
    []
  );

  const logPaymentBannerDismissed = useCallback((reason?: string) => {
    trackPaymentBannerDismissed(reason);
  }, []);

  const logCTAClick = useCallback(
    (
      ctaType: string,
      ctaText: string,
      pageUrl?: string,
      serviceType?: string
    ) => {
      trackCTAClick(ctaType, ctaText, pageUrl, serviceType);
    },
    []
  );

  // Content engagement tracking
  const logContentViewed = useCallback(
    (contentType: string, contentTitle: string, pageUrl?: string) => {
      trackContentViewed(contentType, contentTitle, pageUrl);
    },
    []
  );

  const logFAQExpanded = useCallback(
    (faqQuestion: string, pageUrl?: string) => {
      trackFAQExpanded(faqQuestion, pageUrl);
    },
    []
  );

  // Error tracking
  const logError = useCallback(
    (
      errorType: string,
      errorMessage: string,
      pageUrl?: string,
      userAction?: string
    ) => {
      trackError(errorType, errorMessage, pageUrl, userAction);
    },
    []
  );

  // User engagement tracking
  const logScrollDepth = useCallback((percentage: number, pageUrl?: string) => {
    trackScrollDepth(percentage, pageUrl);
  }, []);

  const logTimeOnPage = useCallback(
    (timeSpentSeconds: number, pageUrl?: string) => {
      trackTimeOnPage(timeSpentSeconds, pageUrl);
    },
    []
  );

  // Utility functions
  const getUTMParams = useCallback(() => {
    return getUTMParamsFromService();
  }, []);

  const getPageType = useCallback((url: string) => {
    return getPageTypeFromService(url);
  }, []);

  // Utility for testing analytics in development
  const testEvent = useCallback(() => {
    if (ANALYTICS_DEBUG) {
      logEvent("test_event", { test: true, timestamp: Date.now() });
    }
  }, [logEvent]);

  return {
    logPageView,
    logEvent,
    testEvent,
    debug: ANALYTICS_DEBUG,
    validateAnalyticsSetup,
    logEnhancedPageView,
    logFormStart,
    logFormStepViewed,
    logFormStepCompleted,
    logFormStepAbandoned,
    logFormFieldInteraction,
    logFormFieldInput,
    logFormValidationError,
    logFormSubmitted,
    logFormAbandoned,
    logServiceViewed,
    logServiceSelected,
    logPaymentStarted,
    logPaymentCompleted,
    logPaymentFailed,
    logPaymentAbandoned,
    logLeadGenerated,
    logConsultationBooked,
    logLegalNoticeOrdered,
    logNavigationClick,
    logPaymentBannerDismissed,
    logCTAClick,
    logContentViewed,
    logFAQExpanded,
    logError,
    logScrollDepth,
    logTimeOnPage,
    getUTMParams,
    getPageType,
  };
}
