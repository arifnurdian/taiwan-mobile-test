import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: string;
}

export function CategoryCard({ title, description, icon }: CategoryCardProps) {
  return (
    <Card className="overflow-hidden border-slate-200/80 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-muted text-2xl">
            {icon}
          </div>
        </div>
        <Badge className="bg-white text-slate-950 shadow-sm border-slate-200">Kategori</Badge>
      </div>
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-slate-950">{title}</h4>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </Card>
  );
}
