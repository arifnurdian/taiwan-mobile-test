import { Button } from '@/components/ui/button';

export function HeroBanner() {
  return (
    <section className="grid gap-8 rounded-[2rem] bg-[#fff6f6] p-8 md:grid-cols-[1.3fr_1fr] md:items-center md:p-12">
      <div className="max-w-xl">
        <span className="inline-flex rounded-full bg-brand-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          Pilih produk terbaik
        </span>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Temukan koleksi produk premium untuk keseharian Anda.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
          Semua kebutuhan belanja dari elektronik sampai gaya hidup tersedia di satu halaman katalog yang cepat dan responsif.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button className="bg-brand text-white hover:bg-brand-dark">Mulai Belanja</Button>
          <Button className="border border-slate-200 bg-white text-slate-900 hover:bg-slate-100">Lihat Promo</Button>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-950 p-6 text-white shadow-soft">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_38%)]" />
        <div className="relative flex h-full flex-col justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-brand-muted">Flash sale</p>
            <h2 className="mt-4 text-3xl font-semibold">Potongan ekstra hingga 30%</h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-slate-300">
              Tambahkan produk terlaris ke keranjang dan nikmati harga spesial hari ini.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">Terjual</p>
              <p className="mt-3 text-3xl font-semibold">520+</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">Rating</p>
              <p className="mt-3 text-3xl font-semibold">4.8/5</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
