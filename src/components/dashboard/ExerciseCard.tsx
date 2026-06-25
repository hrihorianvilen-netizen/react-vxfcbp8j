'use client';

import { motion } from 'framer-motion';
import { Activity, CheckCircle2, Target } from 'lucide-react';
import type { Exercise } from '@/lib/types';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  onSelect: (exercise: Exercise) => void;
}

export function ExerciseCard({ exercise, index, onSelect }: ExerciseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{
        scale: 1.05,
        y: -8,
        rotateY: 5,
        rotateX: -5,
        transition: { type: 'spring', stiffness: 300 },
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(exercise)}
      className="relative flex-shrink-0 w-64 group cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        layoutId={`exercise-card-bg-${exercise.id}`}
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${exercise.color} backdrop-blur-md shadow-xl`}
      >
        <div className="relative h-32 overflow-hidden">
          <motion.img
            layoutId={`exercise-image-${exercise.id}`}
            src={exercise.image}
            alt={exercise.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
          <div className="absolute top-2.5 left-2.5 bg-slate-950/70 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1">
            <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
              {exercise.muscle}
            </span>
          </div>

          <div className="absolute top-2.5 right-2.5">
            {exercise.completed ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-emerald-400 rounded-full blur-md opacity-75" />
                <div className="relative w-7 h-7 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center border-2 border-emerald-300 shadow-lg shadow-emerald-500/50">
                  <CheckCircle2 className="w-4 h-4 text-white fill-white" />
                </div>
              </motion.div>
            ) : (
              <div className="w-7 h-7 bg-slate-900/40 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-slate-500/50 rounded-full" />
              </div>
            )}
          </div>
        </div>
        <div className="p-4">
          <motion.h4
            layoutId={`exercise-title-${exercise.id}`}
            className="text-white font-bold text-sm mb-2"
          >
            {exercise.name}
          </motion.h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400 text-xs">{exercise.sets}</span>
            </div>
            <div className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400 text-xs">
                Descanso {exercise.rest}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
