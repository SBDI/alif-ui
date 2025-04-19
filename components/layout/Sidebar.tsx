'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Home,
  Layers,
  FileText,
  Users,
  Settings,
  BookOpen,
  PenLine,
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  // Helper function to check if a path is active (exact match or starts with path)
  const isActive = (path: string) => {
    if (path === '/dashboard' && pathname === '/dashboard') {
      return true;
    }
    return pathname.startsWith(path) && path !== '/dashboard';
  };

  const sidebarItems = [
    {
      name: 'Home',
      href: '/dashboard',
      icon: Home,
    },
    {
      name: 'Study',
      href: '/dashboard/study',
      icon: BookOpen,
      subItems: [
        { name: 'Guide', href: '/dashboard/study/guide' },
        { name: 'Quiz', href: '/dashboard/study/quiz' },
        { name: 'Flashcards', href: '/dashboard/study/flashcards' },
      ],
    },
    {
      name: 'Homework',
      href: '/dashboard/homework',
      icon: PenLine,
      subItems: [
        { name: 'Solve', href: '/dashboard/homework/solve' },
        { name: 'Write', href: '/dashboard/homework/write' },
      ],
    },
    {
      name: 'Documents',
      href: '/dashboard/documents',
      icon: FileText,
    },
    {
      name: 'Team',
      href: '/dashboard/team',
      icon: Users,
    },
  ];

  return (
    <aside className="hidden h-screen w-16 flex-col border-r bg-background md:flex">
      <div className="flex flex-col h-full py-4">
        <div className="px-4 mb-6 flex justify-center">
          <Link href="/" className="flex items-center justify-center">
            <Image src="/alif-logo.svg" alt="Alif Logo" width={24} height={24} className="size-6" />
          </Link>
        </div>

        <div className="flex-1 px-3 space-y-4">
          {sidebarItems.map((item) => (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                className={cn(
                  "flex items-center justify-center p-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                title={item.name}
              >
                <item.icon className="h-5 w-5" />
              </Link>

              {/* Submenu for items with subitems */}
              {item.subItems && (
                <div className="absolute left-full top-0 ml-2 w-40 bg-background border rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="py-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "block px-4 py-2 text-sm",
                          pathname === subItem.href
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="px-3 mt-auto">
          <Link
            href="/dashboard/settings"
            className={cn(
              "flex items-center justify-center p-2 rounded-md text-sm font-medium transition-colors",
              pathname === "/dashboard/settings"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            title="Settings"
          >
            <Settings className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}