'use client';

import { useState } from 'react';
import { Sidebar } from "@/components/layout/Sidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { CommandMenu } from "@/components/shared/CommandMenu";
import { cn } from "@/lib/utils";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // Callback for Sidebar to update this layout's state
  const handleSidebarToggle = (isExpanded: boolean) => {
    setSidebarExpanded(isExpanded);
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Pass the state and toggle function to Sidebar */}
      <Sidebar expanded={sidebarExpanded} onToggle={handleSidebarToggle} />

      {/* Apply margin-left based on the state managed here */}
      <div className={cn(
          "flex flex-col flex-1 overflow-hidden transition-all duration-300 ease-in-out",
          sidebarExpanded ? "md:ml-64" : "md:ml-16" // Apply margin matching sidebar width
      )}>
        <AppHeader onOpenCommandMenu={() => setCommandMenuOpen(true)} />
        <main className={cn(
          "flex-1 overflow-y-auto pt-16",
        )}>
          <div className="container mx-auto py-6 px-4 md:px-6">
            {children}
          </div>
        </main>
      </div>
      <CommandMenu />
    </div>
  );
}
