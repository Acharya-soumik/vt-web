export interface PaymentConfig {
  service:
    | "legal-notice"
    | "consultation"
    | "document-drafting"
    | "corporate-retainer"
    | "legal-drafts-bundle";
  amount: number;
  currency: "INR";
  description: string;
  bundleType?: "hindi-english" | "marathi-only" | "hindi-english-marathi";
}

export interface RazorpayPaymentRequest {
  amount: number;
  currency: string;
  receipt: string;
  notes: {
    leadId: string;
    service: string;
    customerName: string;
  };
}

export interface PaymentVerificationResponse {
  success: boolean;
  paymentId?: string;
  leadId?: string;
  error?: string;
  message?: string;
}

// Payment configuration for each service
export const PAYMENT_CONFIG: Record<string, PaymentConfig> = {
  "legal-notice": {
    service: "legal-notice",
    amount: 49900, // ₹499 in paise (Razorpay expects amount in paise)
    currency: "INR",
    description: "Legal Notice Service - Advance Payment",
  },
  consultation: {
    service: "consultation",
    amount: 29900, // ₹299 in paise
    currency: "INR",
    description: "Legal Consultation Service - Advance Payment",
  },
  "document-drafting": {
    service: "document-drafting",
    amount: 29900, // ₹299 in paise
    currency: "INR",
    description: "Document Drafting Service - Advance Payment",
  },
  "corporate-retainer": {
    service: "corporate-retainer",
    amount: 0, // ₹0 in paise
    currency: "INR",
    description: "Corporate Retainer Service - Advance Payment",
  },
};

// Helper function to get payment config for a service
export function getPaymentConfig(
  service: string,
  bundleType?: string
): PaymentConfig | null {
  if (service === "legal-drafts-bundle" && bundleType) {
    const key = `legal-drafts-bundle-${bundleType}`;
    return PAYMENT_CONFIG[key] || null;
  }
  return PAYMENT_CONFIG[service] || null;
}

// Helper function to format amount for display (paise to rupees)
export function formatAmount(amountInPaise: number): string {
  const amountInRupees = amountInPaise / 100;
  return `₹${amountInRupees.toLocaleString("en-IN")}`;
}

// Helper function to generate unique receipt ID
export function generateReceiptId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `receipt_${timestamp}_${random}`;
}

// Helper function to create Razorpay payment request
export function createPaymentRequest(
  service: string,
  leadId: string,
  customerName: string,
  bundleType?: string
): RazorpayPaymentRequest | null {
  const config = getPaymentConfig(service, bundleType);
  if (!config) return null;

  return {
    amount: config.amount,
    currency: config.currency,
    receipt: generateReceiptId(),
    notes: {
      leadId,
      service: bundleType ? `${service}-${bundleType}` : service,
      customerName,
    },
  };
}
