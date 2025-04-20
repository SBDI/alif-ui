'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizForm } from "./components/QuizForm";
import { QuizDisplay } from "./components/QuizDisplay";
import { useQuiz } from "./hooks/useQuiz";
import { type QuizSettings } from "./types";

interface QuizContainerProps {
  folderId: string;
}

export function QuizContainer({ folderId }: QuizContainerProps) {
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
  } = useQuiz(folderId);

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
            <QuizForm onSubmit={handleStartQuiz} folderId={folderId} />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {isLoading ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-40">
                  {/* TODO: Add a proper loading spinner */}
                  <p className="text-muted-foreground animate-pulse">Generating your quiz...</p>
                </div>
              </CardContent>
            </Card>
          ) : ( 
            <QuizDisplay
                questions={questions}
                currentQuestionIndex={currentQuestionIndex}
                selectedAnswers={selectedAnswers}
                onSelectAnswer={selectAnswer}
                onNextQuestion={nextQuestion}
                onPrevQuestion={prevQuestion}
                onSubmitQuiz={submitQuiz}
                isSubmitted={isSubmitted}
                score={score}
            />
          )}
        </div>
      )}
    </div>
  );
} 