'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with the query parameter if it exists
  useEffect(() => {
    if (initialQuery) {
      setMessages([{ role: 'user', content: initialQuery }]);
      handleAIResponse(initialQuery);
    }
  }, [initialQuery]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate AI response
  const handleAIResponse = (userMessage: string) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  // Simple response generator (placeholder for actual AI)
  const generateAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! How can I help you today?";
    } else if (lowerMessage.includes('help')) {
      return "I'm here to help! You can ask me questions about your studies, homework, or any topic you're curious about.";
    } else if (lowerMessage.includes('thank')) {
      return "You're welcome! Feel free to ask if you need anything else.";
    } else if (lowerMessage.includes('math') || lowerMessage.includes('problem')) {
      return "I'd be happy to help with math problems. Could you provide the specific question or equation you're working on?";
    } else if (lowerMessage.includes('write') || lowerMessage.includes('essay')) {
      return "I can help with writing. What topic are you working on? I can assist with outlines, drafts, or editing existing content.";
    } else {
      return "That's an interesting question. I'm here to assist with your studies and homework. Could you provide more details about what you're looking for?";
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    handleAIResponse(userMessage);
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Chat with Alif</h1>
      
      {/* Chat messages */}
      <div className="border rounded-lg p-4 mb-4 h-[60vh] overflow-y-auto bg-muted/20">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-xl font-semibold mb-2">Welcome to Alif Chat</h2>
            <p className="text-muted-foreground mb-4 max-w-md">
              Ask me anything about your studies, homework, or any topic you're curious about.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-lg">
              {[
                "How do I solve quadratic equations?",
                "Help me understand photosynthesis",
                "What are the key themes in Hamlet?",
                "Explain the water cycle"
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  className="text-sm p-2 border rounded-lg hover:bg-primary/10 text-left"
                  onClick={() => {
                    setMessages(prev => [...prev, { role: 'user', content: suggestion }]);
                    handleAIResponse(suggestion);
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg max-w-[80%] ${
                  message.role === 'user'
                    ? 'ml-auto bg-primary/10 text-foreground'
                    : 'mr-auto bg-secondary/50'
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="p-4 rounded-lg max-w-[80%] mr-auto bg-secondary/50">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 rounded-full bg-primary animate-bounce"></div>
                  <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Message input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
