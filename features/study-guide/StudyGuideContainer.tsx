'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStudyGuide } from "@/hooks/useStudyGuide";

interface StudyGuideContainerProps {
  folderId: string;
  activityId?: string;
}

export function StudyGuideContainer({ folderId, activityId }: StudyGuideContainerProps) {
  const [topics, setTopics] = useState("");
  const [format, setFormat] = useState<"outline" | "detailed" | "summary">("detailed");
  const { generateGuide, content, isLoading, error } = useStudyGuide(folderId, activityId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateGuide({
      topics: topics ? topics.split(",").map(t => t.trim()) : undefined,
      format,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Study Guide</h1>
      <p className="text-muted-foreground">
        Generate a study guide from your resources in this folder.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Generate Study Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topics">Topics (Optional)</Label>
                <Input
                  id="topics"
                  value={topics}
                  onChange={(e) => setTopics(e.target.value)}
                  placeholder="e.g., Calculus, Derivatives, Integrals"
                />
                <p className="text-xs text-muted-foreground">
                  Separate multiple topics with commas
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="format">Format</Label>
                <Select
                  value={format}
                  onValueChange={(value) => setFormat(value as any)}
                >
                  <SelectTrigger id="format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="outline">Outline</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                    <SelectItem value="summary">Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Generate Study Guide"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Study Guide Content</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-4">
                {error.message}
              </div>
            )}

            {content ? (
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            ) : (
              <div className="h-[400px] flex items-center justify-center border rounded-lg p-4">
                <p className="text-muted-foreground">
                  {isLoading
                    ? "Generating your study guide..."
                    : "Your study guide will appear here"}
                </p>
              </div>
            )}

            {content && (
              <div className="mt-4 flex justify-end">
                <Button variant="outline">Download PDF</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
