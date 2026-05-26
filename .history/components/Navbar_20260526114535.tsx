'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/SearchBar';
import { useCart } from '@/context/CartContext';
import { LucideShoppingBag, LucideMenu } from 'lucide-react';

interface NavbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function Navbar({ searchValue, onSearchChange }: NavbarProps) {
  const { getTotalQuantity } = useCart();
  const cartCount = getTotalQuantity();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-lg">
      <div className="container flex flex-col gap-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-brand">精品商店</p>
            <h1 className="text-2xl font-semibold text-slate-950">Toko Online</h1>
          </div>
          <Button className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-2 text-sm text-white hover:bg-slate-800 lg:hidden">
            <LucideMenu className="h-4 w-4" />
            Menu
          </Button>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:flex-1">
          <SearchBar value={searchValue} onChange={onSearchChange} onClear={() => onSearchChange('')} />
          <Button className="relative rounded-full bg-brand px-4 py-2 text-sm text-white hover:bg-brand-dark">
            <LucideShoppingBag className="mr-2 h-4 w-4" />
            Keranjang
            <Badge className="absolute -right-2 -top-2 rounded-full bg-white px-2 py-1 text-[10px] font-bold text-brand text-brand-dark border border-brand/20">
              {cartCount}
            </Badge>
          </Button>
        </div>
      </div>
    </header>
  );
}
