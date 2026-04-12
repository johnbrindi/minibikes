import { Bike } from '@/lib/types';
import Link from 'next/link';

export function BikeCard({ bike, onAddToCart }: { bike: Bike; onAddToCart: () => void }) {
  return (
    <div className="group relative flex flex-col bg-white rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 overflow-hidden font-montserrat">
      {/* Image Area - Placeholder with gradient */}
      <div 
        className="w-full pt-[100%] relative isolate"
        style={{ background: `linear-gradient(135deg, ${bike.color}22, ${bike.color}44)` }} 
      >
        {/* Color Dot */}
        <div 
          className="absolute top-4 right-4 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10" 
          style={{ backgroundColor: bike.color }}
        />
        
        <div className="absolute inset-0 flex items-center justify-center text-6xl select-none opacity-80 group-hover:scale-110 transition-transform duration-500">
          {bike.emoji}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-playfair text-2xl font-bold text-brand-black mb-2 line-clamp-1">{bike.name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2 flex-1">{bike.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="font-bold text-lg">${bike.price}</span>
          <button 
            onClick={onAddToCart}
            className="uppercase tracking-wide text-xs font-semibold bg-brand-black text-white px-5 py-2.5 rounded-full hover:bg-brand-gold hover:text-brand-black transition-colors duration-200"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}