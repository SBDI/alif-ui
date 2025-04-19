import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { ListChecks, PenLine } from "lucide-react";

export const metadata: Metadata = {
  title: "Homework | Alif UI",
  description: "Homework tools and resources",
};

export default function HomeworkPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Homework</h1>
      <p className="text-muted-foreground mb-6">Choose a homework tool to get started.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/dashboard/homework/solve">
          <Card className="hover:shadow-md transition-all cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <ListChecks className="h-6 w-6 text-primary mb-2" />
                <CardTitle className="text-lg">Solve Problems</CardTitle>
                <CardDescription>
                  Get answers and step-by-step explanations for your homework problems. Upload a photo or type your question to get started.
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/dashboard/homework/write">
          <Card className="hover:shadow-md transition-all cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <PenLine className="h-6 w-6 text-primary mb-2" />
                <CardTitle className="text-lg">Writing Assistant</CardTitle>
                <CardDescription>
                  Draft, edit, and improve your written work. Get help with essays, papers, and other writing assignments.
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
