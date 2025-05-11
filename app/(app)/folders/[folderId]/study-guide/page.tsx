import { Metadata } from "next";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
// import { StudyGuideContainer } from "@/features/study-guide/StudyGuideContainer"; // Will be created/verified later

export const metadata: Metadata = {
  title: "Study Guide | Alif",
  description: "Generate study guides from your resources",
};

export default function StudyGuidePage({ params }: { params: { folderId: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Folders", href: "/folders" },
          { label: "Folder", href: `/folders/${params.folderId}` },
          { label: "Study Guide", href: `/folders/${params.folderId}/study-guide` }
        ]}
      />
      {/* <StudyGuideContainer folderId={params.folderId} /> */}
      <p>StudyGuideContainer for folder {params.folderId} will be here.</p>
    </div>
  );
} 