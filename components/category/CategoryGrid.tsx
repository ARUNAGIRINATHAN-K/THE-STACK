import { Category } from '@/types/resource';
import { CategoryCard } from './CategoryCard';

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {categories.map((cat) => (
        <CategoryCard key={cat.slug} category={cat} />
      ))}
    </div>
  );
}
