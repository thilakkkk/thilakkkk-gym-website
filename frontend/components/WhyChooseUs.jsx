export default function WhyChooseUs() {
  const features = [
    {
      title: "Personal Training",
      desc: "One-on-one coaching designed to help you reach your goals faster.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600"
    },
    {
      title: "Nutrition Guidance",
      desc: "Customized meal plans and expert advice to support your workouts.",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600"
    },
    {
      title: "Women's Training Zone",
      desc: "A dedicated and comfortable training space for women.",
      image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600"
    },
    {
      title: "Modern Equipment",
      desc: "Premium strength and cardio machines for every workout.",
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600"
    }
  ];

  return (
    <section className="py-24 bg-[#1E1E1E] text-white border-t border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
            WHY CHOOSE <span className="text-orange-500">IRONPULSE</span>
          </h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mt-4 mb-6" />
          <p className="text-zinc-400 text-lg">
            More than a gym. A complete fitness experience built around your success.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="rounded-xl bg-zinc-900/20 border border-zinc-800/80 hover:border-orange-500/50 hover:bg-zinc-900/40 transition-all duration-300 group hover:-translate-y-1 overflow-hidden flex flex-col h-full shadow-lg"
            >
              {/* Feature Image Area */}
              <div className="h-48 w-full bg-zinc-950 overflow-hidden relative">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
                {/* Subtle dark gradient overlay to make transitions smooth */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/20 to-transparent pointer-events-none" />
              </div>

              {/* Text Content */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}