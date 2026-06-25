'use client';

import { motion } from 'framer-motion';
import { Award, Heart, Sparkles, Zap } from 'lucide-react';
import { achievements, bodyStats, rpgAttributes } from '@/lib/data';

interface ProfilePageProps {
  xp: number;
}

const XP_PER_LEVEL = 3000;

export function ProfilePage({ xp }: ProfilePageProps) {
  const currentLevel = Math.floor(xp / XP_PER_LEVEL) + 1;
  const xpInCurrentLevel = xp % XP_PER_LEVEL;
  const xpProgress = (xpInCurrentLevel / XP_PER_LEVEL) * 100;

  const handleWhatsApp = () => {
    window.open(
      'https://wa.me/521234567890?text=Hola,%20quiero%20renovar%20mi%20membres%C3%ADa%20Premium',
      '_blank'
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-5 pt-6 pb-32"
    >
      <div className="text-center mb-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative inline-block mb-4"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 rounded-full opacity-75 blur-md animate-pulse" />
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-emerald-400/50">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center border-4 border-slate-950 shadow-lg">
            <span className="text-slate-950 font-bold text-sm">
              {currentLevel}
            </span>
          </div>
        </motion.div>
        <h2 className="text-white font-bold text-2xl mb-1">Juan García</h2>
        <p className="text-slate-400 text-sm mb-4">
          Miembro Premium • Atleta Élite
        </p>

        <div className="max-w-[240px] mx-auto">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-400 font-medium">
              Nivel {currentLevel}
            </span>
            <span className="text-emerald-400 font-bold">
              {xpInCurrentLevel.toLocaleString()} /{' '}
              {XP_PER_LEVEL.toLocaleString()} XP
            </span>
          </div>
          <div className="h-2.5 bg-slate-800/80 rounded-full overflow-hidden border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"
            />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-4 h-4 text-emerald-400" />
          <h3 className="text-white font-bold text-sm">Desglose Corporal</h3>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {bodyStats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              whileHover={{ scale: 1.03, y: -2 }}
              className={`relative overflow-hidden bg-gradient-to-br ${stat.bg} border ${stat.border} rounded-xl px-4 py-3 backdrop-blur-md flex items-center justify-between`}
            >
              <div className="absolute top-0 right-0 w-12 h-12 bg-white/5 rounded-full blur-xl" />
              <div className="relative z-10 flex flex-col gap-0.5">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-[10px] text-slate-400 font-medium">
                  {stat.label}
                </span>
              </div>
              <div className="relative z-10 flex items-baseline gap-1">
                <span className={`text-white font-bold text-lg ${stat.color}`}>
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-slate-400 text-[10px] font-medium">
                    {stat.unit}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-cyan-400" />
          <h3 className="text-white font-bold text-sm">Atributos de Atleta</h3>
        </div>
        <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 backdrop-blur-md space-y-4">
          {rpgAttributes.map((attr, idx) => (
            <motion.div
              key={attr.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + idx * 0.15 }}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{attr.icon}</span>
                  <span className="text-white text-xs font-semibold">
                    {attr.label}
                  </span>
                </div>
                <span className="text-slate-400 text-xs font-bold">
                  {attr.value}%
                </span>
              </div>
              <div className="h-3 bg-slate-800/80 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${attr.value}%` }}
                  transition={{
                    delay: 0.8 + idx * 0.15,
                    duration: 1.2,
                    ease: 'easeOut',
                  }}
                  className={`h-full bg-gradient-to-r ${attr.color} rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-4 h-4 text-emerald-400" />
          <h3 className="text-white font-bold text-sm">Vitrina de Logros</h3>
          <span className="text-slate-500 text-xs ml-auto">
            5/6 desbloqueados
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((ach, idx) => (
            <motion.div
              key={ach.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`relative overflow-hidden rounded-2xl p-4 backdrop-blur-md border transition-all ${
                ach.unlocked
                  ? 'bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-emerald-500/30 shadow-[0_0_15px_rgba(52,211,153,0.1)]'
                  : 'bg-slate-900/40 border-white/5 opacity-40'
              }`}
            >
              {ach.unlocked && (
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full blur-2xl" />
              )}
              <div className="relative z-10">
                <div className="text-3xl mb-2">{ach.icon}</div>
                <p
                  className={`text-xs font-semibold ${
                    ach.unlocked ? 'text-white' : 'text-slate-500'
                  }`}
                >
                  {ach.label}
                </p>
                {ach.unlocked && (
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    <span className="text-emerald-400 text-[10px] font-medium">
                      Desbloqueado
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mb-6"
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-emerald-500/30 rounded-2xl p-5 backdrop-blur-md">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-3xl" />

          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    Premium
                  </span>
                </div>
                <h3 className="text-white font-bold text-base">
                  Membresía Activa
                </h3>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Award className="w-6 h-6 text-slate-950" />
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-slate-400 text-xs mb-1">Próxima renovación</p>
                <p className="text-white font-bold text-lg">23 días</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsApp}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-emerald-500/30"
              >
                Gestionar
              </motion.button>
            </div>

            <div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '77%' }}
                  transition={{ delay: 1.2, duration: 1.5 }}
                  className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-slate-500 text-[10px]">Inicio</span>
                <span className="text-emerald-400 text-[10px] font-medium">
                  Renovación
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
