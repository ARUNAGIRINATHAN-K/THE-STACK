'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, Sparkles, Rocket, Sprout, Microscope, ArrowRight, Layers } from 'lucide-react';
import { Button } from './ui/button';

interface HeroBannerProps {
  stats: {
    totalResources: number;
    totalCategories: number;
    productionCount: number;
    growingCount: number;
    emergingCount: number;
  };
  onOpenSearch?: () => void;
}

export function HeroBanner({ stats, onOpenSearch }: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border/40 bg-gradient-to-b from-violet-950/20 via-background to-background">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[200px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-semibold mb-6 shadow-sm backdrop-blur-sm animate-fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The 2026 AI Agent Ecosystem Registry</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl leading-[1.15] mb-6">
          Discover & Compare <br />
          <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            AI Agents, Tools & Frameworks
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8">
          The curated, production-focused catalog of <strong>{stats.totalResources}</strong> agentic tools across <strong>{stats.totalCategories}</strong> categories. Normalized metadata, tier badges, and instant search built for developers who ship.
        </p>

        {/* Search Input Trigger Box */}
        <div className="w-full max-w-2xl mb-10">
          <div
            onClick={onOpenSearch}
            className="group relative flex items-center w-full h-14 px-4 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md shadow-xl hover:border-violet-500/50 hover:shadow-violet-500/10 transition-all cursor-pointer"
          >
            <Search className="w-5 h-5 text-violet-400 mr-3 transition-transform group-hover:scale-110" />
            <span className="text-muted-foreground text-sm sm:text-base flex-1 text-left">
              Search agents, frameworks (e.g., CrewAI, Claude Code, MCP, RAG)...
            </span>
            <div className="hidden sm:flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md border border-border bg-muted/60 text-muted-foreground">
              <span>⌘</span>K
            </div>
          </div>
        </div>

        {/* Tier Badges Breakdown & Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          <Link href="/explore?tier=production">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-semibold transition-all">
              <Rocket className="w-4 h-4 text-emerald-400" />
              <span>{stats.productionCount} Production-Ready</span>
            </div>
          </Link>
          <Link href="/explore?tier=growing">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs sm:text-sm font-semibold transition-all">
              <Sprout className="w-4 h-4 text-amber-400" />
              <span>{stats.growingCount} Growing</span>
            </div>
          </Link>
          <Link href="/explore?tier=emerging">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 text-xs sm:text-sm font-semibold transition-all">
              <Microscope className="w-4 h-4 text-violet-400" />
              <span>{stats.emergingCount} Emerging</span>
            </div>
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/explore">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-violet-600/25 rounded-xl gap-2">
              <span>Explore Full Registry</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/categories">
            <Button variant="outline" size="lg" className="rounded-xl border-border/80 gap-2">
              <Layers className="w-4 h-4 text-violet-400" />
              <span>Browse Categories ({stats.totalCategories})</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
