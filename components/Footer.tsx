import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#111] text-white pt-16 pb-8 font-montserrat">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-playfair text-2xl font-bold mb-4">Custom built<br />minibikes. USA</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              World&apos;s Finest Minibikes.<br />
              Handmade exclusively in USA.<br />
              Built to last generations.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-semibold uppercase tracking-wide mb-4 text-brand-gold">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/minibikes" className="hover:text-white transition-colors">Minibikes</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h4 className="font-semibold uppercase tracking-wide mb-4 text-brand-gold">Info</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              {/* <li><Link href="/scams" className="hover:text-brand-red transition-colors">Scam Warning</Link></li> */}
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms / Policies</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold uppercase tracking-wide mb-4 text-brand-gold">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Form</Link></li>
              <li>
                <a href="https://wa.me/14247035460" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                  WhatsApp: +1 (424) 703-5460
                </a>
              </li>
              <li>
                <a href="mailto:Glexhollsnd@gmail.com" className="hover:text-brand-gold transition-colors break-all">
                  Glexhollsnd@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Custom built minibikes. USA. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made with rugged durability.</p>
        </div>
      </div>
    </footer>
  );
}