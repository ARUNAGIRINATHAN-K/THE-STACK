'use client';

import * as React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  getCategories,
  getUniqueLanguages,
  getResources,
} from '@/lib/resources';
import { filterResources, FilterOptions } from '@/lib/search';
import { ResourceGrid } from '@/components/resource/ResourceGrid';
import { FilterSidebar } from '@/components/filter-sidebar';
import { TierLevel } from '@/types/resource';
import { EmptyState } from '@/components/common/EmptyState';

function ExploreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryParam = searchParams ? searchParams.get('query') || searchParams.get('q') || '' : '';
  const categoryParam = searchParams ? searchParams.get('category') || 'all' : 'all';
  const tierParam = searchParams ? ((searchParams.get('tier') as TierLevel) || 'all') : 'all';
  const languageParam = searchParams ? searchParams.get('language') || 'all' : 'all';
  const platformParam = searchParams ? ((searchParams.get('platform') as 'github' | 'external') || 'all') : 'all';
  const sortParam = searchParams ? (searchParams.get('sort') as any) || 'name' : 'name';

  const [filters, setFilters] = React.useState<FilterOptions>({
    query: queryParam,
    category: categoryParam,
    tier: tierParam,
    language: languageParam,
    platform: platformParam,
    sortBy: sortParam,
  });

  // Sync state when URL params change
  React.useEffect(() => {
    setFilters({
      query: queryParam,
      category: categoryParam,
      tier: tierParam,
      language: languageParam,
      platform: platformParam,
      sortBy: sortParam,
    });
  }, [queryParam, categoryParam, tierParam, languageParam, platformParam, sortParam]);

  const categories = getCategories();
  const languages = getUniqueLanguages();
  const allResources = getResources();

  // Synchronize URL search params
  const updateFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (newFilters.query) params.set('query', newFilters.query);
    if (newFilters.category && newFilters.category !== 'all') params.set('category', newFilters.category);
    if (newFilters.tier && newFilters.tier !== 'all') params.set('tier', newFilters.tier);
    if (newFilters.language && newFilters.language !== 'all') params.set('language', newFilters.language);
    if (newFilters.platform && newFilters.platform !== 'all') params.set('platform', newFilters.platform);
    if (newFilters.sortBy && newFilters.sortBy !== 'name') params.set('sort', newFilters.sortBy);

    const queryString = params.toString();
    router.replace(queryString ? `/explore?${queryString}` : '/explore', { scroll: false });
  };

  const filteredResources = React.useMemo(() => {
    return filterResources(allResources, filters);
  }, [allResources, filters]);

  const handleReset = () => {
    updateFilters({
      query: '',
      category: 'all',
      tier: 'all',
      language: 'all',
      platform: 'all',
      sortBy: 'name',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 font-mono">
      {/* Header & Search */}
      <div className="space-y-3 pb-4 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Explore Registry
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {allResources.length} resources indexed across {categories.length} categories.
            </p>
          </div>

          <a
            href="https://github.com/ARUNAGIRINATHAN-K/awesome-ai-agents-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-border bg-card hover:bg-accent text-xs font-mono text-foreground transition-colors shrink-0"
            aria-label="GitHub Repository"
          >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span>GitHub</span>
          </a>
        </div>

        {/* Search Input Box */}
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            value={filters.query || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilters({ ...filters, query: e.target.value })}
            placeholder="Search resources by name, tag, language, or description..."
            className="w-full h-9 px-3 border border-border bg-card text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring rounded placeholder:text-muted-foreground"
          />
          {filters.query && (
            <button
              onClick={() => updateFilters({ ...filters, query: '' })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground font-mono"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Main Grid + Sidebar */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <FilterSidebar
          categories={categories}
          languages={languages}
          filters={{
            categorySlug: filters.category,
            tier: filters.tier,
            language: filters.language,
            platform: filters.platform,
            searchQuery: filters.query,
          }}
          onFilterChange={(f) =>
            updateFilters({
              ...filters,
              category: f.categorySlug,
              tier: f.tier,
              language: f.language,
              platform: f.platform,
            })
          }
          onReset={handleReset}
          totalFiltered={filteredResources.length}
        />

        <div className="flex-1 min-w-0 w-full">
          {filteredResources.length === 0 ? (
            <EmptyState onClearFilters={handleReset} />
          ) : (
            <ResourceGrid
              resources={filteredResources}
              sortBy={filters.sortBy}
              onSortChange={(sort) => updateFilters({ ...filters, sortBy: sort as any })}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <React.Suspense fallback={<div className="p-8 font-mono text-xs text-muted-foreground">Loading registry...</div>}>
      <ExploreContent />
    </React.Suspense>
  );
}
