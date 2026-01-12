import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-6">
      <Link href="/" className="hover:text-[#0071e3] transition-colors">
        Inicio
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight size={14} />
          {item.href ? (
            <Link href={item.href} className="hover:text-[#0071e3] transition-colors capitalize">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#1d1d1f] capitalize truncate max-w-[200px]">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}