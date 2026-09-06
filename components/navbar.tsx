'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export function Navbar({ onOpenSearch }: NavbarProps) {
  const pathname = usePathname();

  const navLinks = [
    { href: '/explore', label: 'Explore' },
    { href: '/categories', label: 'Categories' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo - Minimal Text */}
        <div className="flex items-center gap-6">
          <Link href="/explore" className="font-mono font-bold text-sm text-foreground hover:opacity-80">
            awesome-ai-agents
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-4 text-xs font-mono">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'transition-colors py-1',
                    isActive
                      ? 'text-foreground font-semibold border-b-2 border-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Search & Theme Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1 rounded border border-border bg-card text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
          >
            <span>Search...</span>
            <kbd className="text-[10px] px-1 rounded border border-border bg-muted">⌘K</kbd>
          </button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
