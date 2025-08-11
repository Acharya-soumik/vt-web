import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import { leadFormSchema } from '@/lib/validators/lead-form';
import { validatePhoneNumber } from '@/lib/validators/phone-validation';
import { countryCodes } from '@/data/indian-cities';
import { z } from 'zod';

// API Response interface

interface LeadSubmissionResponse {
  success: boolean;
  leadId?: string;
  customId?: string;
  error?: string;
  message?: string;
}

// Function to generate custom ID: firstName-last4DigitsOfPhone
function generateCustomId(name: string, phoneNumber: string): string {
  // Get first name (everything before the first space)
  const firstName = name.split(' ')[0].toLowerCase();
  
  // Get last 4 digits of phone number
  const phoneDigits = phoneNumber.replace(/\D/g, ''); // Remove non-digits
  const phonePart = phoneDigits.slice(-4);
  
  return `${firstName}-${phonePart}`;
}

// Database insertion schema (matches the leads table structure)
const leadInsertSchema = z.object({
  name: z.string().min(2).max(255),
  location: z.string().min(3).max(255),
  whatsapp_number: z.string().refine((phoneNumber) => {
    // Check if it's a valid international phone number
    if (!phoneNumber.startsWith('+')) {
      return false;
    }
    
    // Extract country code and validate using our comprehensive phone validation
    const country = countryCodes.find(c => phoneNumber.startsWith(c.dialCode));
    if (!country) {
      return false;
    }
    
    const validation = validatePhoneNumber(phoneNumber.replace(country.dialCode, ''), country);
    return validation.isValid;
  }, {
    message: 'Please enter a valid international phone number'
  }),
  service: z.enum(['legal-notice', 'consultation', 'document-drafting', 'corporate-retainer']),
  service_details: z.string().max(500).optional(),
  payment_choice: z.enum(['pay-advance', 'submit-only']),
  whatsapp_consent: z.boolean(),
  payment_status: z.literal('pending'),
  status: z.literal('new'),
  custom_id: z.string().min(1).max(50),
  user_id: z.null().optional(),
});

export async function POST(request: NextRequest): Promise<NextResponse<LeadSubmissionResponse>> {
  try {
    // Parse and validate request body
    const body = await request.json();
    console.log('Received form data:', JSON.stringify(body, null, 2));
    
    // Validate the incoming request data
    const validatedData = leadFormSchema.parse(body);
    
    // Generate custom ID
    const customId = generateCustomId(validatedData.name, validatedData.whatsappNumber);
    
    // Transform form data to database format
    const leadData = {
      name: validatedData.name,
      location: validatedData.location,
      whatsapp_number: validatedData.whatsappNumber,
      service: validatedData.service,
      service_details: validatedData.serviceDetails,
      payment_choice: validatedData.paymentChoice || 'submit-only', // Default if not set
      whatsapp_consent: validatedData.whatsappConsent,
      payment_status: 'pending' as const,
      status: 'new' as const,
      custom_id: customId,
      user_id: null, // Explicitly set to null for anonymous submissions
    };

    // Validate the transformed data
    const validatedLeadData = leadInsertSchema.parse(leadData);

    // Debug: Log the data being inserted
    console.log('Data being inserted:', JSON.stringify(validatedLeadData, null, 2));
    
    // Insert into Supabase
    const { data, error } = await getSupabaseServer()
      .from('leads')
      .insert([validatedLeadData])
      .select('id, custom_id')
      .single();

    if (error) {
      console.error('Supabase insertion error:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to save lead to database',
          message: 'Please try again or contact support if the problem persists.',
          details: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        leadId: data.id,
        customId: data.custom_id,
        message: 'Lead submitted successfully!'
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('API route error:', error);
    
    if (error instanceof z.ZodError) {
      // Provide more specific error messages
      const fieldErrors = error.issues.map((err: z.ZodIssue) => ({
        field: err.path.join('.'),
        message: err.message
      }));
      
      const phoneError = fieldErrors.find((err: { field: string; message: string }) => err.field === 'whatsapp_number');
      
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          message: phoneError ? phoneError.message : 'Please check your form data and try again.',
          details: fieldErrors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Something went wrong. Please try again later.'
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