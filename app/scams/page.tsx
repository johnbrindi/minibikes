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
          <p className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-black tracking-tight" style={{ fontFamily: 'Impact, sans-serif' }}>custombuiltminibikesusa.online</p>
        </div>


        <div className="bg-brand-black text-white p-8 md:p-12 rounded-2xl shadow-xl flex flex-col items-center text-center">
          <h3 className="font-playfair text-2xl font-bold mb-4">What to do if you were scammed?</h3>
          <p className="text-gray-400 mb-8 leading-relaxed">
            If you purchased a "Hustler" from any site other than custombuiltminibikesusa.online, contact your bank or credit card provider immediately to open a chargeback dispute. We cannot help recover funds sent to fraudulent third parties.
          </p>
          <Link href="/contact" className="bg-brand-red text-white px-8 py-4 uppercase font-bold tracking-widest text-sm hover:bg-white hover:text-brand-red transition-colors rounded-lg shadow-md">
            Report a Fake Site
          </Link>
        </div>
      </section>
    </div>
  );
}