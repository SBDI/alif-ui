'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  FileText,
  Folder,
  Brain,
  MessageSquare,
  BookOpen,
  FlaskConical,
  PenLine,
  Lightbulb,
  History,
  Search,
} from 'lucide-react';

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Mock folders for demonstration
  const folders = [
    { id: '1', name: 'Mathematics' },
    { id: '2', name: 'Science' },
    { id: '3', name: 'History' },
  ];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const handleChat = () => {
    runCommand(() => router.push(`/folders/1/chat`));
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem
            onSelect={() => runCommand(() => router.push('/dashboard'))}
          >
            <Search className="mr-2 h-4 w-4" />
            <span>Search...</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Main Navigation">
          <CommandItem
            onSelect={() => runCommand(() => router.push('/dashboard'))}
          >
            <Calendar className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/folders'))}
          >
            <Folder className="mr-2 h-4 w-4" />
            <span>Folders</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/knowledge'))}
          >
            <Brain className="mr-2 h-4 w-4" />
            <span>Knowledge Base</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/history'))}
          >
            <History className="mr-2 h-4 w-4" />
            <span>History</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Your Folders">
          {folders.map((folder) => (
            <CommandItem
              key={folder.id}
              onSelect={() => runCommand(() => router.push(`/folders/${folder.id}`))}
            >
              <Folder className="mr-2 h-4 w-4" />
              <span>{folder.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Tools">
          <CommandItem
            onSelect={handleChat}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Chat</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push(`/folders/1/study-guide`))}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Study Guide</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push(`/folders/1/quiz`))}
          >
            <FlaskConical className="mr-2 h-4 w-4" />
            <span>Quiz</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push(`/folders/1/flashcards`))}
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>Flashcards</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push(`/folders/1/solve`))}
          >
            <PenLine className="mr-2 h-4 w-4" />
            <span>Solve</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push(`/folders/1/write`))}
          >
            <Lightbulb className="mr-2 h-4 w-4" />
            <span>Write</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem
            onSelect={() => runCommand(() => router.push('/settings'))}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/settings/profile'))}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/settings/billing'))}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
