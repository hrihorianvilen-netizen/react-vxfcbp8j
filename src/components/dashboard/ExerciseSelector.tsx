'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { Exercise } from '@/lib/types';
import { ExerciseCard } from './ExerciseCard';

interface ExerciseSelectorProps {
  exercises: Exercise[];
  onSelectExercise: (exercise: Exercise) => void;
  onViewAll: () => void;
}

export function ExerciseSelector({
  exercises,
  onSelectExercise,
  onViewAll,
}: ExerciseSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between px-5 mb-4">
        <div>
          <h3 className="text-white font-bold text-base">Ejercicios de Hoy</h3>
          <p className="text-slate-500 text-xs mt-0.5">
            Toca para ver detalles →
          </p>
        </div>
        <button
          onClick={onViewAll}
          className="text-emerald-400 text-xs font-semibold flex items-center gap-1 hover:text-emerald-300 transition-colors"
        >
          Ver todos <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto px-5 pb-4 no-scrollbar">
        {exercises.map((exercise, idx) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            index={idx}
            onSelect={onSelectExercise}
          />
        ))}
      </div>
    </motion.div>
  );
}
