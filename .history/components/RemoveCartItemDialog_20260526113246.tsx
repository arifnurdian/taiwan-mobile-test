import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CartItem } from '@/types/cart';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';

interface RemoveCartItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: CartItem;
  onRemove: (id: number) => Promise<void>;
}

export function RemoveCartItemDialog({ open, onOpenChange, item, onRemove }: RemoveCartItemDialogProps) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await onRemove(item.id);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Remove Item</DialogTitle>
        <DialogDescription>Are you sure you want to remove this item from your cart?</DialogDescription>
      </DialogHeader>
      <DialogContent className="space-y-6">
        <Card className="rounded-3xl border border-slate-200 p-5">
          <div className="grid gap-4 sm:grid-cols-[100px_1fr]">
            <img src={item.image} alt={item.name} className="h-24 w-full rounded-3xl object-cover" />
            <div className="space-y-3">
              <p className="text-lg font-semibold text-slate-950">{item.name}</p>
              <div className="text-sm text-slate-600">
                <p>Harga: {formatCurrency(item.price)}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          </div>
        </Card>
      </DialogContent>
      <DialogFooter>
        <Button className="rounded-full border border-slate-200 bg-white text-slate-900 hover:bg-slate-100" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          className="rounded-full bg-rose-600 text-white hover:bg-rose-700 disabled:bg-slate-300 disabled:text-slate-600"
          onClick={handleRemove}
          disabled={isRemoving}
        >
          {isRemoving ? 'Removing...' : 'Remove'}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
