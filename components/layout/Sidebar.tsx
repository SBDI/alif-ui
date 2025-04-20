'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Home,
  Folder,
  FileText,
  History,
  Settings,
  BookOpen,
  PenLine,
  MessageSquare,
  Brain,
  FlaskConical,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Plus,
  Menu,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { CreateFolderModal } from '@/components/shared/CreateFolderModal';

// Mock folders - replace with actual data fetching later
const mockFolders = [
    { id: '1', name: 'Mathematics' },
    { id: '2', name: 'Science' },
    { id: '3', name: 'History' },
  ];

// Main sidebar items
const mainNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Folders', href: '/folders', icon: Folder }, // Link to all folders view
  { name: 'Knowledge', href: '/knowledge', icon: Brain },
  { name: 'History', href: '/history', icon: History },
];

// Example tool items (adjust as needed)
const toolItems = [
  { name: 'Chat', href: '/chat', icon: MessageSquare },
  { name: 'Study Guide', href: '/study-guide', icon: BookOpen },
  { name: 'Practice Quiz', href: '/practice-quiz', icon: FlaskConical },
  { name: 'Flashcards', href: '/flashcards', icon: FileText },
  { name: 'Solve', href: '/solve', icon: PenLine },
  { name: 'Write', href: '/write', icon: Lightbulb },
];

interface SidebarProps {
  expanded: boolean; // Receive state from parent
  onToggle: (isExpanded: boolean) => void; // Notify parent on toggle
}

export function Sidebar({ expanded, onToggle }: SidebarProps) { // Use props
  const pathname = usePathname();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Refined active check: exact match for main items, startsWith for folder parent
  const isActive = (path: string, isFolderParent = false) => {
    if (isFolderParent) {
      return pathname.startsWith(path);
    }
    // Handle exact match for dashboard or other top-level links
    if (path === '/dashboard' || path === '/folders' || path === '/knowledge' || path === '/history' || path === '/settings') {
        return pathname === path;
    }
    // Fallback for potential deeper exact matches if needed (like specific tool pages)
    return pathname === path;
  };

  // Separate component for nav links to simplify main structure
  const NavLink = ({ item, isExpanded }: { item: { name: string; href: string; icon: React.ElementType }, isExpanded: boolean }) => (
    <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center p-2 rounded-md text-sm font-medium transition-colors",
              isExpanded ? "justify-start" : "justify-center",
                      isActive(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
            {isExpanded && <span className="ml-3 whitespace-nowrap">{item.name}</span>}
                  </Link>
                </TooltipTrigger>
        {!isExpanded && (
                  <TooltipContent side="right">
                    {item.name}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={cn(
        "flex items-center px-4 py-4", // Always use padding
        expanded ? "justify-between" : "justify-center"
      )}>
        <Link href="/dashboard" className={cn("flex items-center", !expanded && "justify-center w-full")} aria-label="Dashboard">
          <Image src="/alif-logo.svg" alt="Alif Logo" width={24} height={24} className="size-6 flex-shrink-0" />
          {expanded && <span className="ml-2 font-semibold text-lg whitespace-nowrap">Alif</span>}
        </Link>
        {/* Removed inline expand/collapse button from here */}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-4 overflow-y-auto">
        {/* Main Navigation */}
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <NavLink key={item.href} item={item} isExpanded={expanded} />
          ))}
        </div>

        {/* Folders Section */}
        <div className="space-y-1">
          {/* Title (Expanded Only) */}
        {expanded && (
            <div className="px-1 pt-4 pb-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Folders
              </h3>
            </div>
          )}
          {/* Folder Items */}
          {mockFolders.map((folder) => (
                <Collapsible key={folder.id}>
                    <div className={cn(
                    "flex items-center p-2 rounded-md text-sm font-medium transition-colors",
                    isActive(`/folders/${folder.id}`, true) // Use startsWith check for parent folder
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}>
                    <Link href={`/folders/${folder.id}`} className="flex items-center flex-grow min-w-0">
                        <Folder className="h-5 w-5 flex-shrink-0" />
                        {expanded && <span className="ml-3 whitespace-nowrap truncate">{folder.name}</span>}
                    </Link>
                    {/* Collapsible Trigger (only show when expanded) */}
                    {expanded && (
                         <CollapsibleTrigger asChild>
                             <Button variant="ghost" size="icon" className="ml-auto h-6 w-6">
                      <ChevronRight className="h-4 w-4" />
                             </Button>
                        </CollapsibleTrigger>
                    )}
                     {/* Tooltip for collapsed state */}
                    {!expanded && (
                        <TooltipProvider delayDuration={0}>
                           <Tooltip>
                             <TooltipTrigger asChild>
                                 {/* Empty div needed for TooltipTrigger when expanded is false and we don't show the Button */}
                                <div className="w-full h-full"></div>
                             </TooltipTrigger>
                             <TooltipContent side="right">{folder.name}</TooltipContent>
                           </Tooltip>
                         </TooltipProvider>
                     )}
                    </div>
              <CollapsibleContent className={cn("pl-6 space-y-1 mt-1", !expanded && "hidden")} >
                    {toolItems.map((tool) => (
                      <Link
                        key={tool.href}
                    href={`/folders/${folder.id}${tool.href}`}
                        className={cn(
                      "flex items-center p-2 pl-3 rounded-md text-sm transition-colors", // Indent tool links
                      isActive(`/folders/${folder.id}${tool.href}`)
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                    <tool.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate whitespace-nowrap">{tool.name}</span>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
          {/* Add Folder Button */}
            <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                     <Button
                        variant="ghost"
                        size={expanded ? "sm" : "icon"}
                        className={cn("w-full mt-1", expanded ? "justify-start pl-2" : "justify-center")}
                        onClick={() => setIsCreateModalOpen(true)} // Open modal
                      >
                        <Plus className="h-4 w-4 flex-shrink-0" />
                        {expanded && <span className="ml-3 whitespace-nowrap">New Folder</span>}
                    </Button>
                  </TooltipTrigger>
                {!expanded && (
                    <TooltipContent side="right">New Folder</TooltipContent>
                )}
                </Tooltip>
              </TooltipProvider>
            </div>
      </nav>

       {/* Footer section for Settings and Toggle */}
      <div className="mt-auto p-3 space-y-1 border-t border-border">
        <NavLink item={{ name: 'Settings', href: '/settings', icon: Settings }} isExpanded={expanded} />
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size={expanded ? "sm" : "icon"}
                    className={cn("w-full", expanded ? "justify-start pl-2" : "justify-center")}
                    onClick={() => onToggle(!expanded)}
                    aria-label={expanded ? "Collapse Sidebar" : "Expand Sidebar"}
                 >
                   {expanded ? <ChevronLeft className="h-5 w-5 flex-shrink-0" /> : <ChevronRight className="h-5 w-5 flex-shrink-0" />}
                   {expanded && <span className="ml-3 whitespace-nowrap">Collapse</span>}
                 </Button>
            </TooltipTrigger>
            {!expanded && (
                 <TooltipContent side="right">Expand</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Create Folder Modal */}
      <CreateFolderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex md:flex-col md:fixed md:inset-y-0 md:z-50 transition-all duration-300 ease-in-out border-r border-border bg-card group",
          expanded ? "md:w-64" : "md:w-16"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Trigger (part of mobile header now) */}
      <div className="md:hidden flex items-center p-2 border-b">
      <Sheet>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            {/* Mobile Sidebar content */}
            <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center px-4 py-4 border-b">
                    <Link href="/dashboard" className="flex items-center" aria-label="Dashboard">
                    <Image src="/alif-logo.svg" alt="Alif Logo" width={24} height={24} className="size-6 flex-shrink-0" />
                    <span className="ml-2 font-semibold text-lg whitespace-nowrap">Alif</span>
                    </Link>
                </div>
                {/* Navigation */}
                <nav className="flex-1 px-3 space-y-4 overflow-y-auto mt-4">
                    {/* Main Navigation */}
                    <div className="space-y-1">
                    {mainNavItems.map((item) => (
                        <Link key={item.href} href={item.href} className={cn("flex items-center p-2 rounded-md text-sm font-medium transition-colors", isActive(item.href) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                            <item.icon className="h-5 w-5 flex-shrink-0" />
                            <span className="ml-3 whitespace-nowrap">{item.name}</span>
                        </Link>
                    ))}
                    </div>
                    {/* Folders Section - Simplified for mobile sheet */}
                    <div className="space-y-1">
                        <div className="px-1 pt-4 pb-2">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Folders
                        </h3>
                        </div>
                        {mockFolders.map((folder) => (
                            <Link key={folder.id} href={`/folders/${folder.id}`} className={cn("flex items-center p-2 rounded-md text-sm font-medium transition-colors", isActive(`/folders/${folder.id}`, true) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                                <Folder className="h-5 w-5 flex-shrink-0" />
                                <span className="ml-3 whitespace-nowrap truncate">{folder.name}</span>
                             </Link>
                        ))}
                        <Button variant="ghost" size="sm" className="w-full justify-start pl-2 mt-1" onClick={() => setIsCreateModalOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            <span>New Folder</span>
                        </Button>
                    </div>
                </nav>
                 {/* Footer section for Settings */}
                <div className="mt-auto p-3 space-y-1 border-t border-border">
                    <Link href="/settings" className={cn("flex items-center p-2 rounded-md text-sm font-medium transition-colors", isActive("/settings") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                       <Settings className="h-5 w-5 flex-shrink-0" />
                       <span className="ml-3 whitespace-nowrap">Settings</span>
                    </Link>
                </div>
            </div>
        </SheetContent>
      </Sheet>
      </div>

      {/* Render Create Folder Modal - Needs to be outside the Sheet for mobile */}
      <CreateFolderModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
}