'use client'; // <--- ADD THIS LINE AT THE VERY TOP

export default function Contact() {
  return (
    <section className="py-24 bg-[#1E1E1E] text-white border-t border-zinc-800/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
            CONTACT <span className="text-orange-500">US</span>
          </h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mt-4 mb-6" />
          <p className="text-zinc-400">Have questions? We'd love to hear from you.</p>
        </div>

        {/* Contact Form Container */}
        <div className="bg-zinc-900/30 p-8 sm:p-10 rounded-2xl border border-zinc-800/80 shadow-xl">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-400 font-bold mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-400 font-bold mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-400 font-bold mb-2">Phone Number</label>
              <input 
                type="tel" 
                placeholder="+91 98765 43210" 
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-400 font-bold mb-2">Your Message</label>
              <textarea 
                rows="4" 
                placeholder="How can we help you?" 
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-full uppercase tracking-wider text-sm transition-all shadow-lg shadow-orange-500/10 hover:scale-[1.01]"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}