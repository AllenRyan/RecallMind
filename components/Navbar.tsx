"use client";

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Brain, LogOut, Library, Plus, User, ArrowRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className=" fixed top-0 right-0 left-0 z-30 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">RecallMind</span>
          </Link>
          
          {session ? (
            <div className="flex items-center space-x-4">
                <Link href='#about'>
                <Button variant="ghost" size="sm">
                  About
                </Button>
                </Link>
                <Link href='#features'>
                <Button variant="ghost" size="sm">
                  Features
                </Button>
                </Link>
                <Link href='#testimonials'>
                <Button variant="ghost" size="sm">
                  Testimonials
                </Button>
                </Link>
              <Link href="/workspace/library">
                <Button variant="ghost" size="sm">
                  <Library className="h-6 w-6" />
                  Library
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium">{session.user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <Link href="/dashboard">
                    <DropdownMenuItem className="cursor-pointer">
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Add Content</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/workspace">
                    <DropdownMenuItem className="cursor-pointer">
                      <Library className="mr-2 h-4 w-4" />
                      <span>My Workspace</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-600 focus:text-red-600"
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
              <div className="space-x-2">
                <Link href='#about'>
                <Button variant="ghost" size="sm">
                  About
                </Button>
                </Link>
                <Link href='#features'>
                <Button variant="ghost" size="sm">
                  Features
                </Button>
                </Link>
                <Link href='#testimonials'>
                <Button variant="ghost" size="sm">
                  Testimonials
                </Button>
                </Link>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="blue" size="sm">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                </Link>
                
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}