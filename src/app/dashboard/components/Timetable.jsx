'use client';

import { useState } from 'react';

export default function Timetable() {
  const [bookedClasses, setBookedClasses] = useState([]);

  const classes = [
    { id: 1, name: "Vinyasa Yoga Flow", time: "07:00 AM - 08:00 AM", instructor: "Sophia Reed", capacity: "12 slots left", type: "Yoga" },
    { id: 2, name: "Cardio Zumba Blast", time: "09:30 AM - 10:30 AM", instructor: "Marcus Silva", capacity: "5 slots left", type: "Zumba" },
    { id: 3, name: "Power Pilates Core", time: "11:00 AM - 12:00 PM", instructor: "Emma Watson", capacity: "Fully Booked", type: "Yoga" },
    { id: 4, name: "High-Intensity Zumba", time: "05:30 PM - 06:30 PM", instructor: "Carlos Mendez", capacity: "8 slots left", type: "Zumba" },
  ];

  const handleBook = (id) => {
    if (bookedClasses.includes(id)) {
      setBookedClasses(bookedClasses.filter(item => item !== id));
    } else {
      setBookedClasses([...bookedClasses, id]);
    }
  };

  return (
    <div className="bg-zinc-950/40 border border-zinc-900 p-6 rounded-2xl shadow-xl mt-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold uppercase tracking-wider text-white">Class Timetable</h3>
        <p className="text-zinc-500 text-xs mt-1">Reserve your spot in our live group conditioning sessions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {classes.map((c) => {
          const isBooked = bookedClasses.includes(c.id);
          const isFull = c.capacity === "Fully Booked";

          return (
            <div key={c.id} className="bg-zinc-900/30 border border-zinc-900 p-4 rounded-xl flex justify-between items-center hover:border-zinc-800 transition-colors">
              <div>
                <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-wider ${
                  c.type === 'Yoga' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-purple-500/10 text-purple-400'
                }`}>
                  {c.type}
                </span>
                <h4 className="font-extrabold text-white mt-1.5">{c.name}</h4>
                <p className="text-xs text-zinc-400 mt-1">🕒 {c.time}</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">Instructor: {c.instructor} • <span className={isFull ? "text-rose-500" : "text-emerald-500"}>{c.capacity}</span></p>
              </div>

              <button
                disabled={isFull && !isBooked}
                onClick={() => handleBook(c.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isBooked 
                    ? 'bg-emerald-600 text-white' 
                    : isFull 
                    ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' 
                    : 'bg-zinc-800 hover:bg-orange-500 hover:text-white text-zinc-300'
                }`}
              >
                {isBooked ? 'Booked ✓' : isFull ? 'Full' : 'Book'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}