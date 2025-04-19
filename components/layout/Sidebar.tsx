'use client'; // Assuming client-side interaction might be needed later

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Home,     // Placeholder for Dashboard home
  Users,    // Placeholder for Members
  FileText, // Placeholder for Knowledge
  Settings, // Placeholder for Settings
  LogOut,   // Placeholder for Logout
  // Add other icons as needed
} from 'lucide-react';

const mainNavItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  // Add other main navigation items here
];

const secondaryNavItems = [
  { href: '/dashboard/members', label: 'Members', icon: Users, count: 0 },
  { href: '/dashboard/knowledge', label: 'Knowledge', icon: FileText, count: 0 },
  // Add other secondary navigation items here
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-64 flex-col border-r bg-muted/40 md:flex">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Logo className="h-6 w-6" />
          <span>Alif AI</span>
        </Link>
        {/* Optional: Add notification bell or other header items here */}
      </div>
      <nav className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {/* Main Navigation */}
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className="w-full justify-start"
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </div>

        {/* Secondary Navigation (e.g., Data Sources) */}
        <div className="mt-4 pt-4 border-t">
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Data Sources</h3>
          {secondaryNavItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={pathname?.startsWith(item.href) ? 'secondary' : 'ghost'}
              className="w-full justify-start"
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
                {item.count !== undefined && (
                  <span className="ml-auto inline-flex h-5 items-center rounded-full bg-muted px-2 text-xs font-medium">
                    {item.count}
                  </span>
                )}
              </Link>
            </Button>
          ))}
        </div>
      </nav>

      {/* Footer Section (User/Settings/Logout) */}
      <div className="mt-auto border-t p-4">
        {/* Placeholder for User Info */}
        <div className="mb-2 flex items-center gap-2 p-2">
          <div className="h-8 w-8 rounded-full bg-muted"></div> {/* Avatar Placeholder */}
          <div className="text-sm">
            <p className="font-medium">User Name</p>
            <p className="text-xs text-muted-foreground">user@example.com</p>
          </div>
        </div>
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
} 