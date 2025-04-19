'use client';

import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { QuizParameters, QuizDifficulty } from '../types';

interface NewQuizFormProps {
  parameters: Partial<QuizParameters>; // Use partial for intermediate state
  setParameters: (params: Partial<QuizParameters>) => void;
}

export const NewQuizForm: React.FC<NewQuizFormProps> = ({ parameters, setParameters }) => {

  const handleValueChange = (field: keyof QuizParameters, value: any) => {
    setParameters({ ...parameters, [field]: value });
  };

  const handleDifficultyChange = (value: QuizDifficulty) => {
    if (value) { // Ensure a value is selected
        handleValueChange('difficulty', value);
    }
  };

  return (
    <form className="space-y-6 p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Quiz Options</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Number of Questions */}
          <div className="space-y-2">
            <Label htmlFor="numQuestions">Number of Questions</Label>
            <Select 
                onValueChange={(value) => handleValueChange('numQuestions', parseInt(value, 10))}
                value={parameters.numQuestions?.toString() ?? '5'}
            >
              <SelectTrigger id="numQuestions">
                <SelectValue placeholder="Select number..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Topic (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="topic">Topic / Focus Area (Optional)</Label>
            <Input 
                id="topic" 
                placeholder="e.g., Chapter 3, Photosynthesis"
                value={parameters.topic ?? ''}
                onChange={(e) => handleValueChange('topic', e.target.value)}
            />
          </div>
      </div>

      {/* Difficulty */}
      <div className="space-y-2">
        <Label>Difficulty</Label>
        <ToggleGroup
          type="single"
          variant="outline"
          value={parameters.difficulty ?? 'medium'}
          onValueChange={handleDifficultyChange}
          className="justify-start"
        >
          <ToggleGroupItem value="easy" aria-label="Easy">
            Easy
          </ToggleGroupItem>
          <ToggleGroupItem value="medium" aria-label="Medium">
            Medium
          </ToggleGroupItem>
          <ToggleGroupItem value="hard" aria-label="Hard">
            Hard
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </form>
  );
}; 