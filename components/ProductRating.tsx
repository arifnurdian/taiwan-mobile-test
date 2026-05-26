import { LucideStar } from 'lucide-react';

interface ProductRatingProps {
  rating: number;
  sold: number;
}

export function ProductRating({ rating, sold }: ProductRatingProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1">
        <LucideStar className="h-3.5 w-3.5 text-amber-500" />
        <strong className="text-slate-900">{rating.toFixed(1)}</strong>
      </span>
      <span className="hidden sm:inline">·</span>
      <span>{sold} terjual</span>
    </div>
  );
}
