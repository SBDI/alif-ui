import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FolderList } from "@/components/folders/FolderList";

export const metadata: Metadata = {
  title: "Folders | Alif UI",
  description: "Manage your folders",
};

export default function FoldersPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Folders", href: "/folders" }
      ]} />
      <h1 className="text-2xl font-bold">Your Folders</h1>
      <FolderList />
    </div>
  );
}
