'use client';

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import type { WeekDayStat } from '@/lib/types';

interface WeeklyStreakProps {
  weekStats: WeekDayStat[];
}

export function WeeklyStreak({ weekStats }: WeeklyStreakProps) {
  const completedCount = weekStats.filter((day) => day.done).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mx-5 mb-6"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-sm">Tu Semana</h3>
        <span className="text-emerald-400 text-xs font-medium flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" />
          {completedCount}/7 completados
        </span>
      </div>
      <div className="flex items-center justify-between bg-slate-900/60 backdrop-blur-md border border-white/5 rounded-2xl p-3">
        {weekStats.map((day, idx) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + idx * 0.08 }}
            className="flex flex-col items-center gap-1.5"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                day.done
                  ? 'bg-gradient-to-br from-emerald-400 to-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(52,211,153,0.5)]'
                  : 'bg-slate-800/50 text-slate-500 border border-slate-700/50'
              }`}
            >
              {day.done ? '✓' : day.day}
            </div>
            <span
              className={`text-[10px] ${
                day.done ? 'text-emerald-400' : 'text-slate-600'
              }`}
            >
              {day.day}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
