import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServer } from "@/lib/supabase-server";

const lawyerLeadSchema = z.object({
  fullName: z.string().min(2).max(255),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  location: z.string().min(2).max(255),
  specialty: z.string().min(2).max(255),
  yearsOfPractice: z.string().min(1).max(50),
  barCouncilNumber: z.string().min(2).max(255),
  currentFirm: z.string().max(255).optional().nullable(),
  education: z.string().min(2),
  languages: z.string().min(2),
  notableAchievements: z.string().optional().nullable(),
  whyJoinUs: z.string().min(2),
  availabilityType: z.string().min(2).max(100),
  expectedCompensation: z.string().optional().nullable(),
  resumeUrl: z.string().url().optional().nullable(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = lawyerLeadSchema.parse(body);

    const insertPayload = {
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      location: data.location,
      specialty: data.specialty,
      years_of_practice: data.yearsOfPractice,
      bar_council_number: data.barCouncilNumber,
      current_firm: data.currentFirm ?? null,
      education: data.education,
      languages: data.languages,
      notable_achievements: data.notableAchievements ?? null,
      why_join_us: data.whyJoinUs,
      availability_type: data.availabilityType,
      expected_compensation: data.expectedCompensation ?? null,
      resume_url: data.resumeUrl ?? null,
      status: "new" as const,
    };

    const { data: inserted, error } = await getSupabaseServer()
      .from("lawyer_leads")
      .insert([insertPayload])
      .select("id")
      .single();

    if (error) {
      console.error("Error inserting lawyer lead:", error);
      return NextResponse.json(
        { success: false, error: "Failed to save application" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, id: inserted?.id },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: err.issues.map((i) => ({
            path: i.path.join("."),
            message: i.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error("Unexpected error in lawyer-leads POST:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
