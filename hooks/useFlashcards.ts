'use client';

import { useState } from 'react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface FlashcardsParams {
  numCards: number;
  topics?: string[];
}

export function useFlashcards(folderId: string, activityId?: string) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateFlashcards = async (params: FlashcardsParams) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call an API endpoint
      // For now, just simulate a response after a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Mock flashcards
      const mockFlashcards: Flashcard[] = Array.from({ length: params.numCards }, (_, i) => ({
        id: (i + 1).toString(),
        front: `Term ${i + 1}${params.topics ? ` (${params.topics.join(', ')})` : ''}`,
        back: `Definition for Term ${i + 1}. This would be generated based on the resources in folder ${folderId}${activityId ? ` and activity ${activityId}` : ''}.`,
      }));
      
      setFlashcards(mockFlashcards);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to generate flashcards'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    flashcards,
    isLoading,
    error,
    generateFlashcards,
    setFlashcards, // Expose this to allow clearing flashcards
  };
}
