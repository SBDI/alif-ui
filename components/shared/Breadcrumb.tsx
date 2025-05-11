'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean; // Optional: Can be derived or passed explicitly
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6 text-sm text-muted-foreground", className)}>
      <ol className="flex items-center space-x-1.5">
        {items.map((item, index) => {
          const isCurrentPage = item.isCurrent ?? (item.href === pathname);
          return (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 mx-1.5 text-gray-400" />
              )}
              <Link
                href={item.href}
                className={cn(
                  'transition-colors hover:text-foreground',
                  isCurrentPage ? 'font-medium text-foreground' : 'text-muted-foreground'
                )}
                aria-current={isCurrentPage ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
} 