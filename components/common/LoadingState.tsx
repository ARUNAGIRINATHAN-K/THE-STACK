import * as React from 'react';

export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="p-8 text-center font-mono text-xs text-muted-foreground animate-pulse">
      {message}
    </div>
  );
}
