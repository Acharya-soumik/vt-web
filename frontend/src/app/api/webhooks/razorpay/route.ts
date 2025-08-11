import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import crypto from 'crypto';

interface WebhookEvent {
  entity: string;
  account_id: string;
  event: string;
  contains: string[];
  payload: {
    payment: {
      entity: {
        id: string;
        entity: string;
        amount: number;
        currency: string;
        status: string;
        order_id: string;
        invoice_id: string | null;
        international: boolean;
        method: string;
        amount_refunded: number;
        refund_status: string | null;
        captured: boolean;
        description: string;
        card_id: string | null;
        bank: string | null;
        wallet: string | null;
        vpa: string | null;
        email: string;
        contact: string;
        notes: Record<string, string>;
        fee: number;
        tax: number;
        error_code: string | null;
        error_description: string | null;
        error_source: string | null;
        error_step: string | null;
        error_reason: string | null;
        acquirer_data: Record<string, unknown>;
        created_at: number;
      };
    };
  };
  created_at: number;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Get the webhook signature from headers
    const signature = request.headers.get('x-razorpay-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      console.error('Missing webhook signature or secret');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the raw body for signature verification
    const body = await request.text();
    
    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Parse the webhook payload
    const webhookEvent: WebhookEvent = JSON.parse(body);
    const { event, payload } = webhookEvent;

    console.log('Received webhook event:', event, 'for payment:', payload.payment.entity.id);

    // Handle different webhook events
    switch (event) {
      case 'payment.captured':
        await handlePaymentCaptured(payload.payment.entity);
        break;
      
      case 'payment.failed':
        await handlePaymentFailed(payload.payment.entity);
        break;
      
      case 'refund.processed':
        await handleRefundProcessed(payload.payment.entity);
        break;
      
      case 'refund.failed':
        await handleRefundFailed(payload.payment.entity);
        break;
      
      default:
        console.log('Unhandled webhook event:', event);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Handle successful payment capture
async function handlePaymentCaptured(payment: WebhookEvent['payload']['payment']['entity']) {
  try {
    const leadId = payment.notes?.leadId;
    if (!leadId) {
      console.error('No lead ID found in payment notes');
      return;
    }

    // Update lead status to paid
    const { error } = await getSupabaseServer()
      .from('leads')
      .update({
        payment_status: 'paid',
        payment_id: payment.id,
        payment_amount: payment.amount,
        updated_at: new Date().toISOString()
      })
      .eq('id', leadId);

    if (error) {
      console.error('Error updating lead payment status:', error);
    } else {
      console.log('Lead payment status updated successfully:', leadId);
    }
  } catch (error) {
    console.error('Error handling payment captured:', error);
  }
}

// Handle failed payment
async function handlePaymentFailed(payment: WebhookEvent['payload']['payment']['entity']) {
  try {
    const leadId = payment.notes?.leadId;
    if (!leadId) {
      console.error('No lead ID found in payment notes');
      return;
    }

    // Update lead status to failed
    const { error } = await getSupabaseServer()
      .from('leads')
      .update({
        payment_status: 'failed',
        payment_id: payment.id,
        updated_at: new Date().toISOString()
      })
      .eq('id', leadId);

    if (error) {
      console.error('Error updating lead payment status:', error);
    } else {
      console.log('Lead payment status updated to failed:', leadId);
    }
  } catch (error) {
    console.error('Error handling payment failed:', error);
  }
}

// Handle refund processed
async function handleRefundProcessed(payment: WebhookEvent['payload']['payment']['entity']) {
  try {
    const leadId = payment.notes?.leadId;
    if (!leadId) {
      console.error('No lead ID found in payment notes');
      return;
    }

    // Update lead with refund information
    const { error } = await getSupabaseServer()
      .from('leads')
      .update({
        payment_status: 'refunded',
        updated_at: new Date().toISOString()
      })
      .eq('id', leadId);

    if (error) {
      console.error('Error updating lead refund status:', error);
    } else {
      console.log('Lead refund status updated:', leadId);
    }
  } catch (error) {
    console.error('Error handling refund processed:', error);
  }
}

// Handle refund failed
async function handleRefundFailed(payment: WebhookEvent['payload']['payment']['entity']) {
  try {
    const leadId = payment.notes?.leadId;
    if (!leadId) {
      console.error('No lead ID found in payment notes');
      return;
    }

    console.log('Refund failed for lead:', leadId);
    // You might want to log this or send notifications
  } catch (error) {
    console.error('Error handling refund failed:', error);
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
} 