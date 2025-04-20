import { useState } from "react";
import { generateFlashcards as apiGenerateFlashcards } from "@/lib/api/tools";
import { Flashcard } from "../types";

interface FlashcardsParams {
  numCards: number;
  topics?: string[];
}

export function useFlashcards(folderId: string) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateFlashcards = async (params: FlashcardsParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiGenerateFlashcards(folderId, params);
      setFlashcards(response.flashcards);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to generate flashcards"));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    flashcards,
    generateFlashcards,
    isLoading,
    error,
  };
}
