import { useState } from "react";
import { generateStudyGuide } from "@/lib/api/tools";
import { marked } from "marked";

interface StudyGuideParams {
  topics?: string[];
  format?: "outline" | "detailed" | "summary";
}

export function useStudyGuide(folderId: string) {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateGuide = async (params: StudyGuideParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await generateStudyGuide(folderId, params);
      
      // Convert markdown to HTML
      const html = marked(response.content);
      setContent(html);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to generate study guide"));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    content,
    generateGuide,
    isLoading,
    error,
  };
}
