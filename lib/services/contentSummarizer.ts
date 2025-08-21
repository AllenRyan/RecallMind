import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import { YoutubeTranscript } from "youtube-transcript";
import OpenAI from "openai";

// Initialize Gemini (via OpenAI SDK)
const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

// Supported content sources
export type SourceType = "youtube" | "article" | "text";

/**
 * Normalized extracted content (before summarization)
 */
interface ProcessedContent {
  title: string;
  content: string;
  sourceType: SourceType;
}

/**
 * Final summarized result
 */
export interface SummaryResult {
  tldr: string;
  bulletPoints: string[];
  summary: string;
  tags: string[];
  sourceType: SourceType;
  originalTitle: string;
}

/* ------------------------- CONTENT EXTRACTION ------------------------- */

/**
 * Extract YouTube video ID from different formats
 */
async function extractVideoId(url: string): Promise<string | null> {
  const regex =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regex);
  return match && match[2].length === 11 ? match[2] : null;
}

/**
 * Fetch YouTube video title
 */
async function getYouTubeTitle(videoId: string): Promise<string | null> {
  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; RecallMind/1.0)" },
    });

    if (!res.ok) return null;

    const html = await res.text();
    const dom = new JSDOM(html);
    return (
      dom.window.document
        .querySelector('meta[property="og:title"]')
        ?.getAttribute("content") || null
    );
  } catch {
    return null;
  }
}

/**
 * Process YouTube video into text transcript
 */
async function processYouTube(url: string): Promise<ProcessedContent> {
  const videoId = await extractVideoId(url);
  if (!videoId) throw new Error("Invalid YouTube URL");

  const [transcript, title] = await Promise.all([
    YoutubeTranscript.fetchTranscript(videoId),
    getYouTubeTitle(videoId),
  ]);

  const content = transcript.map((t) => t.text).filter(Boolean).join(" ");

  return {
    title: title || `YouTube Video: ${videoId}`,
    content,
    sourceType: "youtube",
  };
}

/**
 * Process article with Mozilla Readability
 */
async function processArticle(url: string): Promise<ProcessedContent> {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; RecallMind/1.0)" },
  });
  if (!res.ok) throw new Error(`Failed to fetch article: ${res.status}`);

  const html = await res.text();
  const dom = new JSDOM(html, { url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  if (!article) throw new Error("Failed to parse article");

  return {
    title: article.title || "Untitled Article",
    content: article.textContent || "",
    sourceType: "article",
  };
}

/**
 * Process raw user text
 */
async function processRawText(
  text: string,
  title?: string
): Promise<ProcessedContent> {
  if (!text) throw new Error("Text content is required");

  return {
    title: title || `Text Note: ${new Date().toLocaleDateString()}`,
    content: text.trim(),
    sourceType: "text",
  };
}

/* ------------------------- AI SUMMARIZATION ------------------------- */

/**
 * Builds prompt for summarization
 */
function buildPrompt(content: string, title: string): string {
  return `
You are an expert summarizer. Read the following content carefully and produce a high-quality summary that captures the core ideas.

Requirements:
1. **TL;DR (max 2 sentences, under 150 characters)** → must reflect the main insight, not generic fluff.
2. **Key Takeaways (5 bullet points)** → highlight the most important facts, insights, or arguments. Avoid repetition.
3. **Detailed Summary (5–6 sentences)** → a clear narrative that lets someone who never read the original text fully understand its main ideas.
4. **Tags (3–5 keywords)** → capture topics/themes for categorization.

Title: ${title}
Content (first 4000 chars shown):
${content.substring(0, 4000)}...

Return only valid JSON in this format:
{
  "tldr": "short tl;dr",
  "bulletPoints": ["point 1", "point 2", "point 3", "point 4", "point 5"],
  "summary": "detailed multi-sentence summary",
  "tags": ["tag1", "tag2", "tag3"]
}
  `;
}


/**
 * Summarize processed content with OpenAI
 */
async function summarizeContent(
  processed: ProcessedContent
): Promise<SummaryResult> {
  try {
    const prompt = buildPrompt(processed.content, processed.title);
    const completion = await client.chat.completions.create({
      model: "gemini-2.5-flash", 
      messages: [
        { 
          role: "system", 
          content: "You are a helpful assistant that generates structured JSON output." 
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.5, // Slightly lower temperature for more consistent JSON
      max_tokens: 1000,
    });

    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error("Empty response from AI model");
    }

    let parsed;
    try {
      parsed = JSON.parse(responseContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", responseContent);
      const errorMessage = parseError instanceof Error ? parseError.message : 'Unknown error during JSON parsing';
      throw new Error(`Failed to parse AI response: ${errorMessage}`);
    }

    return {
      ...parsed,
      sourceType: processed.sourceType,
      originalTitle: processed.title,
    };
  } catch (err: any) {
    console.error("AI Summarization error:", err);
    console.error("Error details:", {
      contentLength: processed.content?.length,
      title: processed.title,
      error: err.message
    });
    
    // Return a default error response
    return {
      tldr: "Failed to generate summary",
      bulletPoints: ["An error occurred while generating the summary"],
      summary: "We encountered an error while processing your request. Please try again later.",
      tags: ["error", "unsummarized"],
      sourceType: processed.sourceType,
      originalTitle: processed.title,
    };
  }
}

/* ------------------------- UNIFIED ENTRY POINT ------------------------- */

/**
 * Unified pipeline → Extract content + Summarize it with AI
 */
export async function processAndSummarize(
  sourceType: SourceType,
  input: string,
  title?: string
): Promise<SummaryResult> {
  let processed: ProcessedContent;

  switch (sourceType) {
    case "youtube":
      processed = await processYouTube(input);
      break;
    case "article":
      processed = await processArticle(input);
      break;
    case "text":
      processed = await processRawText(input, title);
      break;
    default:
      throw new Error("Unsupported source type");
  }

  return summarizeContent(processed);
}
