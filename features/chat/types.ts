// Placeholder for chat types

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt?: Date;
}

export interface ChatSession {
  id: string;
  folderId: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}
