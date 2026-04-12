'use client';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full flex flex-col font-montserrat bg-brand-gray min-h-screen text-brand-black">
      <section className="bg-[#111] text-white py-24 px-6 text-center border-b border-brand-gold/20">
        <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 tracking-tight">Contact Us</h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-semibold tracking-wide uppercase text-sm leading-relaxed">
          Questions about a build? Reach out below.
        </p>
      </section>

      <section className="py-24 max-w-6xl mx-auto w-full px-6 flex justify-center items-center flex-1">
        {submitted ? (
          <div className="bg-white p-12 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500 max-w-xl">
            <CheckCircle className="text-brand-green w-24 h-24 mb-8" />
            <h2 className="font-playfair text-4xl font-bold mb-4 text-brand-black">Message Sent!</h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              Thanks for reaching out. We&apos;ll get back to you within 24-48 business hours. Stay dusty.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="text-brand-black border-b-2 border-brand-gold pb-1 font-bold uppercase tracking-widest text-sm hover:text-brand-gold transition-colors"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <div className="bg-white p-8 md:p-12 lg:p-16 rounded-2xl shadow-sm border border-gray-100 max-w-3xl w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-500">Name</label>
                  <input required id="name" type="text" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                  <input required id="email" type="email" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all" placeholder="john@example.com" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-gray-500">Subject</label>
                <select required id="subject" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all appearance-none cursor-pointer">
                  <option value="">Select a subject...</option>
                  <option value="sales">Sales Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="parts">Parts Question</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-500">Message</label>
                <textarea required id="message" rows={6} className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all resize-none" placeholder="How can we help?"></textarea>
              </div>

              <button type="submit" className="w-full bg-brand-black text-white px-8 py-5 uppercase tracking-widest font-bold text-sm hover:bg-brand-gold hover:text-brand-black transition-colors duration-300 mt-4 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1">
                Send Message
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}