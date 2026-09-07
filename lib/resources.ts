import { Resource, Category, ResourceDataset, CategoryDataset, TierLevel } from '@/types/resource';
import rawResourcesData from '@/data/resources.json';
import rawCategoriesData from '@/data/categories.json';

export type { FilterOptions } from './search';
export { searchAndFilterResources, filterResources, searchResources, sortResources } from './search';

const resourceDataset = rawResourcesData as ResourceDataset;
const categoryDataset = rawCategoriesData as CategoryDataset;

export function getResources(): Resource[] {
  return resourceDataset.resources || [];
}

export function getCategories(): Category[] {
  return categoryDataset.categories || [];
}

export const getAllResources = getResources;
export const getAllCategories = getCategories;

export function getResourceBySlug(slug: string): Resource | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();
  return getResources().find(
    (r) => r.slug.toLowerCase() === normalized || r.id.toLowerCase() === normalized
  );
}

export function getCategoryBySlug(slug: string): Category | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();
  return getCategories().find((c) => c.slug.toLowerCase() === normalized);
}

export function getResourcesByCategory(categorySlug: string): Resource[] {
  if (!categorySlug) return [];
  const normalized = categorySlug.toLowerCase().trim();
  return getResources().filter((r) => r.categorySlug.toLowerCase() === normalized);
}

export function getRelatedResources(currentResource: Resource, limit: number = 3): Resource[] {
  const sameCategory = getResourcesByCategory(currentResource.categorySlug).filter(
    (r) => r.id !== currentResource.id
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const otherResources = getResources().filter(
    (r) => r.id !== currentResource.id && r.categorySlug !== currentResource.categorySlug
  );

  const sharedTagResources = otherResources.filter((r) =>
    r.tags.some((t) => currentResource.tags.includes(t))
  );

  const combined = [...sameCategory, ...sharedTagResources];
  return combined.slice(0, limit);
}

export function getStats() {
  const resources = getResources();
  const categories = getCategories();

  const productionCount = resources.filter((r) => r.tier === 'production').length;
  const growingCount = resources.filter((r) => r.tier === 'growing').length;
  const emergingCount = resources.filter((r) => r.tier === 'emerging').length;
  const githubCount = resources.filter((r) => r.isGitHub).length;

  return {
    totalResources: resources.length,
    totalCategories: categories.length,
    productionCount,
    growingCount,
    emergingCount,
    githubCount,
    externalCount: resources.length - githubCount,
  };
}

export function getUniqueLanguages(): string[] {
  const set = new Set<string>();
  getResources().forEach((r) => {
    if (r.language) set.add(r.language);
  });
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function getUniqueTags(): string[] {
  const set = new Set<string>();
  getResources().forEach((r) => {
    if (Array.isArray(r.tags)) {
      r.tags.forEach((t) => set.add(t));
    }
  });
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export const getAllLanguages = getUniqueLanguages;
