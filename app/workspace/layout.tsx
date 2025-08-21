"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LayoutDashboard, Library, Settings, Menu, X, Brain, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

type ActiveView = "dashboard" | "library" | "settings"

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeView, setActiveView] = useState<ActiveView>("dashboard")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, path: "/workspace" },
    { id: "library", name: "Library", icon: Library, path: "/workspace/library" },
    { id: "settings", name: "Settings", icon: Settings, path: "/workspace/settings" },
  ]

  return (
    <div className="min-h-screen">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo and User */}
          <div className="space-y-4 py-4 px-4">
            <div className="flex items-center justify-between px-2">
              <Link href="/">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">RecallMind</span>
              </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 px-2 py-2">
              <Avatar>
                <AvatarImage src={session?.user?.image || undefined} />
                <AvatarFallback>
                  {session?.user?.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{session?.user?.name || 'User'}</span>
                <span className="text-sm text-muted-foreground truncate">
                  {session?.user?.email}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = activeView === item.id

              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3",
                    isActive && "bg-primary/10 text-primary"
                  )}
                  onClick={() => {
                    setActiveView(item.id as ActiveView)
                    router.push(item.path)
                    setSidebarOpen(false)
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Mobile Header */}
        <div className="sticky top-0 z-40 flex items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="m-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6" />
            <span className="font-semibold">RecallMind</span>
          </div>
        </div>

        {/* Page Content */}
        <main className="pt-0 px-4 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}
