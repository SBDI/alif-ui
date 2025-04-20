import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { WriteContainer } from "@/features/write/WriteContainer";

export const metadata: Metadata = {
  title: "Write | Alif UI",
  description: "Get help with writing assignments",
};

export default function WritePage({ params }: { params: { folderId: string } }) {
  return (
    <div className="space-y-6 px-6">
      <Breadcrumbs items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Folders", href: "/folders" },
        { label: "Folder", href: `/folders/${params.folderId}` },
        { label: "Write", href: `/folders/${params.folderId}/write` }
      ]} />
      <WriteContainer folderId={params.folderId} />
    </div>
  );
}
