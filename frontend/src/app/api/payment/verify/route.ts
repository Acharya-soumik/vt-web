import { NextRequest, NextResponse } from "next/server";
import {
  verifyPaymentSignature,
  getPaymentDetails,
} from "@/lib/razorpay-client";
import { getSupabaseServer } from "@/lib/supabase-server";
import { PaymentVerificationResponse } from "@/lib/payment-config";

interface PaymentVerificationRequest {
  paymentId: string;
  orderId: string;
  signature: string;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<PaymentVerificationResponse>> {
  try {
    // Parse request body
    const body: PaymentVerificationRequest = await request.json();
    const { paymentId, orderId, signature } = body;

    // Validate required fields
    if (!paymentId || !orderId || !signature) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
          message: "Payment ID, Order ID, and signature are required.",
        },
        { status: 400 }
      );
    }

    // Verify payment signature
    const isSignatureValid = verifyPaymentSignature(
      paymentId,
      orderId,
      signature
    );
    if (!isSignatureValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid signature",
          message: "Payment signature verification failed.",
        },
        { status: 400 }
      );
    }

    // Get payment details from Razorpay
    const paymentDetails = await getPaymentDetails(paymentId);

    // Check if payment is successful
    if (paymentDetails.status !== "captured") {
      return NextResponse.json(
        {
          success: false,
          error: "Payment not captured",
          message: "Payment has not been captured successfully.",
        },
        { status: 400 }
      );
    }

    // Extract lead ID from payment notes
    const leadId = paymentDetails.notes?.leadId;
    if (!leadId) {
      return NextResponse.json(
        {
          success: false,
          error: "Lead ID not found",
          message: "Lead ID not found in payment details.",
        },
        { status: 400 }
      );
    }

    // Update lead status in Supabase
    const { error: updateError } = await getSupabaseServer()
      .from("leads")
      .update({
        payment_status: "paid",
        payment_id: paymentId,
        payment_amount: paymentDetails.amount,
        updated_at: new Date().toISOString(),
      })
      .eq("id", leadId);

    if (updateError) {
      console.error("Error updating lead payment status:", updateError);
      return NextResponse.json(
        {
          success: false,
          error: "Database update failed",
          message: "Failed to update lead payment status.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        paymentId,
        leadId,
        message: "Payment verified and lead updated successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Payment verification error:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: "Verification failed",
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: "Something went wrong during payment verification.",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
