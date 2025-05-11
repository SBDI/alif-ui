import { Metadata } from "next";
import { ChatContainer } from "@/features/chat/ChatContainer";
import { Breadcrumb } from "@/components/shared/Breadcrumb";

export const metadata: Metadata = {
  title: "Chat | Alif",
  description: "Chat with AI about your resources",
};

export default function ChatPage({ params }: { params: { folderId: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Folders", href: "/folders" },
          { label: "Folder", href: `/folders/${params.folderId}` },
          { label: "Chat", href: `/folders/${params.folderId}/chat` }
        ]}
      />
      <ChatContainer folderId={params.folderId} />
    </div>
  );
} 