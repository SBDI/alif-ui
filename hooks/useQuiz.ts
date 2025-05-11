'use client';

import { useState } from 'react';
import { type QuizSettings, type Question, type Answer } from '@/lib/types/quiz';

export function useQuiz(folderId: string, activityId?: string) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [error, setError] = useState<Error | null>(null);

  const generateQuiz = async (settings: QuizSettings) => {
    setIsLoading(true);
    setError(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    
    try {
      // In a real implementation, this would call an API endpoint
      // For now, just simulate a response after a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Mock questions
      const mockQuestions: Question[] = [
        {
          id: '1',
          text: 'What is the capital of France?',
          answers: [
            { id: 'a', text: 'London' },
            { id: 'b', text: 'Berlin' },
            { id: 'c', text: 'Paris' },
            { id: 'd', text: 'Madrid' },
          ],
          correctAnswerId: 'c',
          explanation: 'Paris is the capital and most populous city of France.',
        },
        {
          id: '2',
          text: 'Which planet is known as the Red Planet?',
          answers: [
            { id: 'a', text: 'Venus' },
            { id: 'b', text: 'Mars' },
            { id: 'c', text: 'Jupiter' },
            { id: 'd', text: 'Saturn' },
          ],
          correctAnswerId: 'b',
          explanation: 'Mars is often called the Red Planet due to its reddish appearance.',
        },
        {
          id: '3',
          text: 'What is the chemical symbol for gold?',
          answers: [
            { id: 'a', text: 'Go' },
            { id: 'b', text: 'Gd' },
            { id: 'c', text: 'Au' },
            { id: 'd', text: 'Ag' },
          ],
          correctAnswerId: 'c',
          explanation: 'The chemical symbol for gold is Au, from the Latin word "aurum".',
        },
      ];
      
      setQuestions(mockQuestions);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to generate quiz'));
    } finally {
      setIsLoading(false);
    }
  };

  const selectAnswer = (questionId: string, answerId: string) => {
    if (isSubmitted) return; // Don't allow changes after submission
    
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitQuiz = () => {
    // Calculate score
    let correct = 0;
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswerId) {
        correct++;
      }
    });
    
    setScore({
      correct,
      total: questions.length,
    });
    
    setIsSubmitted(true);
  };

  return {
    questions,
    currentQuestionIndex,
    selectedAnswers,
    isLoading,
    isSubmitted,
    score,
    error,
    generateQuiz,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    submitQuiz,
  };
}
