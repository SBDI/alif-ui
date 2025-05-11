import { Metadata } from "next";
import { StudyGuideContainer } from "@/features/study-guide/StudyGuideContainer";

export const metadata: Metadata = {
  title: "Study Guide | Alif",
  description: "Generate study guides from your resources",
};

export default async function StudyGuidePage(props: { params: { folderId: string } }) {
  const params = await props.params;
  return (
    <StudyGuideContainer folderId={params.folderId} />
  );
} 