'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import SubscriptionTracker from './components/SubscriptionTracker';
import WorkoutPlanner from './components/WorkoutPlanner';
import Timetable from './components/Timetable';
import TrainersList from './components/TrainersList';
import SupplementShop from './components/SupplementShop';
import AdminPanel from './components/AdminPanel';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  
  // Edit Profile States
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editDob, setEditDob] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        setLoading(false);
        return;
      }

      setProfile(profileData);
      setEditName(profileData.full_name || '');
      setEditPhone(profileData.phone || '');
      setEditAge(profileData.age || '');
      setEditDob(profileData.dob || '');

      if (!profileData?.full_name || !profileData?.phone || !profileData?.email) {
        router.push('/setup-profile');
        return;
      }
      setLoading(false);
    };

    fetchUserData();
  }, [router]);

  const handleUpdate = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({ 
        full_name: editName, 
        phone: editPhone,
        age: editAge,
        dob: editDob
      })
      .eq('id', user.id);
    
    if (!error) {
      setProfile({...profile, full_name: editName, phone: editPhone, age: editAge, dob: editDob});
      setActiveSection('overview');
      alert("Settings updated successfully!");
    } else {
      alert("Error updating profile");
    }
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const isAdmin = profile?.role === 'admin';

  const menuItems = isAdmin 
    ? [
        { id: 'admin-overview', label: 'Admin Panel', icon: '🛠️' },
        { id: 'shop', label: 'Monitor Shop', icon: '🥛' },
      ]
    : [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'workout-split', label: 'Weekly Split', icon: '🏋️‍♂️' },
        { id: 'timetable', label: 'Class Timetable', icon: '🗓️' },
        { id: 'trainers', label: 'Coaching Staff', icon: '🤝' },
        { id: 'shop', label: 'Nutrition Shop', icon: '🥛' },
      ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950/80 border-r border-zinc-900/80 p-6 flex flex-col justify-between fixed h-screen z-20">
        <div className="space-y-8">
          <h1 className="text-2xl font-black tracking-wider text-orange-500 cursor-pointer" onClick={() => router.push('/')}>
            IRON<span className="text-white">PULSE</span>
          </h1>
          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold uppercase ${
                  activeSection === item.id ? 'bg-orange-600/10 text-orange-500' : 'text-zinc-400'
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="border-t border-zinc-900 pt-6">
          <div className="text-sm font-black text-white truncate mb-2">{profile?.full_name}</div>
          <button onClick={() => setActiveSection('settings')} className="text-[10px] text-zinc-500 hover:text-white uppercase tracking-widest font-bold mb-4 block">
            ⚙️ Account Settings
          </button>
          <button 
            onClick={async () => { await supabase.auth.signOut(); router.push('/login'); }} 
            className="w-full bg-zinc-900 py-2 rounded-lg font-bold text-xs uppercase"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 ml-64 max-w-5xl">
        {activeSection === 'settings' ? (
          <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-700 space-y-4">
            <h2 className="text-2xl font-black mb-6">Account Settings</h2>
            <input value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full p-3 bg-black border border-zinc-600 rounded" placeholder="Full Name" />
            <input value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="w-full p-3 bg-black border border-zinc-600 rounded" placeholder="Phone Number" />
            <input value={editAge} onChange={(e) => setEditAge(e.target.value)} className="w-full p-3 bg-black border border-zinc-600 rounded" placeholder="Age" />
            <input type="date" value={editDob} onChange={(e) => setEditDob(e.target.value)} className="w-full p-3 bg-black border border-zinc-600 rounded" />
            <button onClick={handleUpdate} className="bg-orange-600 px-8 py-3 rounded-lg font-bold">Save Changes</button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Dashboard Sections ... */}
            {isAdmin ? (
              <div className="space-y-8"><AdminPanel /><SupplementShop /></div>
            ) : (
              <div className="space-y-8">
                <header id="overview" className="scroll-mt-24"><h2 className="text-3xl font-black">Welcome Back, {profile?.full_name}</h2></header>
                <SubscriptionTracker profile={profile} />
                <div id="workout-split" className="scroll-mt-24"><WorkoutPlanner /></div>
                <div id="timetable" className="scroll-mt-24"><Timetable /></div>
                <div id="trainers" className="scroll-mt-24"><TrainersList /></div>
                <div id="shop" className="scroll-mt-24"><SupplementShop /></div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}