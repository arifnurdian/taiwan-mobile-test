'use client';

import { useMemo, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { PromoBanner } from '@/components/PromoBanner';
import { CategoryList } from '@/components/CategoryList';
import { ProductGrid } from '@/components/ProductGrid';
import { PaginationSection } from '@/components/PaginationSection';
import { Footer } from '@/components/Footer';
import { categories } from '@/data/categories';
import { products as allProducts } from '@/data/products';
import { Button } from '@/components/ui/button';

const PRODUCTS_PER_PAGE = 6;

export default function HomePage() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [cartCount, setCartCount] = useState(0);
  const [page, setPage] = useState(1);

  const filteredProducts = useMemo(() => {
    const lowerSearch = searchValue.toLowerCase();
    const base = selectedCategory === 'Semua'
      ? allProducts
      : allProducts.filter((item) => item.category === selectedCategory);

    return base.filter((product) =>
      product.name.toLowerCase().includes(lowerSearch) ||
      product.category.toLowerCase().includes(lowerSearch),
    );
  }, [searchValue, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageProducts = filteredProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

  const handleAddToCart = (productId: number) => setCartCount((current) => current + 1);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar searchValue={searchValue} onSearchChange={(value) => { setSearchValue(value); setPage(1); }} cartCount={cartCount} />
      <main className="container py-8">
        <div className="space-y-10">
          <HeroBanner />
          <section className="grid gap-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-brand">Koleksi Terkini</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-950">Telusuri produk dengan cepat</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  className={`rounded-full border px-4 py-2 text-sm font-semibold ${selectedCategory === 'Semua' ? 'border-brand bg-brand text-white' : 'border-slate-200 bg-white text-slate-900'}`}
                  onClick={() => { setSelectedCategory('Semua'); setPage(1); }}
                >
                  Semua
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold ${selectedCategory === category.name ? 'border-brand bg-brand text-white' : 'border-slate-200 bg-white text-slate-900'}`}
                    onClick={() => { setSelectedCategory(category.name); setPage(1); }}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            <PromoBanner />
          </section>
          <section className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-brand">Kategori Pilihan</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-950">Temukan barang favorit</h2>
              </div>
              <p className="text-sm text-slate-600">Menampilkan {filteredProducts.length} produk untuk {selectedCategory.toLowerCase()}.</p>
            </div>
            <CategoryList />
          </section>
          <section className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-brand">Katalog Produk</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-950">Pilihan terbaik untuk Anda</h2>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <span>{filteredProducts.length} hasil</span>
                <span className="hidden sm:inline">·</span>
                <span>{currentPage} / {totalPages}</span>
              </div>
            </div>
            <ProductGrid products={pageProducts} onAddToCart={handleAddToCart} />
            <PaginationSection page={currentPage} totalPages={totalPages} onChange={setPage} />
          </section>
          <Footer />
        </div>
      </main>
    </div>
  );
}
