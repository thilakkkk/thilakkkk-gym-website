'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#1E1E1E]/95 backdrop-blur-md border-b border-zinc-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => router.push('/')}
            className="text-2xl font-black tracking-wider text-white cursor-pointer"
          >
            IRONPULSE
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex space-x-8 text-sm font-semibold tracking-wide uppercase">
            <li className="hover:text-orange-500 transition-colors duration-200 cursor-pointer" onClick={() => router.push('/')}>Home</li>
            <li className="hover:text-orange-500 transition-colors duration-200 cursor-pointer text-zinc-400">about</li>
            <li className="hover:text-orange-500 transition-colors duration-200 cursor-pointer text-zinc-400">Programs</li>
            <li className="hover:text-orange-500 transition-colors duration-200 cursor-pointer text-zinc-400">Trainers</li>
            <li className="hover:text-orange-500 transition-colors duration-200 cursor-pointer text-zinc-400">Pricing</li>
            <li className="hover:text-orange-500 transition-colors duration-200 cursor-pointer text-zinc-400">Contact</li>
          </ul>

          {/* Call to Action Button */}
          <div className="hidden md:block">
            <button 
              onClick={() => router.push('/login')}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3 rounded-full uppercase tracking-wider text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-orange-600/30"
            >
              Join Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none p-2"
              aria-label="Toggle Menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1E1E1E] border-b border-zinc-800">
          <ul className="px-4 pt-2 pb-6 space-y-4 text-center font-semibold uppercase tracking-wide">
            <li className="block py-2 text-white hover:text-orange-500 transition-colors" onClick={() => { setIsOpen(false); router.push('/'); }}>Home</li>
            <li className="block py-2 text-zinc-400 hover:text-orange-500 transition-colors" onClick={() => setIsOpen(false)}>About</li>
            <li className="block py-2 text-zinc-400 hover:text-orange-500 transition-colors" onClick={() => setIsOpen(false)}>Programs</li>
            <li className="block py-2 text-zinc-400 hover:text-orange-500 transition-colors" onClick={() => setIsOpen(false)}>Trainers</li>
            <li className="block py-2 text-zinc-400 hover:text-orange-500 transition-colors" onClick={() => setIsOpen(false)}>Pricing</li>
            <li className="block py-2 text-zinc-400 hover:text-orange-500 transition-colors" onClick={() => setIsOpen(false)}>Contact</li>
            <li className="pt-2">
              <button 
                onClick={() => { setIsOpen(false); router.push('/login'); }}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-full uppercase tracking-wider text-sm transition-colors"
              >
                Join Now
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}