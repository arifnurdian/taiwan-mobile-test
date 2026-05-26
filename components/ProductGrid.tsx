import { Product } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (id: number) => void;
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
