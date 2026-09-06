'use client';

import * as React from 'react';
import Link from 'next/link';
import { Resource } from '@/types/resource';

interface ResourceCardProps {
  resource: Resource;
  onQuickView?: (resource: Resource) => void;
  viewMode?: 'grid' | 'list';
}

export function ResourceCard({ resource, onQuickView, viewMode = 'grid' }: ResourceCardProps) {
  const getTierBadgeClass = (tier: string) => {
    if (tier === 'production') return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    if (tier === 'growing') return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
    return 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20';
  };

  return (
    <div className="p-4 rounded border border-border bg-card hover:border-foreground/40 transition-colors flex flex-col justify-between gap-3 text-xs font-mono">
      <div className="space-y-2">
        {/* Header: Name + Tier */}
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/resources/${resource.slug}`}
            className="font-bold text-sm text-foreground hover:underline truncate"
          >
            {resource.githubRepo ? resource.githubRepo : resource.name}
          </Link>

          <span className={`px-1.5 py-0.5 rounded border text-[10px] shrink-0 ${getTierBadgeClass(resource.tier)}`}>
            {resource.tierBadge} {resource.tier}
          </span>
        </div>

        {/* Description */}
        <p className="text-muted-foreground font-sans text-xs leading-relaxed line-clamp-2">
          {resource.description}
        </p>
      </div>

      {/* Footer: Category, Language, Tags, Action */}
      <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-2 truncate">
          <Link
            href={`/categories/${resource.categorySlug}`}
            className="text-muted-foreground hover:text-foreground truncate"
          >
            {resource.category}
          </Link>
          <span className="text-muted-foreground">•</span>
          <span className="text-foreground">{resource.language}</span>
        </div>

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:underline font-semibold shrink-0"
        >
          {resource.isGitHub ? 'github ↗' : 'site ↗'}
        </a>
      </div>
    </div>
  );
}
