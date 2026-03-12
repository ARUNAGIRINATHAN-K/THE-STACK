# Awesome AI Agents 2026 [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

A meticulously curated list of frameworks, tools, platforms, and resources for building autonomous AI agents in 2026.

If this list saved you research time, please star it — it helps others find it too.

## Contents

- [Why This List](#why-this-list)
- [Orchestration Frameworks](#orchestration-frameworks)
- [Coding Agents](#coding-agents)
- [Memory and Context](#memory-and-context)
- [Multi-Agent Systems](#multi-agent-systems)
- [Agent Tooling and Infrastructure](#agent-tooling-and-infrastructure)
- [Low and No-Code Builders](#low-and-no-code-builders)
- [Voice and Multimodal Agents](#voice-and-multimodal-agents)
- [Safety Guardrails and Observability](#safety-guardrails-and-observability)
- [Learning Resources](#learning-resources)
- [Changelog](#changelog)

---

## Why This List

The AI agent ecosystem grew faster in 2025 than most engineers could keep up with. New frameworks launched monthly, companies merged products, and the line between "agent framework" and "workflow automation" blurred.

This list cuts through the noise. Every tool here has been evaluated against three questions:

- Is it actually used in production? (not just a demo repo)
- Is it actively maintained? (commit in the last 6 months)
- Does it solve a real, specific problem? (not just another LangChain wrapper)

Updated monthly. PRs welcome.

## Orchestration Frameworks

- [AutoGen](https://github.com/microsoft/autogen) - Event-driven multi-agent framework merged with Semantic Kernel for production workflows.
- [CrewAI](https://github.com/joaomdmoura/crewAI) - Role-playing agent orchestration for collaborative agent teams.
- [Google ADK](https://github.com/google/adk-python) - Modular agent dev kit integrating Gemini/Vertex AI.
- [LangGraph](https://github.com/langchain-ai/langgraph) - Enterprise framework for stateful, graph-based agent workflows.
- [Mastra](https://github.com/mastra-ai/mastra) - Opinionated TypeScript framework with RAG and observability.
- [Modus](https://github.com/hypermodeinc/modus) - Serverless framework for high-throughput agent workloads.
- [OpenAI Agents SDK](https://github.com/openai/openai-agents-python) - Lightweight multi-agent SDK with tracing and guardrails.
- [PraisonAI](https://github.com/MervinPraison/PraisonAI) - Production multi-agent framework with self-reflection and MCP integration.
- [Strands Agents SDK](https://github.com/strands-agents/sdk-python) - AWS model-driven agent SDK with Bedrock integration.
- [VoltAgent](https://github.com/voltagent/voltagent) - TypeScript agent framework with built-in observability and a self-improving context engine.

## Coding Agents

- [Aider](https://github.com/Aider-AI/aider) - Terminal-first pair programmer that edits code in local repos and preserves Git history.
- [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) - Mature autonomous agent platform with Forge and public benchmarks.
- [Claude Code](https://github.com/anthropics/claude-code) - Terminal-first agentic coding tool with multi-file edits, test running, and Git operations.
- [MetaGPT](https://github.com/geekan/MetaGPT) - Simulates a full software company workflow from requirements to PRs using role-playing agents.
- [Open Interpreter](https://github.com/KillianLucas/open-interpreter) - Execute code locally via natural-language model instructions.
- [OpenDevin](https://github.com/OpenDevin/OpenDevin) - Autonomous software engineer for multi-step coding tasks and terminal automation.

## Memory and Context

- [Cortex Memory](https://github.com/prem-research/cortex) - Solution for agent memory covering extraction, vector search, and optimization.
- [LlamaIndex](https://github.com/jerryjliu/llama_index) - Data framework for LLM applications with powerful indexing, retrieval, and RAG capabilities.
- [Mem0](https://github.com/mem0ai/mem0) - Memory layer for AI applications with long-term, short-term, and semantic memory extraction.

## Multi-Agent Systems

- [AgentVerse](https://github.com/OpenBMB/AgentVerse) - Framework for custom multi-agent environments to accomplish collaborative tasks.
- [EvoAgentX](https://github.com/EvoAgentX/EvoAgentX) - Evaluates and evolves agentic workflows over time.
- [Hivemoot](https://github.com/hivemoot/hivemoot) - Agent teams that autonomously build software on GitHub.
- [Swarm](https://github.com/openai/swarm) - Lightweight framework for agent handoffs, context variables, and function calling patterns.
- [Swarms Framework](https://github.com/kyegomez/swarms) - Multi-agent orchestration for production use cases with scalability and reliability.

## Agent Tooling and Infrastructure

- [AgentDock](https://github.com/agentdock/agentdock) - Framework for building and deploying production-ready AI agents.
- [E2B](https://github.com/e2b-dev/e2b) - Cloud sandboxes for AI agents to run code securely.
- [Firecrawl](https://github.com/mendableai/firecrawl) - Web scraping API built for LLMs that converts websites to clean markdown.
- [Notte](https://github.com/nottelabs/notte) - Browser automation for production pipelines.
- [Pilot Protocol](https://github.com/TeoSlayer/pilotprotocol) - Networking stack for distributed agent systems with encrypted tunnels.

## Low and No-Code Builders

- [AgentGPT](https://github.com/reworkd/AgentGPT) - Deploy AI agents in the browser with zero local setup.
- [Dify](https://github.com/langgenius/dify) - Open-source LLM app development platform.
- [Langflow](https://github.com/langflow-ai/langflow) - Visual drag-and-drop builder for LLM workflows and RAG agents.
- [Wordware](https://wordware.ai) - Web-hosted IDE where domain experts collaborate with AI engineers.

## Voice and Multimodal Agents

- [Agentset](https://github.com/agentset-ai/agentset) - Production RAG platform with reasoning, hybrid search, and multimodal support.
- [Pipecat](https://github.com/pipecat-ai/pipecat) - Framework for voice and multimodal conversational AI.

## Safety Guardrails and Observability

- [Agent OS](https://github.com/buildermethods/agent-os) - Kernel architecture for governing autonomous AI agents.
- [AgentGuard](https://github.com/cyberark/agent-guard) - Runtime observability and guardrails for AI agents with loop detection.
- [APort Agent Guardrails](https://github.com/aporthq/aport-agent-guardrails) - Pre-action authorization plugin for agent frameworks.
- [Orchard Kit](https://github.com/OrchardHarmonics/orchard-kit) - Modules for agent runtime security, self-audit, and collective cognition.

## Learning Resources

- [AI Agents in LangGraph — DeepLearning.ai](https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/) - Short course on building production agents with LangGraph.
- [AgentBench: Evaluating LLMs as Agents](https://arxiv.org/abs/2309.07864) - Benchmark for evaluating LLMs as agents across diverse environments.
- [Building Effective Agents — Anthropic](https://www.anthropic.com/research/building-effective-agents) - Anthropic guide on agent design patterns and evaluation strategies.
- [LLM Powered Autonomous Agents — Lilian Weng](https://lilianweng.github.io/posts/2023-06-23-agent/) - Breakdown of LLM-powered agent components: planning, memory, and tool use.
- [Prompt Engineering Guide](https://github.com/dair-ai/Prompt-Engineering-Guide) - Community-maintained guide covering prompt engineering and agent strategies.
- [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629) - The foundational paper behind the ReAct prompting pattern.

## Changelog

- March 2026 - Initial release with 80+ tools across 9 categories.
