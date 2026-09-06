'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { getResourceBySlug, getRelatedResources } from '@/lib/resources';
import { ResourceGrid } from '@/components/resource/ResourceGrid';

export default function ResourceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  const relatedResources = getRelatedResources(resource, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8 font-mono">
      <Link href="/explore" className="text-xs text-muted-foreground hover:text-foreground underline">
        ← Back to Explore
      </Link>

      <div className="p-5 rounded border border-border bg-card space-y-4 text-xs">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
              {resource.category} • {resource.tierBadge} {resource.tier}
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              {resource.name}
            </h1>
            {resource.githubRepo && (
              <span className="text-muted-foreground text-xs block mt-0.5">{resource.githubRepo}</span>
            )}
          </div>

          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded border border-border bg-foreground text-background font-semibold hover:opacity-90 transition-opacity"
          >
            {resource.isGitHub ? 'GitHub ↗' : 'Website ↗'}
          </a>
        </div>

        <p className="font-sans text-sm text-muted-foreground leading-relaxed pt-2 border-t border-border/60">
          {resource.description}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-[11px]">
          <div>
            <span className="text-muted-foreground block">Language</span>
            <span className="text-foreground font-bold">{resource.language}</span>
          </div>
          <div>
            <span className="text-muted-foreground block">Source</span>
            <span className="text-foreground">{resource.source} (Line {resource.sourceLine})</span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-muted-foreground block">URL</span>
            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-foreground underline truncate block">
              {resource.url}
            </a>
          </div>
        </div>

        <div className="pt-2 border-t border-border/60 flex flex-wrap gap-1">
          {resource.tags.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded bg-muted/60 text-muted-foreground text-[10px]">
              #{t}
            </span>
          ))}
        </div>
      </div>

      {relatedResources.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-border">
          <h2 className="text-sm font-bold text-foreground">Related Resources in {resource.category}</h2>
          <ResourceGrid resources={relatedResources} />
        </div>
      )}
    </div>
  );
}
