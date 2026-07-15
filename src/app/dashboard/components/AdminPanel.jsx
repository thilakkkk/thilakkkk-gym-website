'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';

export default function AdminPanel() {
  const [allMembers, setAllMembers] = useState([]);
  const [expiringMembers, setExpiringMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Supplement fields
  const [newSuppName, setNewSuppName] = useState('');
  const [newSuppPrice, setNewSuppPrice] = useState('');
  const [newSuppSalePrice, setNewSuppSalePrice] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, full_name, role, subscription_tier, subscription_end_date');

        if (error) {
          console.error("🚨 Supabase DB Error:", error.message);
          return;
        }

        const members = data || [];
        setAllMembers(members);

        const criticalMembers = members.filter(m => {
          if (!m.subscription_end_date) return false;
          const diffTime = new Date(m.subscription_end_date) - new Date();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays >= 0 && diffDays <= 5;
        });

        setExpiringMembers(criticalMembers);
      } catch (err) {
        console.error("🚨 Runtime Error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleAddSupplement = async (e) => {
    e.preventDefault();
    setStatusMessage('Processing...');

    if (!newSuppName || !newSuppPrice || !newSuppSalePrice) {
      setStatusMessage('⚠️ Please fill out all product fields.');
      return;
    }

    const origPrice = parseFloat(newSuppPrice);
    const salePrice = parseFloat(newSuppSalePrice);

    const { error } = await supabase.from('supplements').insert([
      {
        name: newSuppName,
        original_price: origPrice,
        sale_price: salePrice,
        discount_percentage: Math.round(((origPrice - salePrice) / origPrice) * 100),
        is_active: true
      }
    ]);

    if (error) {
      setStatusMessage(`❌ Error: ${error.message}`);
    } else {
      setStatusMessage('✅ Supplement successfully deployed!');
      setNewSuppName('');
      setNewSuppPrice('');
      setNewSuppSalePrice('');
    }
  };

  return (
    <div className="space-y-8 p-4">
      {/* Admin Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 p-8 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <span className="bg-black/30 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full">System Admin Panel</span>
          <h2 className="text-3xl font-black uppercase mt-3 tracking-wide text-white">HQ Control Desk</h2>
        </div>
      </div>

      {/* Row 1: Expiration Radar & Supplement Deployer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-950/40 border border-zinc-900 p-6 rounded-2xl shadow-xl">
          <h3 className="text-lg font-bold uppercase tracking-wider text-rose-500 mb-4">⚠️ Expiration Radar</h3>
          <div className="space-y-3">
            {loading ? <p className="text-zinc-500">Loading...</p> : expiringMembers.length === 0 ? 
              <p className="text-xs text-zinc-400">All clear! 👍</p> : 
              expiringMembers.map(m => (
                <div key={m.id} className="bg-rose-500/5 p-4 rounded-xl flex justify-between">
                  <span className="text-sm font-bold text-white">{m.full_name}</span>
                  <span className="text-xs text-rose-400">Ends: {m.subscription_end_date}</span>
                </div>
              ))
            }
          </div>
        </div>

        <div className="bg-zinc-950/40 border border-zinc-900 p-6 rounded-2xl shadow-xl">
          <h3 className="text-lg font-bold uppercase tracking-wider text-emerald-400 mb-4">🥛 Supplement Deployer</h3>
          <form onSubmit={handleAddSupplement} className="space-y-4">
            <input placeholder="Product Name" value={newSuppName} onChange={(e) => setNewSuppName(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-xs text-white" />
            <div className="grid grid-cols-2 gap-4">
              <input type="number" placeholder="Regular Price" value={newSuppPrice} onChange={(e) => setNewSuppPrice(e.target.value)} className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-xs text-white" />
              <input type="number" placeholder="Member Price" value={newSuppSalePrice} onChange={(e) => setNewSuppSalePrice(e.target.value)} className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-xs text-white" />
            </div>
            <button type="submit" className="w-full bg-orange-600 py-2 rounded-lg text-xs font-bold uppercase">Push Live</button>
            {statusMessage && <p className="text-center text-[10px] text-zinc-400">{statusMessage}</p>}
          </form>
        </div>
      </div>

      {/* Row 2: Management Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Trainer Management */}
        <div className="bg-zinc-950/40 border border-zinc-900 p-6 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold uppercase tracking-wider text-blue-400">🏋️ Trainer Management</h3>
            <Link href="/dashboard/trainers" className="text-xs bg-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-500 transition">Manage All</Link>
          </div>
          <p className="text-zinc-500 text-sm">Assign members to trainers and track staff performance.</p>
        </div>

        {/* Gym Member Directory */}
        <div className="bg-zinc-950/40 border border-zinc-900 p-6 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold uppercase tracking-wider text-orange-400">👥 Gym Member Directory</h3>
            <Link href="/dashboard/members" className="text-xs bg-orange-600 px-4 py-2 rounded-lg font-bold hover:bg-orange-500 transition">View All</Link>
          </div>
          <p className="text-zinc-500 text-sm">Access the full list of registered members and their contact details.</p>
        </div>
      </div>
    </div>
  );
}