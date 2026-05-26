import { categories } from '@/data/categories';
import { CategoryCard } from '@/components/CategoryCard';

export function CategoryList() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          title={category.name}
          description={category.description}
          icon={category.icon}
        />
      ))}
    </section>
  );
}
