import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '精品商店 | Storefront',
  description: 'Halaman katalog toko online modern dengan Next.js, Tailwind CSS, dan komponen ShadCN style.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
