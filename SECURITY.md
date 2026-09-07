# Security Policy

Security is a high priority for **Awesome AI Agents**. Because AI agent frameworks and coding assistants often execute code locally, manage API keys, and perform autonomous system operations, ensuring the safety and integrity of tools curated in this list is essential for the community.

This policy covers:
1. **Reporting vulnerabilities in this repository**
2. **Flagging malicious, compromised, or high-risk listed tools**
3. **Our response and removal procedures**

---

## 1. Flagging Malicious or Compromised Tools

If you discover that a tool or resource listed in this repository:
- Contains **malware**, **backdoors**, or **credential stealers**
- Has been subject to a **supply chain attack** or **repository hijacking**
- Points to a **domain or repository that has been transferred, expired, or compromised**
- Engages in **typosquatting** or misleads users to unsafe packages
- Violates basic privacy standards by exfiltrating telemetry or tokens without consent

### How to Flag an Unsafe Tool

- **Urgent / Malicious Tool Flags**: Create an issue on GitHub using the `[SECURITY]` prefix in the title, use [GitHub Private Vulnerability Reporting](https://github.com/ARUNAGIRINATHAN-K/awesome-ai-agents-2026/security/advisories/new), or open a issue requesting removal.
- Please include:
  - **Tool Name & URL** as listed in `README.md`
  - **Type of threat / concern** (e.g., malicious release version, hijacked domain, credential leak)
  - **Evidence or reference** (e.g., CVE link, security advisory, analysis report)

> [!IMPORTANT]
> **Immediate Action**: Reports of verified malware, hijacked repos, or active supply-chain compromises result in immediate removal of the tool link from `README.md` while further investigation takes place.

---

## 2. Reporting Vulnerabilities in This Repository

If you find a security vulnerability within the repository infrastructure itself (such as GitHub Actions workflows, link-check scripts, or automated build pipelines):

1. **Do NOT open a public GitHub issue.**
2. Report the vulnerability privately via [GitHub Security Advisories](https://github.com/ARUNAGIRINATHAN-K/awesome-ai-agents-2026/security/advisories/new).
3. Provide sufficient detail to help us reproduce and address the issue promptly.

---

## 3. Vulnerabilities in Listed Third-Party Tools

This repository is a curated collection of third-party open-source projects, frameworks, and commercial services.

- **Upstream Vulnerabilities**: Standard security flaws in third-party software should be reported directly to the **upstream project maintainers** following their respective security policies.
- **When to Inform Us**: If an upstream vulnerability is unpatched, actively exploited, or poses a severe risk to users running the tool, please inform us so we can temporarily mark the entry with a warning badge or remove it until resolved.

---

## 4. Response Timeline & Triage

| Priority | Issue Type | Initial Response | Resolution Target |
|---|---|---|---|
| 🚨 **Critical** | Malware / Supply-chain attack / Hijacked URL | < 12 hours | Immediate removal (< 24h) |
| ⚠️ **High** | Unpatched critical CVE in listed tool / Suspicious package | < 24 hours | 48 hours |
| ℹ️ **Medium** | Repository security workflow / Script flaw | < 48 hours | 7 days |

---

## 5. Web Application & Frontend Security

The AI Agent Registry web app is designed for secure, offline-capable static deployment:

- **Static Data Compilation**: The application queries local JSON datasets (`data/resources.json`, `data/categories.json`) compiled at build time by `scripts/build-data.js`. No remote API data fetching or dynamic script execution occurs at runtime.
- **External Link Security**: All external resource links in UI cards and detail views strictly enforce `target="_blank" rel="noopener noreferrer"` to mitigate cross-site tabnabbing risks.
- **Client-Side Query Safety**: Search input and URL query parameters are processed purely in client-side memory without dynamic string evaluation or remote SQL injection vectors.

---

## 6. Security Best Practices for Users

When installing and running AI agent tools:
- **Inspect Code Before Running**: AI agents frequently run shell commands or execute generated code. Run untrusted agents inside isolated sandboxes, containers (Docker, Devcontainers), or VM environments.
- **Protect Secrets**: Never hardcode API keys in repositories. Use scoped environment variables and secret managers.
- **Verify Sources**: Ensure you download packages from official, verified package repositories and check release signatures where available.

---

*Thank you for helping keep the AI agent community safe.*
