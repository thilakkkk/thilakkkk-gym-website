'use client';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();

  const handleLearnMore = () => {
    // Looks for a section with id="programs" or "features" and scrolls to it smoothly
    const nextSection = document.getElementById('programs') || document.getElementById('features');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-[#1E1E1E] text-white pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left: Text & Stats */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none uppercase">
              <span className="border-b-4 border-blue-400/80 pb-1 inline-block">NO EXCUSES.</span>
              <br />
              <span className="border-b-4 border-blue-400/80 pb-1 inline-block mt-4">
                JUST <span className="text-orange-500">RESULTS.</span>
              </span>
            </h1>
          </div>

          <p className="text-gray-400 text-base sm:text-lg max-w-md leading-relaxed">
            Train with certified coaches, world-class equipment, and a community that pushes you to achieve more.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => router.push('/login')}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3.5 rounded-full uppercase tracking-wider text-sm transition-all shadow-lg shadow-orange-600/20 hover:scale-[1.02] cursor-pointer"
            >
              Join Now
            </button>
            <button 
              onClick={handleLearnMore}
              className="bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/50 hover:border-zinc-600 text-zinc-300 hover:text-white font-medium px-8 py-3.5 rounded-lg text-sm transition-all cursor-pointer"
            >
              learn more
            </button>
          </div>

          {/* Stats Segment matching Figma */}
          <div className="flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t border-zinc-800/60">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-none">5000+</h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-semibold mt-1">Members</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-none">15</h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-semibold mt-1">Professional Trainers</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-none">4.9</h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-semibold mt-1">Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Premium Dynamic Image Card */}
        <div className="relative h-[400px] sm:h-[500px] lg:h-[550px] rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl shadow-black/50 group">
          {/* Dark overlay to smoothly blend the image edges with the gym theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E]/80 via-transparent to-transparent z-10 pointer-events-none" />
          
          <img 
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000" 
            alt="IronPulse Athletic Training" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>

      </div>
    </section>
  );
}