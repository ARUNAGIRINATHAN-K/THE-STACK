'use client';

import * as React from 'react';
import '@/app/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchModal } from '@/components/search-modal';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = React.useState(false);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>AI Agent Registry — Discover the AI Agent Ecosystem</title>
        <meta
          name="description"
          content="Explore AI agents, frameworks, tools, protocols, models, and infrastructure for building intelligent systems."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen flex flex-col bg-background font-sans text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Header onOpenSearch={() => setSearchOpen(true)} />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* Global Search Command Palette */}
          <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </ThemeProvider>
      </body>
    </html>
  );
}
