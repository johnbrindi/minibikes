'use client';
import { getBikeById, getBikes } from '@/lib/api';
import { BIKES } from '@/lib/data';
import { Bike } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, CheckCircle, AlertTriangle, Truck, MessageCircle, Send, ArrowRight } from 'lucide-react';

export default function MinibikeDetailPage({ params }: { params: { id: string } }) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const staticBike = BIKES.find(b => b.id === params.id);
  const [bike, setBike] = useState<Bike | null>(staticBike || null);
  const [allBikes, setAllBikes] = useState<Bike[]>(BIKES);
  const [loading, setLoading] = useState(!staticBike);
  const [activeImage, setActiveImage] = useState<string | undefined>(staticBike?.images?.[0] || staticBike?.image);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [askName, setAskName] = useState('');
  const [askEmail, setAskEmail] = useState('');
  const [askMessage, setAskMessage] = useState('');
  const [askSent, setAskSent] = useState(false);
  const [askLoading, setAskLoading] = useState(false);

  useEffect(() => {
    if (!staticBike) {
      getBikeById(params.id).then(b => {
        setBike(b);
        if (b) setActiveImage(b.images?.[0] || b.image);
        setLoading(false);
      });
    }

    getBikes().then(fetched => {
      if (fetched && fetched.length > 0) {
        setAllBikes([...BIKES, ...fetched]);
      }
    });
  }, [params.id, staticBike]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen font-montserrat text-xl text-gray-400">
      Loading bike...
    </div>
  );

  if (!bike) return (
    <div className="flex items-center justify-center min-h-screen font-montserrat text-xl text-gray-400">
      Bike not found
    </div>
  );

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(bike.id);
    }
    showToast(`Added ${quantity} × ${bike.name} to cart`);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleAskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAskLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: askName,
          email: askEmail,
          subject: `Question about: ${bike.name}`,
          message: askMessage,
        }),
      });
      setAskSent(true);
      setAskName(''); setAskEmail(''); setAskMessage('');
    } catch {
      setAskSent(true);
    }
    setAskLoading(false);
  };

  return (
    <div className="w-full flex flex-col font-montserrat bg-brand-gray">

      {/* ── Main Product Section ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-12 w-full">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left — Images */}
          <div className="w-full lg:w-[55%] flex flex-col gap-4">
            <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden rounded-xl shadow">
              <img
                src={activeImage}
                alt={bike.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>

            {bike.images && bike.images.length > 1 && (
              <div className="flex gap-3 flex-wrap">
                {bike.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${activeImage === img
                        ? 'border-[#c9a84c] shadow-md scale-105'
                        : 'border-transparent hover:border-gray-300'
                      }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — Details */}
          <div className="w-full lg:w-[45%] flex flex-col">

            {/* Title & Price */}
            <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-3 leading-tight text-[#111]">
              {bike.name}
            </h1>
            <p className="text-2xl font-extrabold text-[#111] mb-1">
              ${bike.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-[10px] text-gray-400 mb-7 uppercase tracking-widest font-bold">
              National and international shipping available
            </p>

            {/* Info Badges */}
            <div className="flex flex-col gap-3 mb-8 p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0" />
                <span className="text-gray-700 font-medium">National and international shipping available</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <AlertTriangle className="text-amber-500 w-5 h-5 flex-shrink-0" />
                <span className="text-gray-700 font-medium">Made-to-order — 6 week lead time</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Truck className="text-[#c9a84c] w-5 h-5 flex-shrink-0" />
                <span className="text-gray-700 font-medium">Ships nationally and internationally</span>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-3">Quantity</p>
              <div className="inline-flex items-center border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 flex items-center justify-center text-xl font-bold text-gray-500 hover:bg-[#c9a84c] hover:text-white transition-all duration-200"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-14 text-center font-extrabold text-base text-[#111]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 flex items-center justify-center text-xl font-bold text-gray-500 hover:bg-[#c9a84c] hover:text-white transition-all duration-200"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Pre-order CTA */}
            <button onClick={handleAdd} className="btn-primary w-full mb-8 py-5 text-sm justify-center">
              <ArrowRight size={16} />
              Pre-order Now
            </button>

            {/* Description */}
            <div className="space-y-3 text-gray-600 text-sm leading-relaxed mb-8">
              <p>
                Built to order in your choice of colour. 6 week approximate lead time on manufacture.
                National and international shipping available.
              </p>
              {bike.description && <p>{bike.description}</p>}
              <p>
                Sporting a 4 hp engine with a 1 year warranty, a hydraulic rear disc brake and aluminium
                two-part split rims for quick and easy tyre changes, these builds are designed to be the
                ultimate in simplicity and able to be maintained by anyone, anywhere, with minimal tools on hand.
              </p>
              <p>
                The performance is peppy with swift acceleration up to 60kph. The speed can be limited for
                children easily with a screwdriver adjustment to the governor.
              </p>
              <p>
                The seat height measures 550mm off the ground, with handle bars high enough to fit an
                adult&apos;s knees under. This is not suitable for rough terrain use or jumping.
                Flat grass and paved areas are most suited.
              </p>
              <p>
                Available in a range of colours with colour-coded seat stitching. Follow{' '}
                <span className="font-semibold text-[#111]">@hustler_minibikes_nz</span> on Instagram
                to see all the exciting colour options and customer builds in real time.
              </p>
              <div className="p-4 bg-amber-50 border-l-4 border-[#c9a84c] rounded-r-lg text-gray-700 font-medium text-[13px]">
                Duty charges and local taxes are payable by the purchaser upon customs clearance in
                their country or state. Please contact us for a quote on a cheaper rate for multiple
                bikes. New Zealand delivery is an additional cost.
              </div>
              <p className="italic text-gray-400 text-xs">
                By purchasing this minibike you acknowledge it is built to order and you accept our Terms of Service.
              </p>
            </div>

            {/* Accordions */}
            <div className="border-t border-gray-200 divide-y divide-gray-200">

              {/* Shipping */}
              <div>
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full py-4 flex justify-between items-center text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-[#111] transition-colors"
                >
                  Shipping Information
                  {openAccordion === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'shipping' && (
                  <p className="pb-5 text-sm text-gray-500 leading-relaxed">
                    National and international shipping available. Estimated delivery after build is
                    2–3 weeks via express freight. Contact us for combined shipping rates on multiple bikes.
                  </p>
                )}
              </div>

              {/* Ask a Question */}
              <div>
                <button
                  onClick={() => toggleAccordion('question')}
                  className="w-full py-4 flex justify-between items-center text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-[#111] transition-colors"
                >
                  Ask a Question
                  {openAccordion === 'question' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {openAccordion === 'question' && (
                  <div className="pb-6">
                    {askSent ? (
                      <div className="flex flex-col items-center py-8 gap-3 text-center">
                        <CheckCircle className="text-green-500 w-12 h-12" />
                        <p className="font-bold text-[#111] text-base">Message sent!</p>
                        <p className="text-gray-400 text-xs">We&apos;ll get back to you within 24–48 hours.</p>
                        <button
                          onClick={() => setAskSent(false)}
                          className="text-xs font-bold uppercase tracking-widest text-[#c9a84c] hover:underline mt-2 transition-colors"
                        >
                          Send another
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleAskSubmit} className="flex flex-col gap-4 mt-2">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex-1 flex flex-col gap-1">
                            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Name</label>
                            <input
                              required
                              type="text"
                              value={askName}
                              onChange={e => setAskName(e.target.value)}
                              className="border-2 border-gray-200 rounded-lg p-3 outline-none focus:border-[#c9a84c] transition-colors bg-gray-50 text-sm font-medium"
                              placeholder="Your name"
                            />
                          </div>
                          <div className="flex-1 flex flex-col gap-1">
                            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Email</label>
                            <input
                              required
                              type="email"
                              value={askEmail}
                              onChange={e => setAskEmail(e.target.value)}
                              className="border-2 border-gray-200 rounded-lg p-3 outline-none focus:border-[#c9a84c] transition-colors bg-gray-50 text-sm font-medium"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Message</label>
                          <textarea
                            required
                            rows={4}
                            value={askMessage}
                            onChange={e => setAskMessage(e.target.value)}
                            className="border-2 border-gray-200 rounded-lg p-3 outline-none focus:border-[#c9a84c] transition-colors resize-none bg-gray-50 text-sm font-medium"
                            placeholder="What would you like to know?"
                          />
                        </div>
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          <button
                            type="submit"
                            disabled={askLoading}
                            className="btn-dark py-3 px-7 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Send size={14} />
                            {askLoading ? 'Sending...' : 'Send Message'}
                          </button>
                          <a
                            href="https://wa.me/14424166435"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-whatsapp py-3 px-5"
                          >
                            <MessageCircle size={15} />
                            WhatsApp
                          </a>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── You may also like ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16 w-full border-t border-gray-200">
        <h2 className="font-playfair text-3xl font-bold mb-10 text-center">You may also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {allBikes.filter(b => b.id !== bike.id).map(b => (
            <Link href={`/minibikes/${b.id}`} key={b.id} className="group flex flex-col">
              <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden mb-3 rounded-lg shadow-sm">
                {b.image && (
                  <img src={b.image} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                )}
              </div>
              <h3 className="font-semibold text-sm text-[#111] mb-1 group-hover:text-[#c9a84c] transition-colors leading-snug">
                {b.shortName || b.name}
              </h3>
              <span className="text-gray-500 text-sm font-bold">
                ${b.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
