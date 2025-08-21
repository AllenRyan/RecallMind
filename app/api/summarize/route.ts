import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { processAndSummarize } from "@/lib/services/contentSummarizer";
import Summary from "@/models/Summary";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Define request body type
interface SummarizeRequest {
  sourceType: 'youtube' | 'article' | 'text';
  input: string;
  title?: string;
}

export async function POST(request: NextRequest) {
    try {
        // Check if user is authenticated
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        // Parse and validate request body
        const body = await request.json() as SummarizeRequest;
        
        // Process and summarize content
        const result = await processAndSummarize(
            body.sourceType,
            body.input,
            body.title
        );
         
        // connect database

         await connectToDatabase()  

        // Save summary to database
        const summary = await Summary.create({
            userId: session.user.id,
            source: body.input, // The original URL or text
            content: result.summary, // The full summary content
            title: result.originalTitle || `Summary ${new Date().toLocaleString()}`,
            sourceType: body.sourceType,
            tldr: result.tldr,
            bulletPoints: result.bulletPoints || [],
            summary: result.summary,
            tags: result.tags || []
        }).catch((error) => {
            console.error("Database error:", error);
            throw new Error("Failed to save summary: " + error.message);
        });

        return NextResponse.json(
            { success: true, data: summary },
            { status: 201 }
        );

    } catch (error) {
        console.error("Summarization API error:", error);
        
        const errorMessage = error instanceof Error 
            ? error.message 
            : "An unexpected error occurred";

        return NextResponse.json(
            { 
                error: "Summarization failed",
                message: errorMessage
            },
            { status: 500 }
        );
    }
}


// GET Summaries

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