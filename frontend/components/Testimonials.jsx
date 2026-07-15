export default function Testimonials() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      quote: "Joining IronPulse completely changed my fitness journey. The trainers are amazing and push you to stay accountable!",
      rating: "⭐⭐⭐⭐⭐"
    },
    {
      name: "Priya Patel",
      quote: "The women's training zone made me feel comfortable and confident from day one. I've never felt stronger.",
      rating: "⭐⭐⭐⭐⭐"
    },
    {
      name: "Arjun Kumar",
      quote: "Excellent equipment, great community atmosphere, and unmatched clean facilities. Highly recommended!",
      rating: "⭐⭐⭐⭐⭐"
    }
  ];

  return (
    <section className="py-24 bg-[#1E1E1E] text-white border-t border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
            WHAT OUR <span className="text-orange-500">MEMBERS SAY</span>
          </h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mt-4 mb-6" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx} 
              className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 flex flex-col justify-between relative"
            >
              <div className="text-orange-500 text-5xl font-serif leading-none absolute top-4 left-6 opacity-10 select-none">
                “
              </div>
              
              <div className="relative z-10">
                <div className="text-yellow-500 text-sm mb-4">{t.rating}</div>
                <p className="text-zinc-300 italic text-sm leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="border-t border-zinc-800/60 pt-4 mt-auto">
                <h4 className="text-white font-bold tracking-wide">{t.name}</h4>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mt-0.5">Verified Member</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}