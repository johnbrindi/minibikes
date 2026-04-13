'use client';
import { useState, useEffect, useRef } from 'react';
import { BIKES, REVIEWS } from '@/lib/data';
import { StarRating } from '@/components/StarRating';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import Link from 'next/link';
import { Hammer, Zap, Palette, Truck, ChevronLeft, ChevronRight, Quote, ArrowRight, ShoppingBag, BookOpen } from 'lucide-react';

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
  const [reviewIdx, setReviewIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const reviewTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % carouselImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const startReviewTimer = () => {
    if (reviewTimer.current) clearInterval(reviewTimer.current);
    reviewTimer.current = setInterval(() => {
      goToNextReview();
    }, 5000);
  };

  useEffect(() => {
    startReviewTimer();
    return () => { if (reviewTimer.current) clearInterval(reviewTimer.current); };
  }, []);

  const goToNextReview = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setReviewIdx(prev => (prev + 1) % REVIEWS.length);
      setIsAnimating(false);
    }, 300);
  };

  const goToPrevReview = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setReviewIdx(prev => (prev - 1 + REVIEWS.length) % REVIEWS.length);
      setIsAnimating(false);
    }, 300);
  };

  const handleReviewNav = (dir: 'prev' | 'next') => {
    startReviewTimer();
    if (dir === 'prev') goToPrevReview();
    else goToNextReview();
  };

  const visibleReviews = (() => {
    const total = REVIEWS.length;
    return [
      REVIEWS[(reviewIdx) % total],
      REVIEWS[(reviewIdx + 1) % total],
      REVIEWS[(reviewIdx + 2) % total],
    ];
  })();

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative w-full bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center min-h-[92vh]">

        {/* Slideshow Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="flex h-full w-full transition-transform duration-[1200ms] ease-in-out"
            style={{ transform: `translateX(-${currentIdx * 100}%)` }}
          >
            {carouselImages.map((img, idx) => (
              <div
                key={idx}
                className="w-full h-full flex-shrink-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${img})`, opacity: 0.38 }}
              />
            ))}
          </div>
          {/* Vignette overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {carouselImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`rounded-full transition-all duration-400 ${
                currentIdx === idx ? 'w-6 h-2 bg-[#c9a84c]' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-32 w-full max-w-5xl">

          <p className="uppercase tracking-[0.35em] text-[#c9a84c] font-semibold text-xs sm:text-sm mb-8">
            Handmade Exclusively in USA
          </p>

          <h1 className="font-playfair text-white text-5xl sm:text-7xl lg:text-[90px] font-bold tracking-tight leading-[1.05] mb-10">
            World&apos;s Finest<br />Minibikes.
          </h1>

          <p className="text-white/60 text-base md:text-lg max-w-md mb-14 leading-relaxed">
            Hand-built to order in New Zealand. Free shipping to USA &amp; Australia.
          </p>

          {/* ── CTA Buttons — highly visible ── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
            <Link href="/minibikes" className="btn-primary w-full sm:w-auto">
              <ShoppingBag size={16} />
              Shop Minibikes
            </Link>
            <Link href="/about" className="btn-secondary w-full sm:w-auto">
              <BookOpen size={16} />
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* ── Bikes Grid ── */}
      <section className="py-24 px-6 md:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#c9a84c] font-semibold mb-4">Our Range</p>
          <h2 className="font-playfair italic text-3xl md:text-5xl leading-tight max-w-3xl mx-auto">
            Made To Order Minibike Range, available exclusively to USA markets.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BIKES.map((bike) => (
            <Link href={`/minibikes/${bike.id}`} key={bike.id} className="relative aspect-[16/9] w-full overflow-hidden group block">
              {bike.image && (
                <img src={bike.image} alt={bike.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity group-hover:opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <h3 className="font-playfair text-white text-2xl md:text-3xl font-bold">{bike.shortName || bike.name}</h3>
                <span className="flex items-center gap-1 text-[#c9a84c] text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/minibikes" className="btn-ghost">
            <ShoppingBag size={15} />
            Browse All Minibikes
          </Link>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-[#1a1a1a] text-white py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center lg:text-left">
            {[
              { Icon: Hammer, title: 'Handcrafted in NZ', desc: 'Every frame is welded and assembled by hand in our Auckland workshop.' },
              { Icon: Zap,    title: 'Reliable Engines',  desc: 'Powered by durable 4-stroke engines built to run hard all weekend.' },
              { Icon: Palette,title: 'Custom Colours',    desc: 'Choose your paint to match your personality or your business.' },
              { Icon: Truck,  title: 'Free Shipping',     desc: 'Worldwide shipping included in the list price. No hidden fees at checkout.' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center lg:items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="text-[#c9a84c] w-6 h-6" />
                </div>
                <h3 className="font-playfair text-xl font-bold">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews Carousel ── */}
      <section className="py-24 px-6 md:px-10 lg:px-16 bg-[#f7f5f0] w-full overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[#c9a84c] font-semibold mb-3">Customer Reviews</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Don&apos;t take our word for it</h2>
            <div className="w-20 h-[3px] bg-[#c9a84c] mx-auto rounded-full" />
          </div>

          <div className="relative px-10">
            {/* Desktop: 3 cards */}
            <div className={`hidden md:grid grid-cols-3 gap-6 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              {visibleReviews.map((review, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center relative hover:-translate-y-1 transition-transform duration-300">
                  <Quote className="absolute top-5 left-5 text-[#c9a84c]/20 w-9 h-9" />
                  <StarRating count={review.stars} />
                  <p className="italic text-gray-600 my-6 flex-1 leading-relaxed text-[15px]">&ldquo;{review.text}&rdquo;</p>
                  <div className="w-8 h-[2px] bg-[#c9a84c] mb-4 rounded-full" />
                  <p className="font-bold text-[#111] text-sm">{review.author}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{review.location}</p>
                </div>
              ))}
            </div>

            {/* Mobile: 1 card */}
            <div className={`md:hidden transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center relative">
                <Quote className="absolute top-5 left-5 text-[#c9a84c]/20 w-9 h-9" />
                <StarRating count={REVIEWS[reviewIdx].stars} />
                <p className="italic text-gray-600 my-6 flex-1 leading-relaxed">&ldquo;{REVIEWS[reviewIdx].text}&rdquo;</p>
                <div className="w-8 h-[2px] bg-[#c9a84c] mb-4 rounded-full" />
                <p className="font-bold text-[#111] text-sm">{REVIEWS[reviewIdx].author}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{REVIEWS[reviewIdx].location}</p>
              </div>
            </div>

            {/* Arrows */}
            <button
              onClick={() => handleReviewNav('prev')}
              className="btn-icon absolute left-0 top-1/2 -translate-y-1/2"
              aria-label="Previous review"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => handleReviewNav('next')}
              className="btn-icon absolute right-0 top-1/2 -translate-y-1/2"
              aria-label="Next review"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-10">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => { startReviewTimer(); setReviewIdx(i); }}
                className={`h-2 rounded-full transition-all duration-400 ${reviewIdx === i ? 'w-6 bg-[#c9a84c]' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative bg-[#0d0d0d] text-white py-28 px-6 text-center overflow-hidden">
        {/* Decorative gold glow */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, #c9a84c, transparent)' }}
        />
        {/* Top border accent */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="uppercase tracking-[0.35em] text-[#c9a84c] font-semibold text-xs mb-6">
            Join the Hustler Family
          </p>
          <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Ready to Order<br />Your Custom Build?
          </h2>
          <p className="text-white/50 mb-12 leading-relaxed text-base max-w-md mx-auto">
            Get in touch to discuss colours, specifications, and delivery to your door.
          </p>
          <Link href="/contact" className="btn-primary text-sm px-12 py-5">
            <ArrowRight size={16} />
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}