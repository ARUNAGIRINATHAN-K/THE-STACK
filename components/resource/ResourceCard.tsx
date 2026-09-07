'use client';

import * as React from 'react';
import Link from 'next/link';
import { Resource } from '@/types/resource';

export interface ResourceCardProps {
  resource: Resource;
  viewMode?: 'grid' | 'list';
  onQuickView?: (resource: Resource) => void;
  key?: string | number | React.Key;
}

export function ResourceCard({ resource, viewMode = 'grid' }: ResourceCardProps) {
  const getTierClass = (tier: string) => {
    if (tier === 'production') return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    if (tier === 'growing') return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
    return 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20';
  };

  return (
    <article className="p-4 rounded border border-border bg-card hover:border-foreground/40 transition-colors flex flex-col justify-between gap-3 text-xs font-mono">
      <div className="space-y-2">
        {/* Tier & Category Header */}
        <div className="flex items-center justify-between gap-2">
          <Link
            href={`/categories/${resource.categorySlug}`}
            className="text-muted-foreground hover:text-foreground truncate text-[11px]"
          >
            {resource.category}
          </Link>

          <span className={`px-1.5 py-0.5 rounded border text-[10px] shrink-0 ${getTierClass(resource.tier)}`}>
            {resource.tierBadge} {resource.tier}
          </span>
        </div>

        {/* Name & GitHub repo */}
        <div>
          <Link
            href={`/resources/${resource.slug}`}
            className="font-bold text-sm text-foreground hover:underline tracking-tight block truncate"
          >
            {resource.name}
          </Link>
          {resource.githubRepo && (
            <span className="text-[11px] text-muted-foreground block truncate">
              {resource.githubRepo}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-muted-foreground font-sans text-xs leading-relaxed line-clamp-2">
          {resource.description}
        </p>
      </div>

      {/* Tags & Actions */}
      <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-1.5 flex-wrap truncate">
          <span className="text-foreground font-bold">{resource.language}</span>
          {resource.tags
            .filter((t) => t !== resource.language)
            .slice(0, 2)
            .map((tag) => (
              <span key={tag} className="px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground text-[10px]">
                #{tag}
              </span>
            ))}
        </div>

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:underline font-semibold shrink-0"
        >
          {resource.isGitHub ? 'GitHub ↗' : 'Website ↗'}
        </a>
      </div>
    </article>
  );
}
