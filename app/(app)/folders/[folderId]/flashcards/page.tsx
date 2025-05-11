import { Metadata } from "next";
import { FlashcardsContainer } from "@/features/flashcards/FlashcardsContainer";

export const metadata: Metadata = {
  title: "Flashcards | Alif",
  description: "Study with AI-generated flashcards",
};

export default function FlashcardsPage({ params }: { params: { folderId: string } }) {
  return (
    <FlashcardsContainer folderId={params.folderId} />
  );
} 