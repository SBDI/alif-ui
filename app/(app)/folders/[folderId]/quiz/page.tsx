import { Metadata } from "next";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { QuizContainer } from "@/features/quiz/QuizContainer";

export const metadata: Metadata = {
  title: "Quiz | Alif",
  description: "Test your knowledge with quizzes",
};

export default function QuizPage({ params }: { params: { folderId: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Folders", href: "/folders" },
          { label: "Folder", href: `/folders/${params.folderId}` },
          { label: "Quiz", href: `/folders/${params.folderId}/quiz` }
        ]}
      />
      <QuizContainer folderId={params.folderId} />
    </div>
  );
} 