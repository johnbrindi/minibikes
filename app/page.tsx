'use client';
import { useState, useEffect } from 'react';
import { BIKES, REVIEWS } from '@/lib/data';
import { StarRating } from '@/components/StarRating';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import Link from 'next/link';
import { Hammer, Zap, Palette, Truck } from 'lucide-react';

export default function Home() {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const carouselImages = [
    '/pictures/bike1-compplete-view.jpeg',
    '/pictures/purple-bike.jpeg',
    '/pictures/color-bike.jpeg',
    '/pictures/orange-bike-front-view.jpeg',
    '/pictures/bike.jpeg'
  ];

  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % carouselImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const handleAddToCart = (id: string, name: string) => {
    addItem(id);
    showToast(`Added ${name} to cart`);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full bg-[#111] overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
        {/* Carousel Background */}
        <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
          <div
            className="flex h-full w-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentIdx * 100}%)` }}
          >
            {carouselImages.map((img, idx) => (
              <div
                key={idx}
                className="w-full h-full flex-shrink-0 bg-cover bg-center opacity-40"
                style={{ backgroundImage: `url(${img})` }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-48 w-full max-w-screen-2xl">

          <p className="uppercase tracking-[0.25em] text-gray-400 font-semibold text-sm sm:text-base mb-6 z-10">
            HANDMADE EXCLUSIVELY IN NEW ZEALAND
          </p>

          <h1 className="font-playfair text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-16 z-10">
            World&apos;s Finest Minibikes.
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 z-10 w-full px-4">
            <Link
              href="/minibikes"
              className="w-full sm:w-auto bg-white text-brand-black px-8 py-4 uppercase font-bold tracking-wide text-sm rounded-none hover:bg-brand-gold hover:scale-105 transition-all duration-200"
            >
              Shop Minibikes
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 uppercase font-bold tracking-wide text-sm rounded-none hover:bg-white hover:text-brand-black transition-all duration-200"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Gradient fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-brand-gray to-transparent pointer-events-none" />
      </section>

      {/* Bikes Grid */}
      <section className="py-24 px-6 md:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        <h2 className="font-playfair italic text-3xl md:text-5xl text-center max-w-4xl mx-auto leading-tight mb-16 px-4">
          Our Made To Order Minibike Range. Available exclusively to the USA markets.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BIKES.map((bike) => (
            <Link href={`/minibikes/${bike.id}`} key={bike.id} className="relative aspect-[16/9] w-full overflow-hidden group">
              {bike.image && (
                <img src={bike.image} alt={bike.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              )}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
              <h3 className="absolute bottom-6 left-6 font-playfair text-white text-3xl font-bold">{bike.shortName || bike.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#1a1a1a] text-white py-24 px-6 md:px-10 lg:px-16 border-y border-brand-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Hammer className="text-brand-gold w-10 h-10" />
              <h3 className="font-playfair text-xl font-bold">Handcrafted in NZ</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Every frame is welded and assembled by hand in our Auckland workshop.</p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-4">
              <Zap className="text-brand-gold w-10 h-10" />
              <h3 className="font-playfair text-xl font-bold">Reliable Engines</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Powered by durable 4-stroke engines built to run hard all weekend.</p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-4">
              <Palette className="text-brand-gold w-10 h-10" />
              <h3 className="font-playfair text-xl font-bold">Custom Colours</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Choose your paint to match your personality or your business.</p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-4">
              <Truck className="text-brand-gold w-10 h-10" />
              <h3 className="font-playfair text-xl font-bold">Free Shipping</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Worldwide shipping included in the list price. No hidden fees at checkout.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 px-6 md:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Don&apos;t take our word for it</h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
              <StarRating count={review.stars} />
              <p className="italic text-gray-700 mb-8 flex-1 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              <div>
                <p className="font-bold text-brand-black">{review.author}</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{review.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-brand-gold text-brand-black py-20 px-6 text-center shadow-inner">
        <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-10 tracking-tight">Ready to Join the Hustler Family?</h2>
        <Link
          href="/contact"
          className="inline-block bg-brand-black text-white px-10 py-5 uppercase font-bold tracking-widest text-sm hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
        >
          Get in Touch
        </Link>
      </section>
    </>
  );
}