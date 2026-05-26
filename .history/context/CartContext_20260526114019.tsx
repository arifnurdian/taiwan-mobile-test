'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { type CartItem } from '@/types/cart';
import { getTotalCartItems, getTotalCartQuantity } from '@/lib/cart-utils';
import { type Product } from '@/data/products';

interface CartContextValue {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  getTotalQuantity: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Earphone Bluetooth Sport',
    image: 'https://images.unsplash.com/photo-1518444823824-0b31c8f0d34d?auto=format&fit=crop&w=800&q=80',
    price: 299900,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Smartwatch Multi Fungsi',
    image: 'https://images.unsplash.com/photo-1517430816045-df4b7de5a315?auto=format&fit=crop&w=800&q=80',
    price: 899900,
    quantity: 1,
  },
];

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>(initialCartItems);

  const addItem = useCallback((product: Product) => {
    setCart((current) => {
      const existingItem = current.find((item) => item.id === product.id);
      if (existingItem) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setCart((current) => current.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    setCart((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item))
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const totalQuantity = useMemo(() => getTotalCartQuantity(cart), [cart]);
  const totalItems = useMemo(() => getTotalCartItems(cart), [cart]);

  const getTotalQuantity = useCallback(() => totalQuantity, [totalQuantity]);
  const getTotalItems = useCallback(() => totalItems, [totalItems]);

  const value = useMemo(
    () => ({ cart, setCart, addItem, removeItem, updateQuantity, getTotalQuantity, getTotalItems }),
    [cart, addItem, removeItem, updateQuantity, getTotalQuantity, getTotalItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
