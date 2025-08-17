import { LeadFormData } from "@/types/lead-form";

// API Request/Response interfaces
export interface LeadSubmissionRequest {
  name: string;
  location: string;
  whatsappNumber: string;
  service:
    | "legal-notice"
    | "consultation"
    | "document-drafting"
    | "corporate-retainer"
    | "legal-drafts-bundle";
  serviceDetails?: string;
  paymentChoice: "pay-advance" | "submit-only";
  whatsappConsent: boolean;
  step: number;
  submittedAt: Date;
}

export interface LeadSubmissionResponse {
  success: boolean;
  leadId?: string;
  customId?: string;
  error?: string;
  message?: string;
}

export interface LeadUpdateRequest {
  payment_status?: "pending" | "paid" | "failed";
  payment_id?: string;
  payment_amount?: number;
  status?: "new" | "processing" | "completed";
  [key: string]: string | number | boolean | undefined;
}

export interface LeadUpdateResponse {
  success: boolean;
  leadId?: string;
  error?: string;
  message?: string;
}

// Service class for lead operations
export class LeadService {
  private static readonly API_BASE_URL = "/api/leads";

  /**
   * Submit a lead to the backend
   */
  static async submitLead(
    formData: LeadFormData
  ): Promise<LeadSubmissionResponse> {
    try {
      // Transform form data to API request format
      const requestData: LeadSubmissionRequest = {
        name: formData.name,
        location: formData.location,
        whatsappNumber: formData.whatsappNumber,
        service: formData.service,
        serviceDetails: formData.serviceDetails,
        paymentChoice: formData.paymentChoice || "submit-only",
        whatsappConsent: formData.whatsappConsent,
        step: formData.step,
        submittedAt: formData.submittedAt || new Date(),
      };

      const response = await fetch(LeadService.API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const result: LeadSubmissionResponse = await response.json();
      return result;
    } catch (error) {
      console.error("Lead submission error:", error);

      // Handle different types of errors
      if (error instanceof TypeError && error.message.includes("fetch")) {
        return {
          success: false,
          error: "Network error",
          message: "Please check your internet connection and try again.",
        };
      }

      if (error instanceof Error) {
        return {
          success: false,
          error: "Submission failed",
          message: error.message,
        };
      }

      return {
        success: false,
        error: "Unknown error",
        message: "Something went wrong. Please try again later.",
      };
    }
  }

  /**
   * Retry submission with exponential backoff
   */
  static async submitLeadWithRetry(
    formData: LeadFormData,
    maxRetries: number = 3
  ): Promise<LeadSubmissionResponse> {
    let lastError: LeadSubmissionResponse | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const result = await LeadService.submitLead(formData);

      if (result.success) {
        return result;
      }

      lastError = result;

      // Don't retry on validation errors
      if (result.error === "Validation failed") {
        break;
      }

      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    return (
      lastError || {
        success: false,
        error: "Max retries exceeded",
        message: "Please try again later or contact support.",
      }
    );
  }

  /**
   * Update lead payment status
   */
  static async updateLeadPayment(
    leadId: string,
    updateData: LeadUpdateRequest
  ): Promise<LeadUpdateResponse> {
    try {
      const response = await fetch(`${LeadService.API_BASE_URL}/${leadId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const result: LeadUpdateResponse = await response.json();
      return result;
    } catch (error) {
      console.error("Lead update error:", error);

      if (error instanceof TypeError && error.message.includes("fetch")) {
        return {
          success: false,
          error: "Network error",
          message: "Please check your internet connection and try again.",
        };
      }

      if (error instanceof Error) {
        return {
          success: false,
          error: "Update failed",
          message: error.message,
        };
      }

      return {
        success: false,
        error: "Unknown error",
        message: "Something went wrong. Please try again later.",
      };
    }
  }
}

// Export convenience functions
export const submitLead = LeadService.submitLead;
export const submitLeadWithRetry = LeadService.submitLeadWithRetry;
export const updateLeadPayment = LeadService.updateLeadPayment;
