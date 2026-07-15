'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient'; 
import Link from 'next/link';

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      // We are only selecting columns that exist in your screenshot
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, phone, subscription_tier, subscription_end_date');

      if (error) {
        console.error("Error fetching members:", error);
      } else {
        setMembers(data || []);
      }
      setLoading(false);
    };

    fetchMembers();
  }, []);

  return (
    <div className="p-8 space-y-8 min-h-screen bg-black text-white">
      <div>
        <Link href="/dashboard" className="text-xs text-zinc-500 hover:text-white transition uppercase tracking-widest">
          ← Back to HQ Control Desk
        </Link>
        <h1 className="text-4xl font-black uppercase tracking-tighter mt-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
          Gym Members
        </h1>
      </div>

      {loading ? (
        <p className="text-zinc-600">Loading directory...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((m) => (
            <div key={m.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl hover:border-orange-500/50 transition">
              <h4 className="font-bold text-white text-sm">{m.full_name || 'No Name Provided'}</h4>
              
              <div className="mt-3 space-y-2 border-t border-zinc-800 pt-3">
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest">📧 {m.email || 'No email'}</p>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest">📞 {m.phone || 'No phone set'}</p>
                
                <div className="pt-2">
                    <p className="text-[9px] text-zinc-500 uppercase">Tier: {m.subscription_tier || 'None'}</p>
                    <p className="text-[9px] text-orange-500 font-bold uppercase mt-1">
                      Expires: {m.subscription_end_date ? new Date(m.subscription_end_date).toLocaleDateString() : 'N/A'}
                    </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}