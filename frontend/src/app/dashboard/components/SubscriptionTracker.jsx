'use client';

export default function SubscriptionTracker({ profile }) {
  const calculateDaysLeft = (endDateString) => {
    if (!endDateString) return 0;
    const diffTime = new Date(endDateString) - new Date();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysLeft = calculateDaysLeft(profile?.subscription_end_date);

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/80 p-6 rounded-2xl backdrop-blur-sm relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
      <div className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Active Tier Plan</div>
      <div className="text-3xl font-black mt-2 text-white uppercase tracking-wider">
        {profile?.subscription_tier || 'Iron Elite'}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <p className="text-xs text-zinc-400 font-semibold">{daysLeft} Days Remaining on Access</p>
      </div>
    </div>
  );
}