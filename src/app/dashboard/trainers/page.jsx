'use client';

import { useState, useEffect } from 'react';
// Make sure this path is definitely correct for your project
import { supabase } from '../../lib/supabaseClient'; 
import Link from 'next/link';

export default function TrainersPage() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTrainerEmail, setNewTrainerEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const fetchTrainers = async () => {
    setLoading(true);
    
    // We changed the query to select * (all columns) to avoid errors 
    // if a specific column like 'phone' doesn't exist yet.
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'trainer');

    if (error) {
      console.error("DEBUG - Full Error Object:", error);
      setStatusMessage(`Error: ${error.message || 'Check Console'}`);
    } else {
      console.log("DEBUG - Data Received:", data);
      setTrainers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleAddTrainer = async (e) => {
    e.preventDefault();
    setStatusMessage('Processing...');

    const { data, error } = await supabase
      .from('profiles')
      .update({ role: 'trainer' })
      .eq('email', newTrainerEmail)
      .select();

    if (error) {
      console.error("Update Error:", error);
      setStatusMessage(`❌ Error: ${error.message}`);
    } else if (!data || data.length === 0) {
      setStatusMessage('❌ No user found with that email.');
    } else {
      setStatusMessage('✅ User promoted to Trainer!');
      setNewTrainerEmail('');
      fetchTrainers();
    }
  };

  return (
    <div className="p-8 space-y-8 min-h-screen bg-black text-white">
      <div>
        <Link href="/dashboard" className="text-xs text-zinc-500 hover:text-white transition uppercase tracking-widest">
          ← Back to HQ Control Desk
        </Link>
        <h1 className="text-4xl font-black uppercase tracking-tighter mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
          Trainer Management
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl">
          <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-4">Promote User</h3>
          <form onSubmit={handleAddTrainer} className="space-y-4">
            <input 
              type="email" 
              placeholder="Enter user email..." 
              value={newTrainerEmail} 
              onChange={(e) => setNewTrainerEmail(e.target.value)} 
              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" 
            />
            <button type="submit" className="w-full bg-blue-600 py-3 rounded-xl text-xs font-bold uppercase hover:bg-blue-500">
              Promote to Staff
            </button>
            {statusMessage && <p className="text-[10px] text-center text-zinc-400 mt-2">{statusMessage}</p>}
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Active Team Members</h3>
          {loading ? <p className="text-zinc-600">Loading...</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trainers.map((t) => (
                <div key={t.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex flex-col gap-3">
                  <h4 className="font-bold text-sm">{t.full_name || 'No Name'}</h4>
                  <p className="text-[10px] text-zinc-400">📧 {t.email || 'No email'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}