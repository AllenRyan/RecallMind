import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Summary from "@/models/Summary";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;
  
  if (!id) {
    return NextResponse.json(
      { error: "Summary ID is required" },
      { status: 400 }
    );
  }
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Find the summary by ID and ensure it belongs to the current user
    const summary = await Summary.findOne({
      _id: id,
      userId: session.user.id,
    });

    if (!summary) {
      return NextResponse.json(
        { error: "Summary not found" },
        { status: 404 }
      );
    }

    // Transform the data to match the frontend interface
    const responseData = {
      _id: summary._id.toString(),
      title: summary.title,
      tldr: summary.tldr,
      bulletPoints: summary.bulletPoints || [],
      summary: summary.summary || "",
      tags: summary.tags || [],
      createdAt: summary.createdAt,
      readTime: summary.readTime || "2 min read",
      type: summary.sourceType,
    };

    return NextResponse.json({ data: responseData });
  } catch (error) {
    console.error("Error fetching summary:", error);
    return NextResponse.json(
      { error: "Failed to fetch summary" },
      { status: 500 }
    );
  }
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  if (!id) {
    return NextResponse.json(
      { error: "Summary ID is required" },
      { status: 400 }
    );
  }
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Find the summary by ID and ensure it belongs to the current user
    const summary = await Summary.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!summary) {
      return NextResponse.json(
        { error: "Summary not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting summary:", error);
    return NextResponse.json(
      { error: "Failed to delete summary" },
      { status: 500 }
    );
  }
}