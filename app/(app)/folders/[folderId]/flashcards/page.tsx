import { Metadata } from "next";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
// import { FlashcardsContainer } from "@/features/flashcards/FlashcardsContainer"; // Will be created/verified later

export const metadata: Metadata = {
  title: "Flashcards | Alif",
  description: "Study with AI-generated flashcards",
};

export default function FlashcardsPage({ params }: { params: { folderId: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Folders", href: "/folders" },
          { label: "Folder", href: `/folders/${params.folderId}` },
          { label: "Flashcards", href: `/folders/${params.folderId}/flashcards` }
        ]}
      />
      {/* <FlashcardsContainer folderId={params.folderId} /> */}
      <p>FlashcardsContainer for folder {params.folderId} will be here.</p>
    </div>
  );
} 