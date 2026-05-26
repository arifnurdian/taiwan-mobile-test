'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { PromoBanner } from '@/components/PromoBanner';
import { CategoryList } from '@/components/CategoryList';
import { CheckoutDialog } from '@/components/CheckoutDialog';
import { RemoveCartItemDialog } from '@/components/RemoveCartItemDialog';
import { ProductGrid } from '@/components/ProductGrid';
import { PaginationSection } from '@/components/PaginationSection';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/types/cart';
import { categories } from '@/data/categories';
import { products as allProducts } from '@/data/products';
import { formatCurrency } from '@/lib/utils';
import {
  showAddToCartNotification,
  showCartErrorNotification,
  showCartUpdatedNotification,
} from '@/lib/cart-notification';

const PRODUCTS_PER_PAGE = 6;

export default function HomePage() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const { cart, addItem, removeItem, setCart, getTotalQuantity } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [selectedRemoveItem, setSelectedRemoveItem] = useState<CartItem | null>(null);
  const [page, setPage] = useState(1);

  const cartCount = getTotalQuantity();

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

  const router = useRouter();

  const handleAddToCart = async (productId: number) => {
    const product = allProducts.find((item) => item.id === productId);
    if (!product) {
      showCartErrorNotification(() => router.push('/cart'));
      return;
    }

    try {
      const existingItem = cart.find((item) => item.id === productId);
      addItem(product);

      if (existingItem) {
        showCartUpdatedNotification(product, () => router.push('/cart'));
      } else {
        showAddToCartNotification(product, () => router.push('/cart'));
      }
    } catch (error) {
      showCartErrorNotification(() => router.push('/cart'));
    }
  };

  const handleCheckout = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setCart([]);
    setIsCheckoutOpen(false);
  };

  const handleRemoveItem = async (itemId: number) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    removeItem(itemId);
    setSelectedRemoveItem(null);
    setRemoveDialogOpen(false);
  };

  const openRemoveDialog = (item: CartItem) => {
    setSelectedRemoveItem(item);
    setRemoveDialogOpen(true);
  };

  const closeRemoveDialog = (open: boolean) => {
    if (!open) {
      setSelectedRemoveItem(null);
    }
    setRemoveDialogOpen(open);
  };

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
          <section className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-brand">Shopping Cart</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-950">Review pembelian Anda</h2>
              </div>
              <Button
                className="rounded-full bg-brand px-5 py-3 text-sm text-white hover:bg-brand-dark disabled:bg-slate-300 disabled:text-slate-600"
                onClick={() => setIsCheckoutOpen(true)}
                disabled={cartItems.length === 0}
              >
                Checkout
              </Button>
            </div>
            {cartItems.length === 0 ? (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-600">
                Keranjang Anda kosong. Tambahkan produk untuk melihat ringkasan pesanan.
              </div>
            ) : (
              <div className="grid gap-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 md:grid-cols-[120px_1fr_auto] md:items-center">
                    <img src={item.image} alt={item.name} className="h-28 w-full rounded-3xl object-cover md:h-24 md:w-28" />
                    <div className="space-y-3">
                      <p className="text-lg font-semibold text-slate-950">{item.name}</p>
                      <p className="text-sm text-slate-600">Jumlah: {item.quantity}</p>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                        <span>Harga: {formatCurrency(item.price)}</span>
                        <span className="text-slate-400">•</span>
                        <span>Subtotal: {formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    </div>
                    <Button
                      className="self-start rounded-full bg-rose-600 px-4 py-2 text-sm text-white hover:bg-rose-700 md:self-center"
                      onClick={() => openRemoveDialog(item)}
                    >
                      Remove
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </section>
          <Footer />
          <CheckoutDialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen} items={cartItems} onCheckout={handleCheckout} />
          {selectedRemoveItem && (
            <RemoveCartItemDialog
              open={removeDialogOpen}
              onOpenChange={closeRemoveDialog}
              item={selectedRemoveItem}
              onRemove={handleRemoveItem}
            />
          )}
        </div>
      </main>
    </div>
  );
}
