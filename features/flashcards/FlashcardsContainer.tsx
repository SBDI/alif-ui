'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFlashcards } from "@/hooks/useFlashcards";

interface FlashcardsContainerProps {
  folderId: string;
  activityId?: string;
}

export function FlashcardsContainer({ folderId, activityId }: FlashcardsContainerProps) {
  const [numCards, setNumCards] = useState(10);
  const [topics, setTopics] = useState("");
  const [showingFront, setShowingFront] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  const { 
    flashcards, 
    generateFlashcards, 
    isLoading, 
    error 
  } = useFlashcards(folderId, activityId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateFlashcards({
      numCards,
      topics: topics ? topics.split(",").map(t => t.trim()) : undefined,
    });
    setCurrentCardIndex(0);
    setShowingFront(true);
  };

  const flipCard = () => {
    setShowingFront(!showingFront);
  };

  const nextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowingFront(true);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowingFront(true);
    }
  };

  const currentCard = flashcards[currentCardIndex] || { front: "", back: "" };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Flashcards</h1>
      <p className="text-muted-foreground">
        Create and study flashcards based on your resources.
      </p>

      {flashcards.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Generate Flashcards</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="numCards">Number of Cards</Label>
                <Input
                  id="numCards"
                  type="number"
                  min={1}
                  max={50}
                  value={numCards}
                  onChange={(e) => setNumCards(parseInt(e.target.value))}
                />
              </div>

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

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Generate Flashcards"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Card {currentCardIndex + 1} of {flashcards.length}
            </p>
            <Button variant="outline" onClick={() => setFlashcards([])}>
              New Flashcards
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              {flashcards.length > 0 ? (
                <div className="space-y-4">
                  <div 
                    className="h-[300px] border rounded-lg p-6 flex items-center justify-center cursor-pointer"
                    onClick={flipCard}
                  >
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        {showingFront ? "Front" : "Back"} (Click to flip)
                      </p>
                      <p className="text-lg font-medium">
                        {showingFront ? currentCard.front : currentCard.back}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={prevCard}
                      disabled={currentCardIndex === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      onClick={nextCard}
                      disabled={currentCardIndex === flashcards.length - 1}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">
                    {isLoading ? "Generating flashcards..." : "No flashcards yet"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
