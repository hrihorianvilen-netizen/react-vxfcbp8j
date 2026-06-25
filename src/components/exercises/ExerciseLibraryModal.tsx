'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Dumbbell } from 'lucide-react';
import type { Exercise } from '@/lib/types';
import { ExerciseLibraryCard } from './ExerciseLibraryCard';

interface ExerciseLibraryModalProps {
  exercises: Exercise[];
  onClose: () => void;
  onSelectExercise: (exercise: Exercise) => void;
}

export function ExerciseLibraryModal({
  exercises,
  onClose,
  onSelectExercise,
}: ExerciseLibraryModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl overflow-y-auto no-scrollbar"
    >
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative flex items-center justify-between px-5 pt-6 pb-4">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="w-11 h-11 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-3 py-1.5"
        >
          <Dumbbell className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-300 text-xs font-bold">
            {exercises.length} ejercicios
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-5 mb-6"
      >
        <h1 className="text-white text-2xl font-bold mb-1">
          Biblioteca de Ejercicios
        </h1>
        <p className="text-slate-400 text-sm">Catálogo completo del gimnasio</p>
      </motion.div>

      <div className="relative px-5 pb-32 space-y-3">
        {exercises.map((exercise, idx) => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.05 }}
          >
            <ExerciseLibraryCard
              exercise={exercise}
              onSelect={(ex) => {
                onClose();
                onSelectExercise(ex);
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
