import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { promotions } from '@/data/promotions';

export function PromoBanner() {
  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {promotions.map((promo) => (
        <Card key={promo.id} className="border-slate-200/80 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{promo.badge}</p>
              <h3 className="mt-4 text-xl font-semibold text-slate-950">{promo.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{promo.description}</p>
            </div>
            <Badge className="bg-brand text-white border-transparent">Promo</Badge>
          </div>
        </Card>
      ))}
    </section>
  );
}
