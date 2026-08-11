export default function TermsPage() {
  return (
    <div className="w-full flex flex-col font-montserrat min-h-screen bg-white text-brand-black">
      <section className="bg-[#111] text-white py-24 px-6 text-center border-b border-brand-gold/20">
        <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 tracking-tight">Terms & Policies</h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-semibold tracking-wide uppercase text-sm leading-relaxed">
          The legal bits. Straightforward and honest.
        </p>
      </section>

      <section className="max-w-4xl mx-auto w-full px-6 py-20 flex flex-col gap-12">
        <div className="pb-12 border-b border-gray-200">
          <h2 className="font-playfair text-3xl font-bold mb-6 text-brand-black">Returns & Refunds</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>Every Hustler Minibike is hand-built to order based on your specifications. Because of this custom manufacturing process, we do not accept returns or provide refunds for \"change of mind\".</p>
            <p>If your bike arrives damaged from transit, you must notify us within 48 hours of delivery with photographic evidence. We will arrange for replacement parts to be shipped immediately, or in severe cases, organise a return of the damaged frame at our discretion.</p>
          </div>
        </div>

        <div className="pb-12 border-b border-gray-200">
          <h2 className="font-playfair text-3xl font-bold mb-6 text-brand-black">Warranty</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>We stand by our work. All Hustler Minibike frames carry a 5-year structural warranty against manufacturing defects.</p>
            <p>Engines carry a standard 12-month manufacturer warranty. Normal wear and tear items (tyres, chains, clutches, grips, cables, paint fading) and damage resulting from misuse, racing, negligence, or lack of maintenance are not covered.</p>
          </div>
        </div>

        <div className="pb-12 border-b border-gray-200">
          <h2 className="font-playfair text-3xl font-bold mb-6 text-brand-black">Payment Terms</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>We require a 100% upfront payment to begin your custom build. National and international shipping available, shipping cost calculated at checkout.</p>
            <p>Import duties, local taxes, or customs clearance fees imposed by the destination country are the sole responsibility of the buyer and are not included in our pricing.</p>
          </div>
        </div>

        <div className="pb-12 border-b border-gray-200">
          <h2 className="font-playfair text-3xl font-bold mb-6 text-brand-black">Privacy Policy</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>We collect your information purely to process orders, arrange shipping, and occasionally send updates regarding your build. We do not sell, rent, or trade your personal data to any third parties.</p>
          </div>
        </div>

        <div className="pb-12">
          <h2 className="font-playfair text-3xl font-bold mb-6 text-brand-black">Intellectual Property</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>All frame designs, logos, images, and text on this site are the intellectual property of Hustler Minibikes. Any unauthorised reproduction or imitation will be aggressively pursued legally.</p>
            <p className="font-bold text-brand-red mt-4">For any legal queries, please use the contact form.</p>
          </div>
        </div>
      </section>
    </div>
  );
}