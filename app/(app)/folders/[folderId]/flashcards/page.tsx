import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FlashcardsContainer } from "@/features/flashcards/FlashcardsContainer";

export const metadata: Metadata = {
  title: "Flashcards | Alif UI",
  description: "Study with AI-generated flashcards",
};

export default function FlashcardsPage({ params }: { params: { folderId: string } }) {
  return (
    <div className="space-y-6 px-6">
      <Breadcrumbs items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Folders", href: "/folders" },
        { label: "Folder", href: `/folders/${params.folderId}` },
        { label: "Flashcards", href: `/folders/${params.folderId}/flashcards` }
      ]} />
      <FlashcardsContainer folderId={params.folderId} />
    </div>
  );
}
