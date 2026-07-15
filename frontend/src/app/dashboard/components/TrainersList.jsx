'use client';

import { useState } from 'react';

export default function TrainersList() {
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [bookedSlot, setBookedSlot] = useState({});

  const trainers = [
    { 
      id: 1, 
      name: "Coach Alexander", 
      specialty: "Hypertrophy & Strength", 
      bio: "Former powerlifting champion specializing in maximum mechanical tension training.",
      avatar: "💪", 
      slots: ["08:00 AM", "10:00 AM", "02:00 PM"] 
    },
    { 
      id: 2, 
      name: "Trainer Sarah", 
      specialty: "Kettlebell & Athleticism", 
      bio: "Focuses on explosive power, structural mobility, and high-intensity energy systems.",
      avatar: "⚡", 
      slots: ["09:00 AM", "11:00 AM", "04:00 PM"] 
    }
  ];

  const handleBookSlot = (trainerId, slot) => {
    setBookedSlot({ ...bookedSlot, [trainerId]: slot });
  };

  return (
    <div className="bg-zinc-950/40 border border-zinc-900 p-6 rounded-2xl shadow-xl mt-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold uppercase tracking-wider text-white">Elite Coaching Staff</h3>
        <p className="text-zinc-500 text-xs mt-1">Book a 1-on-1 private conditioning session with certified experts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trainers.map((t) => (
          <div key={t.id} className="bg-zinc-900/20 border border-zinc-900 p-5 rounded-xl hover:border-zinc-800/80 transition-all flex gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xl">
              {t.avatar}
            </div>
            <div className="flex-1">
              <h4 className="font-extrabold text-white text-base">{t.name}</h4>
              <p className="text-xs text-orange-500 uppercase tracking-widest font-semibold mt-0.5">{t.specialty}</p>
              <p className="text-zinc-400 text-xs mt-2 leading-relaxed">{t.bio}</p>
              
              {/* Slot booking area */}
              <div className="mt-4">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-2">Available Slots Today:</p>
                <div className="flex flex-wrap gap-2">
                  {t.slots.map((slot) => {
                    const isBooked = bookedSlot[t.id] === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => handleBookSlot(t.id, slot)}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                          isBooked 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {isBooked ? `${slot} (Booked)` : slot}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}