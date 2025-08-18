import {
  RazorpayPaymentRequest,
  PaymentVerificationResponse,
} from "@/lib/payment-config";

declare global {
  interface Window {
    Razorpay: {
      new (options: PaymentOptions): {
        open(): void;
      };
    };
  }
}

export interface PaymentOptions {
  key: string;
  amount: number;
  currency: string;
  order_id?: string;
  name: string;
  description: string;
  receipt: string;
  notes: Record<string, string>;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  prefill: {
    name: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

export class PaymentService {
  private static readonly PAYMENT_VERIFY_URL = "/api/payment/verify";

  /**
   * Load Razorpay script dynamically
   */
  static loadRazorpayScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === "undefined") {
        reject(new Error("Window is not defined - running on server side"));
        return;
      }

      if (window.Razorpay) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("Failed to load Razorpay script"));
      document.head.appendChild(script);
    });
  }

  /**
   * Initialize Razorpay payment
   */
  static async initializePayment(
    paymentRequest: RazorpayPaymentRequest,
    customerName: string,
    customerPhone: string,
    onSuccess: (response: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    }) => void,
    onError: (error: string) => void,
    onDismiss?: () => void
  ): Promise<void> {
    try {
      // Load Razorpay script
      await PaymentService.loadRazorpayScript();

      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!keyId) {
        throw new Error("Razorpay key not configured");
      }

      // Add CSS class to our form modal to lower its z-index
      const formModal = document.querySelector('[role="dialog"]');
      if (formModal) {
        formModal.classList.add("form-modal-during-payment");
      }

      // Create an order on the server to ensure signature verification stability
      let orderId: string | undefined;
      try {
        const orderResponse = await fetch("/api/payment/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: paymentRequest.amount,
            currency: paymentRequest.currency,
            receipt: paymentRequest.receipt,
            notes: paymentRequest.notes,
          }),
        });
        if (orderResponse.ok) {
          const order = await orderResponse.json();
          orderId = order?.id;
        } else {
          // If order creation fails, proceed without explicit order (Razorpay can still generate one)
          console.warn(
            "Razorpay order creation failed; proceeding without order_id"
          );
        }
      } catch (e) {
        console.warn(
          "Razorpay order creation error; proceeding without order_id",
          e
        );
      }

      const options: PaymentOptions = {
        key: keyId,
        amount: paymentRequest.amount,
        currency: paymentRequest.currency,
        order_id: orderId,
        name: "Vakil Tech",
        description: "Legal Services Payment",
        receipt: paymentRequest.receipt,
        notes: paymentRequest.notes,
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            // Remove CSS class from our form modal
            if (formModal) {
              formModal.classList.remove("form-modal-during-payment");
              formModal.classList.add("form-modal-after-payment");
            }
            // no-op

            // Verify payment on server with retry (handles capture propagation delays)
            const verificationResult =
              await PaymentService.verifyPaymentWithRetry(response, 4);
            if (verificationResult.success) {
              onSuccess(response);
            } else {
              onError(
                verificationResult.error || "Payment verification failed"
              );
            }
          } catch {
            // Remove CSS class from our form modal on error too
            if (formModal) {
              formModal.classList.remove("form-modal-during-payment");
              formModal.classList.add("form-modal-after-payment");
            }
            // no-op
            onError("Payment verification failed");
          }
        },
        prefill: {
          name: customerName,
          contact: customerPhone,
        },
        theme: {
          color: "#2563eb", // Blue color matching the app theme
        },
        modal: {
          ondismiss: () => {
            // Remove CSS class from our form modal when payment modal is dismissed
            if (formModal) {
              formModal.classList.remove("form-modal-during-payment");
              formModal.classList.add("form-modal-after-payment");
            }
            // Notify caller so analytics can record abandonment
            try {
              onDismiss?.();
            } catch {}
          },
        },
      };

      // Defer to the next tick to ensure layout is settled before open
      const razorpay = new window.Razorpay(options);
      setTimeout(() => {
        try {
          razorpay.open();
        } catch (e) {
          onError("Failed to open Razorpay modal");
        }
      }, 0);
    } catch (error) {
      // Remove CSS class from our form modal on error
      const formModal = document.querySelector('[role="dialog"]');
      if (formModal) {
        formModal.classList.remove("form-modal-during-payment");
        formModal.classList.add("form-modal-after-payment");
      }

      console.error("Payment initialization error:", error);
      onError(
        error instanceof Error ? error.message : "Payment initialization failed"
      );
      // no-op
    }
  }

  /**
   * Verify payment with server
   */
  static async verifyPayment(paymentResponse: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }): Promise<PaymentVerificationResponse> {
    try {
      const response = await fetch(this.PAYMENT_VERIFY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId: paymentResponse.razorpay_payment_id,
          orderId: paymentResponse.razorpay_order_id,
          signature: paymentResponse.razorpay_signature,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const result: PaymentVerificationResponse = await response.json();
      return result;
    } catch (error) {
      console.error("Payment verification error:", error);

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
          error: "Verification failed",
          message: error.message,
        };
      }

      return {
        success: false,
        error: "Unknown error",
        message: "Payment verification failed. Please contact support.",
      };
    }
  }

  /**
   * Retry payment verification with exponential backoff
   */
  static async verifyPaymentWithRetry(
    paymentResponse: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    },
    maxRetries: number = 3
  ): Promise<PaymentVerificationResponse> {
    let lastError: PaymentVerificationResponse | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const result = await PaymentService.verifyPayment(paymentResponse);

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
        message: "Payment verification failed after multiple attempts.",
      }
    );
  }
}

// Export convenience functions that properly reference the static methods
export const initializePayment =
  PaymentService.initializePayment.bind(PaymentService);
export const verifyPayment = PaymentService.verifyPayment.bind(PaymentService);
export const verifyPaymentWithRetry =
  PaymentService.verifyPaymentWithRetry.bind(PaymentService);
