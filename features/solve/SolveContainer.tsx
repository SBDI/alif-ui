'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSolve } from "./hooks/useSolve";

interface SolveContainerProps {
  folderId: string;
}

export function SolveContainer({ folderId }: SolveContainerProps) {
  const [problem, setProblem] = useState("");
  const [activeTab, setActiveTab] = useState<"text" | "image">("text");
  const { solution, generateSolution, isLoading, error } = useSolve(folderId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (problem.trim()) {
      generateSolution(problem);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real implementation, this would upload the image and extract text
      // For now, just set a placeholder message
      setProblem(`[Image uploaded: ${file.name}]`);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Solve Problems</h1>
      <p className="text-muted-foreground">
        Get step-by-step solutions to your problems using AI.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Problem</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "text" | "image")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text">Text</TabsTrigger>
                  <TabsTrigger value="image">Image</TabsTrigger>
                </TabsList>
                <TabsContent value="text" className="space-y-4">
                  <Textarea
                    placeholder="Type your problem here... (e.g., Solve for x: 2x + 3 = 7)"
                    className="min-h-[200px]"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                  />
                </TabsContent>
                <TabsContent value="image" className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center justify-center gap-2"
                    >
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6"
                        >
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                          <line x1="16" x2="22" y1="5" y2="5" />
                          <line x1="19" x2="19" y1="2" y2="8" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">
                        Click to upload an image
                      </span>
                      <span className="text-xs text-muted-foreground">
                        PNG, JPG, or JPEG (max. 5MB)
                      </span>
                    </label>
                  </div>
                  {problem.startsWith("[Image uploaded:") && (
                    <div className="text-sm text-muted-foreground">
                      Image uploaded. Click "Solve" to process.
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !problem.trim()}
              >
                {isLoading ? "Solving..." : "Solve"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Solution</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-4">
                {error.message}
              </div>
            )}

            {solution ? (
              <div className="prose max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: solution }} />
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center border rounded-lg p-4">
                <p className="text-muted-foreground">
                  {isLoading
                    ? "Generating solution..."
                    : "Enter a problem to see the solution"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
