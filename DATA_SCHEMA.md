# Data Schema & Parser Specification

This document defines the raw Markdown data format, TypeScript interfaces, parser rules, and compiled JSON schemas for the **AI Agent Registry** dataset.

---

## 1. Raw Markdown Entry Specification

Every tool listed under a category header in [`README.md`](README.md) MUST conform to this exact single-line Markdown pattern:

```markdown
- [Tool Name](https://github.com/org/repo) `TIER` `[Language]` `[Type]` - Single sentence description ending with a period.
```

### Metadata Tag Definitions

1. **Tool Name & URL**:
   - Link text MUST match the canonical project name.
   - Target URL MUST be a valid GitHub/GitLab repository or official hosted platform URL.

2. **Tier Badge** (Required, exactly one):
   - `🚀` **Production-Ready**: 10K+ GitHub stars, enterprise adoption, major tech company (OpenAI, Anthropic, Google, Microsoft, Meta, AWS), or massive enterprise usage.
   - `🌱` **Growing**: 500–5K stars, active commits, gaining momentum.
   - `🔬` **Emerging**: <500 stars, research paper implementation, or experimental tool.

3. **Language Tag** (Required, exactly one, inside brackets):
   - Approved values: `[Python]`, `[TypeScript]`, `[Go]`, `[Rust]`, `[Java]`, `[C#]`, `[C++]`, `[Kotlin]`, `[Swift]`, `[Ruby]`, `[WebAssembly]`, `[Cloud]`, `[Browser]`, `[Desktop]`, `[Mobile]`, `[No-Code]`.

4. **Type / Framework Tag** (Required, exactly one, inside brackets):
   - Priority order: `MCP` > `RAG` > framework > architecture > environment.
   - Approved examples: `[MCP]`, `[RAG]`, `[Multi-Agent]`, `[Graph-Based]`, `[Stateful]`, `[Event-Driven]`, `[Voice]`, `[Vision]`, `[Multimodal]`, `[Memory]`, `[Observability]`, `[Security]`, `[Compliance]`, `[Testing]`, `[Evaluation]`, `[Benchmark]`, `[CLI]`, `[IDE]`, `[VS Code]`, `[AWS]`, `[GCP]`, `[Azure]`, `[Self-Hosted]`, `[Local]`, `[Serverless]`, `[Research]`.

5. **Description Rules**:
   - Exactly **one sentence**, ending with a period (`.`).
   - Length: **12–18 words** recommended.
   - Zero promotional or hyped language (never use "best", "revolutionary", "game-changing", "seamlessly", "powerful").

---

## 2. TypeScript Interfaces (`types/resource.ts`)

```typescript
export type TierLevel = 'production' | 'growing' | 'emerging';
export type TierBadge = '🚀' | '🌱' | '🔬';

export interface Resource {
  id: string;
  name: string;
  slug: string;
  url: string;
  githubRepo?: string;
  isGitHub: boolean;
  tier: TierLevel;
  tierBadge: TierBadge;
  language: string;
  type: string;
  description: string;
  category: string;
  categorySlug: string;
  tags: string[];
  lineIndex?: number;
}

export interface Category {
  name: string;
  slug: string;
  description?: string;
  count: number;
  lineIndex?: number;
}

export interface ResourceDataset {
  version: string;
  generatedAt: string;
  totalResources: number;
  totalCategories: number;
  resources: Resource[];
}

export interface CategoryDataset {
  version: string;
  generatedAt: string;
  categories: Category[];
}
```

---

## 3. Disambiguation & Slug Generation Rules

To ensure static build stability and valid dynamic routes (`/categories/[slug]`, `/resources/[slug]`), the parser (`scripts/build-data.js`) applies the following normalization pipeline:

1. **Standard Slug Generation**:
   - Lowercase string, replace non-alphanumeric characters with hyphens, strip leading/trailing hyphens.
   - Example: `CrewAI Framework` → `crewai-framework`.

2. **Slug Disambiguation Strategy**:
   - If two tools resolve to the same base slug (e.g. `Codex CLI` by Microsoft vs. `Codex CLI` fork), the parser automatically appends an organization/category suffix:
     `codex-cli` → `codex-cli-microsoft` / `codex-cli-coding-agents`.
   - Guaranteed unique `id` and `slug` fields across the entire compiled dataset.

3. **Tag Normalization**:
   - Tags array includes the primary `language`, `type`, `tier`, `category`, and extracted keyword tokens.

---

## 4. Compiled JSON Schemas (`data/*.json`)

### `data/resources.json`
```json
{
  "version": "2026.1",
  "generatedAt": "2026-09-06T10:00:00.000Z",
  "totalResources": 461,
  "totalCategories": 31,
  "resources": [
    {
      "id": "agency-swarm",
      "name": "Agency Swarm",
      "slug": "agency-swarm",
      "url": "https://github.com/VRSEN/agency-swarm",
      "githubRepo": "VRSEN/agency-swarm",
      "isGitHub": true,
      "tier": "production",
      "tierBadge": "🚀",
      "language": "Python",
      "type": "Multi-Agent",
      "description": "Orchestrates multi-agent systems built on the OpenAI Assistants API with role-based collaboration.",
      "category": "Orchestration Frameworks",
      "categorySlug": "orchestration-frameworks",
      "tags": ["Python", "Multi-Agent", "production", "Orchestration Frameworks"],
      "lineIndex": 62
    }
  ]
}
```

### `data/categories.json`
```json
{
  "version": "2026.1",
  "generatedAt": "2026-09-06T10:00:00.000Z",
  "categories": [
    {
      "name": "Orchestration Frameworks",
      "slug": "orchestration-frameworks",
      "count": 28,
      "lineIndex": 60
    }
  ]
}
```
