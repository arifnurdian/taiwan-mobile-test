import { Badge } from '@/components/ui/badge';

interface ProductBadgeProps {
  label: string;
  variant?: 'success' | 'danger' | 'neutral';
}

export function ProductBadge({ label, variant = 'neutral' }: ProductBadgeProps) {
  const colorMap = {
    success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    danger: 'bg-rose-100 text-rose-700 border-rose-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  } as const;

  return <Badge className={colorMap[variant]}>{label}</Badge>;
}
