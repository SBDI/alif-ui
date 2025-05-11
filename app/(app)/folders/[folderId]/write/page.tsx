import { Metadata } from "next";
import { WriteContainer } from "@/features/write/WriteContainer";

export const metadata: Metadata = {
  title: "Write | Alif",
  description: "Get help with writing assignments",
};

export default function WritePage({ params }: { params: { folderId: string } }) {
  return (
    <WriteContainer folderId={params.folderId} />
  );
} 