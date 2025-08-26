import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import crypto from "crypto";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function sanitizeFilename(filename: string): string {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9.\-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "File is required (field: file)" },
        { status: 400 }
      );
    }

    const contentType = file.type || "application/octet-stream";
    if (!ALLOWED_MIME_TYPES.has(contentType)) {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported file type. Allowed: PDF, DOC, DOCX",
        },
        { status: 415 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: "File too large. Max size is 5MB",
        },
        { status: 413 }
      );
    }

    const originalName = sanitizeFilename(file.name || "resume");
    const today = new Date();
    const prefix = `${today.getUTCFullYear()}/${String(
      today.getUTCMonth() + 1
    ).padStart(2, "0")}/${String(today.getUTCDate()).padStart(2, "0")}`;
    const unique = crypto.randomUUID();
    const path = `${prefix}/${unique}-${originalName}`;

    const supabase = getSupabaseAdmin();

    // Ensure bucket exists (idempotent)
    await supabase.storage
      .createBucket("resumes", { public: false })
      .catch(() => {});

    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(path, file, {
        contentType,
        upsert: false,
      });

    if (uploadError) {
      console.error("Resume upload error:", uploadError);
      return NextResponse.json(
        { success: false, error: "Upload failed" },
        { status: 500 }
      );
    }

    // Create a long-lived signed URL (30 days)
    const { data: signed, error: signError } = await supabase.storage
      .from("resumes")
      .createSignedUrl(path, 60 * 60 * 24 * 30);

    if (signError || !signed?.signedUrl) {
      console.error("Signed URL error:", signError);
      return NextResponse.json(
        {
          success: true,
          path,
          url: null,
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        path,
        url: signed.signedUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unexpected resume upload error:", error);
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
