'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuiz } from "@/hooks/useQuiz";
import { type QuizSettings } from "@/lib/types/quiz";

interface QuizContainerProps {
  folderId: string;
  activityId?: string;
}

export function QuizContainer({ folderId, activityId }: QuizContainerProps) {
  const [quizStarted, setQuizStarted] = useState(false);
  const {
    questions,
    currentQuestionIndex,
    selectedAnswers,
    generateQuiz,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    submitQuiz,
    isLoading,
    isSubmitted,
    score
  } = useQuiz(folderId, activityId);

  const handleStartQuiz = (settings: QuizSettings) => {
    generateQuiz(settings);
    setQuizStarted(true);
  };

  const handleNewQuiz = () => {
    setQuizStarted(false); // Reset to show the form again
    // The useQuiz hook handles resetting internal state when generateQuiz is called
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quiz</h1>
           {quizStarted && (
               <Button variant="outline" onClick={handleNewQuiz}>New Quiz Setup</Button>
            )}
      </div>
      <p className="text-muted-foreground">
        Test your knowledge with quizzes based on your resources in this folder.
      </p>

      {!quizStarted ? (
        <Card>
          <CardHeader>
            <CardTitle>Create New Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Replace with your QuizForm component */}
            <div className="space-y-4">
              <p>Quiz form will go here</p>
              <Button onClick={() => handleStartQuiz({ numQuestions: 5, difficulty: 'medium' })}>
                Generate Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {isLoading ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-40">
                  <p className="text-muted-foreground animate-pulse">Generating your quiz...</p>
                </div>
              </CardContent>
            </Card>
          ) : ( 
            <div>
              {/* Replace with your QuizDisplay component */}
              <p>Quiz display will go here</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
