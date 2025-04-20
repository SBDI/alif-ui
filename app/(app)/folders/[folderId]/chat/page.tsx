import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ChatContainer } from "@/features/chat/ChatContainer";

export const metadata: Metadata = {
  title: "Chat | Alif UI",
  description: "Chat with your learning resources",
};

export default function ChatPage({ params }: { params: { folderId: string } }) {
  return (
    <div className="space-y-6 px-6">
      <Breadcrumbs items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Folders", href: "/folders" },
        { label: "Folder", href: `/folders/${params.folderId}` },
        { label: "Chat", href: `/folders/${params.folderId}/chat` }
      ]} />
      <ChatContainer folderId={params.folderId} />
    </div>
  );
}
