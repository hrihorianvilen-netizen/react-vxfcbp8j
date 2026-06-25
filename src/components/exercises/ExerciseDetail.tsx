'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  Dumbbell,
  Info,
  Pause,
  Play,
  Sparkles,
  Target,
  Timer,
} from 'lucide-react';
import type { Exercise } from '@/lib/types';
import { useRestTimer } from '@/hooks/useRestTimer';

interface ExerciseDetailProps {
  exercise: Exercise;
  onClose: () => void;
  onCompleteAndNext: (exerciseId: number) => void;
}

export function ExerciseDetail({
  exercise,
  onClose,
  onCompleteAndNext,
}: ExerciseDetailProps) {
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const restSeconds = parseInt(exercise.rest, 10) || 90;

  const { isPaused, isTimeUp, progress, formatted, togglePause } = useRestTimer(
    restSeconds,
    isWorkoutActive
  );

  const handleCompleteSet = () => {
    onCompleteAndNext(exercise.id);
    setIsWorkoutActive(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-slate-950 overflow-y-auto no-scrollbar"
    >
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>
      <div className="relative h-[50vh] overflow-hidden">
        <motion.div
          layoutId={`exercise-image-${exercise.id}`}
          className="absolute inset-0"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <img
            src={exercise.image}
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/60 to-slate-950" />
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-6 left-5 z-20 w-11 h-11 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </motion.button>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-20 h-20 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50"
          >
            <Play className="w-8 h-8 text-slate-950 fill-current ml-1" />
          </motion.button>
        </motion.div>
      </div>
      <div className="relative px-5 pb-32 -mt-8">
        <motion.div
          layoutId={`exercise-title-${exercise.id}`}
          className="mb-1"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <h1 className="text-white text-3xl font-bold tracking-tight">
            {exercise.name}
          </h1>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isWorkoutActive ? (
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 text-sm mb-6"
              >
                {exercise.sets} • Descanso {exercise.rest} entre series
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-3 gap-3 mb-6"
              >
                <div className="bg-slate-900/60 backdrop-blur-md border border-white/5 rounded-2xl p-3 text-center">
                  <Dumbbell className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <p className="text-white font-bold text-sm">
                    {exercise.sets.split(' x ')[0]}
                  </p>
                  <p className="text-slate-500 text-[10px]">Series</p>
                </div>
                <div className="bg-slate-900/60 backdrop-blur-md border border-white/5 rounded-2xl p-3 text-center">
                  <Target className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <p className="text-white font-bold text-sm">
                    {exercise.sets.split(' x ')[1]}
                  </p>
                  <p className="text-slate-500 text-[10px]">Reps</p>
                </div>
                <div className="bg-slate-900/60 backdrop-blur-md border border-white/5 rounded-2xl p-3 text-center">
                  <Timer className="w-5 h-5 text-violet-400 mx-auto mb-1" />
                  <p className="text-white font-bold text-sm">{exercise.rest}</p>
                  <p className="text-slate-500 text-[10px]">Descanso</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-white font-bold text-sm">
                    Técnica Correcta
                  </h3>
                </div>
                <div className="bg-slate-900/60 backdrop-blur-md border border-white/5 rounded-2xl p-4">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {exercise.description}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-white font-bold text-sm">
                    Músculos Involucrados
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {exercise.muscles.map((muscle, idx) => (
                    <motion.div
                      key={muscle}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      className="bg-slate-900/80 backdrop-blur-md border border-emerald-400/30 rounded-full px-4 py-2"
                    >
                      <span className="text-emerald-300 text-xs font-semibold">
                        {muscle}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-violet-400" />
                  <h3 className="text-white font-bold text-sm">Beneficios</h3>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-br from-violet-500/10 via-slate-900/80 to-slate-900/60 border border-violet-500/30 rounded-2xl p-4 backdrop-blur-md">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl" />
                  <div className="relative flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-violet-400 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-200 text-sm leading-relaxed">
                        {exercise.benefits}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 0 40px rgba(52,211,153,0.5)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsWorkoutActive(true)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm py-4 rounded-2xl shadow-lg shadow-emerald-500/30"
                >
                  <Play className="w-4 h-4 fill-current" /> Comenzar Ejercicio
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="workout-active"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-emerald-500/30 rounded-3xl p-6 backdrop-blur-md mb-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-3xl" />

                <div className="relative">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <motion.div
                      animate={isPaused ? {} : { opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className={`w-2 h-2 rounded-full ${
                        isPaused ? 'bg-amber-400' : 'bg-emerald-400'
                      }`}
                    />
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        isPaused ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      {isPaused ? 'Pausado' : 'Entrenamiento en Curso'}
                    </span>
                  </div>

                  <div className="text-center mb-6">
                    <p className="text-slate-400 text-xs mb-1">Serie Actual</p>
                    <p className="text-white font-bold text-xl">1 / 4</p>
                  </div>

                  <div className="text-center mb-6">
                    <motion.div
                      animate={
                        isTimeUp
                          ? {
                              color: ['#ef4444', '#dc2626', '#ef4444'],
                              textShadow: [
                                '0 0 20px rgba(239,68,68,0.8)',
                                '0 0 40px rgba(239,68,68,1)',
                                '0 0 20px rgba(239,68,68,0.8)',
                              ],
                            }
                          : {
                              textShadow: [
                                '0 0 20px rgba(52,211,153,0.8)',
                                '0 0 40px rgba(52,211,153,1)',
                                '0 0 20px rgba(52,211,153,0.8)',
                              ],
                            }
                      }
                      transition={{ duration: 1, repeat: Infinity }}
                      className={`text-6xl font-bold tracking-wider ${
                        isTimeUp ? 'text-red-500' : 'text-emerald-400'
                      }`}
                    >
                      {formatted}
                    </motion.div>
                    <p
                      className={`text-xs mt-2 ${
                        isTimeUp ? 'text-red-400 font-bold' : 'text-slate-400'
                      }`}
                    >
                      {isTimeUp ? '¡Tiempo completado!' : 'Tiempo de descanso'}
                    </p>
                  </div>

                  <div className="flex justify-center mb-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={togglePause}
                      disabled={isTimeUp}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs border backdrop-blur-md transition-all ${
                        isTimeUp
                          ? 'bg-slate-800/40 border-slate-700/50 text-slate-500 cursor-not-allowed'
                          : isPaused
                          ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/30'
                          : 'bg-amber-500/20 border-amber-400/40 text-amber-300 hover:bg-amber-500/30'
                      }`}
                    >
                      {isPaused ? (
                        <>
                          <Play className="w-4 h-4 fill-current" /> Reanudar
                        </>
                      ) : (
                        <>
                          <Pause className="w-4 h-4 fill-current" /> Pausar
                        </>
                      )}
                    </motion.button>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-slate-400 text-[10px]">
                        Progreso de descanso
                      </span>
                      <span className="text-emerald-400 text-[10px] font-bold">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          isTimeUp
                            ? 'bg-gradient-to-r from-red-500 to-orange-500'
                            : 'bg-gradient-to-r from-emerald-400 to-cyan-400'
                        } shadow-[0_0_10px_rgba(52,211,153,0.5)]`}
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 0 30px rgba(52,211,153,0.6)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCompleteSet}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm py-4 rounded-2xl shadow-lg shadow-emerald-500/30"
                  >
                    <CheckCircle2 className="w-5 h-5" /> Completar Ejercicio
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
