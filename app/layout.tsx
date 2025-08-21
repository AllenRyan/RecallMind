import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { cn } from "@/lib/utils";
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RecallMind - Your AI-Powered Knowledge Companion',
  description: 'Save, summarize, and manage your knowledge with AI. Transform YouTube videos, articles, and text into actionable insights.',
  keywords: ['AI summarization', 'knowledge management', 'note taking', 'content curation'],
  icons: {
    icon: '/favicon.svg'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen font-sans antialiased grainy", inter.className
      )}>
        <main className="container mx-auto px-4 py-8">
              <Providers>
              {children}
              <Toaster />
              </Providers>
           </main>
      </body>
    </html>
  )
}