'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  navLinks: NavLink[];
}

export function MobileNav({ navLinks }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded border border-border bg-card text-foreground font-mono text-xs"
        aria-label="Toggle navigation menu"
      >
        {open ? '✕' : '☰'}
      </button>

      {open && (
        <div className="fixed inset-x-0 top-14 bg-background border-b border-border p-4 shadow-lg flex flex-col gap-3 font-mono text-xs z-50">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'py-2 px-3 rounded hover:bg-accent transition-colors',
                pathname === link.href ? 'font-bold bg-accent text-foreground' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
