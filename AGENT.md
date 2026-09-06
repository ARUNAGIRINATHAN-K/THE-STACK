# AGENT.md - AI Agent Context & Execution Guide

> **Target Audience**: This file is specifically designed for LLMs, autonomous coding agents, and agentic workflows (e.g., Gemini, Claude Code, Cursor, Aider, AutoGen, CrewAI) operating inside or alongside this repository.

---

## 1. Repository Core Purpose

**Awesome AI Agents** is a structured, production-focused catalog of 470+ AI agent frameworks, tools, protocol specs, evaluation benchmarks, and infrastructure projects across 32+ categories.

- **Primary Repository**: [ARUNAGIRINATHAN-K/awesome-ai-agents](https://github.com/ARUNAGIRINATHAN-K/awesome-ai-agents)
- **Primary Data Source**: [README.md](file:///a:/awesome-ai-agents/README.md)
- **Contribution Guidelines**: [CONTRIBUTING.md](file:///a:/awesome-ai-agents/CONTRIBUTING.md)
- **Security Policy**: [SECURITY.md](file:///a:/awesome-ai-agents/SECURITY.md)

---

## 2. Directory & Sitemap Overview

| File / Path | Agent Context / Purpose |
|---|---|
| [`README.md`](file:///a:/awesome-ai-agents/README.md) | Central data file containing all categorized tool entries and metadata tags. |
| [`ARCHITECTURE.md`](file:///a:/awesome-ai-agents/ARCHITECTURE.md) | Technical architecture overview, module flow diagram, and component hierarchy. |
| [`DATA_SCHEMA.md`](file:///a:/awesome-ai-agents/DATA_SCHEMA.md) | Detailed dataset schema, parser specification, TypeScript interfaces, and JSON schema. |
| [`DEVELOPMENT.md`](file:///a:/awesome-ai-agents/DEVELOPMENT.md) | Environment setup, local scripts, verification workflow, Docker guide, and design rules. |
| [`scripts/build-data.js`](file:///a:/awesome-ai-agents/scripts/build-data.js) | Parser script compiling `README.md` into static JSON datasets (`data/resources.json`, `data/categories.json`). |
| [`data/resources.json`](file:///a:/awesome-ai-agents/data/resources.json) | Compiled normalized dataset of all 460+ resources with tier badges, language tags, and category slugs. |
| [`lib/resources.ts`](file:///a:/awesome-ai-agents/lib/resources.ts) & [`lib/search.ts`](file:///a:/awesome-ai-agents/lib/search.ts) | Data access layer, full-text search engine, and multi-faceted filtering logic for web UI. |
| [`app/`](file:///a:/awesome-ai-agents/app) & [`components/`](file:///a:/awesome-ai-agents/components) | Next.js 14 App Router registry pages (`/explore`, `/categories`, `/resources/[slug]`, `/about`) and UI components. |
| [`Dockerfile`](file:///a:/awesome-ai-agents/Dockerfile) & [`docker-compose.yml`](file:///a:/awesome-ai-agents/docker-compose.yml) | Multi-stage Docker containerization configuration for deploying the AI Agent Registry web app. |
| [`CONTRIBUTING.md`](file:///a:/awesome-ai-agents/CONTRIBUTING.md) | Definitive schema specification, inclusion rules, tag taxonomy, and entry constraints. |
| [`SECURITY.md`](file:///a:/awesome-ai-agents/SECURITY.md) | Protocols for flagging malicious tools, supply-chain attacks, or compromised URLs. |
| [`CODE_OF_CONDUCT.md`](file:///a:/awesome-ai-agents/CODE_OF_CONDUCT.md) | Community standards and interaction expectations. |
| [`.github/workflows/`](file:///a:/awesome-ai-agents/.github/workflows) | CI/CD automation (`awesome-lint.yml`, `link-check.yml`). |

---

## 3. Strict Metadata Specification for Tool Entries

Every entry listed under a category in `README.md` MUST conform to this exact single-line Markdown pattern:

```markdown
- [Tool Name](https://github.com/org/repo) `TIER` `[Language]` `[Type]` - Single sentence description ending with a period.
```

### Metadata Components & Rules

1. **Tool Name & URL**:
   - Link text must match the canonical project name.
   - Target URL must be a valid GitHub/GitLab repository or official hosted platform URL.
   - Do NOT duplicate entries anywhere in `README.md`.

2. **Tier Badge** (Exactly ONE required):
   - `🚀` **Production-Ready**: 10K+ stars, major tech company (OpenAI, Anthropic, Google, Microsoft, Meta, AWS), or massive enterprise usage.
   - `🌱` **Growing**: 500–5K stars, active commits, gaining momentum.
   - `🔬` **Emerging**: <500 stars, research paper implementation, or novel experimental tool.

3. **Language Tag** (Exactly ONE required, inside brackets):
   - Approved set: `[Python]`, `[TypeScript]`, `[Go]`, `[Rust]`, `[Java]`, `[C#]`, `[C++]`, `[Kotlin]`, `[Swift]`, `[Ruby]`, `[WebAssembly]`, `[Cloud]`, `[Browser]`, `[Desktop]`, `[Mobile]`, `[No-Code]`.

4. **Type/Framework Tag** (Exactly ONE required, inside brackets):
   - Approved set (priority order: `MCP` > `RAG` > framework > architecture > environment):
     `[MCP]`, `[RAG]`, `[Multi-Agent]`, `[Graph-Based]`, `[Stateful]`, `[Event-Driven]`, `[Voice]`, `[Vision]`, `[Multimodal]`, `[Memory]`, `[Observability]`, `[Security]`, `[Compliance]`, `[Testing]`, `[Evaluation]`, `[Benchmark]`, `[CLI]`, `[IDE]`, `[VS Code]`, `[AWS]`, `[GCP]`, `[Azure]`, `[Self-Hosted]`, `[Local]`, `[Serverless]`, `[Research]`.

5. **Description Rules**:
   - Exactly **one sentence**, ending with a period (`.`).
   - Recommended length: **12–18 words**.
   - Zero promotional/hyped language (never use: "best", "revolutionary", "game-changing", "seamlessly", "powerful").
   - Start with an action verb or descriptive noun phrase explaining what the tool **does**.

---

## 4. Instructions for Agent Operations

When modifying, inspecting, or maintaining this repository, AI agents must follow these operational rules:

### A. Adding a New Tool Entry
1. **Deduplication**: Search `README.md` to verify the URL or tool name is not already listed.
2. **Alphabetical Sorting**: Place the new item in exact **alphabetical order** by Tool Name within its target category section.
3. **Activity Validation**: Verify that the repository has commits within the last 6 months.
4. **Schema Adherence**: Format the line strictly according to the metadata spec above.

### B. Updating Existing Entries
1. Maintain existing section category header anchors.
2. If updating tier badges (`🚀`, `🌱`, `🔬`), ensure the change reflects GitHub star or adoption metrics.
3. Preserve single-line formatting per entry.

### C. Flagging / Removing Malicious or Dead Tools
1. If an agent detects a 404 URL, archived repo (>6 months inactive), or compromised domain, report or prune according to [CONTRIBUTING.md](file:///a:/awesome-ai-agents/CONTRIBUTING.md) and [SECURITY.md](file:///a:/awesome-ai-agents/SECURITY.md).
2. If flagging security threats, refer to [SECURITY.md](file:///a:/awesome-ai-agents/SECURITY.md).

### D. Running Verification & Linting Commands
Before submitting PRs or finalizing changes:
- Recompile static JSON dataset from `README.md`:
  ```bash
  npm run build:data
  ```
- Run Next.js production build check:
  ```bash
  npm run build
  ```
- Check spelling using `codespell`:
  ```bash
  codespell -q 3 --skip=.git,node_modules --check-filenames --ignore-words-list=reworkd,ehr,EHR .
  ```
- Run `awesome-lint` validator:
  ```bash
  npx awesome-lint
  ```

---

## 5. Machine-Readable Schema

```json
{
  "repo": "ARUNAGIRINATHAN-K/awesome-ai-agents",
  "data_file": "README.md",
  "entry_format": "- [{name}]({url}) `{tier}` `[{language}]` `[{type}]` - {description}.",
  "tiers": ["🚀", "🌱", "🔬"],
  "rules": {
    "sentence_count": 1,
    "word_count_range": [12, 18],
    "alphabetical_sorting": true,
    "no_promotional_words": ["best", "revolutionary", "game-changing", "powerful", "seamlessly"]
  }
}
```
