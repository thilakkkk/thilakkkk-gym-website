'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import SubscriptionTracker from './components/SubscriptionTracker';
import WorkoutPlanner from './components/WorkoutPlanner';
import Timetable from './components/Timetable';
import TrainersList from './components/TrainersList';
import SupplementShop from './components/SupplementShop';
import AdminPanel from './components/AdminPanel'; // Brand new import!

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setProfile(profileData);
      setLoading(false);
    };

    fetchUserData();
  }, [router]);

  // Smooth scroll handler
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

  // Dynamic Sidebar items based on the user's role
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
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-zinc-950/80 border-r border-zinc-900/80 p-6 flex flex-col justify-between hidden md:flex fixed h-screen z-20">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-black tracking-wider text-orange-500 cursor-pointer" onClick={() => router.push('/')}>
              IRON<span className="text-white">PULSE</span>
            </h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 font-bold">Elite Member Portal</p>
          </div>

          {/* Quick-Navigation Links */}
          <nav className="space-y-1.5">
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-black mb-3 pl-2">Navigation</p>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer text-left ${
                  activeSection === item.id 
                    ? 'bg-orange-600/10 text-orange-500 border border-orange-500/20 shadow-md shadow-orange-500/5' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40 border border-transparent'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* User Info Block */}
        <div className="border-t border-zinc-900 pt-6">
          <div className="text-xs font-bold text-zinc-400 truncate mb-1">Signed in as ({profile?.role || 'member'})</div>
          <div className="text-sm font-black text-white truncate mb-4">{profile?.full_name || user?.email}</div>
          <button 
            onClick={async () => { await supabase.auth.signOut(); router.push('/login'); }} 
            className="w-full bg-zinc-900/80 hover:bg-rose-955 border border-zinc-800 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto max-w-5xl md:ml-64">
        
        {/* CONDITIONAL RENDER: ADMIN VIEW */}
        {isAdmin ? (
          <div className="space-y-8">
            <div id="admin-overview" className="scroll-mt-24">
              <AdminPanel />
            </div>
            
            <div id="shop" className="scroll-mt-24">
              {/* Admins can see the live client shop to monitor active stock */}
              <SupplementShop />
            </div>
          </div>
        ) : (
          /* CONDITIONAL RENDER: STANDARD CLIENT/MEMBER VIEW */
          <div className="space-y-8">
            <header id="overview" className="mb-8 pt-4 scroll-mt-24">
              <h2 className="text-3xl font-black uppercase tracking-wide">Welcome Back, {profile?.full_name || 'Champion'}</h2>
              <p className="text-zinc-500 text-sm mt-1">Your premium member control center and live club access.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SubscriptionTracker profile={profile} />
              
              <div className="bg-zinc-900/30 border border-zinc-800/80 p-6 rounded-2xl backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                <div className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Smart-Calorie Metric</div>
                <div className="text-4xl font-black mt-2">745 <span className="text-sm font-normal text-zinc-500">kcal burned</span></div>
                <p className="text-[11px] text-zinc-400 mt-2">📊 Aggregated calculation using account weight metric ({profile?.weight_kg || 75}kg).</p>
              </div>
            </div>

            <div id="workout-split" className="scroll-mt-24">
              <WorkoutPlanner />
            </div>

            <div id="timetable" className="scroll-mt-24">
              <Timetable />
            </div>

            <div id="trainers" className="scroll-mt-24">
              <TrainersList />
            </div>

            <div id="shop" className="scroll-mt-24">
              <SupplementShop />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}