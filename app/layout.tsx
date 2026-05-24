import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './global-styles.css';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';
import { ConditionalLayout } from '@/components/ConditionalLayout';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '900']
});

export const metadata: Metadata = {
  title: 'Custom built minibikes. USA',
  description: 'World\'s Finest Minibikes. Handmade exclusively in USA.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${montserrat.variable} font-montserrat flex flex-col min-h-screen text-[#111] bg-[#f5f5f5]`}>
        <CartProvider>
          <ToastProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}