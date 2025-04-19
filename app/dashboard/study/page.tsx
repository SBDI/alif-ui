import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { BookOpen, ListChecks } from "lucide-react";
import { FlashIcon } from "@/components/icons/flash-icon";

export const metadata: Metadata = {
  title: "Study | Alif UI",
  description: "Study tools and resources",
};

export default function StudyPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Study</h1>
      <p className="text-muted-foreground mb-6">Choose a study tool to get started.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/study/guide">
          <Card className="hover:shadow-md transition-all cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <BookOpen className="h-6 w-6 text-primary mb-2" />
                <CardTitle className="text-lg">Study Guide</CardTitle>
                <CardDescription>
                  Create comprehensive study guides for any subject. Organize your notes, highlight key concepts, and prepare for tests effectively.
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/dashboard/study/quiz">
          <Card className="hover:shadow-md transition-all cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <ListChecks className="h-6 w-6 text-primary mb-2" />
                <CardTitle className="text-lg">Practice Quiz</CardTitle>
                <CardDescription>
                  Test your knowledge with interactive quizzes. Generate questions from your study materials or choose from pre-made quizzes.
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/dashboard/study/flashcards">
          <Card className="hover:shadow-md transition-all cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <FlashIcon className="h-6 w-6 text-primary mb-2" />
                <CardTitle className="text-lg">Flashcards</CardTitle>
                <CardDescription>
                  Create and study with bite-sized flashcards. Perfect for memorization and quick review sessions before exams.
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
