"use client"
import AddContentForm from "@/components/addContentForm"
import SummaryLibrary from "./library/page"

export default function WorkspaceDashboard() {
  return (
    <>
    <div className="space-y-0">
      <div className="text-center pt-0">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to Your <span className="text-blue-600">Workspace</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Your intelligent knowledge management companion. Summarize content, organize insights, and recall
            information effortlessly.
          </p>
        </div>
      </div>
    </div>
      
    <div className="grid gap-6 mt-10">
        <AddContentForm />
        <SummaryLibrary />
      </div>
    </>
  )
}
