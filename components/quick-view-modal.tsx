'use client';

import * as React from 'react';
import Link from 'next/link';
import { Resource } from '@/types/resource';

interface QuickViewModalProps {
  resource: Resource | null;
  onClose: () => void;
}

export function QuickViewModal({ resource, onClose }: QuickViewModalProps) {
  if (!resource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xs font-mono">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-lg bg-card border border-border rounded p-5 space-y-4 z-10 text-xs">
        <div className="flex items-start justify-between gap-2 border-b border-border pb-3">
          <div>
            <span className="text-[10px] text-muted-foreground uppercase">{resource.category} • {resource.tierBadge} {resource.tier}</span>
            <h2 className="text-xl font-bold text-foreground">{resource.name}</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-xs font-bold">
            [x]
          </button>
        </div>

        <p className="font-sans text-xs text-muted-foreground leading-relaxed">
          {resource.description}
        </p>

        <div className="p-3 rounded border border-border/60 bg-muted/20 text-[11px] space-y-1">
          <div><span className="text-muted-foreground">Language:</span> {resource.language}</div>
          <div><span className="text-muted-foreground">Source:</span> {resource.source} (Line {resource.sourceLine})</div>
          {resource.githubRepo && (
            <div><span className="text-muted-foreground">Repo:</span> {resource.githubRepo}</div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <Link href={`/resources/${resource.slug}`} onClick={onClose} className="underline text-foreground">
            Full Details
          </Link>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded border border-border bg-foreground text-background font-semibold hover:opacity-90"
          >
            {resource.isGitHub ? 'GitHub ↗' : 'Site ↗'}
          </a>
        </div>
      </div>
    </div>
  );
}
