'use client';

import React, { useState } from 'react';
import { ResourceSelectionList } from '../components/ResourceSelectionList';
import { NewQuizForm } from '../components/NewQuizForm';
import { QuizParameters } from '../types';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';

export const NewQuizPageContainer: React.FC = () => {
  const [selectedResourceIds, setSelectedResourceIds] = useState<string[]>([]);
  const [quizParameters, setQuizParameters] = useState<Partial<QuizParameters>>({
    // Default values
    numQuestions: 5,
    difficulty: 'medium',
    topic: '',
  });

  const handleGenerateQuiz = () => {
    if (selectedResourceIds.length === 0) {
      alert('Please select at least one resource.'); // Replace with better UI feedback
      return;
    }

    const finalParameters: QuizParameters = {
        ...quizParameters,
        numQuestions: quizParameters.numQuestions ?? 5, // Ensure defaults
        difficulty: quizParameters.difficulty ?? 'medium',
        resourceIds: selectedResourceIds,
    };

    console.log('[TODO] Generate Quiz with parameters:', finalParameters);
    // TODO: Call the API route to generate the quiz (Step 8)
    // e.g., call POST /api/quiz with finalParameters
    // Handle loading state and navigation to quiz results page
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Left side: Resource Selection */}
      <div className="lg:col-span-2">
        <ResourceSelectionList 
            selectedResourceIds={selectedResourceIds}
            setSelectedResourceIds={setSelectedResourceIds}
        />
      </div>

      {/* Right side: Form and Generate Button */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        <NewQuizForm 
            parameters={quizParameters}
            setParameters={setQuizParameters}
        />
        <Button 
            className="w-full"
            onClick={handleGenerateQuiz}
            disabled={selectedResourceIds.length === 0} // Disable if no resources selected
        >
          <Wand2 className="mr-2 h-4 w-4" /> Generate Quiz
        </Button>
      </div>
    </div>
  );
}; 