import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PracticeQuizContainer } from "@/features/practice-quiz/PracticeQuizContainer";

export const metadata: Metadata = {
  title: "Practice Quiz | Alif UI",
  description: "Test your knowledge with practice quizzes",
};

export default function PracticeQuizPage({ params }: { params: { folderId: string } }) {
  return (
    <div className="space-y-6 px-6">
      <Breadcrumbs items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Folders", href: "/folders" },
        { label: "Folder", href: `/folders/${params.folderId}` },
        { label: "Practice Quiz", href: `/folders/${params.folderId}/practice-quiz` }
      ]} />
      <PracticeQuizContainer folderId={params.folderId} />
    </div>
  );
}
