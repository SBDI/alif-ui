import { useState } from "react";
import { marked } from "marked";
import { solveProblem } from "@/lib/api/tools";

export function useSolve(folderId: string) {
  const [solution, setSolution] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateSolution = async (problem: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await solveProblem(folderId, problem);
      
      // Convert markdown to HTML
      const html = marked(response.solution);
      setSolution(html);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to generate solution"));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    solution,
    generateSolution,
    isLoading,
    error,
  };
}
