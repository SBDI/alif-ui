export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface Quiz {
  id: string;
  folderId: string;
  questions: Question[];
  difficulty: "easy" | "medium" | "hard";
  topics?: string[];
  createdAt: string;
}
