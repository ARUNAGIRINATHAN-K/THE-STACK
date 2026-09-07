import * as React from 'react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  onClearFilters?: () => void;
}

export function EmptyState({
  title = 'No resources found',
  message = "We couldn't find any resources matching your search. Try another search term or clear filters.",
  onClearFilters,
}: EmptyStateProps) {
  return (
    <div className="p-8 text-center border border-dashed border-border rounded bg-card/40 font-mono text-xs space-y-3">
      <p className="font-bold text-foreground">{title}</p>
      <p className="text-muted-foreground font-sans max-w-sm mx-auto">{message}</p>
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="px-3 py-1 rounded border border-border bg-foreground text-background font-bold hover:opacity-90 transition-opacity"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
