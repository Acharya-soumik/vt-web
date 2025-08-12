import Razorpay from "razorpay";
import crypto from "crypto";

// Initialize Razorpay instance for server-side operations
export function createRazorpayInstance() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("Razorpay credentials not configured");
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
}

// Verify payment signature
export function verifyPaymentSignature(
  paymentId: string,
  orderId: string,
  signature: string
): boolean {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    throw new Error("Razorpay key secret not configured");
  }

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return expectedSignature === signature;
}

// Get payment details from Razorpay
export async function getPaymentDetails(paymentId: string) {
  const razorpay = createRazorpayInstance();

  try {
    const payment = await razorpay.payments.fetch(paymentId);
    return payment;
  } catch (error) {
    console.error("Error fetching payment details:", error);
    throw error;
  }
}

// Capture an authorized payment
export async function capturePayment(
  paymentId: string,
  amount: number,
  currency: string
) {
  const razorpay = createRazorpayInstance();
  try {
    const captured = await razorpay.payments.capture(
      paymentId,
      amount,
      currency
    );
    return captured;
  } catch (error) {
    console.error("Error capturing payment:", error);
    throw error;
  }
}

// Create order in Razorpay
export async function createOrder(orderData: {
  amount: number;
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}) {
  const razorpay = createRazorpayInstance();

  try {
    const order = await razorpay.orders.create(orderData);
    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}
