'use client';

import * as React from 'react';
import Link from 'next/link';
import { getCategories } from '@/lib/resources';
import { Category } from '@/types/resource';

export default function CategoriesPage() {
  const categories = getCategories();
  const [query, setQuery] = React.useState('');

  const filteredCategories = React.useMemo(() => {
    if (!query.trim()) return categories;
    return categories.filter((c: Category) => c.name.toLowerCase().includes(query.toLowerCase().trim()));
  }, [categories, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 font-mono">
      <div className="space-y-3 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Categories
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {categories.length} functional domains.
          </p>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          placeholder="Filter categories..."
          className="w-full max-w-md h-9 px-3 border border-border bg-card text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring rounded"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
        {filteredCategories.map((cat: Category) => (
          <Link key={cat.slug} href={`/categories/${cat.slug}`}>
            <div className="p-3 rounded border border-border bg-card hover:border-foreground transition-colors flex items-center justify-between">
              <span className="font-semibold text-foreground truncate">{cat.name}</span>
              <span className="text-muted-foreground text-[10px]">({cat.count})</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
