'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle2,
  ChevronRight,
  ListChecks,
  Play,
  Target,
  Timer,
  Trophy,
  X,
} from 'lucide-react';
import type { Exercise } from '@/lib/types';

interface RoutineTimelineProps {
  exercises: Exercise[];
  onClose: () => void;
  onResumeRoutine: () => void;
}

export function RoutineTimeline({
  exercises,
  onClose,
  onResumeRoutine,
}: RoutineTimelineProps) {
  const completedCount = exercises.filter((ex) => ex.completed).length;
  const totalCount = exercises.length;
  const allCompleted = completedCount === totalCount;
  const inProgress = completedCount > 0 && completedCount < totalCount;

  let buttonText = 'Iniciar Primer Ejercicio';
  let ButtonIcon = Play;
  let buttonDisabled = false;

  if (allCompleted) {
    buttonText = 'Rutina Completada';
    ButtonIcon = Trophy;
    buttonDisabled = true;
  } else if (inProgress) {
    buttonText = 'Continuar Rutina';
    ButtonIcon = Play;
  }

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
          <X className="w-5 h-5 text-white" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-3 py-1.5"
        >
          <ListChecks className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-300 text-xs font-bold">
            {completedCount}/{totalCount} completados
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-5 mb-6"
      >
        <h1 className="text-white text-2xl font-bold mb-1">Rutina de Hoy</h1>
        <p className="text-slate-400 text-sm">Pecho y Tríceps • Hipertrofia</p>
      </motion.div>

      <div className="relative px-5 pb-32">
        <div className="space-y-6">
          {exercises.map((exercise, idx) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="flex flex-row items-stretch gap-4"
            >
              <div className="w-12 flex-shrink-0 flex flex-col items-center relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-slate-950 shadow-lg z-10 relative my-auto ${
                    exercise.completed
                      ? 'bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-emerald-500/30'
                      : 'bg-gradient-to-br from-slate-600 to-slate-700 shadow-slate-500/20'
                  }`}
                >
                  {exercise.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-white fill-white" />
                  ) : (
                    <span className="text-white font-bold text-sm">
                      {idx + 1}
                    </span>
                  )}
                </div>
                <div
                  className={`absolute inset-0 rounded-full blur-md ${
                    exercise.completed ? 'bg-emerald-400/30' : 'bg-slate-600/20'
                  }`}
                />

                {idx !== exercises.length - 1 && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-0.5 h-[calc(100%+1.5rem)] bg-gradient-to-b from-emerald-400 to-cyan-500/30 -z-10" />
                )}
              </div>

              <div
                className={`flex-1 backdrop-blur-md border rounded-2xl overflow-hidden shadow-xl ${
                  exercise.completed
                    ? 'bg-slate-900/60 border-emerald-500/30'
                    : 'bg-slate-900/60 border-white/10'
                }`}
              >
                <div className="flex gap-3 p-3 items-center">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
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
                          exercise.completed
                            ? 'text-emerald-400'
                            : 'text-slate-500'
                        }`}
                      >
                        {exercise.completed ? 'Completado' : exercise.muscle}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 sticky bottom-6"
        >
          <motion.button
            whileHover={
              !buttonDisabled
                ? { scale: 1.02, boxShadow: '0 0 40px rgba(52,211,153,0.6)' }
                : {}
            }
            whileTap={!buttonDisabled ? { scale: 0.98 } : {}}
            onClick={!buttonDisabled ? onResumeRoutine : undefined}
            disabled={buttonDisabled}
            className="w-full flex items-center justify-center gap-2 font-bold text-sm py-4 rounded-2xl shadow-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-emerald-500/30"
          >
            <ButtonIcon className="w-5 h-5 fill-current" />
            {buttonText}
            {!allCompleted && <ChevronRight className="w-4 h-4" />}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
