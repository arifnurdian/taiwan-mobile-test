import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Product } from '@/data/products';
import { ProductBadge } from '@/components/ProductBadge';
import { ProductPrice } from '@/components/ProductPrice';
import { ProductRating } from '@/components/ProductRating';
import { LucideHeart, LucideShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const isOutOfStock = product.stock === 0;

  return (
    <Card className="group overflow-hidden p-4 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-950">
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          {product.isNew && <ProductBadge label="Baru" variant="success" />}
          {product.isPopular && <ProductBadge label="Populer" variant="danger" />}
        </div>
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 text-white">
            <span className="rounded-full bg-rose-600/95 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em]">
              Stok Habis
            </span>
          </div>
        )}
      </div>
      <div className="mt-5 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{product.category}</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-950">{product.name}</h3>
          </div>
          <button className="rounded-full border border-slate-200 bg-white p-3 text-slate-700 transition hover:border-brand hover:text-brand">
            <LucideHeart className="h-4 w-4" />
          </button>
        </div>
        <ProductRating rating={product.rating} sold={product.sold} />
        <ProductPrice price={product.price} originalPrice={product.originalPrice} discount={product.discount} />
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            {product.stock > 0 ? `${product.stock} tersedia` : 'Kosong'}
          </span>
          <Button
            disabled={isOutOfStock}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-white hover:bg-brand-dark disabled:bg-slate-300 disabled:text-slate-600"
            onClick={() => onAddToCart(product.id)}
          >
            <LucideShoppingCart className="h-4 w-4" />
            Tambah
          </Button>
        </div>
      </div>
    </Card>
  );
}
