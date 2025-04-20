import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FolderView } from "@/components/folders/FolderView";

export const metadata: Metadata = {
  title: "Folder | Alif UI",
  description: "View folder contents",
};

export default function FolderPage({ params }: { params: { folderId: string } }) {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Folders", href: "/folders" },
        { label: "Folder", href: `/folders/${params.folderId}` }
      ]} />
      <FolderView folderId={params.folderId} />
    </div>
  );
}
