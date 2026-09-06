import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card py-6 mt-12 font-mono text-xs text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span>Awesome AI Agents Registry 2026</span>
          <span className="mx-2">•</span>
          <span>461 indexed resources</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/explore" className="hover:text-foreground underline">
            Explore
          </Link>
          <Link href="/categories" className="hover:text-foreground underline">
            Categories
          </Link>
          <a
            href="https://github.com/ARUNAGIRINATHAN-K/awesome-ai-agents"
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
