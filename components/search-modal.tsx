'use client';

import * as React from 'react';
import Link from 'next/link';
import { Resource } from '@/types/resource';
import { searchAndFilterResources } from '@/lib/resources';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<Resource[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setResults(searchAndFilterResources({ searchQuery: '', limit: 6 }));
    } else {
      setQuery('');
    }
  }, [isOpen]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearch = (value: string) => {
    setQuery(value);
    setResults(searchAndFilterResources({ searchQuery: value, limit: 8 }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-background/80 backdrop-blur-xs font-mono">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-xl bg-card border border-border rounded shadow-xl overflow-hidden z-10">
        <div className="flex items-center px-3 py-2 border-b border-border">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
            placeholder="Search agents, tools, tags, categories..."
            className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button onClick={onClose} className="text-[10px] text-muted-foreground px-1.5 py-0.5 rounded border border-border">
            ESC
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2 space-y-1 text-xs">
          {results.length === 0 ? (
            <div className="py-6 text-center text-muted-foreground text-[11px]">
              No resources found for &quot;{query}&quot;.
            </div>
          ) : (
            results.map((res: Resource) => (
              <Link
                key={res.id}
                href={`/resources/${res.slug}`}
                onClick={onClose}
                className="flex items-center justify-between p-2 rounded hover:bg-accent transition-colors group"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground group-hover:underline truncate">
                      {res.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{res.tierBadge}</span>
                    <span className="text-[10px] text-muted-foreground truncate">in {res.category}</span>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0">{res.language} ↗</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
