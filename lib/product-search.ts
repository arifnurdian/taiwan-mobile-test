import { type Product } from '@/data/products';

export function searchProducts(products: Product[], query: string): Product[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return products;
  }

  return products.filter((product) => {
    const name = product.name.toLowerCase();
    const category = product.category.toLowerCase();
    return name.includes(normalizedQuery) || category.includes(normalizedQuery);
  });
}
