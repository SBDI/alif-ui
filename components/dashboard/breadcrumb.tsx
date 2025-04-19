'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type BreadcrumbItem = {
  label: string;
  href: string;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex mb-4", className)}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />}
            <Link 
              href={item.href}
              className={cn(
                "text-sm transition-colors hover:text-foreground",
                index === items.length - 1 
                  ? "font-medium text-foreground" 
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
