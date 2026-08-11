'use client';
import { useState } from 'react';
import { CheckCircle, MessageCircle, Mail, Clock, Send, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col font-montserrat bg-brand-gray min-h-screen text-brand-black">

      {/* ── Hero ── */}
      <section className="bg-[#0d0d0d] text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
        <p className="text-xs uppercase tracking-[0.35em] text-[#c9a84c] font-semibold mb-5">We&apos;re here to help</p>
        <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-5 tracking-tight">Contact Us</h1>
        <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
          Questions about a custom build, colours, or shipping? Reach out and we&apos;ll get back to you within 24–48 hours.
        </p>
      </section>

      {/* ── Content ── */}
      <section className="py-16 max-w-6xl mx-auto w-full px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Sidebar ── */}
          <div className="flex flex-col gap-5">
            <div className="mb-2">
              <h2 className="font-playfair text-2xl font-bold mb-3">Get in Touch</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Whether you want to discuss a custom build, ask about shipping, or just say hi — we&apos;re happy to chat.
              </p>
            </div>

            {/* Email */}
            <a
              href="mailto:glexholland@gmail.com"
              className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#c9a84c]/40 transition-all duration-200 group"
            >
              <div className="bg-[#c9a84c]/10 rounded-xl p-3 group-hover:bg-[#c9a84c]/20 transition-colors flex-shrink-0">
                <Mail className="text-[#c9a84c] w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-xs text-gray-700 mb-1 uppercase tracking-widest">Email</p>
                <p className="text-sm text-gray-500 break-all">glexholland@gmail.com</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/14247035460"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-200 group"
            >
              <div className="bg-green-50 rounded-xl p-3 group-hover:bg-green-100 transition-colors flex-shrink-0">
                <MessageCircle className="text-green-500 w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-xs text-gray-700 mb-1 uppercase tracking-widest">WhatsApp</p>
                <p className="text-sm text-gray-500">+1 (424) 703-5460</p>
                <p className="text-[11px] text-green-600 font-bold mt-1 uppercase tracking-wide flex items-center gap-1">
                  Tap to chat <ArrowRight size={11} />
                </p>
              </div>
            </a>

            {/* Response Time */}
            <div className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="bg-blue-50 rounded-xl p-3 flex-shrink-0">
                <Clock className="text-blue-400 w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-xs text-gray-700 mb-1 uppercase tracking-widest">Response Time</p>
                <p className="text-sm text-gray-500">Within 24–48 business hours</p>
              </div>
            </div>
          </div>

          {/* ── Form ── */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center h-full min-h-[420px]">
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6">
                  <CheckCircle className="text-green-500 w-10 h-10" />
                </div>
                <h2 className="font-playfair text-3xl font-bold mb-3 text-[#111]">Message Sent!</h2>
                <p className="text-gray-500 mb-10 leading-relaxed max-w-sm text-sm">
                  Thank you for reaching out. We&apos;ll get back to you within 24–48 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="btn-ghost px-8 py-3"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-playfair text-2xl font-bold mb-8 text-[#111]">Send us a Message</h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Name</label>
                      <input
                        required
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-[#c9a84c] transition-all font-medium text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                      <input
                        required
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-[#c9a84c] transition-all font-medium text-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Subject</label>
                    <select
                      required
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-[#c9a84c] transition-all appearance-none cursor-pointer font-medium text-sm text-gray-700"
                    >
                      <option value="">Select a subject...</option>
                      <option value="Sales Inquiry">Sales Inquiry</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Custom Build Question">Custom Build Question</option>
                      <option value="Shipping Question">Shipping Question</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Message</label>
                    <textarea
                      required
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-[#c9a84c] transition-all resize-none font-medium text-sm"
                      placeholder="How can we help?"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-dark flex-1 sm:flex-none py-4 px-8 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Send size={15} />
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>

                    <a
                      href="https://wa.me/14247035460"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp py-4 px-8"
                    >
                      <MessageCircle size={16} />
                      WhatsApp Us
                    </a>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}