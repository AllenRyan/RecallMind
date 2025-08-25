import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Summary from "@/models/Summary";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    //  Auth check
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();

    //  Prevent duplicates (optional)
    const existing = await Summary.findOne({
      userId: session.user.id,
      source: body.source,
      title: body.title
    });

    if (existing) {
      return NextResponse.json({ success: true, id: existing._id });
    }

    //  Save new summary
    const summary = await Summary.create({
      userId: session.user.id,
      source: body.source,
      title: body.originalTitle || 'Untitled Summary',
      sourceType: body.sourceType,
      tldr: body.tldr,
      bulletPoints: body.bulletPoints,
      content: body.summary, // Map summary to content
      summary: body.summary,
      tags: body.tags
    });

    return NextResponse.json({ success: true, id: summary._id });
  } catch (error) {
    console.error("Save summary API error:", error);
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
