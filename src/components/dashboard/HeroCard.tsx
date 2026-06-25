'use client';

import { motion } from 'framer-motion';
import {
  ChevronRight,
  Dumbbell,
  Play,
  Sparkles,
  Timer,
  Zap,
} from 'lucide-react';

interface HeroCardProps {
  onStartRoutine: () => void;
}

export function HeroCard({ onStartRoutine }: HeroCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mx-5 mb-6"
    >
      <motion.div
        whileHover={{ scale: 1.02, y: -3 }}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-emerald-500/10"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop"
            alt="Gym"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10" />
        </div>
        <div className="relative p-6 pt-20 pb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-3 py-1 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-300 text-xs font-semibold">
              Recomendado por IA
            </span>
          </motion.div>
          <h2 className="text-white text-xl font-bold mb-1 leading-tight">
            Día 1: Pecho y Tríceps
          </h2>
          <p className="text-slate-400 text-sm mb-1">
            Hipertrofia • Nivel Intermedio
          </p>
          <div className="flex items-center gap-4 mt-4 mb-6">
            <div className="flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-300 text-xs font-medium">
                5 ejercicios
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Timer className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-300 text-xs font-medium">~45 min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-300 text-xs font-medium">320 kcal</span>
            </div>
          </div>
          <motion.button
            onClick={onStartRoutine}
            whileHover={{
              scale: 1.03,
              boxShadow: '0 0 30px rgba(52,211,153,0.4)',
            }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm py-3.5 rounded-2xl shadow-lg shadow-emerald-500/30"
          >
            <Play className="w-4 h-4 fill-current" /> Comenzar Rutina{' '}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
