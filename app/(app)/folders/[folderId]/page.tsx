import { Metadata } from "next";
// import { Breadcrumbs } from "@/components/layout/Breadcrumbs"; // Removed
import { FolderView } from "@/components/folders/FolderView";

export const metadata: Metadata = {
  title: "Folder | Alif UI",
  description: "View folder contents",
};

export default async function FolderPage(props: { params: { folderId: string } }) {
  const params = await props.params;
  return (
    <div className="space-y-6">
      {/* <Breadcrumbs items={[...]} /> */}
      {/* Removed Breadcrumbs component rendering */}
      <FolderView folderId={params.folderId} />
    </div>
  );
}
