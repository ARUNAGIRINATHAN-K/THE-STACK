# Development Guide — AI Agent Registry 2026

This guide provides instructions for local environment setup, data dataset compilation, testing, code guidelines, and deployment.

---

## 1. Prerequisites

Ensure your development environment meets the following requirements:

- **Node.js**: `v18.17.0` or higher (Node.js 20+ recommended)
- **npm**: `v9.0.0` or higher
- **Git**: `v2.30.0` or higher
- **Docker & Docker Compose** (Optional, for containerized local testing)

---

## 2. Getting Started

### Clone the Repository
```bash
git clone https://github.com/ARUNAGIRINATHAN-K/awesome-ai-agents.git
cd awesome-ai-agents
```

### Install Dependencies
```bash
npm install
```

### Build the Dataset
Before starting the development server or building the web application, compile `README.md` into static JSON datasets:
```bash
npm run build:data
```
*Output*: Generates `data/resources.json` (460+ tools) and `data/categories.json` (31 domains).

### Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the interactive registry.

---

## 3. Available npm Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `next dev` | Starts local Next.js development server on port 3000 |
| `build:data` | `node scripts/build-data.js` | Parses `README.md` and generates static JSON files in `data/` |
| `build` | `node scripts/build-data.js && next build` | Compiles dataset and runs production Next.js build |
| `start` | `next start` | Starts Next.js production server post-build |
| `lint` | `next lint` | Runs Next.js ESLint checks |

---

## 4. Development Workflow

### Adding or Updating a Resource Entry

1. Open [`README.md`](README.md).
2. Locate the appropriate category section header (e.g., `## Coding Agents`).
3. Insert or modify the single-line Markdown entry in alphabetical order:
   ```markdown
   - [Tool Name](https://github.com/org/repo) `🚀` `[Python]` `[Multi-Agent]` - Clear single sentence description.
   ```
4. Rebuild the dataset:
   ```bash
   npm run build:data
   ```
5. Verify your changes in the local web app at `http://localhost:3000/explore`.

---

## 5. Verification & Linting

Before opening a Pull Request, run the following quality checks:

### 1. Validate Dataset Parser & Build
```bash
npm run build
```

### 2. Run `awesome-lint`
Validates Markdown structure, link syntax, formatting, and alphabetical sorting:
```bash
npx awesome-lint
```

### 3. Check Spelling
```bash
codespell -q 3 --skip=.git,node_modules,.next --check-filenames --ignore-words-list="reworkd,EHR" .
```

---

## 6. Deployment Options

### Option A: Vercel + GitHub Integration (Recommended)

The project is pre-configured for instant automated deployments via **Vercel + GitHub Integration**:

1. **Import Repository**: Log in to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New** → **Project**.
2. **Select GitHub Repo**: Choose `ARUNAGIRINATHAN-K/awesome-ai-agents`.
3. **Configure Settings**:
   - **Framework Preset**: `Next.js`
   - **Build Command**: `npm run build` *(runs `node scripts/build-data.js && next build` automatically)*
   - **Output Directory**: `.next`
4. **Deploy**: Click **Deploy**. Vercel will build the project and issue a live URL (e.g. `https://awesome-ai-agents.vercel.app`).

> [!NOTE]
> **Continuous Delivery**: Any future `git push` to `main` or merged Pull Request automatically triggers Vercel to rebuild the dataset from `README.md` and deploy the updated application globally. Every Pull Request gets an isolated preview environment.

### Option B: Docker Setup & Deployment

#### Build and Run with Docker Compose
```bash
docker compose up --build
```

#### Build Docker Image Manually
```bash
docker build -t ai-agent-registry .
docker run -p 3000:3000 ai-agent-registry
```

---

## 7. Strict Minimal Design System Guidelines

When contributing UI features to the web application:

- **Monospace Focus**: Use monospace typography (`font-mono`) for titles, tags, counters, and metadata badges.
- **Subtle Borders & Cards**: Use 1px subtle borders (`border-border`) and cards (`bg-card`).
- **No Unnecessary Clutter**: Avoid heavy shadows, background gradients, promotional copy, or decorative non-functional graphics.
- **Information Density**: Keep layout dense, fast, and developer-oriented (GitHub + npm + modern docs aesthetic).
- **Theme Support**: Ensure all new components support dark and light modes via CSS variable tokens (`bg-background`, `text-foreground`, `border-border`).
