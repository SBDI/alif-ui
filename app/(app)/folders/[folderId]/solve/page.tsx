import { Metadata } from "next";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
// import { SolveContainer } from "@/features/solve/SolveContainer"; // Will be created/verified later

export const metadata: Metadata = {
  title: "Solve | Alif",
  description: "Get help solving problems",
};

export default function SolvePage({ params }: { params: { folderId: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Folders", href: "/folders" },
          { label: "Folder", href: `/folders/${params.folderId}` },
          { label: "Solve", href: `/folders/${params.folderId}/solve` }
        ]}
      />
      {/* <SolveContainer folderId={params.folderId} /> */}
      <p>SolveContainer for folder {params.folderId} will be here.</p>
    </div>
  );
} 