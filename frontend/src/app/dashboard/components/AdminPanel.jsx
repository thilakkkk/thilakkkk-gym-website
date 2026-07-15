'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function AdminPanel() {
  const [allMembers, setAllMembers] = useState([]);
  const [expiringMembers, setExpiringMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Supplement fields
  const [newSuppName, setNewSuppName] = useState('');
  const [newSuppPrice, setNewSuppPrice] = useState('');
  const [newSuppSalePrice, setNewSuppSalePrice] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      try {
        // Fetch members with necessary fields. 
        // Ensure these columns exist in your 'profiles' table.
        const { data, error } = await supabase
          .from('profiles')
          .select('id, full_name, role, subscription_tier, subscription_end_date');

        if (error) {
          console.error("🚨 Supabase DB Error:", error.message);
          return;
        }

        const members = data || [];
        setAllMembers(members);

        // Filter critical members with 5 or fewer days remaining
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

  const calculateDaysLeft = (endDateStr) => {
    if (!endDateStr) return 'No active plan';
    const diffTime = new Date(endDateStr) - new Date();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired ❌';
    return `${diffDays} days left`;
  };

  const filteredMembers = allMembers.filter(member => 
    (member.full_name?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  const handleAddSupplement = async (e) => {
    e.preventDefault();
    setStatusMessage('');

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
    <div className="space-y-8">
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
    </div>
  );
}