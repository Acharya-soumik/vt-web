export interface LeadFormData {
  // Step 1: Personal Details
  name: string;
  location: string;
  whatsappNumber: string;
  whatsappConsent: boolean;

  // Step 2: Service Selection
  service:
    | "legal-notice"
    | "consultation"
    | "document-drafting"
    | "corporate-retainer"
    | "legal-drafts-bundle";
  serviceDetails?: string;
  bundleType?: "hindi-english" | "marathi-only" | "hindi-english-marathi";

  // Step 3: Review (no payment choice)
  // Step 4: Post-submission (paymentChoice set by WhatsNextStep)
  paymentChoice?: "pay-advance" | "submit-only";

  // Metadata
  step: number;
  submittedAt?: Date;

  // Submission response data
  leadId?: string;
  customId?: string;
  submissionSuccess?: boolean;

  // Payment data
  paymentSuccess?: boolean;
  paymentId?: string;
}

// Payment status types for database
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface FormStep {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

export interface FormValidationError {
  field: string;
  message: string;
}
