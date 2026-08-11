export default function AboutPage() {
  return (
    <div className="w-full flex flex-col font-montserrat text-brand-black">
      <section className="bg-[#111] text-white py-32 px-6 text-center border-b border-brand-gold/20">
        <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 tracking-tight">About us</h1>
      </section>

      <section className="max-w-7xl mx-auto w-full px-6 md:px-10 lg:px-16 py-24 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        <div className="lg:w-1/2 flex flex-col gap-8">
          <div className="w-16 h-1 bg-brand-gold mb-4" />
          <h2 className="font-playfair text-4xl md:text-5xl font-bold leading-tight">About our minibikes</h2>
          <p className="text-gray-600 leading-relaxed text-lg pb-4 border-b border-gray-200 whitespace-pre-line">
            Custom built mini bikes at moderate prices range
            The best custom built mini bikes
            luxury at your fingertips.
            Will ship to any location nationwide.
          </p>
        </div>

        <div className="lg:w-1/2 w-full aspect-square relative rounded-2xl shadow-xl overflow-hidden items-center justify-center">
           <img src="/pictures/bike.jpeg" alt="Workshop Photo" className="w-full h-full object-cover" />
        </div>
      </section>
    </div>
  );
}