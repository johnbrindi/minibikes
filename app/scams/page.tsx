import { AlertCircle, XOctagon } from 'lucide-react';
import Link from 'next/link';

export default function ScamsPage() {
  return (
    <div className="w-full flex flex-col font-montserrat min-h-screen text-brand-black bg-brand-gray pb-24">
      <section className="bg-brand-red text-white py-24 px-6 text-center shadow-xl">
        <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 tracking-tight flex items-center justify-center gap-4">
          <AlertCircle className="hidden md:block w-12 h-12" /> Warning: Scam Sites
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto font-semibold tracking-wide uppercase text-sm leading-relaxed border-t border-white/20 pt-6">
          Fraudulent websites are pretending to sell our minibikes.
        </p>
      </section>

      <section className="max-w-4xl mx-auto w-full px-6 mt-16 flex flex-col gap-12">
        <div className="bg-red-50 border-2 border-brand-red p-8 md:p-12 rounded-2xl shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-brand-red" />
          <h2 className="text-2xl md:text-3xl font-bold text-brand-red mb-4">Our ONLY official website is</h2>
          <p className="text-4xl md:text-5xl font-black text-brand-black tracking-tighter" style={{ fontFamily: 'Impact, sans-serif' }}>minibikes.nz</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="font-playfair text-3xl font-bold mb-8 flex items-center gap-3">
            <XOctagon className="text-brand-red w-8 h-8" /> We Never Do This:
          </h3>
          <ul className="space-y-6">
            {[
              "Sell Hustler Minibikes through third-party retailers like Amazon, eBay, or Alibaba.",
              "Run 'Clearance Sales' offering bikes for 80% off the list price.",
              "Ask for payment via Western Union, Crypto, or untraceable gift cards.",
              "Reach out via personal Facebook profiles demanding deposits."
            ].map((item, i) => (
              <li key={i} className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl">
                <div className="bg-brand-red text-white p-1 rounded mt-0.5">
                  <XOctagon size={16} />
                </div>
                <span className="text-gray-700 leading-relaxed font-semibold">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-brand-black text-white p-8 md:p-12 rounded-2xl shadow-xl flex flex-col items-center text-center">
          <h3 className="font-playfair text-2xl font-bold mb-4">What to do if you were scammed?</h3>
          <p className="text-gray-400 mb-8 leading-relaxed">
            If you purchased a "Hustler" from any site other than minibikes.nz, contact your bank or credit card provider immediately to open a chargeback dispute. We cannot help recover funds sent to fraudulent third parties.
          </p>
          <Link href="/contact" className="bg-brand-red text-white px-8 py-4 uppercase font-bold tracking-widest text-sm hover:bg-white hover:text-brand-red transition-colors rounded-lg shadow-md">
            Report a Fake Site
          </Link>
        </div>
      </section>
    </div>
  );
}