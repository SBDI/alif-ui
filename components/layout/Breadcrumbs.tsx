// Placeholder for Breadcrumbs component
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm text-muted-foreground", className)}>
      <ol className="flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRight className="mx-1 h-4 w-4 flex-shrink-0" />
            )}
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="hover:text-foreground hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className={cn(index === items.length - 1 && "font-medium text-foreground")}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}; 