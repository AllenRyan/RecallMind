"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Loader2, Save, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type SummaryType = {
  tldr: string;
  bulletPoints: string[];
  summary: string;
  tags: string[];
  originalTitle?: string;
};

interface SummaryResultProps {
  source: string;
  sourceType: 'youtube' | 'article' | 'text';
  title?: string;
  onSummaryComplete?: (summary: SummaryType) => void;
  onClose?: () => void;
}

export default function SummaryResult({ source, sourceType, title, onClose }: SummaryResultProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<SummaryType | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  //  Fetch summary only once
  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sourceType, input: source, title }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Failed to generate summary");

        if (data.success && data.data) {
          setSummary({
            ...data.data,
            originalTitle: data.data.originalTitle || title,
            source,
            sourceType,
          });
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching summary:", err);
        setError(err instanceof Error ? err.message : "Failed to generate summary");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [source, sourceType, title]);

  //  Save to Library
  const handleSave = async () => {
    if (!summary) return;

    setIsSaving(true);
    try {
      const response = await fetch("/api/saveSummary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...summary, title: summary.originalTitle || title }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to save summary");

      toast.success("Summary saved to your library!");
      setIsSaved(true);
      
    } catch (err) {
      console.error("Save error:", err);
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  if (error) {
    return (
      <Card className="mt-8 border border-red-200">
        <CardContent className="p-6 text-red-600">
          <p>Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8 shadow-md border border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold text-blue-600">
          {summary?.originalTitle || title || "Summary Result"}
        </CardTitle>

        <div className="flex items-center gap-2">
          {isLoading ? (
            <div className="flex items-center text-sm text-gray-500">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </div>
          ) : onClose && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={onClose}
              aria-label="Close summary"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* TL;DR */}
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gray-900">TL;DR</h3>
          {isLoading ? (
            <Skeleton className="h-4 w-5/6" />
          ) : (
            <p className="text-gray-700">{summary?.tldr}</p>
          )}
        </div>

        {/* Bullet Points */}
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gray-900">Key Takeaways</h3>
          <ul className="space-y-2">
            {isLoading
              ? [1, 2, 3].map((i) => <Skeleton key={i} className="h-4 w-3/4" />)
              : summary?.bulletPoints?.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
          </ul>
        </div>

        {/* Full Summary */}
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gray-900">Full Summary</h3>
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </>
          ) : (
            <p className="text-gray-700 whitespace-pre-line">{summary?.summary}</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gray-900">Tags</h3>
          {isLoading ? (
            <Skeleton className="h-6 w-16 rounded-full" />
          ) : (
            <div className="flex flex-wrap gap-2">
              {summary?.tags?.map((tag, i) => (
                <Badge key={i} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Save Button */}
        {!isLoading && summary && (
          <div className="pt-4">
            <Button
              onClick={handleSave}
              disabled={isSaving || isSaved}
              className="w-full flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Saving...
                </>
              ) : isSaved ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" /> Saved
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" /> Save to Library
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


// Loading skeleton component
function SummarySkeleton() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <Skeleton className="h-8 w-48" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div>
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </CardContent>
    </Card>
  );
}
