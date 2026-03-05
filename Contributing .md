# Contributing to Awesome AI Agents 2026

First off — thank you. This list only stays useful because people like you take the time to keep it accurate and current.

There are four ways to contribute:

- **Add a new tool** — something missing that belongs here
- **Update an existing entry** — stars are outdated, description is wrong, links are broken
- **Remove a dead project** — unmaintained repos that no longer belong
- **Improve the structure** — better categories, clearer descriptions, fixed typos

All contributions go through a pull request. It takes about 5 minutes.

---

## Entry Format

Every entry follows this exact format:

```markdown
### Tool Name
**[GitHub](https://github.com/ARUNAGIRINATHAN-K/awesome-ai-agents)** · **[Site](https://example.com)** · `Language` · ⭐ Xk

One sentence describing what the tool does. One sentence on what makes it distinct or worth including over alternatives.
```

**Rules:**
- Tool name is an `###` heading — nothing else
- GitHub link is **bold**. Site link is **bold**. Both are optional if they don't exist, but at least one must be present
- Language tag uses backtick code formatting: `` `Python` ``, `` `TypeScript` ``, `` `Go` ``
- Stars use shorthand: `24.8k` not `24,800`. Use `—` if unknown
- Description is exactly **two sentences**. No more, no less
- No trailing punctuation on the heading line
- No promotional language ("the best", "revolutionary", "game-changing")

**Good example:**

```markdown
### Mem0
**[GitHub](https://github.com/mem0ai/mem0)** · **[Site](https://mem0.ai)** · `Python` · ⭐ ~30k

Memory layer for AI applications with long-term, short-term, and semantic memory extraction. Integrates with LangChain, CrewAI, and AutoGen via REST API and MCP server.
```

**Bad example:**

```markdown
### Mem0 - The Best Memory Solution 🚀🔥
[GitHub](https://github.com/mem0ai/mem0) | [Site](https://mem0.ai) | Python | 30000 stars

Mem0 is an amazing, revolutionary memory layer that will transform how you build AI agents forever! It supports long-term memory, short-term memory, semantic memory, and so much more. Integrates with everything. You should definitely use it.
```

---

## Inclusion Criteria

| Criterion | Requirement |
|---|---|
| **Maintenance** | At least one commit in the last 6 months |
| **Openness** | Open-source preferred; closed-source tools must have a public API or free tier |
| **Relevance** | Must be directly useful for building, running, or managing AI agents |
| **Differentiation** | Must be meaningfully different from tools already listed |
| **Documentation** | Must have a README, docs site, or equivalent |
| **Stability** | Proof-of-concept / experimental repos are acceptable if clearly labeled |

---

## What We Don't Accept

- Tools with no public source code and no public API
- Abandoned repos (no commit in 6+ months) unless historically significant
- Duplicate tools that don't add anything over an existing entry
- Personal projects without any public usage or community traction
- Entries that are primarily tutorials, blog posts, or YouTube channels (those go in Learning Resources only)
- Anything that requires payment with no free tier or trial

---

## Suggesting a New Section

If you think a whole new category is missing, open an **Issue** rather than a PR. Describe:

1. What the category would be called
2. At least **3 tools** that would go in it
3. Why it's distinct from existing categories

We'll discuss it before restructuring.

---

## Reporting a Dead Link or Outdated Entry

Open an Issue with:

- The tool name
- What's wrong (dead link / outdated stars / project abandoned / etc.)
- A suggested fix if you have one

Or just open a PR directly with the fix — that's even better.

---

## How PRs Are Reviewed

PRs are typically reviewed within **72 hours**. A maintainer will either merge, request changes, or explain why the tool doesn't fit. Please don't take rejections personally — the bar is intentionally high to keep the list signal-to-noise ratio useful.

If your PR sits without a response for more than a week, feel free to leave a comment to bump it.

---

## Style Guide

A few small things that keep the list consistent:

- Use **em dashes** (`—`) not hyphens (`-`) for separators in descriptions
- Use `~` prefix for approximate star counts: `⭐ ~30k`
- Spell out framework names as they brand themselves: `LangGraph` not `Langgraph`, `CrewAI` not `CrewAi`
- Prefer active voice: "Builds stateful workflows" not "Can be used to build stateful workflows"
- Avoid the word "simple" — show don't tell

---

## License

By contributing, you agree that your contributions will be licensed under the same [CC0 license](https://github.com/ARUNAGIRINATHAN-K/awesome-ai-agents/blob/main/LICENSE) as the rest of this project. This means you're releasing your contribution into the public domain.

---

*Thank you for helping keep this list useful for the entire AI agent community.*
