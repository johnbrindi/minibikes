'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Search, User, ShoppingCart, Menu, X, Truck } from 'lucide-react';
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
    { label: 'Shipping', href: '/shipping' },
    { label: 'Contact Form', href: '/contact' },
    { label: 'About us', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full flex flex-col font-montserrat bg-white text-brand-black">

      {/* Announcement Ticker Bar */}
      <div className="bg-[#1e2235] text-[#c9a84c] overflow-hidden py-2.5 border-b border-[#c9a84c]/20">
        <div className="animate-marquee flex items-center gap-3 text-xs font-semibold tracking-widest uppercase">
          <Truck size={14} className="flex-shrink-0 text-[#c9a84c]" />
          <span>
            National and international shipping available — select currency from drop down menu
          </span>
        </div>
      </div>

      <div className={clsx("transition-shadow duration-200 border-b border-gray-100", scrolled && "shadow-md")}>
        {/* Row 1 */}
        <div className="flex items-center justify-between px-6 md:px-10 lg:px-16 py-4">
          <Link href="/" className="font-playfair text-xl md:text-2xl font-bold leading-tight flex-shrink-0">
            Custom built<br />minibikes. USA
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "relative pb-1 transition-colors duration-200",
                  "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#c9a84c] after:transition-all after:duration-300",
                  pathname === link.href
                    ? "text-[#111] after:w-full"
                    : "text-gray-500 hover:text-[#111] after:w-0 hover:after:w-full"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <button className="btn-icon" aria-label="Search">
              <Search size={17} />
            </button>
            <button className="btn-icon" aria-label="Account">
              <User size={17} />
            </button>
            <div className="relative">
              <button className="btn-icon" aria-label="Cart">
                <ShoppingCart size={17} />
              </button>
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#c9a84c] text-[#111] text-[10px] font-black rounded-full w-4.5 h-4.5 w-[18px] h-[18px] flex items-center justify-center shadow">
                  {itemCount}
                </span>
              )}
            </div>
            {/* Mobile Menu Toggle */}
            <button className="btn-icon lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Row 2 - Desktop secondary nav */}
        <div className="hidden lg:flex items-center justify-center gap-8 py-2 bg-gray-50 border-t border-gray-100 text-[10px] font-bold uppercase tracking-widest">
          {/* <Link
            href="/scams"
            className={clsx(
              "transition-colors duration-200 hover:text-red-600",
              pathname === '/scams' ? "text-red-600 border-b border-red-600" : "text-gray-500"
            )}
          >
            Scam Warning
          </Link> */}
          <span className="text-gray-300"></span>
          <Link
            href="/terms"
            className={clsx(
              "transition-colors duration-200 hover:text-[#c9a84c]",
              pathname === '/terms' ? "text-[#111] border-b border-[#111]" : "text-gray-500"
            )}
          >
            Terms / Policies
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl flex flex-col p-6 gap-5 border-b border-gray-100 z-50">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={clsx(
                "text-xs font-bold uppercase tracking-widest transition-colors pb-1 border-b border-transparent",
                pathname === link.href
                  ? "text-[#c9a84c] border-[#c9a84c]"
                  : "text-gray-700 hover:text-[#c9a84c]"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-gray-100" />
          <Link href="/scams" onClick={() => setMobileOpen(false)} className="text-xs font-bold uppercase tracking-widest text-red-600 hover:text-red-700">
            Scam Warning
          </Link>
          <Link href="/terms" onClick={() => setMobileOpen(false)} className="text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-[#c9a84c]">
            Terms / Policies
          </Link>
        </div>
      )}
    </header>
  );
}