export type TierLevel = 'production' | 'growing' | 'emerging';
export type TierBadge = '🚀' | '🌱' | '🔬';

export interface Resource {
  id: string;
  slug: string;
  name: string;
  url: string;
  category: string;
  categorySlug: string;
  tier: TierLevel;
  tierBadge: TierBadge;
  language: string;
  tags: string[];
  description: string;
  isGitHub: boolean;
  githubRepo: string | null;
  source: string;
  sourceLine: number;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
  description?: string;
}

export interface ResourceDataset {
  generatedAt: string;
  source: string;
  totalResources: number;
  resources: Resource[];
}

export interface CategoryDataset {
  generatedAt: string;
  source: string;
  totalCategories: number;
  categories: Category[];
}
