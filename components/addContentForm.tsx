"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Youtube, Globe, FileText } from "lucide-react"
import { toast } from "sonner"

interface AddContentFormProps {
  onSummaryGenerated?: (summary: any) => any; 
}

export function AddContentForm({ onSummaryGenerated }: AddContentFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("youtube")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let requestBody: {
        sourceType: 'youtube' | 'article' | 'text';
        input: string;
        title?: string;
      } = {
        sourceType: 'youtube',
        input: ''
      };
      
      switch (activeTab) {
        case 'youtube': {
          const youtubeUrl = (e.currentTarget.querySelector('#youtube-url') as HTMLInputElement)?.value;
          if (!youtubeUrl) {
            throw new Error('Please enter a YouTube URL');
          }
          requestBody = {
            sourceType: 'youtube',
            input: youtubeUrl,
            title: new URL(youtubeUrl).searchParams.get('v') || 'YouTube Video'
          };
          break;
        }
          
        case 'article': {
          const articleUrl = (e.currentTarget.querySelector('#article-url') as HTMLInputElement)?.value;
          if (!articleUrl) {
            throw new Error('Please enter an article URL');
          }
          requestBody = {
            sourceType: 'article',
            input: articleUrl,
            title: new URL(articleUrl).hostname.replace('www.', '')
          };
          break;
        }
          
        case 'text': {
          const rawText = (e.currentTarget.querySelector('#raw-text') as HTMLTextAreaElement)?.value;
          if (!rawText) {
            throw new Error('Please enter some text to summarize');
          }
          requestBody = {
            sourceType: 'text',
            input: rawText,
            title: rawText.split('\n')[0].substring(0, 50) + (rawText.length > 50 ? '...' : '')
          };
          break;
        }
      }

      if (onSummaryGenerated) {
        onSummaryGenerated({
          source: requestBody.input,
          sourceType: requestBody.sourceType,
          title: requestBody.title
        });
      }

      if (e.currentTarget instanceof HTMLFormElement) {
        e.currentTarget.reset();
      }
      
    } catch (error) {
      console.error('Error submitting content:', error);
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-5xl mx-auto bg-card border-border shadow-lg mb-4">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-secondary h-9">
              <TabsTrigger
                value="youtube"
                className="flex items-center gap-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Youtube className="w-3.5 h-3.5" />
                YouTube
              </TabsTrigger>
              <TabsTrigger
                value="article"
                className="flex items-center gap-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Globe className="w-3.5 h-3.5" />
                Article
              </TabsTrigger>
              <TabsTrigger
                value="text"
                className="flex items-center gap-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <FileText className="w-3.5 h-3.5" />
                Raw Text
              </TabsTrigger>
            </TabsList>

            <TabsContent value="youtube" className="space-y-4 mt-2">
              <div className="space-y-2">
                <div className="flex gap-3 w-full">
                  <Input
                    id="youtube-url"
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-[80%] bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-ring"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-[20%] bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-10 transition-colors"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : 'Add Content'}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="article" className="space-y-4 mt-2">
              <div className="space-y-2">
                <div className="flex gap-3 w-full">
                  <Input
                    id="article-url"
                    type="url"
                    placeholder="https://example.com/article"
                    className="w-[80%] bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-ring"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-[20%] bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-10 transition-colors"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : 'Add Content'}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="text" className="space-y-4 mt-2">
              <div className="space-y-2">
                <div className="flex flex-col gap-3 w-full">
                  <Textarea
                    id="raw-text"
                    placeholder="Paste your text content here..."
                    className="min-h-24 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-ring resize-none"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-[20%] ml-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-10 transition-colors"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : 'Summarize'}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

        </form>
      </CardContent>
    </Card>
  )
}

export default AddContentForm