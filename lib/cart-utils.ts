import { type CartItem } from '@/types/cart';

export function getTotalCartQuantity(cart: CartItem[]): number {
  if (!Array.isArray(cart) || cart.length === 0) {
    return 0;
  }

  return cart.reduce((total, item) => total + (item?.quantity ?? 0), 0);
}

export function getTotalCartItems(cart: CartItem[]): number {
  if (!Array.isArray(cart) || cart.length === 0) {
    return 0;
  }

  return cart.filter(Boolean).length;
}
