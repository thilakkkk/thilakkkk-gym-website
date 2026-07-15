'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function EditProfile({ profile, onUpdate }) {
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');

  const handleUpdate = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, phone: phone })
      .eq('id', profile.id);

    if (!error) {
      alert("Profile updated!");
      onUpdate(); // Call this to refresh the data
    }
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
      <h3 className="text-lg font-bold mb-4">Edit Profile</h3>
      <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-2 bg-black mb-2" />
      <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 bg-black mb-2" />
      <button onClick={handleUpdate} className="bg-orange-600 px-4 py-2 mt-2">Save Changes</button>
    </div>
  );
}