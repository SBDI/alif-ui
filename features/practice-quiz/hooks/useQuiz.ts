import { useState } from "react";
import { generateQuiz as apiGenerateQuiz } from "@/lib/api/tools";
import { Question } from "../types";

interface QuizParams {
  numQuestions: number;
  difficulty: "easy" | "medium" | "hard";
  topics?: string[];
}

export function useQuiz(folderId: string) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const generateQuiz = async (params: QuizParams) => {
    setIsLoading(true);
    setError(null);
    setIsSubmitted(false);
    setSelectedAnswers([]);
    setCurrentQuestionIndex(0);
    setScore(0);

    try {
      const response = await apiGenerateQuiz(folderId, params);
      setQuestions(response.questions);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to generate quiz"));
    } finally {
      setIsLoading(false);
    }
  };

  const selectAnswer = (questionIndex: number, answer: string) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answer;
    setSelectedAnswers(newSelectedAnswers);
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
    let correctAnswers = 0;
    
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        correctAnswers++;
      }
    });
    
    setScore(correctAnswers);
    setIsSubmitted(true);
  };

  return {
    questions,
    currentQuestionIndex,
    selectedAnswers,
    generateQuiz,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    submitQuiz,
    isLoading,
    error,
    isSubmitted,
    score,
  };
}
