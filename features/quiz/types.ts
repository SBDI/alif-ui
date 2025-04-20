// Placeholder for quiz related types
export {};

export type QuizDifficulty = 'easy' | 'medium' | 'hard';

export interface QuizParameters {
  numQuestions: number;
  topic?: string; // Optional topic/focus area
  difficulty: QuizDifficulty;
  resourceIds: string[]; // IDs of the resources used
}

// Basic structure, can be expanded (e.g., multiple choice options, explanations)
export interface Question {
  id: string;
  text: string;
  answer: string; 
  type: 'multiple_choice' | 'short_answer' | 'true_false'; // Example types
  options?: string[]; // For multiple choice
}

export interface QuizResult {
  id: string;
  parameters: QuizParameters;
  questions: Question[];
  createdAt: string;
}

// Placeholder for Quiz feature specific types

export interface QuizSettings {
  numQuestions: number;
  difficulty: 'easy' | 'medium' | 'hard';
  topics?: string[];
  // Add other relevant settings
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  // Add detailed results if needed
} 