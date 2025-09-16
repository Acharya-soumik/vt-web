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
   * Check if debug mode is enabled
   */
  private static isDebugMode(): boolean {
    if (typeof window === "undefined") return false;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('debug') === 'vt-new';
  }

  /**
   * Mock lead submission for debug mode
   */
  private static async mockSubmitLead(
    formData: LeadFormData
  ): Promise<LeadSubmissionResponse> {
    console.log("🚧 DEBUG MODE: Mocking lead submission", formData);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock success response
    return {
      success: true,
      leadId: `debug-lead-${Date.now()}`,
      customId: `DBG${Math.floor(Math.random() * 10000)}`,
      message: "Lead submitted successfully (DEBUG MODE)"
    };
  }

  /**
   * Submit a lead to the backend
   */
  static async submitLead(
    formData: LeadFormData
  ): Promise<LeadSubmissionResponse> {
    // Check for debug mode
    if (LeadService.isDebugMode()) {
      return LeadService.mockSubmitLead(formData);
    }

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
        
        // Return the error data directly for duplicate lead cases
        if (response.status === 409 && errorData.error) {
          return {
            success: false,
            error: errorData.error,
            message: errorData.message
          };
        }
        
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

      // Don't retry on validation errors or duplicate lead errors
      if (result.error === "Validation failed" || 
          result.error === "Duplicate lead" || 
          result.error === "Duplicate unpaid lead") {
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
   * Mock lead payment update for debug mode
   */
  private static async mockUpdateLeadPayment(
    leadId: string,
    updateData: LeadUpdateRequest
  ): Promise<LeadUpdateResponse> {
    console.log("🚧 DEBUG MODE: Mocking lead payment update", { leadId, updateData });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      leadId,
      message: "Lead payment updated successfully (DEBUG MODE)"
    };
  }

  /**
   * Update lead payment status
   */
  static async updateLeadPayment(
    leadId: string,
    updateData: LeadUpdateRequest
  ): Promise<LeadUpdateResponse> {
    // Check for debug mode
    if (LeadService.isDebugMode()) {
      return LeadService.mockUpdateLeadPayment(leadId, updateData);
    }

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
