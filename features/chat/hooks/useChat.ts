'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { type Message } from '../types';
// import { api } from '@/lib/api';

export function useChat(folderId: string, initialMessages: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = useCallback(async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(), // Temporary ID
      role: 'user', 
      content: input,
      createdAt: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput(''); // Clear input immediately
    setIsLoading(true);

    try {
      console.log(`Sending message for folder ${folderId}:`, currentInput);
      // TODO: Replace with actual API call
      // const response = await api.tools.chat({ folderId, prompt: currentInput, history: messages });
      
      // Mock response
      await new Promise(resolve => setTimeout(resolve, 1500));
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(), // Temporary ID
        role: 'assistant',
        content: `Mock response to "${currentInput}" for folder ${folderId}.`, 
        createdAt: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error("Error sending message:", error);
      // Optionally add an error message to the chat
       const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: 'Sorry, I encountered an error. Please try again.',
        createdAt: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, folderId, messages]);

  return {
    messages,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    setInput, // Expose setInput if needed for external controls
  };
}
