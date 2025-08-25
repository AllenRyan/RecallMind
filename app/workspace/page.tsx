"use client";

import { useState } from "react";
import { AddContentForm } from "@/components/addContentForm";
import SummaryResult from "@/components/summaryResult";

type SummaryData = {
  source: string;
  sourceType: 'youtube' | 'article' | 'text';
  title?: string;
};

export default function WorkspaceDashboard() {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleSummaryStart = (data: { source: string; sourceType: 'youtube' | 'article' | 'text'; title?: string }) => {
    setSummaryData(data);
    setIsSummarizing(true);
  };

  const handleSummaryComplete = (summary: any) => {
    setIsSummarizing(false);
    // You can store the completed summary in state if needed
  };

  return (
    <div className="space-y-7">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-2">
          Welcome to Your <span className="text-blue-600">Workspace</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Your intelligent knowledge management companion. Summarize content,
          organize insights, and recall information effortlessly.
        </p>
      </div>

      {/* Add Content Form */}
      <AddContentForm onSummaryGenerated={handleSummaryStart} />

      {/* Real-time Summary Result */}
      {summaryData && (
        <SummaryResult 
          source={summaryData.source}
          sourceType={summaryData.sourceType}
          title={summaryData.title}
          onClose={() => setSummaryData(null)}
          onSummaryComplete={handleSummaryComplete}
        />
      )}
    </div>
  );
}
