'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Target, Timer } from 'lucide-react';
import type { Exercise } from '@/lib/types';

interface ExerciseLibraryCardProps {
  exercise: Exercise;
  onSelect: (exercise: Exercise) => void;
}

export function ExerciseLibraryCard({
  exercise,
  onSelect,
}: ExerciseLibraryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(exercise)}
      className="w-full cursor-pointer"
    >
      <div
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${exercise.color} backdrop-blur-md shadow-xl`}
      >
        <div className="flex gap-3 p-3">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
            <img
              src={exercise.image}
              alt={exercise.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
            {exercise.completed && (
              <div className="absolute top-1 right-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className={`font-bold text-sm mb-1.5 truncate ${
                exercise.completed ? 'text-emerald-300' : 'text-white'
              }`}
            >
              {exercise.name}
            </h3>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-1.5">
              <div className="flex items-center gap-1">
                <Target className="w-3 h-3 text-cyan-400" />
                <span className="text-slate-400 text-xs whitespace-nowrap">
                  {exercise.sets}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Timer className="w-3 h-3 text-emerald-400" />
                <span className="text-slate-400 text-xs whitespace-nowrap">
                  {exercise.rest}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  exercise.completed ? 'bg-emerald-400' : 'bg-slate-500'
                }`}
              />
              <span
                className={`text-[10px] font-medium truncate ${
                  exercise.completed ? 'text-emerald-400' : 'text-slate-500'
                }`}
              >
                {exercise.completed ? 'Completado' : exercise.muscle}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
