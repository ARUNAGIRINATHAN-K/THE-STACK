# Awesome AI Agents 2026 [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

![Updated](https://img.shields.io/badge/Updated-March%202026-00d4ff) ![Tools](https://img.shields.io/badge/Tools-80%2B-7c3aed) [![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-10b981)](https://github.com/ARUNAGIRINATHAN-K/awesome-ai-agents/blob/main/CONTRIBUTING.md) ![License](https://img.shields.io/badge/License-CC0-f59e0b)

## Contents

- [Not Sure Where to Start](#not-sure-where-to-start)
- [Orchestration Frameworks](#orchestration-frameworks)
- [Coding Agents](#coding-agents)
- [Memory and Context](#memory-and-context)
- [Multi-Agent Systems](#multi-agent-systems)
- [Agent Tooling and Infrastructure](#agent-tooling-and-infrastructure)
- [Low and No-Code Builders](#low-and-no-code-builders)
- [Voice and Multimodal Agents](#voice-and-multimodal-agents)
- [Safety Guardrails and Observability](#safety-guardrails-and-observability)
- [Learning Resources](#learning-resources)

---

A meticulously curated list of frameworks, tools, platforms, and resources for building autonomous AI agents in 2026.

If this list saved you research time, please ⭐ star it — it helps others find it too.

The AI agent ecosystem grew faster in 2025 than most engineers could keep up with. New frameworks launched monthly, companies merged products, and the line between "agent framework" and "workflow automation" blurred entirely.

This list cuts through the noise. Every tool here has been evaluated against three questions:

- Is it actually used in production? (not just a demo repo)
- Is it actively maintained? (commit in the last 6 months)
- Does it solve a real, specific problem? (not just another LangChain wrapper)

Updated monthly. PRs welcome.

### Market snapshot

$7.8B market size (2025) · 46% CAGR through 2030 · 40% of enterprise apps expected to have agents by EOY · AutoGPT peaked at 177k ⭐ — the most-starred AI agent repo in history

---

## Not Sure Where to Start

Here are quick recommendations depending on what you want to do:

- Build a production agent pipeline in Python — LangGraph or CrewAI
- Build a production agent pipeline in TypeScript — Mastra or VoltAgent
- Write and debug code autonomously — Claude Code or OpenHands OpenDevin
- Orchestrate large teams of agents — AutoGen or Swarms Framework
- Build without writing code — Dify or Langflow
- Add memory to an existing agent — Mem0
- Run code safely in a sandbox — E2B
- Add safety guardrails to any agent — AgentGuard
- Build a voice agent — Pipecat
- Learn the fundamentals first — Building Effective Agents (Anthropic)

---

## Orchestration Frameworks

The backbone libraries powering production AI agents in 2026.

### LangGraph

[GitHub](https://github.com/langchain-ai/langgraph) · [Docs](https://langchain-ai.github.io/langgraph/) · `Python` · ⭐ 24.8k

The de facto enterprise framework for building stateful, graph-based agent workflows. 34.5M monthly downloads. Used by Cisco, Uber, LinkedIn, BlackRock, and JPMorgan. Klarna's support bot handles 2/3 of all inquiries — the equivalent of 853 employees.

### CrewAI

[GitHub](https://github.com/joaomdmoura/crewAI) · `Python` · ⭐ 44.8k

Role-playing autonomous agent orchestration where agents collaborate like a crew with distinct roles such as researcher, writer, and coder. 5.2M monthly downloads. Added streaming tool call events in January 2026 for real-time performance insights.

### AutoGen Microsoft Agent Framework

[GitHub](https://github.com/microsoft/autogen) · `Python` · ⭐ 54.6k

Microsoft merged AutoGen with Semantic Kernel into a unified Microsoft Agent Framework (GA Q1 2026). Event-driven architecture for complex multi-agent conversations. Used by Novo Nordisk for data science automation workflows.

### OpenAI Agents SDK

[GitHub](https://github.com/openai/openai-agents-python) · `Python` · ⭐ 19k

Lightweight framework for multi-agent workflows with comprehensive tracing and guardrails. Released March 2025. Provider-agnostic — works with 100+ LLMs. 10.3M monthly downloads. Minimal overhead, low learning curve.

### Google Agent Dev Kit

[GitHub](https://github.com/google/adk-python) · `Python` · ⭐ 17.8k

Modular framework integrating with Gemini, Vertex AI, and the Google Cloud ecosystem. Supports hierarchical agent compositions and custom tools. Powers Google's Agentspace platform. 3.3M monthly downloads.

### Mastra

[GitHub](https://github.com/mastra-ai/mastra) · `TypeScript` · ⭐ 20.6k

Opinionated TypeScript framework for AI apps with assistants, RAG pipelines, and built-in observability. Ideal for JS/TS teams who want structure without fighting the framework. Strong community momentum in 2026.

### PraisonAI

[GitHub](https://github.com/pipelineai/praisonai) · `Python`

Production-ready multi-agent framework with self-reflection. Fastest agent instantiation at 3.77μs. Supports 100+ LLMs, MCP integration, memory, and both Python and JavaScript SDKs.

### Modus

[GitHub](https://github.com/getmodus/modus) · `Go`

Open-source serverless framework for intelligent agents and APIs written in Go or AssemblyScript. Unique language choice delivers excellent performance for high-throughput agentic workloads.

### Strands Agents SDK

[GitHub](https://github.com/awslabs/strands-agents) · `Python`

AWS model-driven approach to building agents in just a few lines of code. Integrates natively with Bedrock. Emphasizes simplicity: define tools, pick a model, and let the SDK handle the agentic loop.

### VoltAgent

`TypeScript`

TypeScript framework for building AI agents with built-in LLM observability baked in from day one. Agentic Context Engine supports self-improving agents that learn from execution feedback. LangChain-compatible.

---

## Coding Agents

Agents that write, review, debug, and ship code autonomously.

### Claude Code

[GitHub](https://github.com/anthropics/claude-code) · [Site](https://claude.ai/code) · `TypeScript` · ⭐ 37.1k

Anthropic's agentic coding tool operating directly in your terminal. Deep codebase understanding, autonomous multi-file editing, test running, and Git operations. The benchmark setter for coding agents going into 2026.

### AutoGPT

[GitHub](https://github.com/Significant-Gravitas/AutoGPT) · `Python` · ⭐ 177k

The original autonomous agent experiment that sparked the field. Now a mature platform with Forge for agent creation, agbenchmark for evaluation, and a public leaderboard.

### OpenHands OpenDevin

[GitHub](https://github.com/OpenDevin/OpenDevin) · `Python` · ⭐ 61.4k

Open-source autonomous software engineer that executes multi-step coding tasks, browses the web, and runs terminal commands. Focused on complex real-world software development scenarios.

### Aider

[GitHub](https://github.com/Aider-AI/aider) · [Site](https://aider.chat) · `Python` · ⭐ ~25k

Terminal-first pair programmer that edits code in your local Git repo. Fluid switching between AI chat and your own editor. Excellent at refactoring across multiple files while preserving Git history cleanly.

### Open Interpreter

[GitHub](https://github.com/KillianLucas/open-interpreter) · `Python` · ⭐ 60k

Language models that execute code locally. Natural-language interaction with your computer — create files, browse the web, and analyze data — without the restrictions of hosted solutions.

### MetaGPT

[GitHub](https://github.com/geekan/MetaGPT) · `Python` · ⭐ 57.5k

Simulates a software company where one-line requirements become a PRD, system design, task breakdown, code repository, and CI pipeline. Agents role-play as PM, architect, engineer, and QA.

---

## Memory and Context

Giving agents the ability to remember, learn, and maintain state across sessions.

### Mem0

[GitHub](https://github.com/mem0ai/mem0) · [Site](https://mem0.ai) · `Python` · ⭐ ~30k

Memory layer for AI applications with long-term, short-term, and semantic memory extraction. Integrates with LangChain, CrewAI, and AutoGen via REST API and MCP server.

### Cortex Memory

`MCP`

Complete solution for agent memory covering extraction, vector search, automated optimization, REST API, MCP server, CLI, and an insights dashboard out-of-the-box. Turn-key for teams who do not want to build their own memory layer.

### LlamaIndex

[GitHub](https://github.com/jerryjliu/llama_index) · [Site](https://www.llamaindex.ai) · `Python` · ⭐ ~40k

Data framework for LLM applications with powerful indexing, retrieval, and RAG capabilities. The leading tool for connecting agents to your data. Extensive connector ecosystem. 4.2M monthly downloads.

### Agentic Context Engine

`Experimental`

Self-improving context management that lets agents curate their own context from execution feedback. Part of the VoltAgent ecosystem. Learns which context is most relevant across runs rather than naively stuffing the window.

---

## Multi-Agent Systems

Frameworks for orchestrating teams of specialized agents that collaborate on complex tasks.

### Swarm

[GitHub](https://github.com/openai/swarm) · `Python` · ⭐ ~18k

OpenAI lightweight multi-agent orchestration framework built for clarity and learning over production scale. The cleanest way to understand agent handoffs, context variables, and function calling patterns.

### Swarms Framework

[GitHub](https://github.com/kyegomez/swarms) · `Python`

Multi-agent orchestration for enterprise applications that supports massive swarms of concurrent agents. Focus on production reliability, error handling, and scalability for business-critical workflows.

### AgentVerse

`Python`

Flexible framework for building custom multi-agent environments that assembles agents to collaboratively accomplish tasks. Supports custom environments for observing and interacting with agent teams.

### Hivemoot

`OSS`

Agent teams that build real software on GitHub autonomously. Agents get roles, propose features, vote on direction, review code, and ship — Colony is the first project built entirely this way.

### EvoAgentX

Automated framework for evaluating and evolving agentic workflows over time. Agents improve their own prompts, tooling, and coordination strategies through continuous feedback loops.

---

## Agent Tooling and Infrastructure

Sandboxes, observability, browser automation, and the plumbing that makes agents reliable in production.

### E2B

[GitHub](https://github.com/e2b-dev/e2b) · [Site](https://e2b.dev) · `Python` · ⭐ ~8k

Secure cloud sandboxes for AI agents to run code safely. The standard for code execution in production agent systems with millisecond cold start, full filesystem, and network access.

### Firecrawl

[GitHub](https://github.com/mendableai/firecrawl) · [Site](https://firecrawl.dev) · `Python` · ⭐ ~18k

Web scraping and crawling API built for LLMs that converts any website to clean markdown. The `/agent` endpoint handles agentic web data collection for any framework.

### n8n

[GitHub](https://github.com/n8n-io/n8n) · [Site](https://n8n.io) · `TypeScript` · ⭐ 150k

Workflow automation with 400+ integrations. AI-native approach lets users incorporate LLMs via LangChain into automation pipelines. Build AI agent automations self-hosted under a fair-code license.

### Pilot Protocol

`Go`

Overlay network stack giving AI agents virtual addresses, encrypted UDP tunnels, NAT traversal, and mutual trust. Zero dependencies. The networking layer for distributed agent systems that need to communicate securely.

### AgentDock

[GitHub](https://github.com/agentdock/agentdock)

Open-source foundation to build, manage, and deploy production-ready AI agents frictionlessly. Abstracts API management, complex integrations, and deployment infrastructure so you can focus on building.

### Notte

`Python`

Framework for Browser-Using Agents that handles the complexity of browser automation so agents can focus on the task. Optimized for speed and reliability in production browser agent pipelines.

---

## Low and No-Code Builders

Visual builders and platforms that democratize agent creation for non-engineers.

### Langflow

[GitHub](https://github.com/langflow-ai/langflow) · [Site](https://langflow.org) · `Python` · ⭐ ~50k

Visual drag-and-drop builder for LLM workflows and RAG agents built on LangChain. Connects prompts, tools, and data sources without code. Strong enterprise adoption trajectory.

### Dify

[GitHub](https://github.com/langgenius/dify) · [Site](https://dify.ai) · `Python` · ⭐ 114k

Open-source LLM app development platform that abstracts away boilerplate infrastructure and streamlines the path from prototype to production. Self-hostable with 114k+ stars.

### AgentGPT

[GitHub](https://github.com/reworkd/AgentGPT) · [Site](https://agentgpt.reworkd.ai) · `TypeScript` · ⭐ 35.8k

Deploy autonomous AI agents in your browser with zero local setup. Goal-oriented: give the agent an objective, it plans and executes. Great entry point for AI-agent exploration.

### Wordware

[Site](https://wordware.ai)

Web-hosted IDE where non-technical domain experts collaborate with AI engineers. Treats prompting as a programming language rather than a no-code block builder.

---

## Voice and Multimodal Agents

Agents that see, hear, and speak — going beyond text-only interactions.

### Pipecat

[GitHub](https://github.com/pipecat-ai/pipecat) · [Site](https://pipecat.ai) · `Python` · ⭐ ~8k

Open-source framework for voice and multimodal conversational AI. Handles the real-time complexity of speech pipelines including VAD, STT, LLM, TTS, and video.

### Agentset

[GitHub](https://github.com/agentset/agentset)

Open-source production-ready RAG platform with built-in agentic reasoning, hybrid search, and multimodal support. Handles PDFs, images, audio, and structured data in a unified agent pipeline.

---

## Safety Guardrails and Observability

The critical layer for deploying agents responsibly in production.

> ⚠️ Agent safety tooling has become a first-class concern as autonomous agents gain access to production systems. Key capabilities to require: pre-action authorization, loop detection, budget enforcement, deterministic replay, and audit trails. No production agent should run without at least one layer from this category.

### AgentGuard

`Python`

Lightweight observability and runtime guardrails for AI agents covering loop detection, budget enforcement, cost tracking, and deterministic replay. Zero dependencies with native LangChain integration.

### Agent OS

Kernel architecture for governing autonomous AI agents. Intercepts actions mid-execution with deterministic policy enforcement, POSIX-inspired primitives, and MCP server for Claude Desktop integration.

### Orchard Kit

`Python`

Six zero-dependency Python modules for agent governance: runtime security, confabulation detection, self-audit, agent discovery, cognitive architecture, and collective cognition. Mix and match as needed.

### APort Agent Guardrails

`MCP`

Pre-action authorization plugin for agent frameworks with a `before_tool_call` hook, 40+ blocked patterns, and local or API mode. Setup via `npx @aporthq/agent-guardrails`. Zero-config protection out of the box.

---

## Learning Resources

Papers, guides, and courses for going deep on AI agent architecture.

- [Building Effective Agents — Anthropic](https://www.anthropic.com/research/building-effective-agents)  
	Anthropic's definitive guide on agent design patterns: augmented LLMs, prompt chaining, parallelization, orchestrator-subagent patterns, and evaluation strategies. Required reading before architecting any agent system.

- [Prompt Engineering Guide](https://github.com/dair-ai/Prompt-Engineering-Guide)  
	Comprehensive, community-maintained guide covering prompt engineering, context engineering, RAG, and AI agents. ⭐ 38.4k. Updated continuously with the latest techniques and research findings.

- [AI Agents in LangGraph — DeepLearning.ai](https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/)  
	Short, practical course on building production agents with LangGraph. Covers ReAct agents, memory, human-in-the-loop, and multi-agent coordination with hands-on coding exercises.

- [AgentBench: Evaluating LLMs as Agents](https://arxiv.org/abs/2309.07864)  
	Systematic benchmark for evaluating LLMs as agents across 8 distinct environments. Essential for understanding how to measure agent performance objectively rather than relying on vibes-based evaluation.

- [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)  
	The foundational paper behind the ReAct prompting pattern used by almost every agent framework. Understanding this paper gives you mental models for why agents plan and act the way they do.

- [LLM Powered Autonomous Agents — Lilian Weng](https://lilianweng.github.io/posts/2023-06-23-agent/)  
	Lilian Weng's comprehensive breakdown of the components of LLM-powered agents: planning, memory, and tool use. One of the most shared technical agent articles ever written.

---

---

Made with ❤️ for the AI agent community · March 2026

[View on GitHub](https://github.com/ARUNAGIRINATHAN-K/awesome-ai-agents) · Inspired by [awesome](https://github.com/sindresorhus/awesome) lists

> ⭐ If this list saved you time, a star means more people can find it ⭐
