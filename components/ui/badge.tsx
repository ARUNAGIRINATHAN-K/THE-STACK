import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'production' | 'growing' | 'emerging' | 'tag';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variantStyles = {
    default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border-border text-foreground hover:bg-accent',
    production: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 dark:text-emerald-300 font-medium',
    growing: 'border-amber-500/30 bg-amber-500/10 text-amber-400 dark:text-amber-300 font-medium',
    emerging: 'border-violet-500/30 bg-violet-500/10 text-violet-400 dark:text-violet-300 font-medium',
    tag: 'border-border/60 bg-accent/50 text-muted-foreground hover:text-foreground text-xs',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
