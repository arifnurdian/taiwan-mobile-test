import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-brand">Toko Kami</p>
          <h3 className="mt-4 text-2xl font-semibold text-slate-950">Belanja nyaman setiap hari.</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Nikmati katalog lengkap dengan fitur pencarian, badge promo, dan rekomendasi yang mudah dijelajahi.
          </p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Layanan</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Bantuan Pelanggan</li>
            <li>Pengembalian & Refund</li>
            <li>Pengiriman Aman</li>
          </ul>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Alamat</p>
          <p className="mt-4 text-sm leading-7 text-slate-600">Jl. Digital Commerce No. 12, Jakarta</p>
          <p className="mt-3 text-sm text-slate-600">support@tokoonline.id</p>
        </div>
      </div>
      <Separator className="my-8" />
      <p className="text-center text-sm text-slate-500">© 2026 Toko Online. Semua hak cipta dilindungi.</p>
    </footer>
  );
}
