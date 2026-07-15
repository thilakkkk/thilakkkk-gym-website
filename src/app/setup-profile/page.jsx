'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function SetupProfile() {
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Pre-fill the email from the logged-in Auth user
    const getUserEmail = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email);
      }
      setLoading(false);
    };
    getUserEmail();
  }, []);

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    // Update the existing profile row with all three fields
    const { error } = await supabase
      .from('profiles')
      .update({ 
        full_name: fullName, 
        phone: phone,
        email: email
      })
      .eq('id', user.id);

    if (!error) {
      router.push('/dashboard');
    } else {
      alert("Error saving profile: " + error.message);
    }
  };

  if (loading) return <div className="p-10 bg-black text-white">Loading...</div>;

  return (
    <div className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold">Complete Your Profile</h1>
      <p className="text-zinc-400 text-sm mt-2">Please confirm your details to continue.</p>
      
      <div className="space-y-4 mt-6 max-w-md">
        <input 
          placeholder="Full Name" 
          onChange={(e) => setFullName(e.target.value)} 
          className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white" 
        />
        <input 
          placeholder="Phone Number" 
          onChange={(e) => setPhone(e.target.value)} 
          className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white" 
        />
        <input 
          value={email}
          disabled // Email is usually fixed from auth, so we disable it
          className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-400 cursor-not-allowed" 
        />
        
        <button 
          onClick={handleSave} 
          className="w-full bg-orange-600 hover:bg-orange-500 transition px-6 py-3 rounded-lg font-bold"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}