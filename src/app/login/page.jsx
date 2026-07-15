'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (isSignUp) {
        // Sign Up Flow
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
          }
        });
        
        if (error) throw error;
        
        setMessage({
          type: 'success',
          text: 'Registration successful! Check your email for a confirmation link.',
        });
      } else {
        // Sign In Flow
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setMessage({ type: 'success', text: 'Success! Redirecting to your dashboard...' });
        
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="mb-8 text-center relative z-10 cursor-pointer" onClick={() => router.push('/')}>
        <h1 className="text-4xl font-black tracking-wider text-orange-500">
          IRON<span className="text-white">PULSE</span>
        </h1>
        <p className="text-zinc-500 text-xs uppercase tracking-widest mt-2">Elite Fitness Portal</p>
      </div>

      {/* Main Auth Card */}
      <div className="w-full max-w-md bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-2xl shadow-2xl backdrop-blur-sm relative z-10">
        <h2 className="text-2xl font-extrabold mb-6 tracking-wide text-center uppercase">
          {isSignUp ? 'Create Gym Membership' : 'Member Sign In'}
        </h2>

        {/* Dynamic Alerts */}
        {message.text && (
          <div className={`p-4 rounded-lg text-sm mb-6 ${
            message.type === 'success' 
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
              : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-400 font-bold mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" 
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-400 font-bold mb-2">
              Password
            </label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-bold py-4 rounded-full uppercase tracking-wider text-sm transition-all shadow-lg shadow-orange-500/10 hover:scale-[1.01] mt-2"
          >
            {loading ? 'Please wait...' : isSignUp ? 'Sign Up Now' : 'Sign In'}
          </button>
        </form>

        {/* Toggle between Login and Sign Up */}
        <div className="mt-8 pt-6 border-t border-zinc-800/60 text-center text-sm text-zinc-500">
          {isSignUp ? "Already have a gym profile?" : "New to IronPulse?"}{' '}
          <button 
            onClick={() => {
              setIsSignUp(!isSignUp);
              setMessage({ type: '', text: '' });
            }}
            className="text-orange-500 hover:text-orange-400 font-bold transition-colors cursor-pointer ml-1"
          >
            {isSignUp ? 'Sign In Instead' : 'Register Here'}
          </button>
        </div>
      </div>
    </div>
  );
}