'use client';

import { useState } from 'react';

export default function WorkoutPlanner() {
  const [activeDay, setActiveDay] = useState(1);

  const workoutSplits = {
    1: { name: "Chest & Triceps", exercises: ["Incline Barbell Press (4x8)", "Dumbbell Flyes (3x12)", "Tricep Overhead Extensions (4x10)", "Cable Pushdowns (3x15)"] },
    2: { name: "Back & Biceps", exercises: ["Weighted Pull-Ups (4x6)", "Barbell Rows (4x8)", "Lat Pulldowns (3x10)", "Incline Dumbbell Curls (4x12)"] },
    3: { name: "Shoulders & Traps", exercises: ["Overhead Barbell Press (4x6)", "Dumbbell Lateral Raises (4x15)", "Rear Delt Flyes (3x12)", "Barbell Shrugs (4x10)"] },
    4: { name: "Arms Focus", exercises: ["Close-Grip Bench Press (4x8)", "Preacher Curls (4x10)", "Skull Crushers (3x12)", "Hammer Curls (3x12)"] },
    5: { name: "Abs & Core Endurance", exercises: ["Hanging Leg Raises (4x15)", "Ab Wheel Rollouts (3x12)", "Plank-to-Pushup (3x1 Min)", "Cable Woodchoppers (3x15)"] },
    6: { name: "Legs & Lower Body Destroy", exercises: ["Barbell Back Squats (5x5)", "Romanian Deadlifts (4x8)", "Leg Press (3x12)", "Calf Raises (4x20)"] },
    7: { name: "Sunday Rest & Recovery", exercises: ["30-Minute Mobility Stretch", "Foam Rolling Session", "Hydrate & Hydrate! 💧"] }
  };

  return (
    <section className="bg-zinc-950/40 border border-zinc-900 p-8 rounded-2xl shadow-xl mt-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold uppercase tracking-wider">Interactive Weekly Split</h3>
        <p className="text-zinc-500 text-xs mt-1">Select any structured training day block below to load your custom routine guidelines.</p>
      </div>

   {/* Replace this grid section in your WorkoutPlanner.jsx */}
<div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-8">
  {[
    { id: 1, name: "Mon" },
    { id: 2, name: "Tue" },
    { id: 3, name: "Wed" },
    { id: 4, name: "Thu" },
    { id: 5, name: "Fri" },
    { id: 6, name: "Sat" },
    { id: 7, name: "Sun" },
  ].map((day) => (
    <button
      key={day.id}
      onClick={() => setActiveDay(day.id)}
      className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all text-center ${
        activeDay === day.id 
          ? 'bg-orange-500 text-white' 
          : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
      }`}
    >
      {day.name}
    </button>
  ))}
</div>

      <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6">
        <h4 className="text-lg font-bold text-orange-400 uppercase tracking-wide mb-4 border-b border-zinc-900 pb-2">
          Target Focus: {workoutSplits[activeDay].name}
        </h4>
        <ul className="space-y-3">
          {workoutSplits[activeDay].exercises.map((exercise, idx) => (
            <li key={idx} className="flex items-center gap-3 text-sm text-zinc-300 bg-zinc-900/30 p-3 rounded-lg border border-zinc-900/60">
              <span className="text-orange-500 text-xs">⚡</span> {exercise}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}