'use client';

import { motion } from 'framer-motion';
import { Dumbbell, Flame } from 'lucide-react';

interface HeaderProps {
  streak: number;
}

export function Header({ streak }: HeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-5 pt-6 pb-4 flex flex-col gap-4"
    >
      {/* Fila 1: Identidad de Marca */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex justify-center items-center"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900/60 backdrop-blur-md border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 border border-emerald-500/30">
            <Dumbbell className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-emerald-500 text-[10px] font-bold tracking-widest uppercase">
            The Gym VIP
          </span>
        </motion.div>
      </motion.div>

      {/* Fila 2: Espacio Personal */}
      <div className="flex justify-between items-end">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-xs font-medium"
          >
            Buenos días
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white text-3xl font-bold tracking-tight"
          >
            Hola, Juan
          </motion.h1>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full px-3 py-1.5 backdrop-blur-sm"
          >
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
            <span className="text-orange-300 text-xs font-bold">
              {streak} días
            </span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full opacity-75 blur-sm" />
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-400/50">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-950 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
