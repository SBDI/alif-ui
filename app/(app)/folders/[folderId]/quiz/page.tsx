import { Metadata } from "next";
import { QuizContainer } from "@/features/quiz/QuizContainer";

export const metadata: Metadata = {
  title: "Quiz | Alif",
  description: "Test your knowledge with quizzes",
};

export default function QuizPage({ params }: { params: { folderId: string } }) {
  return (
    <QuizContainer folderId={params.folderId} />
  );
} 