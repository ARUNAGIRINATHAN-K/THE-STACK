import { Resource, TierLevel } from '@/types/resource';
import { getResources } from './resources';

export interface FilterOptions {
  query?: string;
  searchQuery?: string;
  category?: string;
  categorySlug?: string;
  tier?: TierLevel | 'all';
  language?: string | 'all';
  tag?: string | 'all';
  platform?: 'github' | 'external' | 'all';
  sortBy?: 'name' | 'category' | 'tier' | 'line' | string;
  limit?: number;
}

export function searchResources(resources: Resource[], query: string): Resource[] {
  if (!query || query.trim() === '') return resources;
  const q = query.toLowerCase().trim();

  return resources.filter((r) => {
    const matchName = r.name.toLowerCase().includes(q);
    const matchDesc = r.description.toLowerCase().includes(q);
    const matchCategory = r.category.toLowerCase().includes(q);
    const matchTags = r.tags.some((t) => t.toLowerCase().includes(q));
    const matchRepo = r.githubRepo ? r.githubRepo.toLowerCase().includes(q) : false;
    const matchLang = r.language.toLowerCase().includes(q);
    return matchName || matchDesc || matchCategory || matchTags || matchRepo || matchLang;
  });
}

export function filterResources(resources: Resource[], filters: FilterOptions = {}): Resource[] {
  let result = [...resources];

  // Text search
  const q = filters.query || filters.searchQuery;
  if (q && q.trim() !== '') {
    result = searchResources(result, q);
  }

  // Category filter
  const cat = filters.category || filters.categorySlug;
  if (cat && cat !== 'all') {
    result = result.filter(
      (r) => r.categorySlug.toLowerCase() === cat.toLowerCase()
    );
  }

  // Tier filter
  if (filters.tier && filters.tier !== 'all') {
    result = result.filter((r) => r.tier === filters.tier);
  }

  // Language filter
  if (filters.language && filters.language !== 'all') {
    result = result.filter(
      (r) => r.language.toLowerCase() === filters.language!.toLowerCase()
    );
  }

  // Tag filter
  if (filters.tag && filters.tag !== 'all') {
    result = result.filter((r) =>
      r.tags.some((t) => t.toLowerCase() === filters.tag!.toLowerCase())
    );
  }

  // Platform filter
  if (filters.platform && filters.platform !== 'all') {
    if (filters.platform === 'github') {
      result = result.filter((r) => r.isGitHub);
    } else if (filters.platform === 'external') {
      result = result.filter((r) => !r.isGitHub);
    }
  }

  // Sorting
  const sortBy = filters.sortBy || 'name';
  result = sortResources(result, sortBy);

  if (filters.limit && filters.limit > 0) {
    return result.slice(0, filters.limit);
  }

  return result;
}

export function searchAndFilterResources(filters: FilterOptions = {}): Resource[] {
  return filterResources(getResources(), filters);
}

export function sortResources(resources: Resource[], sortBy: string): Resource[] {
  const list = [...resources];

  if (sortBy === 'name' || sortBy === 'name-asc') {
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortBy === 'name-desc') {
    return list.sort((a, b) => b.name.localeCompare(a.name));
  }
  if (sortBy === 'category') {
    return list.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  }
  if (sortBy === 'tier' || sortBy === 'tier-desc') {
    const weights: Record<TierLevel, number> = { production: 3, growing: 2, emerging: 1 };
    return list.sort((a, b) => weights[b.tier] - weights[a.tier] || a.name.localeCompare(b.name));
  }
  if (sortBy === 'line' || sortBy === 'line-asc') {
    return list.sort((a, b) => a.sourceLine - b.sourceLine);
  }

  return list;
}
