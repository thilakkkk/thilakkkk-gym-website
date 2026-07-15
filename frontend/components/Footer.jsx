export default function Footer() {
  return (
    <footer className="bg-[#1E1E1E] text-white border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-12">
          {/* Brand Col */}
          <div>
            <h2 className="text-3xl font-black tracking-wider text-orange-500 mb-4">
              IRON<span className="text-white">PULSE</span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Transform your body. Transform your life. Join the premier fitness community today.
            </p>
          </div>

          {/* Operational Hours */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">Operational Hours</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Mon - Sat: 5:00 AM - 10:00 PM<br />
              Sunday: 6:00 AM - 2:00 PM
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-sm text-zinc-400">
            <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">Get In Touch</h3>
            <p><span className="text-zinc-500">Email:</span> contact@ironpulse.com</p>
            <p><span className="text-zinc-500">Phone:</span> +91 98765 43210</p>
            <p><span className="text-zinc-500">Address:</span> Hyderabad, Telangana</p>
          </div>
        </div>

        <hr className="border-zinc-800/60 my-8" />

        {/* Bottom Rights */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600 gap-4">
          <p>&copy; {new Date().getFullYear()} IronPulse. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
}