import { Metadata } from "next";
import { ChatContainer } from "@/features/chat/ChatContainer";

export const metadata: Metadata = {
  title: "Chat | Alif",
  description: "Chat with AI about your resources",
};

export default async function ChatPage(props: { params: { folderId: string } }) {
  const params = await props.params;
  return (
    <ChatContainer folderId={params.folderId} />
  );
} 