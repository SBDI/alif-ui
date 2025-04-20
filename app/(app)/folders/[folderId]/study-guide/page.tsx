import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { StudyGuideContainer } from "@/features/study-guide/StudyGuideContainer";

export const metadata: Metadata = {
  title: "Study Guide | Alif UI",
  description: "Generate study guides from your resources",
};

export default function StudyGuidePage({ params }: { params: { folderId: string } }) {
  return (
    <div className="space-y-6 px-6">
      <Breadcrumbs items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Folders", href: "/folders" },
        { label: "Folder", href: `/folders/${params.folderId}` },
        { label: "Study Guide", href: `/folders/${params.folderId}/study-guide` }
      ]} />
      <StudyGuideContainer folderId={params.folderId} />
    </div>
  );
}
