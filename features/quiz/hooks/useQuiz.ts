import { useState, useCallback } from 'react';
import { type QuizQuestion, type QuizSettings, type QuizResult } from '../types';
// import { api } from '@/lib/api'; // Assuming API client exists

export function useQuiz(folderId: string) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const generateQuiz = useCallback(async (settings: QuizSettings) => {
    setIsLoading(true);
    setIsSubmitted(false);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setScore(0);
    console.log(`Generating quiz for folder ${folderId} with settings:`, settings);
    // TODO: Replace with actual API call
    // const generatedQuestions = await api.tools.generateQuiz(folderId, settings);
    // setQuestions(generatedQuestions);

    // Mock data for now:
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    setQuestions([
      { id: 'q1', question: 'What is 2 + 2?', options: ['3', '4', '5'], answer: '4' },
      { id: 'q2', question: 'Capital of France?', options: ['Berlin', 'Madrid', 'Paris'], answer: 'Paris' },
      { id: 'q3', question: 'React is a...?', options: ['Library', 'Framework', 'Language'], answer: 'Library' },
    ]);
    setIsLoading(false);
  }, [folderId]);

  const selectAnswer = useCallback((questionIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  }, []);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  const prevQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const submitQuiz = useCallback(() => {
    let calculatedScore = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setIsSubmitted(true);
    console.log("Quiz submitted! Score:", calculatedScore, "Selected Answers:", selectedAnswers);
    // TODO: Potentially save results via API call
  }, [questions, selectedAnswers]);

  return {
    questions,
    currentQuestionIndex,
    selectedAnswers,
    isLoading,
    isSubmitted,
    score,
    generateQuiz,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    submitQuiz,
  };
} 