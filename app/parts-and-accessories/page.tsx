'use client';
import { PARTS } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useState } from 'react';
import clsx from 'clsx';

const CATEGORIES = ['All', 'Engine', 'Body', 'Wheels', 'Lighting', 'Controls'];

export default function PartsAccessoriesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { addItem } = useCart();
  const { showToast } = useToast();

  const filteredParts = activeCategory === 'All' 
    ? PARTS 
    : PARTS.filter(p => p.category === activeCategory);

  const handleAdd = (id: string, name: string) => {
    addItem(id);
    showToast(`Added ${name} to cart`);
  };

  return (
    <div className="w-full flex flex-col font-montserrat min-h-screen">
      {/* Hero */}
      <section className="bg-[#111] text-white py-24 px-6 text-center">
        <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 tracking-tight">Parts & Accessories</h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-semibold tracking-wide uppercase text-sm leading-relaxed">
          Upgrade your Hustler with genuine bolt-on performance parts.
        </p>
      </section>

      <section className="py-16 max-w-7xl mx-auto w-full px-6 md:px-10 lg:px-16 flex-1 flex flex-col gap-12">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={clsx(
                "px-5 py-2 rounded-full border border-gray-200 text-xs font-bold uppercase tracking-wider transition-all duration-200",
                activeCategory === cat 
                  ? "bg-brand-black text-white hover:bg-gray-800" 
                  : "bg-white text-gray-600 hover:bg-gray-50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredParts.map(part => (
            <div key={part.id} className="bg-white border text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <span className="text-xs text-brand-gold font-bold uppercase tracking-widest mb-3">
                {part.category}
              </span>
              <h3 className="font-playfair text-xl font-bold mb-4 flex-1">{part.name}</h3>
              <p className="text-xl font-bold mb-6">${part.price.toFixed(2)}</p>
              
              <button 
                onClick={() => handleAdd(part.id, part.name)}
                className="w-full bg-brand-black text-white py-3 uppercase text-xs font-bold tracking-widest hover:bg-brand-gold hover:text-brand-black transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        
        {filteredParts.length === 0 && (
          <div className="text-center py-20 text-gray-500 italic">No parts found for {activeCategory}.</div>
        )}
      </section>
    </div>
  );
}