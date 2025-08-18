"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { LeadFormData } from "@/types/lead-form";
import { submitLead } from "@/services/lead-service";
import { initializePayment } from "@/services/payment-service";
import { createPaymentRequest } from "@/lib/payment-config";
import { useAnalytics } from "@/hooks/use-analytics";

interface FormContextType {
  currentStep: number;
  formData: Partial<LeadFormData>;
  updateFormData: (data: Partial<LeadFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetForm: () => void;
  openForm: (serviceType?: string) => void;
  closeForm: () => void;
  isFormOpen: boolean;
  isSubmitting: boolean;
  isProcessingPayment: boolean;
  submitForm: () => Promise<void>;
  processPayment: () => Promise<void>;
  submissionError: string | null;
  paymentError: string | null;
  paymentStatus: "pending" | "success" | "failed" | null;
}

interface FormProviderProps {
  children: React.ReactNode;
  initialService?: string;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<FormProviderProps> = ({
  children,
  initialService,
}) => {
  const PAYMENT_STORAGE_KEY = "vt-payment-pending";
  const PAYMENT_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

  type StoredPayment = {
    leadId: string;
    service: LeadFormData["service"];
    name: string;
    whatsappNumber?: string;
    status: "pending" | "failed";
    createdAt: string;
  };
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<LeadFormData>>(
    initialService ? { service: initialService as LeadFormData["service"] } : {}
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "success" | "failed" | null
  >(null);

  // Analytics tracking
  const {
    logFormStart,
    logFormStepViewed,
    logFormStepCompleted,
    logFormStepAbandoned,
    logFormSubmitted,
    logFormAbandoned,
    logPaymentStarted,
    logPaymentCompleted,
    logPaymentFailed,

    logLeadGenerated,
    logConsultationBooked,
    logLegalNoticeOrdered,
    getUTMParams,
    getPageType,
  } = useAnalytics();

  // Track step timing
  const [stepStartTime, setStepStartTime] = useState<number>(Date.now());

  const updateFormData = useCallback((data: Partial<LeadFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const nextStep = useCallback(() => {
    const currentTime = Date.now();
    const timeSpent = Math.round((currentTime - stepStartTime) / 1000);

    // Track step completion
    const stepNames = {
      1: "Personal Details",
      2: "Service Selection",
      3: "Review & Submit",
      4: "What's Next",
    };

    logFormStepCompleted(
      currentStep,
      stepNames[currentStep as keyof typeof stepNames] || `Step ${currentStep}`,
      formData.service,
      timeSpent
    );

    setCurrentStep((prev) => Math.min(prev + 1, 4));
    setStepStartTime(Date.now());
  }, [currentStep, formData.service, stepStartTime, logFormStepCompleted]);

  // Track step viewed on step change/open
  useEffect(() => {
    if (!isFormOpen) return;
    const stepNames = {
      1: "Personal Details",
      2: "Service Selection",
      3: "Review & Submit",
      4: "What's Next",
    } as const;
    logFormStepViewed(
      currentStep,
      stepNames[currentStep as keyof typeof stepNames] || `Step ${currentStep}`,
      formData.service
    );
  }, [currentStep, isFormOpen, formData.service, logFormStepViewed]);

  const prevStep = useCallback(() => {
    // Track step abandonment (going back)
    const stepNames = {
      1: "Personal Details",
      2: "Service Selection",
      3: "Review & Submit",
      4: "What's Next",
    };

    logFormStepAbandoned(
      currentStep,
      stepNames[currentStep as keyof typeof stepNames] || `Step ${currentStep}`,
      formData.service,
      "user_navigated_back"
    );

    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setStepStartTime(Date.now());
  }, [currentStep, formData.service, stepStartTime, logFormStepAbandoned]);

  const goToStep = useCallback(
    (step: number) => {
      // Track step abandonment if jumping to a different step
      if (step !== currentStep) {
        const stepNames = {
          1: "Personal Details",
          2: "Service Selection",
          3: "Review & Submit",
          4: "What's Next",
        };

        logFormStepAbandoned(
          currentStep,
          stepNames[currentStep as keyof typeof stepNames] ||
            `Step ${currentStep}`,
          formData.service,
          "user_jumped_to_step"
        );
      }

      setCurrentStep(() => Math.max(1, Math.min(step, 4)));
      setStepStartTime(Date.now());
    },
    [currentStep, formData.service, stepStartTime, logFormStepAbandoned]
  );

  const resetForm = useCallback(() => {
    // Track form abandonment
    if (isFormOpen && currentStep > 1) {
      logFormAbandoned(currentStep, formData.service, "form_reset");
    }

    setCurrentStep(1);
    setFormData({});
    setIsFormOpen(false);
    setPaymentStatus(null);
    setStepStartTime(Date.now());
  }, [isFormOpen, currentStep, formData.service, logFormAbandoned]);

  const openForm = useCallback(
    (serviceType?: string, bundleType?: string) => {
      if (serviceType) {
        setFormData((prev) => ({
          ...prev,
          service: serviceType as LeadFormData["service"],
          bundleType: bundleType as LeadFormData["bundleType"],
        }));
        // If service is already selected, skip to step 3 (review)
        if (formData.service === serviceType) {
          setCurrentStep(3);
        } else {
          setCurrentStep(1);
        }
      } else {
        setCurrentStep(1);
      }
      setIsFormOpen(true);
      setPaymentStatus(null); // Reset payment status when opening form
      setStepStartTime(Date.now());

      // Track form start
      const pageType = getPageType(
        typeof window !== "undefined" ? window.location.pathname : ""
      );
      logFormStart(serviceType, pageType);
    },
    [formData.service, logFormStart, getUTMParams, getPageType]
  );

  const closeForm = useCallback(() => {
    const formModal = document.querySelector('[role="dialog"]');
    if (formModal) {
      formModal.classList.remove(
        "form-modal-during-payment",
        "form-modal-after-payment"
      );
    }

    // Track form abandonment if closing without completion
    if (currentStep < 4 || (currentStep === 4 && paymentStatus !== "success")) {
      logFormAbandoned(currentStep, formData.service, "user_closed_form");
    }

    // Only close the modal; do not reset form state so payment can proceed and we can reopen
    setIsFormOpen(false);
  }, [currentStep, paymentStatus, formData.service, logFormAbandoned]);

  const updateUrlQueryParam = useCallback((key: string, value: string) => {
    try {
      if (typeof window === "undefined") return;
      const url = new URL(window.location.href);
      url.searchParams.set(key, value);
      window.history.replaceState({}, "", url.toString());
    } catch {}
  }, []);

  const submitForm = useCallback(async () => {
    if (
      !formData.name ||
      !formData.location ||
      !formData.whatsappNumber ||
      !formData.service
    ) {
      setSubmissionError("Please complete all required fields");
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const completeFormData: LeadFormData = {
        ...formData,
        name: formData.name!,
        location: formData.location!,
        whatsappNumber: formData.whatsappNumber!,
        service: formData.service!,
        serviceDetails: formData.serviceDetails || undefined,
        paymentChoice: formData.paymentChoice || "submit-only",
        whatsappConsent: formData.whatsappConsent ?? true,
        step: currentStep,
        submittedAt: new Date(),
      };

      const result = await submitLead(completeFormData);

      if (result.success) {
        // Update form data with submission response
        updateFormData({
          leadId: result.leadId,
          customId: result.customId,
          submissionSuccess: true,
          paymentChoice: completeFormData.paymentChoice,
        });
        // Update URL for ad conversion tracking
        updateUrlQueryParam("type", "ticket-created");

        // Analytics: Lead form submitted
        logFormSubmitted(
          completeFormData.service || "unknown",
          completeFormData.paymentChoice || "unknown",
          completeFormData.step || currentStep
        );

        // Track lead generation
        const utmParams = getUTMParams();
        const pageType = getPageType(
          typeof window !== "undefined" ? window.location.pathname : ""
        );
        logLeadGenerated(
          completeFormData.service || "unknown",
          pageType,
          utmParams
        );

        // Track specific service conversions
        if (completeFormData.service === "consultation") {
          logConsultationBooked(
            completeFormData.service,
            completeFormData.location || undefined,
            pageType
          );
        } else if (completeFormData.service === "legal-notice") {
          logLegalNoticeOrdered(
            "legal-notice",
            completeFormData.location || undefined,
            pageType
          );
        }

        // Move to next step
        nextStep();
      } else {
        setSubmissionError(
          result.message || "Failed to submit lead. Please try again."
        );
      }
    } catch (err) {
      setSubmissionError("An unexpected error occurred. Please try again.");
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    formData,
    updateFormData,
    nextStep,
    currentStep,
    logFormSubmitted,
    logLeadGenerated,
    logConsultationBooked,
    logLegalNoticeOrdered,
    getUTMParams,
    getPageType,
  ]);

  const processPayment = useCallback(async () => {
    if (!formData.leadId || !formData.service || !formData.name) {
      setPaymentError("Missing required data for payment");
      return;
    }

    setIsProcessingPayment(true);
    setPaymentError(null);
    setPaymentStatus("pending"); // Set payment status to pending

    try {
      // Create payment request
      const paymentRequest = createPaymentRequest(
        formData.service,
        formData.leadId,
        formData.name,
        formData.bundleType
      );

      if (!paymentRequest) {
        setPaymentError("Failed to create payment request");
        setPaymentStatus("failed");
        return;
      }

      // Track payment started
      logPaymentStarted(formData.service!, paymentRequest.amount, "razorpay");

      // Persist pending state before opening Razorpay so it survives refresh/navigation
      try {
        const toStore: StoredPayment = {
          leadId: formData.leadId,
          service: formData.service,
          name: formData.name,
          whatsappNumber: formData.whatsappNumber,
          status: "pending",
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify(toStore));
      } catch {}

      // Close modal before opening Razorpay to avoid z-index overlap
      setIsFormOpen(false);

      // Initialize payment
      await initializePayment(
        paymentRequest,
        formData.name,
        formData.whatsappNumber || "",
        (response) => {
          // Payment successful
          updateFormData({
            paymentSuccess: true,
            paymentId: response.razorpay_payment_id,
          });
          setPaymentStatus("success");
          // Update URL for ad conversion tracking
          updateUrlQueryParam("type", "payment-success");
          // Clear persisted pending state on success
          try {
            localStorage.removeItem(PAYMENT_STORAGE_KEY);
          } catch {}

          // Analytics: Payment completed
          logPaymentCompleted(
            formData.service || "unknown",
            paymentRequest.amount,
            "razorpay",
            response.razorpay_payment_id
          );

          // Reopen modal on step 4 (success screen)
          setIsFormOpen(true);
          setCurrentStep(4);
        },
        (error) => {
          setPaymentError(error);
          setPaymentStatus("failed");

          // Track payment failed
          logPaymentFailed(
            formData.service || "unknown",
            paymentRequest.amount,
            "razorpay",
            error
          );

          // Mark persisted state as failed (still allows retry)
          try {
            const raw = localStorage.getItem(PAYMENT_STORAGE_KEY);
            if (raw) {
              const parsed: StoredPayment = JSON.parse(raw);
              localStorage.setItem(
                PAYMENT_STORAGE_KEY,
                JSON.stringify({ ...parsed, status: "failed" })
              );
            }
          } catch {}
          // Show pending indicator with retry by keeping form closed; header will surface retry
        }
      );
    } catch (err) {
      setPaymentError("Payment initialization failed. Please try again.");
      setPaymentStatus("failed");

      // Track payment error
      logPaymentFailed(
        formData.service || "unknown",
        0,
        "razorpay",
        "initialization_failed"
      );

      console.error("Payment error:", err);
    } finally {
      setIsProcessingPayment(false);
    }
  }, [
    formData,
    updateFormData,
    nextStep,
    logPaymentStarted,
    logPaymentCompleted,
    logPaymentFailed,
  ]);

  // Hydrate payment pending state from localStorage on mount
  useEffect(() => {
    try {
      const raw =
        typeof window !== "undefined"
          ? localStorage.getItem(PAYMENT_STORAGE_KEY)
          : null;
      if (!raw) return;

      const stored: StoredPayment | null = JSON.parse(raw);
      if (!stored || !stored.leadId || !stored.service || !stored.name) return;

      // Respect TTL for stored pending payment (12 hours)
      if (stored.createdAt) {
        const createdAtTime = new Date(stored.createdAt).getTime();
        const nowTime = Date.now();
        if (
          Number.isFinite(createdAtTime) &&
          nowTime - createdAtTime > PAYMENT_TTL_MS
        ) {
          try {
            localStorage.removeItem(PAYMENT_STORAGE_KEY);
          } catch {}
          return;
        }
      }

      // Restore minimal form data required to retry payment
      setFormData((prev) => ({
        ...prev,
        leadId: stored.leadId,
        service: stored.service,
        name: stored.name,
        whatsappNumber: stored.whatsappNumber,
      }));
      setPaymentStatus(stored.status || "pending");
    } catch {}
  }, []);

  return (
    <FormContext.Provider
      value={{
        currentStep,
        formData,
        updateFormData,
        nextStep,
        prevStep,
        goToStep,
        resetForm,
        openForm,
        closeForm,
        isFormOpen,
        isSubmitting,
        isProcessingPayment,
        submitForm,
        processPayment,
        submissionError,
        paymentError,
        paymentStatus,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const ctx = useContext(FormContext);
  if (!ctx)
    throw new Error("useFormContext must be used within a FormProvider");
  return ctx;
};
