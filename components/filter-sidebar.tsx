'use client';

import * as React from 'react';
import { Category, TierLevel } from '@/types/resource';
import { FilterOptions } from '@/lib/search';

interface FilterSidebarProps {
  categories: Category[];
  languages: string[];
  filters: FilterOptions;
  onFilterChange: (newFilters: FilterOptions) => void;
  onReset: () => void;
  totalFiltered: number;
}

export function FilterSidebar({
  categories,
  languages,
  filters,
  onFilterChange,
  onReset,
  totalFiltered,
}: FilterSidebarProps) {
  const isFiltered =
    (filters.categorySlug && filters.categorySlug !== 'all') ||
    (filters.tier && filters.tier !== 'all') ||
    (filters.language && filters.language !== 'all') ||
    (filters.platform && filters.platform !== 'all') ||
    (filters.searchQuery && filters.searchQuery !== '');

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-4 bg-card p-4 rounded border border-border text-xs font-mono">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <span className="font-bold text-foreground">Filter ({totalFiltered})</span>
        {isFiltered && (
          <button onClick={onReset} className="text-muted-foreground hover:text-foreground underline">
            Clear
          </button>
        )}
      </div>

      {/* Tier Filter */}
      <div className="space-y-1">
        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">
          Tier
        </span>
        <div className="space-y-0.5">
          <button
            onClick={() => onFilterChange({ ...filters, tier: 'all' })}
            className={`w-full text-left px-2 py-1 rounded transition-colors ${
              !filters.tier || filters.tier === 'all' ? 'bg-foreground text-background font-bold' : 'hover:bg-accent text-muted-foreground'
            }`}
          >
            All Tiers
          </button>
          <button
            onClick={() => onFilterChange({ ...filters, tier: 'production' })}
            className={`w-full text-left px-2 py-1 rounded transition-colors ${
              filters.tier === 'production' ? 'bg-foreground text-background font-bold' : 'hover:bg-accent text-muted-foreground'
            }`}
          >
            🚀 Production
          </button>
          <button
            onClick={() => onFilterChange({ ...filters, tier: 'growing' })}
            className={`w-full text-left px-2 py-1 rounded transition-colors ${
              filters.tier === 'growing' ? 'bg-foreground text-background font-bold' : 'hover:bg-accent text-muted-foreground'
            }`}
          >
            🌱 Growing
          </button>
          <button
            onClick={() => onFilterChange({ ...filters, tier: 'emerging' })}
            className={`w-full text-left px-2 py-1 rounded transition-colors ${
              filters.tier === 'emerging' ? 'bg-foreground text-background font-bold' : 'hover:bg-accent text-muted-foreground'
            }`}
          >
            🔬 Emerging
          </button>
        </div>
      </div>

      {/* Language Selection */}
      <div className="space-y-1 pt-2 border-t border-border">
        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">
          Language
        </span>
        <select
          value={filters.language || 'all'}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onFilterChange({ ...filters, language: e.target.value })}
          className="w-full h-8 rounded border border-border bg-background px-2 py-1 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        >
          <option value="all">All Languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* Category List */}
      <div className="space-y-1 pt-2 border-t border-border">
        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">
          Category ({categories.length})
        </span>
        <div className="max-h-56 overflow-y-auto space-y-0.5 pr-1">
          <button
            onClick={() => onFilterChange({ ...filters, categorySlug: 'all' })}
            className={`w-full text-left px-2 py-1 rounded transition-colors ${
              !filters.categorySlug || filters.categorySlug === 'all'
                ? 'bg-foreground text-background font-bold'
                : 'hover:bg-accent text-muted-foreground'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat: Category) => (
            <button
              key={cat.slug}
              onClick={() => onFilterChange({ ...filters, categorySlug: cat.slug })}
              className={`w-full text-left px-2 py-1 rounded transition-colors flex items-center justify-between ${
                filters.categorySlug === cat.slug
                  ? 'bg-foreground text-background font-bold'
                  : 'hover:bg-accent text-muted-foreground'
              }`}
            >
              <span className="truncate pr-1">{cat.name}</span>
              <span className="text-[10px] opacity-70">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
