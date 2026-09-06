'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { getCategoryBySlug, getResourcesByCategory } from '@/lib/resources';
import { ResourceGrid } from '@/components/resource/ResourceGrid';

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const category = getCategoryBySlug(slug);
  const resources = getResourcesByCategory(slug);

  if (!category) {
    notFound();
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 font-mono">
      <Link href="/categories" className="text-xs text-muted-foreground hover:text-foreground underline">
        ← All Categories
      </Link>

      <div className="pb-4 border-b border-border space-y-1">
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
          Category • {resources.length} resources
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {category.name}
        </h1>
      </div>

      <ResourceGrid
        resources={resources}
        subtitle={`All ${resources.length} resources curated under ${category.name}`}
      />
    </div>
  );
}
