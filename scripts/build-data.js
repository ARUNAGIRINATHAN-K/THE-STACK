const fs = require('fs');
const path = require('path');

const README_PATH = path.join(__dirname, '..', 'README.md');
const OUT_RESOURCES_PATH = path.join(__dirname, '..', 'data', 'resources.json');
const OUT_CATEGORIES_PATH = path.join(__dirname, '..', 'data', 'categories.json');

const IGNORED_SECTIONS = new Set(['Contents', 'Changelog', 'Star History', 'License']);

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseGitHubRepo(urlStr) {
  try {
    const url = new URL(urlStr);
    if (url.hostname.includes('github.com')) {
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts.length >= 2) {
        return `${parts[0]}/${parts[1].replace(/\.git$/, '')}`;
      }
    }
  } catch (e) {
    // Ignore invalid URLs here
  }
  return null;
}

function buildData() {
  console.log('===================================================');
  console.log('🤖 AWESOME AI AGENTS REGISTRY DATA BUILDER');
  console.log('===================================================');

  if (!fs.existsSync(README_PATH)) {
    console.error(`❌ Error: README.md not found at ${README_PATH}`);
    process.exit(1);
  }

  const content = fs.readFileSync(README_PATH, 'utf-8');
  const lines = content.split(/\r?\n/);

  let currentCategory = null;
  let currentCategorySlug = null;

  const categoriesMap = new Map();
  const resources = [];

  const seenIDs = new Map(); // id -> resource object
  const seenURLs = new Map(); // url -> lineNumber

  let warningsCount = 0;
  let errorsCount = 0;
  let disambiguatedCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNumber = i + 1;
    const trimmed = line.trim();

    // Stage 1: Check for Section Heading (## Heading Name)
    if (trimmed.startsWith('## ')) {
      const categoryName = trimmed.replace(/^##\s+/, '').trim();
      if (IGNORED_SECTIONS.has(categoryName)) {
        currentCategory = null;
        currentCategorySlug = null;
        continue;
      }
      currentCategory = categoryName;
      currentCategorySlug = slugify(categoryName);

      if (!categoriesMap.has(currentCategorySlug)) {
        categoriesMap.set(currentCategorySlug, {
          name: currentCategory,
          slug: currentCategorySlug,
          count: 0,
        });
      }
      continue;
    }

    // Skip lines if not currently inside a category
    if (!currentCategory) {
      continue;
    }

    // Stage 2: Check for list item line starting with '-'
    if (!trimmed.startsWith('- ')) {
      continue;
    }

    // Stage 3: Extract markdown link [- [Name](URL)]
    const linkMatch = trimmed.match(/^- \[(?<name>[^\]]+)\]\((?<url>[^\)]+)\)/);
    if (!linkMatch) {
      continue;
    }

    const name = linkMatch.groups.name.trim();
    const url = linkMatch.groups.url.trim();

    // Stage 4: Extract Tier Badge
    let tierBadge = null;
    let tier = 'growing';

    if (trimmed.includes('`🚀`')) {
      tierBadge = '🚀';
      tier = 'production';
    } else if (trimmed.includes('`🌱`')) {
      tierBadge = '🌱';
      tier = 'growing';
    } else if (trimmed.includes('`🔬`')) {
      tierBadge = '🔬';
      tier = 'emerging';
    } else {
      warningsCount++;
      console.warn(`⚠️ Warning (Line ${lineNumber}): Missing tier badge for "${name}". Defaulting to 🌱 (growing).`);
      tierBadge = '🌱';
      tier = 'growing';
    }

    // Stage 5: Extract Bracketed Tags `[Tag]`
    const tagMatches = [...trimmed.matchAll(/`\[([^\]]+)\]`/g)];
    const tags = tagMatches.map((m) => m[1].trim());

    const KNOWN_LANGUAGES = new Set([
      'Python', 'TypeScript', 'JavaScript', 'Go', 'Rust', 'Java', 'C#', 'C++',
      'Kotlin', 'Swift', 'Ruby', 'WebAssembly', 'Cloud', 'Browser', 'Desktop', 'Mobile', 'No-Code'
    ]);

    let language = tags.find((t) => KNOWN_LANGUAGES.has(t)) || (tags.length > 0 ? tags[0] : 'Multi-Language');

    // Stage 6: Extract Description
    let description = '';
    const lastDashIdx = trimmed.lastIndexOf(' - ');
    if (lastDashIdx !== -1) {
      description = trimmed.substring(lastDashIdx + 3).trim();
    } else {
      const parts = trimmed.split(/`\s*-\s*/);
      if (parts.length > 1) {
        description = parts[parts.length - 1].trim();
      }
    }

    if (description && !description.endsWith('.')) {
      description += '.';
    }

    const githubRepo = parseGitHubRepo(url);
    const isGitHub = Boolean(githubRepo);

    // Initial ID & Slug
    let baseSlug = slugify(name);
    let id = baseSlug;
    let slug = id;

    // Disambiguation / Deduplication Strategy
    if (seenIDs.has(id)) {
      const existing = seenIDs.get(id);
      
      // Determine disambiguator
      let disambiguator = '';
      if (githubRepo && (!existing.githubRepo || existing.githubRepo !== githubRepo)) {
        const owner = githubRepo.split('/')[0].toLowerCase();
        disambiguator = owner;
      } else {
        disambiguator = currentCategorySlug;
      }

      slug = `${baseSlug}-${disambiguator}`;
      id = slug;
      disambiguatedCount++;
      console.log(`ℹ️ Auto-disambiguated slug collision for "${name}" on line ${lineNumber} -> "${slug}"`);
    }

    // Double check that the disambiguated ID is unique
    if (seenIDs.has(id)) {
      errorsCount++;
      console.error(`❌ Fatal: Unresolvable duplicate ID "${id}" on line ${lineNumber}.`);
    } else {
      seenIDs.set(id, { name, url, line: lineNumber, githubRepo });
    }

    if (seenURLs.has(url)) {
      warningsCount++;
      console.warn(`⚠️ Warning: Duplicate URL "${url}" on line ${lineNumber} (First seen on line ${seenURLs.get(url)})`);
    } else {
      seenURLs.set(url, lineNumber);
    }

    const resource = {
      id,
      slug,
      name,
      url,
      category: currentCategory,
      categorySlug: currentCategorySlug,
      tier,
      tierBadge,
      language,
      tags,
      description,
      isGitHub,
      githubRepo,
      source: 'README.md',
      sourceLine: lineNumber,
    };

    resources.push(resource);

    const catObj = categoriesMap.get(currentCategorySlug);
    if (catObj) {
      catObj.count += 1;
    }
  }

  if (errorsCount > 0) {
    console.error(`\n💥 Build Failed: ${errorsCount} critical data error(s) found.`);
    process.exit(1);
  }

  const categories = Array.from(categoriesMap.values()).filter((c) => c.count > 0);

  const timestamp = new Date().toISOString();

  const resourceDataset = {
    generatedAt: timestamp,
    source: 'README.md',
    totalResources: resources.length,
    resources,
  };

  const categoryDataset = {
    generatedAt: timestamp,
    source: 'README.md',
    totalCategories: categories.length,
    categories,
  };

  const dataDir = path.dirname(OUT_RESOURCES_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(OUT_RESOURCES_PATH, JSON.stringify(resourceDataset, null, 2), 'utf-8');
  fs.writeFileSync(OUT_CATEGORIES_PATH, JSON.stringify(categoryDataset, null, 2), 'utf-8');

  const prodCount = resources.filter((r) => r.tier === 'production').length;
  const growCount = resources.filter((r) => r.tier === 'growing').length;
  const emergCount = resources.filter((r) => r.tier === 'emerging').length;
  const ghCount = resources.filter((r) => r.isGitHub).length;
  const extCount = resources.length - ghCount;

  console.log(`Source File:         README.md`);
  console.log(`Categories Processed: ${categories.length}`);
  console.log(`Resources Extracted:  ${resources.length}`);
  console.log(``);
  console.log(`Tier Breakdown:`);
  console.log(`  🚀 Production:      ${prodCount}`);
  console.log(`  🌱 Growing:         ${growCount}`);
  console.log(`  🔬 Emerging:        ${emergCount}`);
  console.log(``);
  console.log(`Platform Breakdown:`);
  console.log(`  GitHub Repos:      ${ghCount}`);
  console.log(`  External Sites:    ${extCount}`);
  console.log(``);
  console.log(`Validation Results:`);
  console.log(`  ✓ Disambiguated:   ${disambiguatedCount} collisions resolved`);
  console.log(`  ✓ Duplicate IDs:   0`);
  console.log(`  ✓ Warnings:        ${warningsCount}`);
  console.log(`  ✓ Errors:          ${errorsCount}`);
  console.log(``);
  console.log(`Output Artifacts:`);
  console.log(`  ✓ ${path.relative(process.cwd(), OUT_RESOURCES_PATH)}`);
  console.log(`  ✓ ${path.relative(process.cwd(), OUT_CATEGORIES_PATH)}`);
  console.log('===================================================');
}

buildData();
