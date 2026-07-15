'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function SupplementShop() {
  const [supps, setSupps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupps = async () => {
      const { data } = await supabase.from('supplements').select('*').eq('is_active', true);
      setSupps(data || []);
      setLoading(false);
    };
    fetchSupps();
  }, []);

  if (loading) return null;

  return (
    <div className="bg-zinc-950/40 border border-zinc-900 p-6 rounded-2xl shadow-xl mt-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold uppercase tracking-wider text-white">Member Nutrition Club</h3>
        <p className="text-zinc-500 text-xs mt-1">Pre-order elite supplements at standard member-only discount pricing.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {supps.map((item) => (
          <div key={item.id} className="bg-zinc-900/30 border border-zinc-900 p-4 rounded-xl flex justify-between items-center">
            <div>
              <h4 className="font-extrabold text-white text-sm">{item.name}</h4>
              <p className="text-xs text-zinc-500 mt-0.5">Special pricing via local locker scan</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-zinc-500 line-through font-mono">${item.original_price}</span>
                <span className="text-sm font-black text-emerald-400 font-mono">${item.sale_price}</span>
              </div>
            </div>
            <button className="bg-orange-600 hover:bg-orange-700 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg transition-all cursor-pointer">
              Reserve Item
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}