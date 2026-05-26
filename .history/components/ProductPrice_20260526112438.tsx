import { formatCurrency } from '@/lib/utils';

interface ProductPriceProps {
  price: number;
  originalPrice: number;
  discount: number;
}

export function ProductPrice({ price, originalPrice, discount }: ProductPriceProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-3">
        <span className="text-xl font-semibold text-brand">{formatCurrency(price)}</span>
        <span className="text-sm text-slate-500 line-through">{formatCurrency(originalPrice)}</span>
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">-{discount}%</p>
    </div>
  );
}
