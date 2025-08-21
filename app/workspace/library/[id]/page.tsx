"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Summary {
  _id: string
  title: string
  tldr: string
  summary: string[]
  tags: string[]
  createdAt: string
  type: "youtube" | "article" | "text"
}

export default function SummaryDetail() {
  const router = useRouter()
  const { id } = useParams()
  const [summary, setSummary] = useState<Summary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(`/api/summarize/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch summary')
        }
        const result = await response.json()
        setSummary(result.data)
      } catch (err) {
        console.error('Error fetching summary:', err)
        setError('Failed to load summary. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchSummary()
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !summary) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error || 'Summary not found'}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <Button
        variant="blue"
        onClick={() => router.back()}
        className="mb-4 -ml-2 text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Library
      </Button>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-secondary/50 text-secondary-foreground border-border">
            {summary.type}
          </Badge>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(summary.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {summary.title}
        </h1>

        <div className="flex flex-wrap gap-2 pt-2">
          {summary.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-6 pt-4">
        <div className="bg-muted/50 p-4 rounded-lg border">
          <h3 className="font-medium mb-2 text-foreground">TL;DR</h3>
          <p className="text-muted-foreground">{summary.tldr}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Summary</h3>
          <ul className="space-y-3 list-disc pl-5">
            {summary.summary?.map((point, index) => (
              <li key={index} className="text-muted-foreground">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
