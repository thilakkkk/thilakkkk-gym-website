export default function Trainers() {
  const trainers = [
    {
      name: "John Carter",
      role: "Strength & Conditioning Coach",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600"
    },
    {
      name: "Sarah Wilson",
      role: "Women's Fitness Specialist",
      image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600"
    },
    {
      name: "David Miller",
      role: "Nutrition & Personal Trainer",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600"
    }
  ];

  return (
    <section className="py-24 bg-[#1E1E1E] text-white border-t border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
            MEET OUR <span className="text-orange-500">TRAINERS</span>
          </h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mt-4 mb-6" />
          <p className="text-zinc-400 text-lg">
            Learn from certified fitness professionals dedicated to your success.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((trainer, idx) => (
            <div 
              key={idx} 
              className="group relative rounded-2xl overflow-hidden bg-zinc-900/30 border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300"
            >
              {/* Profile Card Image Area */}
              <div className="h-80 bg-zinc-950 relative overflow-hidden">
                <img 
                  src={trainer.image} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500"
                />
                {/* Dark overlay to blend image bottom with text container */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Details Overlay Panel */}
              <div className="p-6 bg-zinc-900/40 border-t border-zinc-800/85">
                <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
                  {trainer.name}
                </h3>
                <p className="text-zinc-400 text-sm mt-1">
                  {trainer.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}