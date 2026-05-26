import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CartItem } from '@/types/cart';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onCheckout: () => Promise<void>;
}

export function CheckoutDialog({ open, onOpenChange, items, onCheckout }: CheckoutDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length > 0 ? 15000 : 0;
  const discount = items.length > 0 ? 0 : 0;
  const grandTotal = totalPrice + shipping - discount;

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      await onCheckout();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Checkout Order</DialogTitle>
        <DialogDescription>Review your order before continuing</DialogDescription>
      </DialogHeader>
      <DialogContent className="space-y-6">
        <Card className="rounded-3xl border border-slate-200 p-5">
          <h3 className="text-base font-semibold text-slate-950">Ringkasan Pesanan</h3>
          <Separator className="my-4" />
          <ScrollArea className="space-y-4 max-h-[360px]">
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="grid gap-4 sm:grid-cols-[80px_1fr]">
                  <img src={item.image} alt={item.name} className="h-20 w-20 rounded-3xl object-cover" />
                  <div className="space-y-2">
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-slate-950">{item.name}</p>
                      <p className="text-sm text-slate-500">Jumlah: {item.quantity}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                      <span>Harga: {formatCurrency(item.price)}</span>
                      <span className="text-slate-400">•</span>
                      <span>Subtotal: {formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-600">Keranjang kosong. Tambahkan produk untuk melanjutkan checkout.</p>
            )}
          </ScrollArea>
        </Card>
        <Card className="rounded-3xl border border-slate-200 p-5">
          <h3 className="text-base font-semibold text-slate-950">Ringkasan Pembayaran</h3>
          <Separator className="my-4" />
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex justify-between gap-4">
              <span>Total item</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Total harga</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Ongkir</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Diskon</span>
              <span>-{formatCurrency(discount)}</span>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between gap-4 text-base font-semibold text-slate-950">
              <span>Grand total</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </Card>
      </DialogContent>
      <DialogFooter>
        <Button className="rounded-full border border-slate-200 bg-white text-slate-900 hover:bg-slate-100" onClick={() => onOpenChange(false)}>
          Continue Shopping
        </Button>
        <Button
          className="rounded-full bg-brand text-white hover:bg-brand-dark disabled:bg-slate-300 disabled:text-slate-600"
          onClick={handleConfirm}
          disabled={isProcessing || items.length === 0}
        >
          {isProcessing ? 'Processing...' : 'Confirm Checkout'}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
