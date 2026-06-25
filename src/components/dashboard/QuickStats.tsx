'use client';

import { motion } from 'framer-motion';
import { Activity, Flame, Target } from 'lucide-react';

interface QuickStatsProps {
  calories: number;
  cardio: number;
  goalPercentage: number;
}

export function QuickStats({
  calories,
  cardio,
  goalPercentage,
}: QuickStatsProps) {
  const stats = [
    {
      icon: Flame,
      label: 'Calorías',
      value: calories.toLocaleString(),
      color: 'text-orange-400',
      bg: 'bg-orange-500/10 border-orange-500/20',
    },
    {
      icon: Activity,
      label: 'Cardio',
      value: `${cardio} min`,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
    },
    {
      icon: Target,
      label: 'Objetivo',
      value: `${goalPercentage}%`,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mx-5 mb-6 grid grid-cols-3 gap-3"
    >
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + idx * 0.1 }}
          className={`flex flex-col items-center justify-center p-3 rounded-2xl border backdrop-blur-md ${stat.bg}`}
        >
          <stat.icon className={`w-5 h-5 ${stat.color} mb-1.5`} />
          <span className="text-white font-bold text-sm">{stat.value}</span>
          <span className="text-slate-500 text-[10px]">{stat.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
