import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';

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

import { MessageCircle } from 'lucide-react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${montserrat.variable} font-montserrat flex flex-col min-h-screen text-brand-black bg-brand-gray relative`}>
        <CartProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />

            {/* Global Floating WhatsApp Widget */}
            <a
              href="https://wa.me/14424166435"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg shadow-black/20 hover:bg-[#128C7E] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
              aria-label="Chat with us on WhatsApp"
            >
              <MessageCircle size={28} className="drop-shadow-sm" />
              <span className="absolute right-full mr-4 bg-white text-gray-800 text-xs font-bold px-3 py-2 rounded-xl shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Chat with us
              </span>
            </a>
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}