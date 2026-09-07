import Link from 'next/link';
import { getStats } from '@/lib/resources';

export function Footer() {
  const stats = getStats();

  return (
    <footer className="w-full border-t border-border bg-card py-6 mt-16 font-mono text-xs text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="font-bold text-foreground">AI Agent Registry</p>
          <p className="text-[11px]">
            Powered by Awesome AI Agents 2026 • {stats.totalResources} resources across {stats.totalCategories} categories.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/explore" className="hover:text-foreground underline">
            Explore
          </Link>
          <Link href="/categories" className="hover:text-foreground underline">
            Categories
          </Link>
          <Link href="/about" className="hover:text-foreground underline">
            About
          </Link>
          <a
            href="https://github.com/ARUNAGIRINATHAN-K/awesome-ai-agents-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground underline"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
