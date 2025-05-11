export interface QuizSettings {
  numQuestions?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  topics?: string[];
}

export interface Answer {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
  correctAnswerId: string;
  explanation?: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  questionResults: {
    questionId: string;
    isCorrect: boolean;
    selectedAnswerId?: string;
  }[];
}
