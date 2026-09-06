# Architecture Overview — AI Agent Registry 2026

This document details the system architecture, component design, data flow, and deployment model of the **Awesome AI Agents 2026 / AI Agent Registry** application.

---

## 1. System Overview

The system is designed as a **hybrid static data catalog & interactive single-page application**:

1. **Source Dataset**: Curated single-sentence Markdown entries in [`README.md`](README.md).
2. **Build-Time Parser Pipeline**: Node.js parser ([`scripts/build-data.js`](scripts/build-data.js)) extracts, validates, normalizes, and disambiguates all 460+ tools into strongly-typed static JSON databases ([`data/resources.json`](data/resources.json) and [`data/categories.json`](data/categories.json)).
3. **Frontend Application**: Next.js 14 App Router application leveraging React 18, Tailwind CSS, Lucide icons, and `next-themes` for fast, client-side search, multi-faceted filtering, dynamic category navigation, and resource discovery.
4. **Containerized Deployment**: Production-ready multi-stage Docker build utilizing Next.js `standalone` mode.

---

## 2. High-Level Data Flow & Architecture

```mermaid
flowchart TD
    subgraph Data Layer
        A["README.md (Curated Catalog)"] -->|npm run build:data| B["scripts/build-data.js (Multi-pass Parser)"]
        B --> C["data/resources.json (460+ Items)"]
        B --> D["data/categories.json (31 Domains)"]
    end

    subgraph Data Access & Search Layer
        C & D --> E["lib/resources.ts (Data Abstraction Layer)"]
        E --> F["lib/search.ts (In-Memory Search & Multi-Filter Engine)"]
    end

    subgraph Presentation Layer (Next.js 14 App Router)
        F --> G["app/page.tsx (Homepage & Hero Search)"]
        F --> H["app/explore/page.tsx (Explore & Filter Panel)"]
        F --> I["app/categories/[slug]/page.tsx (Category Directory)"]
        F --> J["app/resources/[slug]/page.tsx (Resource Detail Views)"]
    end

    subgraph Component Primitives
        H --> K["components/filter-sidebar.tsx"]
        H & I --> L["components/resource/ResourceGrid.tsx"]
        L --> M["components/resource/ResourceCard.tsx"]
        G --> N["components/category/CategoryCard.tsx"]
        G & H --> O["components/search/SearchBar.tsx"]
    end
```

---

## 3. Core Architectural Modules

### A. Data Parsing & Normalization (`scripts/build-data.js`)
- **Category Extraction**: Scans Markdown headers (`## Category Name`) to construct category entries with unique slugs and item counters.
- **Resource Parsing**: Regex pattern matching extracts name, GitHub URL, tier badge (`🚀`, `🌱`, `🔬`), language tag (`[Python]`, `[TypeScript]`), type tag (`[MCP]`, `[Multi-Agent]`), and description.
- **Disambiguation Engine**: Detects duplicate tool names across different categories or forks (e.g. `Codex CLI`, `Yao Agents`) and appends auto-generated unique slug suffixes (e.g. `codex-cli-microsoft`).

### B. Data Access & Search Engine (`lib/resources.ts`, `lib/search.ts`)
- **Query Abstraction**: Read-only functions (`getResources()`, `getResourceBySlug()`, `getCategories()`, `getCategoryBySlug()`, `getRelatedResources()`) query statically imported JSON datasets.
- **Client-Side Filtering**: Supports simultaneous multi-column filtering by text query, category, tier level, runtime language, and source platform (GitHub vs. external website).
- **Deterministic Sorting**: Instant sorting by name (A–Z), tier hierarchy (Production → Growing → Emerging), category, and GitHub repository popularity.

### C. Component Architecture
- **Header & Navigation** ([`components/layout/Header.tsx`](components/layout/Header.tsx)): Sticky desktop header with navigation links, search trigger modal shortcut (`⌘K`), theme toggle, and repository link.
- **Resource Grid & Card** ([`components/resource/ResourceCard.tsx`](components/resource/ResourceCard.tsx)): Information-dense cards formatted with strict minimal aesthetic (monospace tags, subtle 1px borders, tier badges, direct source repository links).
- **Filter Panel** ([`components/filter-sidebar.tsx`](components/filter-sidebar.tsx)): Real-time filter control sidebar for tier, runtime language, and category domain narrowing.

---

## 4. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | Static rendering & client-side routing |
| **Language** | TypeScript 5 | Strict static typing across components & dataset schema |
| **Styling** | Tailwind CSS + Vanilla CSS | Strict Minimal design system (GitHub/npm/docs aesthetic) |
| **Icons** | Lucide React | Monochrome system status & UI icons |
| **Theme** | `next-themes` | Dark, light, and system color mode switching |
| **Build Tooling** | Node.js | Markdown dataset parser & static compilation |
| **Containerization** | Docker + Docker Compose | Multi-stage production container build |

---

## 5. Deployment Architecture

The application supports dual deployment models:

### A. Vercel Global Edge Network (Automated CI/CD)
- **GitHub Integration**: Connected to `ARUNAGIRINATHAN-K/awesome-ai-agents` via webhooks.
- **Build Execution**: `npm run build` runs `node scripts/build-data.js && next build`, compiling the dataset and pre-rendering all dynamic routes statically (`/explore`, `/categories/[slug]`, `/resources/[slug]`).
- **CDN Edge Caching**: Assets and static HTML pages are distributed globally across Vercel's Edge Network with sub-100ms response times.
- **Preview Deployments**: Branch pushes and Pull Requests generate isolated preview URLs for visual verification before merging to `main`.

### B. Containerized Deployment (Docker)
- **Multi-Stage Build Pipeline**:
  - `deps`: Installs production dependencies (`npm ci`).
  - `builder`: Executes dataset compiler (`npm run build:data`) & Next.js production build (`output: 'standalone'`).
  - `runner`: Lightweight Node.js Alpine container executing `server.js`.
- **Docker Compose**: `docker compose up --build` provisions the service on port `3000`.
