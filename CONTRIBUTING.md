# Contributing to Awesome AI Agents 2026

First off, thank you. This list only stays useful because people like you take the time to keep it accurate and current.

There are four ways to contribute:

- **Add a new tool** - something missing that belongs here
- **Update an existing entry** - description is wrong or links are broken
- **Remove a dead project** - unmaintained repos that no longer belong
- **Improve the structure** - better categories, clearer descriptions, fixed typos

All contributions go through a pull request. It takes about 5 minutes.

---

## Entry Format

Every entry follows this exact compact format:

```markdown
- [Tool Name](https://github.com/org/repo) `TIER` `[Language]` `[Type]` - One sentence describing what the tool does.
```

### Tier Badge (required — pick exactly one)

| Badge | Meaning | Criteria |
|---|---|---|
| `🚀` | Production-Ready | 10K+ GitHub stars, enterprise adoption, major company (OpenAI, Google, Microsoft, Meta, AWS, Anthropic), or 100K+ users |
| `🌱` | Growing | Active community, 500–5K stars, regular commits, gaining momentum |
| `🔬` | Emerging | Novel idea, <500 stars, experimental, recently launched, or research-only |

When in doubt, use `🌱`. Maintainers will adjust tiers during review.

### Language Tag (required — pick exactly one)

Use the **primary implementation language or runtime**:

`Python` · `TypeScript` · `Go` · `Rust` · `Java` · `C#` · `C++` · `Kotlin` · `Swift` · `Ruby` · `WebAssembly` · `Cloud` · `Browser` · `Desktop` · `Mobile` · `No-Code`

- Use `Cloud` for fully managed SaaS products with no local runtime
- Use `Browser` for browser extensions and purely web-based tools
- Use `Desktop` for Electron or native desktop apps
- Use `No-Code` for visual/drag-and-drop builders with no coding required

### Type / Framework Tag (required — pick exactly one)

Use the **most specific framework or architectural type** that applies:

`LangChain` · `OpenAI` · `Anthropic` · `Microsoft` · `Pydantic` · `FastAPI` · `Multi-Agent` · `Graph-Based` · `Stateful` · `Event-Driven` · `MCP` · `RAG` · `Voice` · `Vision` · `Multimodal` · `Memory` · `Observability` · `Security` · `Compliance` · `Testing` · `Evaluation` · `Benchmark` · `CLI` · `IDE` · `VS Code` · `JetBrains` · `GitHub` · `Docker` · `Kubernetes` · `AWS` · `GCP` · `Azure` · `Self-Hosted` · `Local` · `Serverless` · `No-Code` · `Visual Builder` · `Vector DB` · `Database` · `Pipeline` · `Streaming` · `STT` · `TTS` · `Research` · `Paper` · `Guide` · `Newsletter`

Priority order when multiple tags could apply: `MCP` > `RAG` > framework (LangChain, OpenAI…) > architectural style (Multi-Agent, Graph-Based…) > environment (CLI, IDE, Cloud…)

### Description (required)

- **One sentence only**, ending with a period
- **12–18 words** recommended — specific enough to be useful, short enough to scan
- No promotional language: no "best", "revolutionary", "game-changing", "powerful", "seamlessly", "amazing"
- Start with an action verb or noun phrase that describes what the tool **does**, not what it **is**

---

## Complete Examples

**Good entries:**

```markdown
- [CrewAI](https://github.com/crewAIInc/crewAI) `🚀` `[Python]` `[Multi-Agent]` - Production multi-agent framework with role-based collaboration and 1500+ company adoptions.
- [Mastra](https://github.com/mastra-ai/mastra) `🌱` `[TypeScript]` `[MCP]` - Opinionated TypeScript framework with RAG, observability, and MCP support built in.
- [Modus](https://github.com/hypermodeinc/modus) `🔬` `[WebAssembly]` `[Serverless]` - Serverless framework for high-throughput agent workloads with minimal cold starts.
```

**Bad entries:**

```markdown
# Wrong: missing tier, language, and type tags (old format)
- [ToolA](https://github.com/example/bad-entry-1) - Production multi-agent framework (🏷️ `Python` `LangChain` `SDK`).

# Wrong: em-dash instead of hyphen-space after closing tag
- [ToolB](https://github.com/example/bad-entry-2) `🌱` `[TypeScript]` `[MCP]` — Opinionated TypeScript framework.

# Wrong: multiple sentences
- [ToolC](https://github.com/example/bad-entry-3) `🔬` `[WebAssembly]` `[Serverless]` - Serverless framework. It has minimal cold starts.

# Wrong: promotional language
- [ToolD](https://github.com/example/bad-entry-4) `🚀` `[Python]` `[Multi-Agent]` - The most powerful and revolutionary AI framework ever built.

# Wrong: tier badge missing brackets around language/type
- [ToolE](https://github.com/example/bad-entry-5) `🌱` `Python` `Multi-Agent` - Does something useful.
```

---

## Inclusion Criteria

Your tool should meet **all** of the following:

1. **Directly related to AI agents** — not a general LLM tool, not a prompt library, not a generic API wrapper
2. **Actively maintained** — last commit within the past 6 months (or a live hosted product with recent activity)
3. **Publicly available** — open-source with a GitHub/GitLab repo, or a live hosted product with a public URL
4. **Not a duplicate** — check the list first; the URL must not already appear elsewhere in the README
5. **Functional** — the tool must actually work, not just be a README with no code

Tools that are **experimental, early-stage, or have few stars** are welcome as long as they meet all five criteria. Use `🔬` for those. We value breadth of coverage.

---

## Category Placement

Place your entry in the **most specific category** that fits. If it spans multiple categories, pick the primary one. Maintainers may move it during review.

Current categories:

- **Orchestration Frameworks** — core agent building frameworks
- **Coding Agents** — tools that write, edit, and debug code
- **Memory and Context** — persistent memory and knowledge graphs
- **Multi-Agent Systems** — multi-agent coordination frameworks
- **Agent Communication Protocols** — MCP, A2A, and tool protocol implementations
- **Browser and Computer Use Agents** — web navigation and UI automation
- **Agent Tooling and Infrastructure** — sandboxes, scrapers, and networking
- **Low and No-Code Builders** — visual and browser-based agent builders
- **Voice and Multimodal Agents** — audio, video, and cross-modal agents
- **Safety Guardrails and Observability** — monitoring, security, and governance
- **Agent Interfaces and UIs** — frontend workspaces and chat interfaces
- **Agent Deployment and Hosting** — platforms for running agents in production
- **Agent Evaluation and Benchmarks** — benchmarks and evaluation frameworks
- **Learning Resources** — courses, papers, and guides
- **Agent Communication** — notifications, messaging, and channel integrations
- **Data Pipeline and Workflow** — data orchestration and long-running workflows
- **Secure Execution Environments** — sandboxes, VMs, and serverless runtimes
- **Creative AI Agents** — image, video, music, audio, and 3D generation
- **Customer Support and CRM Agents** — support automation, CRM, and sales outreach
- **Voice Agent Platforms** — voice AI platforms for calls and conversations
- **Deep Research Agents** — autonomous multi-step research and report generation
- **Prompt-to-App Builders** — natural language to full-stack application generation
- **Multi-Agent Consumer Platforms** — all-in-one consumer AI platforms
- **Open-Source Models for Agents** — open-weight LLMs optimized for agentic tasks
- **Market Stats and Benchmarks 2026** — market data, valuations, and growth metrics
- **Local and Self-Hosted AI** — local LLM runners and self-hosted agent platforms
- **AI Governance and Compliance** — regulatory frameworks and governance tools
- **Cybersecurity Agents** — pentesting, threat detection, and security analysis
- **Healthcare and Therapy Agents** — mental health, cognitive training, and therapy AI
- **Newsletters and Communities** — curated newsletters, podcasts, and forums
- **Experience Intent Libraries** — prompt templates and vibe libraries for interaction design

---

## Pull Request Process

1. **Fork** this repo
2. **Add** your entry in the correct category, in alphabetical order
3. **Verify** the link works, your entry follows the format above, and the URL does not already appear elsewhere in the list
4. **Submit** a pull request with a clear title: `Add [Tool Name] to [Category]`

> [!NOTE]
> **Vercel Preview Check Status**: If you see a Vercel check indicating `Authorization required to deploy` on your PR, this is a standard Vercel security policy for repository forks. GitHub Actions (`awesome-lint` & `npm run build`) automatically validates your PR code and dataset formatting. Maintainers will review and merge your PR directly.

## Web Application & Dataset Build

The repository includes an interactive Next.js 14 web application for searching, filtering, and exploring the registry.

When adding or updating entries in `README.md`, recompile the static dataset and test the web app:

```bash
# 1. Compile README.md into static normalized JSON datasets
npm run build:data

# 2. Start Next.js development server
npm run dev

# 3. Validate production build
npm run build

# 4. (Optional) Test containerized build
docker compose up --build
```

---

## Quality Standards

This list passes `awesome-lint` and automated link checking on every push. Your PR must:

- Pass the awesome-lint check (no em-dashes, no duplicate links, correct formatting)
- Have no broken links
- Not reuse a URL already present elsewhere in the README
- Follow alphabetical ordering within its category
- Use the new compact format (tier badge + language + type + one-sentence description)

---

## Code of Conduct

By contributing, you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md).

---

Thank you for helping make this the most useful AI agent resource on GitHub.
