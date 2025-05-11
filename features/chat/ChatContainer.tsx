'use client';

import React, { useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizonal, User, Bot, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatContainerProps {
  folderId: string;
  activityId?: string; // Optional to maintain backward compatibility
}

export function ChatContainer({ folderId, activityId }: ChatContainerProps) {
  // Pass activityId to useChat hook
  const { messages, input, isLoading, handleInputChange, handleSubmit } = useChat(folderId, [], activityId);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-var(--header-height)-var(--page-padding)*2)]"> {/* Adjust height calculation based on actual header/padding */}
      {/* Chat Messages Area */}
      <div ref={scrollAreaRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <p className="text-muted-foreground">Start the conversation by asking a question.</p>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex items-start gap-3", msg.role === 'user' ? "justify-end" : "justify-start")}>
            {msg.role !== 'user' && (
              <Avatar className="h-8 w-8">
                 {/* Add appropriate icon/image for bot/system */}
                <AvatarFallback><Bot size={16}/></AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                "p-3 rounded-lg max-w-[75%]",
                msg.role === 'user' ? "bg-primary text-primary-foreground"
                  : msg.role === 'system' ? "bg-destructive/10 text-destructive border border-destructive/30"
                  : "bg-muted"
              )}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
               {msg.role === 'system' && <AlertCircle size={14} className="inline-block ml-1"/>}
            </div>
             {msg.role === 'user' && (
                <Avatar className="h-8 w-8">
                   <AvatarFallback><User size={16}/></AvatarFallback>
                 </Avatar>
            )}
          </div>
        ))}
        {isLoading && (
           <div className="flex items-start gap-3 justify-start">
             <Avatar className="h-8 w-8"><AvatarFallback><Bot size={16}/></AvatarFallback></Avatar>
             <div className="p-3 rounded-lg bg-muted"><p className="text-sm animate-pulse">Thinking...</p></div>
           </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask Alif anything..." 
            className="flex-1"
            disabled={isLoading}
            aria-label="Chat input"
          />
          <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
            <SendHorizonal className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

// CSS Variables definition (add to globals.css or a layout component)
/*
:root {
  --header-height: 4rem; // 64px - adjust if your header height changes
  --page-padding: 1.5rem; // 24px (based on py-6 in layout) - adjust if padding changes
}
*/
