'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '../theme-toggle';
import { MobileNav } from './MobileNav';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onOpenSearch?: () => void;
}

export function Header({ onOpenSearch }: HeaderProps) {
  const pathname = usePathname();

  const navLinks = [
    { href: '/explore', label: 'Explore' },
    { href: '/categories', label: 'Categories' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Desktop Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-mono font-bold text-sm text-foreground hover:opacity-80">
            <span className="text-primary font-extrabold">◈</span>
            <span>AI Agent Registry</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 text-xs font-mono">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'transition-colors py-1',
                    isActive
                      ? 'text-foreground font-bold border-b-2 border-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Search, Theme & Mobile Nav */}
        <div className="flex items-center gap-3">
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded border border-border bg-card text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
              aria-label="Search resources"
            >
              <span>Search...</span>
              <kbd className="text-[10px] px-1 rounded border border-border bg-muted">⌘K</kbd>
            </button>
          )}

          <a
            href="https://github.com/ARUNAGIRINATHAN-K/awesome-ai-agents-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-accent"
            title="GitHub Repository"
            aria-label="GitHub Repository"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </a>

          <ThemeToggle />

          {/* Mobile Menu Drawer Toggle */}
          <MobileNav navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}
