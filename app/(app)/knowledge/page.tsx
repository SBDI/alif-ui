import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { KnowledgeBaseView } from "@/components/knowledge/KnowledgeBaseView";

export const metadata: Metadata = {
  title: "Knowledge Base | Alif UI",
  description: "Manage your knowledge resources",
};

export default function KnowledgePage() {
  return (
    <div className="space-y-6">
      {/* <Breadcrumbs items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Knowledge", href: "/knowledge" }
      ]} /> */}
      <h1 className="text-2xl font-bold">Knowledge Base</h1>
      <KnowledgeBaseView />
    </div>
  );
}
