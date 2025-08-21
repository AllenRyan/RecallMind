"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Youtube, Globe, FileText } from "lucide-react"
import { toast } from "sonner"

export function AddContentForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("youtube")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let requestBody: any = {};
      
      switch (activeTab) {
        case 'youtube':
          const youtubeUrl = (e.currentTarget.querySelector('#youtube-url') as HTMLInputElement)?.value;
          if (!youtubeUrl) {
            throw new Error('Please enter a YouTube URL');
          }
          requestBody = {
            sourceType: 'youtube',
            input: youtubeUrl
          };
          break;
          
        case 'article':
          const articleUrl = (e.currentTarget.querySelector('#article-url') as HTMLInputElement)?.value;
          if (!articleUrl) {
            throw new Error('Please enter an article URL');
          }
          requestBody = {
            sourceType: 'article',
            input: articleUrl
          };
          break;
          
        case 'text':
          const rawText = (e.currentTarget.querySelector('#raw-text') as HTMLTextAreaElement)?.value;
          if (!rawText) {
            throw new Error('Please enter some text to summarize');
          }
          requestBody = {
            sourceType: 'text',
            input: rawText
          };
          break;
      }

      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process your request');
      }

      const data = await response.json();
      // Handle successful response (you might want to update the UI or redirect)
      toast.success('Summary created:', data);
      
      // Reset form
      if (e.currentTarget instanceof HTMLFormElement) {
        e.currentTarget.reset();
      }
      
      // Show success message or redirect
      toast.success('Content submitted successfully!');
      
    } catch (error) {
      console.error('Error submitting content:', error);
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card border-border shadow-lg mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <FileText className="w-4 h-4 text-primary-foreground" />
          </div>
          Add Content to Summarize
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-secondary">
              <TabsTrigger
                value="youtube"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Youtube className="w-4 h-4" />
                YouTube
              </TabsTrigger>
              <TabsTrigger
                value="article"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Globe className="w-4 h-4" />
                Article
              </TabsTrigger>
              <TabsTrigger
                value="text"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <FileText className="w-4 h-4" />
                Raw Text
              </TabsTrigger>
            </TabsList>

            <TabsContent value="youtube" className="space-y-4 mt-6">
              <div className="space-y-2">
                <label htmlFor="youtube-url" className="text-sm font-medium text-foreground">
                  YouTube URL
                </label>
                <Input
                  id="youtube-url"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-ring"
                />
              </div>
            </TabsContent>

            <TabsContent value="article" className="space-y-4 mt-6">
              <div className="space-y-2">
                <label htmlFor="article-url" className="text-sm font-medium text-foreground">
                  Article URL
                </label>
                <Input
                  id="article-url"
                  type="url"
                  placeholder="https://example.com/article"
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-ring"
                />
              </div>
            </TabsContent>

            <TabsContent value="text" className="space-y-4 mt-6">
              <div className="space-y-2">
                <label htmlFor="raw-text" className="text-sm font-medium text-foreground">
                  Raw Text
                </label>
                <Textarea
                  id="raw-text"
                  placeholder="Paste your text content here..."
                  className="min-h-32 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-ring resize-none"
                />
              </div>
            </TabsContent>
          </Tabs>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-lg transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Summarizing...
              </>
            ) : (
              "Summarize Content"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}


export default AddContentForm