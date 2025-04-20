"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  homeHref?: string;
  showHome?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className,
  homeHref = '/dashboard',
  showHome = true
}) => {
  const pathname = usePathname();

  // Automatically generate breadcrumbs based on the current path
  const generateBreadcrumbs = () => {
    // If items are provided, use them
    if (items && items.length > 0) {
      return items;
    }

    // Otherwise, generate from pathname
    const paths = pathname.split('/').filter(Boolean);

    return paths.map((path, index) => {
      // Handle dynamic routes like [folderId]
      const label = path.startsWith('[') && path.endsWith(']')
        ? path.slice(1, -1) // Remove brackets
        : path.charAt(0).toUpperCase() + path.slice(1); // Capitalize first letter

      const href = '/' + paths.slice(0, index + 1).join('/');

      return { label, href: index === paths.length - 1 ? undefined : href };
    });
  };

  const breadcrumbItems = generateBreadcrumbs();

  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm text-muted-foreground mb-6", className)}>
      <ol className="flex items-center space-x-1 md:space-x-2">
        {showHome && (
          <li className="inline-flex items-center">
            <Link
              href={homeHref}
              className="hover:text-foreground inline-flex items-center"
            >
              <Home className="h-4 w-4" />
            </Link>
          </li>
        )}

        {breadcrumbItems.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {(index > 0 || showHome) && (
              <ChevronRight className="mx-1 h-4 w-4 flex-shrink-0 text-muted-foreground" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-foreground hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};