import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { processAndSummarize, type SourceType } from "@/lib/services/contentSummarizer";
import  Summary  from "@/models/Summary";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type SummarizeRequest = {
  sourceType: SourceType;
  input: string;
  title?: string;
};

export async function POST(request: NextRequest) {
  try {
    // ✅ Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // ✅ Parse request
    const body = (await request.json()) as SummarizeRequest;

    // ✅ Generate summary (but don't save)
    const result = await processAndSummarize(body.sourceType, body.input, body.title);

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error("Summarize API error:", error);
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}




// GET Summaries
export async function GET(request: NextRequest) {
    try {
        // Check if user is authenticated
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        // Parse search query parameter
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || undefined;

        // Connect to database
        await connectToDatabase();

        // Build query filters for user's personal library
        const filters: Record<string, unknown> = { userId: session.user.id };

        // Add search functionality - search by keyword across title, summary, and tags
        if (search && search.trim()) {
            const searchRegex = new RegExp(search.trim(), 'i'); // Case-insensitive search
            filters.$or = [
                { title: { $regex: searchRegex } },
                { summary: { $regex: searchRegex } },
                { tags: { $in: [searchRegex] } }
            ];
        }

        // Fetch all summaries for the user (sorted by newest first)
        const summaries = await Summary.find(filters)
            .sort({ createdAt: -1 })
            .select('title source summary tags createdAt sourceType') // Only essential fields for library view
            .lean()
            .catch((error) => {
                console.error("Database query error:", error);
                throw new Error("Failed to fetch summaries");
            });

        return NextResponse.json(
            {
                success: true,
                data: summaries,
                count: summaries.length,
                searchTerm: search || null
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Get summaries API error:", error);

        const errorMessage = error instanceof Error
            ? error.message
            : "An unexpected error occurred";

        return NextResponse.json(
            {
                error: "Failed to fetch summaries",
                message: errorMessage
            },
            { status: 500 }
        );
    }
}