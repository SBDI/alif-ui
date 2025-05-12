'use client';

import { useState, useMemo, useEffect } from 'react';
import { usePathname, useParams, useRouter } from 'next/navigation';
import { Sidebar } from "@/components/layout/Sidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { CommandMenu } from "@/components/shared/CommandMenu";
import { cn } from "@/lib/utils";
import type { BreadcrumbItem } from "@/components/shared/Breadcrumb";
import { useAuth } from '@/lib/context/AuthContext'

// Mock function to get folder name - replace with actual data fetching or context
async function getFolderName(folderId: string): Promise<string> {
  // In a real app, you would fetch this from your data source
  const MOCK_FOLDER_NAMES: { [key: string]: string } = {
    '1': 'Mathematics',
    '2': 'Science Project',
    'default-folder': 'Default Folder' 
    // Add other folder IDs and names as needed
  };
  return MOCK_FOLDER_NAMES[folderId] || "Folder";
}

// Function to generate breadcrumb items
// This will need to be more robust in a real app, potentially async if fetching names
const generateBreadcrumbItems = (
  pathname: string,
  params: { folderId?: string; toolName?: string; [key: string]: string | undefined } // Adjust params type as needed
): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [];
  items.push({ label: "Dashboard", href: "/dashboard" });

  if (pathname.startsWith('/folders')) {
    items.push({ label: "Folders", href: "/folders" });
    if (params.folderId) {
      // For the folder name, ideally, you'd fetch it or have it available
      // Using a placeholder or the ID for now.
      // This part would ideally be async or use pre-fetched data for better UX.
      items.push({ label: params.folderId, href: `/folders/${params.folderId}` });
      
      // Infer tool name from pathname segments after folderId
      const segments = pathname.split('/');
      const folderIdIndex = segments.indexOf(params.folderId);
      if (folderIdIndex !== -1 && segments.length > folderIdIndex + 1) {
        const toolSegment = segments[folderIdIndex + 1];
        if (toolSegment && !["edit", "settings"].includes(toolSegment)) { // Avoid generic segments like 'edit'
            const toolName = toolSegment.charAt(0).toUpperCase() + toolSegment.slice(1).replace('-', ' ');
            items.push({ label: toolName, href: `/folders/${params.folderId}/${toolSegment}` });
        }
      }
    }
  } else if (pathname.startsWith('/knowledge')) {
    items.push({ label: "Knowledge", href: "/knowledge" });
  } else if (pathname.startsWith('/history')) {
    items.push({ label: "History", href: "/history" });
  } else if (pathname.startsWith('/settings')) {
    items.push({ label: "Settings", href: "/settings" });
    // Further nesting for settings can be added here
    if (pathname.includes('/profile')) items.push({label: "Profile", href: "/settings/profile"});
    if (pathname.includes('/billing')) items.push({label: "Billing", href: "/settings/billing"});
  }
  // Add more conditions for other sections like /knowledge, /history, /settings

  return items;
};

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const pathname = usePathname();
  const params = useParams() as { folderId?: string; [key: string]: string | undefined }; // Cast params

  // Use useMemo to avoid re-calculating breadcrumbs on every render unless pathname/params change
  const breadcrumbItems = useMemo(() => 
    generateBreadcrumbItems(pathname, params), 
    [pathname, params]
  );

  const handleSidebarToggle = (isExpanded: boolean) => {
    setSidebarExpanded(isExpanded);
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar expanded={sidebarExpanded} onToggle={handleSidebarToggle} />
      <div className={cn(
          "flex flex-col flex-1 overflow-hidden transition-all duration-300 ease-in-out",
          sidebarExpanded ? "md:ml-64" : "md:ml-16"
      )}>
        <AppHeader 
          onOpenCommandMenu={() => setCommandMenuOpen(true)} 
          breadcrumbItems={breadcrumbItems} // Pass generated items
        />
        <main className={cn(
          "flex-1 overflow-y-auto", 
          // "pt-16" // Original AppLayout had pt-16 for main, this might need adjustment if AppHeader is fixed height
        )}>
          {/* Container for page content - ensure this doesn't duplicate another container if pages have their own */}
          <div className="py-6 px-4 md:px-6">
            {children}
          </div>
        </main>
      </div>
      <CommandMenu />
    </div>
  );
}
