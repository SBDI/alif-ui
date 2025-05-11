'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BookOpen, ListChecks, PenLine, MessageSquare, Plus, Loader2 } from 'lucide-react'
import { FlashIcon } from '@/components/icons/flash-icon'
import { cn } from "@/lib/utils";

export default function DashboardHome() {
  const router = useRouter();
  const [isCreatingChat, setIsCreatingChat] = useState(false);

  const handleNewChat = async () => {
    if (isCreatingChat) return;
    setIsCreatingChat(true);
    try {
      console.log("Simulating creation of new chat activity...");
      await new Promise(resolve => setTimeout(resolve, 1000));

      const folderId = 'default-folder';

      console.log(`Navigating to new chat: /folders/${folderId}/chat`);
      router.push(`/folders/${folderId}/chat`);
      
    } catch (error) {
      console.error("Failed to create or navigate to new chat:", error);
    } finally {
      setIsCreatingChat(false);
    }
  };

  const handleChat = (folderId: string) => {
    router.push(`/folders/${folderId}/chat`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex justify-center mb-8">
        <Button variant="outline" className="flex items-center gap-2 px-6 py-5 rounded-full" asChild>
          <Link href="/dashboard/new-activity">
            <Plus className="h-4 w-4" />
            <span>New Activity</span>
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <Card 
          onClick={handleNewChat} 
          className={cn(
            "border-dashed hover:border-solid hover:border-primary/50 transition-all cursor-pointer bg-card/50",
            isCreatingChat && "opacity-50 cursor-not-allowed"
          )}
          aria-disabled={isCreatingChat}
        >
          <CardContent className="p-6 flex items-center gap-3">
            {isCreatingChat ? (
              <Loader2 className="h-5 w-5 text-primary animate-spin" />
            ) : (
              <MessageSquare className="h-5 w-5 text-primary" />
            )}
            <span className="font-medium">Chat with AI</span>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-medium mb-4">Studying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard/study/guide">
            <Card className="hover:shadow-md transition-all cursor-pointer bg-card/50">
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
            <Card className="hover:shadow-md transition-all cursor-pointer bg-card/50">
              <CardContent className="p-6">
                <div className="flex flex-col gap-2">
                  <ListChecks className="h-5 w-5 text-primary mb-2" />
                  <CardTitle className="text-base">Quiz</CardTitle>
                  <CardDescription>Test your knowledge</CardDescription>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/study/flashcards">
            <Card className="hover:shadow-md transition-all cursor-pointer bg-card/50">
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
            <Card className="hover:shadow-md transition-all cursor-pointer bg-card/50">
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
            <Card className="hover:shadow-md transition-all cursor-pointer bg-card/50">
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
    </div>
  )
}
