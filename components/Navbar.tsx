'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Minibikes', href: '/minibikes' },
    { label: 'Parts and Accessories', href: '/parts-and-accessories' },
    { label: 'Shipping', href: '/shipping' },
    { label: 'Contact Form', href: '/contact' },
    { label: 'About us', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full flex flex-col font-montserrat bg-white text-brand-black">
      {/* Announcement Bar */}
      <div className="bg-brand-black text-white text-center text-sm py-2 px-4 hover:bg-[#111] transition-all">
        Free Shipping on everything! The price listed includes shipping to USA or Australia — select currency from drop down menu
      </div>

      <div className={clsx("transition-shadow duration-200 border-b border-gray-200", scrolled && "shadow-md")}>
        {/* Row 1 */}
        <div className="flex items-center justify-between px-6 md:px-10 lg:px-16 py-4">
          <Link href="/" className="font-playfair text-xl md:text-2xl font-bold leading-tight flex-shrink-0">
            Custom built<br />minibikes. USA
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold uppercase tracking-wide">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={clsx(
                  "hover:text-brand-gold transition-colors pb-1",
                  pathname === link.href ? "border-b border-brand-black text-brand-black" : "text-gray-600"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="hover:text-brand-gold transition-colors"><Search size={20} /></button>
            <button className="hover:text-brand-gold transition-colors"><User size={20} /></button>
            <div className="relative group cursor-pointer">
              <ShoppingCart size={20} className="group-hover:text-brand-gold transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </div>
            {/* Mobile Menu Toggle */}
            <button className="lg:hidden ml-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Row 2 - Desktop */}
        <div className="hidden lg:flex items-center justify-center gap-6 py-2 bg-brand-gray text-xs font-semibold uppercase tracking-wide">
          <Link href="/scams" className={clsx("hover:text-brand-red transition-colors pb-1", pathname === '/scams' && "border-b border-brand-black")}>
            Scams
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/terms" className={clsx("hover:text-brand-gold transition-colors pb-1", pathname === '/terms' && "border-b border-brand-black")}>
            Terms / Policies
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl flex flex-col gap-4 p-6 border-b border-gray-200">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={clsx(
                "text-sm font-semibold uppercase tracking-wide",
                pathname === link.href ? "text-brand-gold" : "text-brand-black"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-gray-100 my-2" />
          <Link href="/scams" onClick={() => setMobileOpen(false)} className="text-sm font-semibold uppercase tracking-wide text-brand-red">Scams</Link>
          <Link href="/terms" onClick={() => setMobileOpen(false)} className="text-sm font-semibold uppercase tracking-wide text-gray-600">Terms / Policies</Link>
        </div>
      )}
    </header>
  );
}