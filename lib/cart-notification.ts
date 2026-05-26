import { toast } from 'sonner';

export interface NotificationProduct {
  id: number;
  name: string;
  image: string;
  price: number;
}

const viewCartAction = (onViewCart?: () => void) => ({
  label: 'View Cart',
  onClick: () => {
    if (onViewCart) {
      onViewCart();
    }
  },
});

export function showAddToCartNotification(product: NotificationProduct, onViewCart?: () => void) {
  toast.success('Added to cart', {
    description: `${product.name} has been added to your shopping cart`,
    action: viewCartAction(onViewCart),
    icon: '🛒',
  });
}

export function showCartUpdatedNotification(product: NotificationProduct, onViewCart?: () => void) {
  toast.success('Cart updated', {
    description: `Quantity updated for ${product.name}`,
    action: viewCartAction(onViewCart),
    icon: '🛒',
  });
}

export function showCartErrorNotification(onViewCart?: () => void) {
  toast.error('Failed to add item', {
    description: 'Something went wrong. Please try again',
    action: viewCartAction(onViewCart),
  });
}
