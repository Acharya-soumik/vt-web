import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/razorpay-client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, receipt, notes } = body || {};

    if (
      typeof amount !== "number" ||
      !currency ||
      typeof receipt !== "string"
    ) {
      return NextResponse.json(
        {
          error: "Invalid request",
          message: "amount, currency, and receipt are required",
        },
        { status: 400 }
      );
    }

    const order = await createOrder({ amount, currency, receipt, notes });
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      {
        error: "Order creation failed",
        message: "Unable to create Razorpay order",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
