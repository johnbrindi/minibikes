'use client';
import { BIKES } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useState } from 'react';
import Link from 'next/link';

export default function MinibikeDetailPage({ params }: { params: { id: string } }) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  
  const bike = BIKES.find(b => b.id === params.id);
  const [activeImage, setActiveImage] = useState(bike?.images?.[0] || bike?.image);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  if (!bike) return <div>Bike not found</div>;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
        addItem(bike.id);
    }
    showToast(`Added ${quantity} ${bike.name} to cart`);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="w-full flex flex-col font-montserrat">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-12 w-full flex flex-col lg:flex-row gap-12">
        {/* Left Column: Images */}
        <div className="w-full lg:w-1/2 flex gap-4">
            <div className="flex flex-col gap-4 w-20 overflow-y-auto">
                {bike.images?.map((img, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => setActiveImage(img)}
                        className={`w-20 cursor-pointer border-2 ${activeImage === img ? 'border-brand-black' : 'border-transparent'} hover:border-gray-300 transition-colors bg-gray-100 flex-shrink-0 aspect-square`}
                    >
                        <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
            <div className="flex-1 bg-gray-50 flex items-center justify-center aspect-square">
                 <img src={activeImage} alt={bike.name} className="w-full h-full object-cover" />
            </div>
        </div>

        {/* Right Column: Details */}
        <div className="w-full lg:w-1/2 flex flex-col">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-4">{bike.name}</h1>
            <p className="text-xl mb-4">${bike.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>

            <div className="flex flex-col gap-1 mb-6 text-sm">
                <p className="flex items-center gap-2"><span className="text-yellow-500">✓</span> Free worldwide shipping</p>
                <p className="flex items-center gap-2"><span className="text-yellow-500">⚠</span> Low stock - 1 item left</p>
            </div>

            <div className="mb-6">
                <p className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Quantity</p>
                <div className="flex items-center border border-gray-300 w-32">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-gray-100">-</button>
                    <input type="text" value={quantity} readOnly className="w-full text-center outline-none" />
                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-gray-100">+</button>
                </div>
            </div>

            <button 
                onClick={handleAdd}
                className="w-full bg-[#32364c] text-white py-4 uppercase tracking-widest text-xs font-bold shadow-md hover:bg-[#1f2233] transition-colors duration-200 text-center mb-8"
            >
                Pre-order
            </button>

            <div className="prose prose-sm text-gray-700 max-w-none mb-8">
                <p>
                    Built to order in your choice of colour. 6 week approximate lead time on manufacture.
                    Shipping to USA or Australia is included in the purchase price for 1 bike.
                </p>
                <p>
                    {bike.description}
                </p>
                <p>
                    Sporting a 4 hp engine with a 1 year warranty, a hydraulic rear disc brake and aluminium
                    two part split rims for quick and easy tire changes, these builds are designed to be the
                    ultimate in simplicity and able to be maintained by anyone, anywhere, with minimal tools on hand.
                </p>
                <p>
                    The performance is peppy with swift acceleration up to 60kph. The speed can be limited
                    for children easily with a screwdriver adjustment to the governor.
                </p>
                <p>
                    The seat height measures 550mm off the ground, with handle bars high enough to fit an
                    adults knees under. This is not suitable for rough terrain use or jumping. Flat grass and
                    paved areas are most suited.
                </p>
                <p>
                    Available in a range of colours with colour coded seat stitching. Ensure our Instagram page
                    (@hustler_minibikes_nz) to see all the exciting colour options and customers builds in real time!
                </p>
                <p>
                    <strong>Shipping to USA or Australia is included in the purchase price for 1 bike. Duty
                    charges and local taxes are payable by the purchaser upon customs clearance in their
                    country or state. Please contact me for a quote on a cheaper rate for multiple bikes.
                    New Zealand delivery is an additional cost.</strong>
                </p>
                <p>
                    <em>By purchasing this Minibike you acknowledge it is built to order and you accept our Terms of Service</em>
                </p>
            </div>

            <div className="border-t border-gray-200">
                <button 
                    onClick={() => toggleAccordion('shipping')}
                    className="w-full py-4 flex justify-between items-center text-xs uppercase tracking-widest font-bold text-gray-600 hover:text-brand-black"
                >
                    Shipping Information
                    <span>{openAccordion === 'shipping' ? '−' : '+'}</span>
                </button>
                {openAccordion === 'shipping' && (
                    <div className="pb-4 text-sm text-gray-600">
                        Shipping details go here. Contact us for combined shipping rates.
                    </div>
                )}
            </div>
            
            <div className="border-t border-b border-gray-200">
                <button 
                    onClick={() => toggleAccordion('question')}
                    className="w-full py-4 flex justify-between items-center text-xs uppercase tracking-widest font-bold text-gray-600 hover:text-brand-black"
                >
                    Ask a Question
                    <span>{openAccordion === 'question' ? '−' : '+'}</span>
                </button>
                {openAccordion === 'question' && (
                    <div className="pb-6 text-sm text-gray-800 flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-xs text-gray-600">Name</label>
                                <input type="text" className="border border-gray-300 p-3 outline-none focus:border-brand-black transition-colors" />
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-xs text-gray-600">Email</label>
                                <input type="email" className="border border-gray-300 p-3 outline-none focus:border-brand-black transition-colors" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-gray-600">Message</label>
                            <textarea rows={5} className="border border-gray-300 p-3 outline-none focus:border-brand-black transition-colors resize-y"></textarea>
                        </div>
                        <button className="bg-[#32364c] text-white py-3 px-8 font-bold hover:bg-[#1f2233] transition-colors duration-200 self-start">
                            Send
                        </button>
                        <p className="text-xs text-gray-500 mt-2">
                            This site is protected by hCaptcha and the hCaptcha <a href="#" className="underline hover:text-gray-800">Privacy Policy</a> and <a href="#" className="underline hover:text-gray-800">Terms of Service</a> apply.
                        </p>
                    </div>
                )}
            </div>
            
        </div>
      </div>

      {/* You may also like */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16 w-full border-t border-gray-100 flex flex-col items-center">
            <h2 className="font-playfair text-3xl font-bold mb-10 text-center">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {BIKES.filter(b => b.id !== bike.id).map(b => (
                    <Link href={`/minibikes/${b.id}`} key={b.id} className="group flex flex-col cursor-pointer">
                        <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden mb-3 relative">
                            {b.image && (
                                <img src={b.image} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                            )}
                        </div>
                        <h3 className="font-medium text-sm text-brand-black mb-1 group-hover:underline underline-offset-4">{b.name}</h3>
                        <span className="text-gray-600 text-xs">
                            ${b.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </Link>
                ))}
            </div>
      </div>

    </div>
  );
}
