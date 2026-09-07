import * as React from 'react';
import Link from 'next/link';
import { getStats } from '@/lib/resources';

export default function AboutPage() {
  const stats = getStats();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-6 font-mono text-xs">
      <div className="space-y-2 pb-4 border-b border-border">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          About AI Agent Registry
        </h1>
        <p className="text-muted-foreground">
          The comprehensive, structured guide to AI agent frameworks, tools, and resources.
        </p>
      </div>

      <div className="space-y-4 font-sans text-muted-foreground leading-relaxed">
        <p>
          The <strong>AI Agent Registry 2026</strong> is a developer-focused, searchable directory built on top of the curated <a href="https://github.com/ARUNAGIRINATHAN-K/awesome-ai-agents-2026" target="_blank" rel="noopener noreferrer" className="text-foreground underline">Awesome AI Agents</a> dataset.
        </p>

        <div className="p-4 rounded border border-border bg-card font-mono text-xs space-y-2 text-foreground">
          <p className="font-bold">Dataset Metrics:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Total Curated Resources: <strong>{stats.totalResources}</strong></li>
            <li>Categorized Domains: <strong>{stats.totalCategories}</strong></li>
            <li>Production-Ready Frameworks: <strong>{stats.productionCount}</strong></li>
            <li>Growing Community Projects: <strong>{stats.growingCount}</strong></li>
            <li>Emerging Research & Tools: <strong>{stats.emergingCount}</strong></li>
            <li>GitHub Repositories: <strong>{stats.githubCount}</strong></li>
          </ul>
        </div>

        <p>
          Each resource entry includes normalized metadata tags, tier classifications (🚀 Production, 🌱 Growing, 🔬 Emerging), language runtimes, and verified repository links.
        </p>
      </div>

      <div className="pt-4 border-t border-border flex items-center gap-4 font-mono">
        <Link href="/explore" className="px-3 py-1.5 rounded border border-border bg-foreground text-background font-bold hover:opacity-90">
          Explore Registry →
        </Link>
        <a href="https://github.com/ARUNAGIRINATHAN-K/awesome-ai-agents-2026" target="_blank" rel="noopener noreferrer" className="hover:underline">
          GitHub Repository ↗
        </a>
      </div>
    </div>
  );
}
