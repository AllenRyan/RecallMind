"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Loader2, AlertCircle, Search } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import DeleteButton from "@/components/DeleteButton"
import SummaryTags from "@/components/SummaryTags"

interface Summary {
  _id: string
  title: string
  tldr: string
  tags: string[]
  createdAt: string
  sourceType: "youtube" | "article" | "text"
}

function SummaryLibrary() {
  const [summaries, setSummaries] = useState<Summary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const fetchSummaries = async (searchTerm = "") => {
    try {
      const url = searchTerm 
        ? `/api/summarize?search=${encodeURIComponent(searchTerm)}`
        : "/api/summarize"
        
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Failed to fetch summaries")
      }
      const result = await response.json()
      setSummaries(Array.isArray(result?.data) ? result.data : [])
    } catch (err) {
      console.error("Error fetching summaries:", err)
      setError("Failed to load summaries. Please try again later.")
    } finally {
      setIsLoading(false)
      setIsSearching(false)
    }
  }

  useEffect(() => {
    fetchSummaries()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
    fetchSummaries(searchQuery)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-foreground"> <span className="text-blue-600">Summary</span> Library</h2>
          <div className="text-sm text-muted-foreground">
            {summaries.length} {summaries.length === 1 ? "summary" : "summaries"}
          </div>
        </div>
        
        <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search summaries by title or content..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isSearching}>
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              'Search'
            )}
          </Button>
          {searchQuery && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("")
                setIsSearching(true)
                fetchSummaries()
              }}
              disabled={isLoading}
            >
              Clear
            </Button>
          )}
        </form>
      </div>

      {summaries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No summaries found. Add your first summary to get started!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {summaries.map((summary) => (
            <div key={summary._id} className="relative group h-full">
              <div className="h-full">
                <Link href={`/workspace/library/${summary._id}`} className="block h-full">
                  <Card className="relative h-full cursor-pointer border-border hover:border-accent/50 transition-all duration-200 hover:shadow-lg hover:shadow-accent/10">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                          {summary.title}
                        </CardTitle>
                        <Badge
                          variant="secondary"
                          className="shrink-0 bg-secondary/50 text-secondary-foreground border-border"
                        >
                          {summary.sourceType}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4 relative">
                      {deletingId === summary._id && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
                          <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        </div>
                      )}
                      <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                        {summary.tldr}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        <SummaryTags tags={summary.tags} />
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(summary.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <DeleteButton
                            summary={summary}
                            setDeletingId={setDeletingId}
                            fetchSummaries={fetchSummaries}
                            setError={setError}
                            deletingId={deletingId}
                        />
                        
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>            
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SummaryLibrary
