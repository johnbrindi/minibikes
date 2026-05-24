import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './global-styles.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';
import { WhatsAppFloatingIcon } from '@/components/WhatsAppFloatingIcon';

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
      <body className={`${playfair.variable} ${montserrat.variable} font-montserrat flex flex-col min-h-screen text-brand-black bg-brand-gray`}>
        <CartProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
            <WhatsAppFloatingIcon />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}