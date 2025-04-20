import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SolveContainer } from "@/features/solve/SolveContainer";

export const metadata: Metadata = {
  title: "Solve | Alif UI",
  description: "Get help solving problems",
};

export default function SolvePage({ params }: { params: { folderId: string } }) {
  return (
    <div className="space-y-6 px-6">
      <Breadcrumbs items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Folders", href: "/folders" },
        { label: "Folder", href: `/folders/${params.folderId}` },
        { label: "Solve", href: `/folders/${params.folderId}/solve` }
      ]} />
      <SolveContainer folderId={params.folderId} />
    </div>
  );
}
