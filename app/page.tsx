'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getStats, getCategories, getResources } from '@/lib/resources';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryCard } from '@/components/category/CategoryCard';
import { ResourceCard } from '@/components/resource/ResourceCard';

import { Category, Resource } from '@/types/resource';

export default function HomePage() {
  const router = useRouter();
  const stats = getStats();
  const categories = getCategories();
  const featuredResources = getResources()
    .filter((r: Resource) => r.tier === 'production')
    .slice(0, 6);

  const [searchQuery, setSearchQuery] = React.useState('');

  const executeSearch = (queryVal: string) => {
    if (queryVal && queryVal.trim() !== '') {
      router.push(`/explore?query=${encodeURIComponent(queryVal.trim())}`);
    } else {
      router.push('/explore');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-12 font-mono">
      {/* Hero Section */}
      <section className="space-y-6 text-center max-w-3xl mx-auto py-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
          Discover the AI Agent Ecosystem
        </h1>
        <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Explore AI agents, frameworks, tools, protocols, models, and infrastructure for building intelligent systems.
        </p>

        {/* Primary Search Bar */}
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            executeSearch(searchQuery);
          }}
          className="max-w-xl mx-auto"
        >
          <SearchBar
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            onSubmit={(val) => executeSearch(val)}
            placeholder="Search agents, frameworks, tools (e.g. CrewAI, MCP, RAG)..."
          />
        </form>

        {/* Dynamic Statistics Bar */}
        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground pt-2">
          <div>
            <span className="font-bold text-foreground">{stats.totalResources}</span> Resources
          </div>
          <span>•</span>
          <div>
            <span className="font-bold text-foreground">{stats.totalCategories}</span> Categories
          </div>
          <span>•</span>
          <div>
            <span className="font-bold text-foreground">{stats.productionCount}</span> Production-Ready
          </div>
        </div>
      </section>

      {/* Category Explorer */}
      <section className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">Explore by Category</h2>
            <p className="text-xs text-muted-foreground">Categorized functional ecosystem domains.</p>
          </div>
          <Link href="/categories" className="text-xs text-foreground underline font-semibold">
            View all categories →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.slice(0, 8).map((cat: Category) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      {/* Featured Resources */}
      <section className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">Featured Frameworks & Tools</h2>
            <p className="text-xs text-muted-foreground">Production-ready AI agent frameworks.</p>
          </div>
          <Link href="/explore" className="text-xs text-foreground underline font-semibold">
            Explore registry →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredResources.map((res: Resource) => (
            <ResourceCard key={res.id} resource={res} />
          ))}
        </div>
      </section>
    </div>
  );
}
