import { Truck, MapPin, Package, Clock } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="w-full flex flex-col font-montserrat text-brand-black">
      <section className="bg-[#111] text-white py-24 px-6 text-center border-b border-brand-gold/20">
        <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 tracking-tight">Worldwide Shipping</h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-semibold tracking-wide uppercase text-sm leading-relaxed">
          Zero hidden fees. Your Hustler Minibike price includes delivery.
        </p>
      </section>

      <section className="py-20 max-w-5xl mx-auto w-full px-6 md:px-10 lg:px-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* New Zealand */}
          <div className="border border-gray-200 p-8 rounded-2xl bg-white shadow-sm hover:border-brand-gold transition-colors duration-300">
            <h2 className="text-2xl font-playfair font-bold mb-4 flex items-center gap-3">
              New Zealand <span className="text-3xl">🇳🇿</span>
            </h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-gray-500 uppercase tracking-widest text-xs font-bold inline-flex items-center gap-2"><Clock size={16}/> Delivery Time</span>
                <span className="font-bold">2-4 Days</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-gray-500 uppercase tracking-widest text-xs font-bold inline-flex items-center gap-2"><Truck size={16}/> Shipping Cost</span>
                <span className="text-brand-green font-bold">Included in price</span>
              </div>
              <p className="text-gray-600 leading-relaxed italic text-sm pt-2">Direct to your door from our Auckland workshop.</p>
            </div>
          </div>

          {/* Australia */}
          <div className="border border-gray-200 p-8 rounded-2xl bg-white shadow-sm hover:border-brand-gold transition-colors duration-300">
            <h2 className="text-2xl font-playfair font-bold mb-4 flex items-center gap-3">
              Australia <span className="text-3xl">🇦🇺</span>
            </h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-gray-500 uppercase tracking-widest text-xs font-bold inline-flex items-center gap-2"><Clock size={16}/> Delivery Time</span>
                <span className="font-bold">7-10 Days</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-gray-500 uppercase tracking-widest text-xs font-bold inline-flex items-center gap-2"><Truck size={16}/> Shipping Cost</span>
                <span className="text-brand-green font-bold">Included in price</span>
              </div>
              <p className="text-gray-600 leading-relaxed italic text-sm pt-2">Tracked air freight across the ditch.</p>
            </div>
          </div>

          {/* USA */}
          <div className="border border-gray-200 p-8 rounded-2xl bg-white shadow-sm hover:border-brand-gold transition-colors duration-300">
            <h2 className="text-2xl font-playfair font-bold mb-4 flex items-center gap-3">
              USA <span className="text-3xl">🇺🇸</span>
            </h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-gray-500 uppercase tracking-widest text-xs font-bold inline-flex items-center gap-2"><Clock size={16}/> Delivery Time</span>
                <span className="font-bold">14-21 Days</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-gray-500 uppercase tracking-widest text-xs font-bold inline-flex items-center gap-2"><Truck size={16}/> Shipping Cost</span>
                <span className="text-brand-green font-bold">Included in price</span>
              </div>
              <p className="text-gray-600 leading-relaxed italic text-sm pt-2">Secure ocean/air freight depending on coast.</p>
            </div>
          </div>
        </div>

        <div className="bg-brand-gray p-8 md:p-12 border-l-4 border-brand-gold shadow-sm rounded-r-xl">
          <h3 className="font-playfair text-2xl font-bold mb-6 flex items-center gap-3"><Package className="text-brand-gold"/> What You Need To Know</h3>
          <ul className="space-y-3 text-gray-700 text-sm leading-relaxed list-disc pl-5">
            <li>All bikes are built to order. Lead times are typically 4–6 weeks before dispatch.</li>
            <li>Minibikes arrive 95% assembled. You only need to attach the handlebars and front wheel.</li>
            <li>Customs duties and import taxes in your country are the buyer&apos;s responsibility.</li>
            <li>We use heavy-duty double corrugated cardboard packaging and custom foam inserts to ensure your bike arrives flawless.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}