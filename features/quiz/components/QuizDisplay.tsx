import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type QuizQuestion } from '../types';

interface QuizDisplayProps {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  selectedAnswers: { [key: number]: string };
  onSelectAnswer: (questionIndex: number, answer: string) => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  onSubmitQuiz: () => void;
  isSubmitted: boolean;
  score: number;
}

export function QuizDisplay({
  questions,
  currentQuestionIndex,
  selectedAnswers,
  onSelectAnswer,
  onNextQuestion,
  onPrevQuestion,
  onSubmitQuiz,
  isSubmitted,
  score,
}: QuizDisplayProps) {

  if (isSubmitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center p-6">
              <h2 className="text-2xl font-bold">
                Your Score: {score}/{questions.length}
              </h2>
              <p className="text-muted-foreground mt-2">
                {score === questions.length
                  ? "Perfect score! Excellent work!"
                  : score >= questions.length * 0.7
                  ? "Great job! You're doing well."
                  : "Keep practicing to improve your score."}
              </p>
            </div>
            {/* Optionally show review of answers here */}
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
         <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">No question loaded.</p>
                </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Question {currentQuestionIndex + 1} of {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-lg font-medium">{currentQuestion.question}</p>
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`border rounded-lg p-3 cursor-pointer hover:border-primary transition-colors ${
                  selectedAnswers[currentQuestionIndex] === option
                    ? "border-primary bg-primary/5"
                    : ""
                }`}
                onClick={() => onSelectAnswer(currentQuestionIndex, option)}
              >
                {option}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={onPrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            {currentQuestionIndex === questions.length - 1 ? (
              <Button onClick={onSubmitQuiz}>Submit Quiz</Button>
            ) : (
              <Button onClick={onNextQuestion}>Next</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 