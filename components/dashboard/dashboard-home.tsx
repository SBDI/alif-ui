'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BookOpen, ListChecks, PenLine, MessageSquare, Plus } from 'lucide-react'
import { FlashIcon } from '@/components/icons/flash-icon'

export default function DashboardHome() {
  const router = useRouter();
  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex justify-center mb-8">
        <Button variant="outline" className="flex items-center gap-2 px-6 py-5 rounded-full" asChild>
          <Link href="/dashboard/new-space">
            <Plus className="h-4 w-4" />
            <span>New space</span>
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <Link href="/dashboard/chat">
          <Card className="border-dashed hover:border-solid hover:border-primary/50 transition-all cursor-pointer">
            <CardContent className="p-6 flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span className="font-medium">Chat with AI</span>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-medium mb-4">Studying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard/study/guide">
            <Card className="hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col gap-2">
                  <BookOpen className="h-5 w-5 text-primary mb-2" />
                  <CardTitle className="text-base">Study guide</CardTitle>
                  <CardDescription>Prepare for a test</CardDescription>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/study/quiz">
            <Card className="hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col gap-2">
                  <ListChecks className="h-5 w-5 text-primary mb-2" />
                  <CardTitle className="text-base">Practice quiz</CardTitle>
                  <CardDescription>Test your knowledge</CardDescription>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/study/flashcards">
            <Card className="hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col gap-2">
                  <FlashIcon className="h-5 w-5 text-primary mb-2" />
                  <CardTitle className="text-base">Flashcards</CardTitle>
                  <CardDescription>Bite-sized studying</CardDescription>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-medium mb-4">Homework</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/dashboard/homework/solve">
            <Card className="hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col gap-2">
                  <ListChecks className="h-5 w-5 text-primary mb-2" />
                  <CardTitle className="text-base">Solve</CardTitle>
                  <CardDescription>Get answers and explanations</CardDescription>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/homework/write">
            <Card className="hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col gap-2">
                  <PenLine className="h-5 w-5 text-primary mb-2" />
                  <CardTitle className="text-base">Write</CardTitle>
                  <CardDescription>Draft paragraphs or papers</CardDescription>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-medium mb-4">Notes</h2>
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget.elements.namedItem('query') as HTMLInputElement;
            if (input.value.trim()) {
              // Navigate to chat with the query
              router.push(`/dashboard/chat?q=${encodeURIComponent(input.value.trim())}`);
            }
          }}
        >
          <Input
            name="query"
            className="w-full py-6 px-4 rounded-full"
            placeholder="Ask Alif anything..."
          />
        </form>
      </div>
    </div>
  )
}
