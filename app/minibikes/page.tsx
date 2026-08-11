'use client';
import { BIKES } from '@/lib/data';
import { getBikes } from '@/lib/api';
import { Bike } from '@/lib/types';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MinibikesPage() {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [bikes, setBikes] = useState<Bike[]>(BIKES);

  useEffect(() => {
    getBikes().then(fetched => {
      if (fetched && fetched.length > 0) {
        setBikes([...BIKES, ...fetched]);
      }
    });
  }, []);

  const sortedBikes = [...bikes].sort((a, b) => {
    if (sortOrder === 'asc') return a.price - b.price;
    return b.price - a.price;
  });

  const toggleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="w-full flex flex-col font-montserrat">
      {/* Hero Banner */}
      <section className="relative h-48 md:h-64 w-full bg-[#111] border-b border-gray-800 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-cover bg-center opacity-40 z-0" style={{ backgroundImage: "url('/pictures/bike1-compplete-view.jpeg')" }} />
        <h1 className="relative z-20 font-playfair text-4xl md:text-5xl font-bold text-white tracking-widest uppercase">Our Minibike Range</h1>
      </section>

      {/* Main Content */}
      <section className="py-12 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 w-full flex flex-col">
        {/* Top bar with filter */}
        <div className="flex justify-between items-center mb-10">
          <button onClick={toggleSort} className="btn-ghost py-2.5 px-5 gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
            <span className="text-xs">Sort by Price {sortOrder === 'asc' ? '↑' : '↓'}</span>
          </button>
        </div>

        {/* Intro text */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xl text-brand-black leading-relaxed">
            Our current range of Minibikes are all made to order in your choice of colour.<br />
            National and international shipping available.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {sortedBikes.map((bike) => (
            <Link href={`/minibikes/${bike.id}`} key={bike.id} className="group flex flex-col cursor-pointer">
              <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden mb-4 relative">
                {bike.image && (
                  <img src={bike.image} alt={bike.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                )}
              </div>
              <h2 className="font-medium text-lg text-brand-black mb-1 group-hover:underline underline-offset-4">{bike.name}</h2>
              <span className="text-gray-600 text-sm">
                ${bike.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}