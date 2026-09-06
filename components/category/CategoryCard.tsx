import * as React from 'react';
import Link from 'next/link';
import { Category } from '@/types/resource';

export interface CategoryCardProps {
  category: Category;
  key?: string | number | React.Key;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <div className="p-3 rounded border border-border bg-card hover:border-foreground transition-colors flex items-center justify-between font-mono text-xs group">
        <div className="min-w-0 pr-2">
          <h3 className="font-bold text-foreground group-hover:underline truncate">{category.name}</h3>
          <p className="text-[11px] text-muted-foreground">{category.count} resources</p>
        </div>
        <span className="text-muted-foreground group-hover:text-foreground font-bold shrink-0">→</span>
      </div>
    </Link>
  );
}
