import { Button } from '@/components/ui/button';

interface PaginationSectionProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function PaginationSection({ page, totalPages, onChange }: PaginationSectionProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:justify-end">
      <Button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1} className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">
        Sebelumnya
      </Button>
      <span className="text-sm text-slate-600">Halaman {page} dari {totalPages}</span>
      <Button onClick={() => onChange(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="rounded-full bg-brand text-white hover:bg-brand-dark">
        Berikutnya
      </Button>
    </div>
  );
}
