'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type QuizSettings } from '../types';

interface QuizFormProps {
  onSubmit: (settings: QuizSettings) => void;
  folderId: string; // Passed for context, might be used for resource selection
}

export function QuizForm({ onSubmit, folderId }: QuizFormProps) {
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  // Add state for topics or resource selection if needed

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ numQuestions, difficulty });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="numQuestions">Number of Questions</Label>
        <Input
          id="numQuestions"
          type="number"
          min="1"
          max="20" // Example max
          value={numQuestions}
          onChange={(e) => setNumQuestions(parseInt(e.target.value, 10))}
          required
        />
      </div>
      <div>
        <Label htmlFor="difficulty">Difficulty</Label>
        <Select onValueChange={(value) => setDifficulty(value as 'easy' | 'medium' | 'hard')} defaultValue={difficulty}>
          <SelectTrigger id="difficulty">
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* TODO: Add Resource Selection Component here if needed */}
      {/* Needs access to folderId to fetch linked resources */}
      <Button type="submit">Start Quiz</Button>
    </form>
  );
} 