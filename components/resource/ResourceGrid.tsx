'use client';

import * as React from 'react';
import { Resource } from '@/types/resource';
import { ResourceCard } from './ResourceCard';

interface ResourceGridProps {
  resources: Resource[];
  title?: string;
  subtitle?: string;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
}

export function ResourceGrid({
  resources,
  title,
  subtitle,
  sortBy = 'name',
  onSortChange,
}: ResourceGridProps) {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  return (
    <div className="w-full space-y-4 font-mono">
      {(title || onSortChange) && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-border text-xs">
          <div>
            {title && <h2 className="font-bold text-foreground">{title}</h2>}
            {subtitle && <p className="text-[11px] text-muted-foreground">{subtitle}</p>}
            {!title && <p className="text-[11px] text-muted-foreground">{resources.length} resources</p>}
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {onSortChange && (
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <span>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onSortChange(e.target.value)}
                  className="h-7 rounded border border-border bg-card px-2 py-0.5 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="tier">Tier (Production first)</option>
                  <option value="category">Category</option>
                </select>
              </div>
            )}

            <div className="flex items-center rounded border border-border bg-card text-[11px]">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2 py-0.5 transition-colors ${
                  viewMode === 'grid' ? 'bg-foreground text-background font-bold' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-2 py-0.5 transition-colors ${
                  viewMode === 'list' ? 'bg-foreground text-background font-bold' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                list
              </button>
            </div>
          </div>
        </div>
      )}

      {resources.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-border rounded bg-card/50 text-xs text-muted-foreground">
          No resources found.
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} viewMode="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} viewMode="list" />
          ))}
        </div>
      )}
    </div>
  );
}
