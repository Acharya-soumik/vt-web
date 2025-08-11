import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';

interface LeadUpdateRequest {
  payment_status?: 'pending' | 'paid' | 'failed';
  payment_id?: string;
  payment_amount?: number;
  status?: 'new' | 'processing' | 'completed';
  [key: string]: string | number | boolean | undefined;
}

interface LeadUpdateResponse {
  success: boolean;
  leadId?: string;
  error?: string;
  message?: string;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<LeadUpdateResponse>> {
  const { id } = await params;
  try {
    const leadId = id;
    
    if (!leadId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Lead ID required',
          message: 'Lead ID is required for update.'
        },
        { status: 400 }
      );
    }

    // Parse request body
    const updateData: LeadUpdateRequest = await request.json();
    
    // Validate update data
    if (!updateData || Object.keys(updateData).length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No update data provided',
          message: 'Please provide data to update.'
        },
        { status: 400 }
      );
    }

    // Add updated_at timestamp
    const dataToUpdate = {
      ...updateData,
      updated_at: new Date().toISOString()
    };

    // Update lead in Supabase
    const { data, error } = await getSupabaseServer()
      .from('leads')
      .update(dataToUpdate)
      .eq('id', leadId)
      .select('id')
      .single();

    if (error) {
      console.error('Lead update error:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Database update failed',
          message: 'Failed to update lead in database.'
        },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          error: 'Lead not found',
          message: 'Lead with the specified ID was not found.'
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        leadId: data.id,
        message: 'Lead updated successfully!'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Lead update API error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Update failed',
          message: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Something went wrong during lead update.'
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function POST() {
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