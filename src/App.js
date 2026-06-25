import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Home,
  MessageCircle,
  User,
  Play,
  Pause,
  ChevronRight,
  Activity,
  Zap,
  Timer,
  Target,
  TrendingUp,
  Sparkles,
  Dumbbell,
  ArrowLeft,
  Award,
  Calendar,
  BarChart3,
  Weight,
  Percent,
  Ruler,
  Heart,
  CheckCircle2,
  Info,
  X,
  ListChecks,
  Check,
  Trophy,
  Send,
} from 'lucide-react';

// ============================================
// DATOS INICIALES SIMULADOS
// ============================================
const initialExercisesData = [
  {
    id: 1,
    name: 'Press de Banca',
    sets: '4 x 12',
    rest: '90s',
    muscle: 'Pecho',
    image:
      'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=600&h=400&fit=crop',
    color: 'from-emerald-500/20 to-cyan-500/20',
    muscles: ['Pectoral Mayor', 'Tríceps', 'Deltoides Anterior'],
    description:
      'Mantén la espalda recta y el core contraído. Baja la barra controladamente hasta tocar el pecho medio. Empuja explosivamente hacia arriba sin bloquear los codos.',
    benefits:
      'Desarrolla el grosor del pecho y mejora la fuerza de empuje para deportes de contacto. Aumenta la masa muscular del torso superior.',
    completed: false,
    history: [
      { date: '12 Nov', weight: '80kg', reps: '12,12,10,8' },
      { date: '05 Nov', weight: '77.5kg', reps: '12,12,12,10' },
      { date: '29 Oct', weight: '75kg', reps: '12,12,12,12' },
    ],
  },
  {
    id: 2,
    name: 'Aperturas con Mancuerna',
    sets: '3 x 15',
    rest: '60s',
    muscle: 'Pectoral',
    image:
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=400&fit=crop',
    color: 'from-cyan-500/20 to-blue-500/20',
    muscles: ['Pectoral Mayor', 'Deltoides Anterior'],
    description:
      'Acuéstate en el banco con los pies firmes. Abre los brazos en arco manteniendo una ligera flexión en los codos. Siente el estiramiento en el pecho y contrae al subir.',
    benefits:
      'Aísla el pectoral mayor mejorando la definición y amplitud del pecho. Excelente ejercicio para la fase de hipertrofia y estética.',
    completed: false,
    history: [
      { date: '12 Nov', weight: '16kg', reps: '15,15,12' },
      { date: '05 Nov', weight: '14kg', reps: '15,15,15' },
    ],
  },
  {
    id: 3,
    name: 'Press Inclinado',
    sets: '4 x 10',
    rest: '90s',
    muscle: 'Pecho Superior',
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop',
    color: 'from-emerald-500/20 to-teal-500/20',
    muscles: ['Pectoral Superior', 'Deltoides Anterior', 'Tríceps'],
    description:
      'Ajusta el banco a 30-45 grados. Retrae las escápulas y mantén los codos a 45 grados del torso. Empuja hacia arriba enfocando la contracción en el pecho superior.',
    benefits:
      'Construye la parte superior del pecho para un físico equilibrado y poderoso. Mejora la postura y la fuerza en movimientos de empuje.',
    completed: false,
    history: [
      { date: '12 Nov', weight: '70kg', reps: '10,10,8,8' },
      { date: '05 Nov', weight: '67.5kg', reps: '10,10,10,8' },
    ],
  },
  {
    id: 4,
    name: 'Fondos en Paralelas',
    sets: '3 x 12',
    rest: '75s',
    muscle: 'Tríceps',
    image:
      'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=600&h=400&fit=crop',
    color: 'from-violet-500/20 to-cyan-500/20',
    muscles: ['Tríceps', 'Pectoral Inferior', 'Deltoides Anterior'],
    description:
      'Inclínate ligeramente hacia adelante para activar el pecho. Baja hasta que los codos formen 90 grados. Empuja hacia arriba manteniendo el core tenso y sin balanceo.',
    benefits:
      'Ejercicio compuesto que desarrolla masa en pecho inferior y tríceps simultáneamente. Mejora la fuerza funcional del tren superior.',
    completed: false,
    history: [
      { date: '12 Nov', weight: 'Body', reps: '12,12,10' },
      { date: '05 Nov', weight: 'Body', reps: '12,12,12' },
    ],
  },
  {
    id: 5,
    name: 'Extensión de Tríceps',
    sets: '3 x 15',
    rest: '60s',
    muscle: 'Tríceps',
    image:
      'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=600&h=400&fit=crop',
    color: 'from-emerald-500/20 to-lime-500/20',
    muscles: ['Tríceps (Cabeza Larga)', 'Tríceps (Lateral)'],
    description:
      'Mantén los codos fijos apuntando al techo. Extiende los brazos completamente contrayendo el tríceps. Baja controladamente sintiendo el estiramiento en la cabeza larga.',
    benefits:
      'Aísla la cabeza larga del tríceps para mayor volumen y definición. Fundamental para lograr brazos grandes y simétricos.',
    completed: false,
    history: [
      { date: '12 Nov', weight: '22kg', reps: '15,15,12' },
      { date: '05 Nov', weight: '20kg', reps: '15,15,15' },
    ],
  },
];

const weeklyStats = [
  { day: 'L', done: true },
  { day: 'M', done: true },
  { day: 'X', done: true },
  { day: 'J', done: false },
  { day: 'V', done: false },
  { day: 'S', done: false },
  { day: 'D', done: false },
];

// ============================================
// COMPONENTE: HEADER
// ============================================
function Header({ streak }) {
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

// ============================================
// COMPONENTE: HERO CARD
// ============================================
function HeroCard({ onStartRoutine }) {
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
              <span className="text-slate-300 text-xs font-medium">
                ~45 min
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-300 text-xs font-medium">
                320 kcal
              </span>
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

// ============================================
// COMPONENTE: RACHA SEMANAL
// ============================================
function WeeklyStreak({ weekStats }) {
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

// ============================================
// COMPONENTE: TARJETA DE EJERCICIO
// ============================================
function ExerciseCard({ exercise, index, onSelect }) {
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

// ============================================
// COMPONENTE: TARJETA DE EJERCICIO (VERSIÓN ANCHA PARA BIBLIOTECA)
// ============================================
function ExerciseLibraryCard({ exercise, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(exercise)}
      className="w-full cursor-pointer"
    >
      <div
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${exercise.color} backdrop-blur-md shadow-xl`}
      >
        <div className="flex gap-3 p-3">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
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
                  exercise.completed ? 'text-emerald-400' : 'text-slate-500'
                }`}
              >
                {exercise.completed ? 'Completado' : exercise.muscle}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// COMPONENTE: SELECTOR DE EJERCICIOS
// ============================================
function ExerciseSelector({ exercises, onSelectExercise, onViewAll }) {
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
      <div
        className="flex gap-4 overflow-x-auto px-5 pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
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

// ============================================
// COMPONENTE: STATS RÁPIDAS
// ============================================
function QuickStats({ calories, cardio, goalPercentage }) {
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

// ============================================
// COMPONENTE: ROUTINE TIMELINE
// ============================================
function RoutineTimeline({ exercises, onClose, onResumeRoutine }) {
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
      className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl overflow-y-auto"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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

// ============================================
// COMPONENTE: BIBLIOTECA DE EJERCICIOS
// ============================================
function ExerciseLibraryModal({ exercises, onClose, onSelectExercise }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl overflow-y-auto"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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

// ============================================
// COMPONENTE: VISTA DE DETALLE DE EJERCICIO
// ============================================
function ExerciseDetail({ exercise, onClose, onCompleteAndNext }) {
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const restSeconds = parseInt(exercise.rest) || 90;

  useEffect(() => {
    if (isWorkoutActive) {
      setTimeLeft(restSeconds);
      setIsTimeUp(false);
      setIsPaused(false);

      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsTimeUp(true);
            setIsPaused(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isWorkoutActive, restSeconds]);

  useEffect(() => {
    if (isPaused && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else if (
      !isPaused &&
      isWorkoutActive &&
      !isTimeUp &&
      !intervalRef.current
    ) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsTimeUp(true);
            setIsPaused(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [isPaused, isWorkoutActive, isTimeUp]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const progressPercentage = (timeLeft / restSeconds) * 100;

  const handleCompleteSet = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (onCompleteAndNext) {
      onCompleteAndNext(exercise.id);
    }
    setIsWorkoutActive(false);
    setIsTimeUp(false);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-slate-950 overflow-y-auto"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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
                  <p className="text-white font-bold text-sm">
                    {exercise.rest}
                  </p>
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
                      {formatTime(timeLeft)}
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
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                    <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        animate={{ width: `${progressPercentage}%` }}
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

// ============================================
// COMPONENTE: CHATBOT IA
// ============================================
function ChatbotPage() {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full px-5 pt-6 pb-32"
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center mb-3">
          <MessageCircle className="w-8 h-8 text-slate-950" />
        </div>
        <h2 className="text-white font-bold text-lg">Alimac AI Coach</h2>
        <p className="text-emerald-400 text-xs">● En línea</p>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto">
        <div className="flex justify-start">
          <div className="max-w-[80%] px-4 py-3 rounded-2xl text-sm bg-slate-800/80 border border-white/10 text-slate-200 rounded-bl-md">
            ¡Hola Juan! Soy tu coach IA. ¿Listo para superar tus marcas hoy?
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4"
      >
        <div className="relative flex items-center gap-2 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-full px-4 py-3 shadow-lg shadow-black/30">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe a tu coach..."
            className="flex-1 bg-transparent text-white text-sm placeholder-slate-500 outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            className="w-9 h-9 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 flex-shrink-0"
          >
            <Send className="w-4 h-4 text-slate-950" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// COMPONENTE: PERFIL
// ============================================
function ProfilePage({ xp }) {
  const bodyStats = [
    {
      icon: Weight,
      label: 'Peso',
      value: '78',
      unit: 'kg',
      color: 'text-emerald-400',
      bg: 'from-emerald-500/20 to-emerald-500/5',
      border: 'border-emerald-500/30',
    },
    {
      icon: Percent,
      label: 'Grasa',
      value: '14',
      unit: '%',
      color: 'text-cyan-400',
      bg: 'from-cyan-500/20 to-cyan-500/5',
      border: 'border-cyan-500/30',
    },
    {
      icon: Dumbbell,
      label: 'Masa Muscular',
      value: '34',
      unit: 'kg',
      color: 'text-violet-400',
      bg: 'from-violet-500/20 to-violet-500/5',
      border: 'border-violet-500/30',
    },
    {
      icon: Ruler,
      label: 'Estatura',
      value: '1.86',
      unit: 'm',
      color: 'text-orange-400',
      bg: 'from-orange-500/20 to-orange-500/5',
      border: 'border-orange-500/30',
    },
  ];

  const rpgAttributes = [
    {
      label: 'Fuerza',
      value: 85,
      color: 'from-emerald-400 to-cyan-500',
      icon: '💪',
    },
    {
      label: 'Resistencia',
      value: 60,
      color: 'from-violet-400 to-fuchsia-500',
      icon: '🏃',
    },
    {
      label: 'Disciplina',
      value: 90,
      color: 'from-orange-400 to-red-500',
      icon: '',
    },
  ];

  const achievements = [
    { icon: '🔥', label: 'Racha 7 días', unlocked: true },
    { icon: '🏆', label: 'Primer Mes', unlocked: true },
    { icon: '⚡', label: 'Fuerza Bruta', unlocked: true },
    { icon: '🎯', label: '100 Entrenos', unlocked: false },
    { icon: '💎', label: 'Miembro VIP', unlocked: true },
    { icon: '🚀', label: 'PR Personal', unlocked: true },
  ];

  const handleWhatsApp = () => {
    window.open(
      'https://wa.me/521234567890?text=Hola,%20quiero%20renovar%20mi%20membres%C3%ADa%20Premium',
      '_blank'
    );
  };

  const xpPerLevel = 3000;
  const currentLevel = Math.floor(xp / xpPerLevel) + 1;
  const xpInCurrentLevel = xp % xpPerLevel;
  const xpProgress = (xpInCurrentLevel / xpPerLevel) * 100;

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
              {xpPerLevel.toLocaleString()} XP
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
                <p className="text-slate-400 text-xs mb-1">
                  Próxima renovación
                </p>
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

// ============================================
// COMPONENTE: BOTTOM NAV FLOTANTE
// ============================================
function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Inicio' },
    { id: 'chatbot', icon: MessageCircle, label: 'IA' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: 50, x: '-50%' }}
      transition={{ delay: 0.2, type: 'spring' }}
      className="absolute bottom-10 left-1/2 z-50"
      style={{ width: 'calc(100% - 3rem)' }}
    >
      <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-full px-4 py-3 shadow-2xl shadow-black/50">
        <div className="relative flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const isCenter = tab.id === 'chatbot';
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center justify-center transition-all duration-300 ${
                  isCenter ? 'w-14 h-14' : 'w-11 h-11'
                } rounded-full`}
              >
                {isCenter && (
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(52,211,153,0.4)',
                        '0 0 35px rgba(52,211,153,0.6)',
                        '0 0 20px rgba(52,211,153,0.4)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full"
                  />
                )}
                {!isCenter && isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-slate-800/80 rounded-full border border-white/10"
                  />
                )}
                <tab.icon
                  className={`relative z-10 ${
                    isCenter
                      ? 'w-6 h-6 text-slate-950'
                      : isActive
                      ? 'w-5 h-5 text-emerald-400'
                      : 'w-5 h-5 text-slate-500'
                  }`}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// COMPONENTE PRINCIPAL: APP
// ============================================
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showRoutineTimeline, setShowRoutineTimeline] = useState(false);
  const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);

  const [exercises, setExercises] = useState(initialExercisesData);

  const [calories, setCalories] = useState(1240);
  const [cardio, setCardio] = useState(28);
  const [weekStats, setWeekStats] = useState(weeklyStats);

  const [streak, setStreak] = useState(3);
  const [goalPercentage, setGoalPercentage] = useState(85);
  const [xp, setXp] = useState(2450);

  const handleSelectExercise = (exercise) => setSelectedExercise(exercise);
  const handleCloseDetail = () => setSelectedExercise(null);
  const handleStartRoutine = () => setShowRoutineTimeline(true);
  const handleCloseTimeline = () => setShowRoutineTimeline(false);
  const handleViewAll = () => setShowExerciseLibrary(true);
  const handleCloseLibrary = () => setShowExerciseLibrary(false);

  const handleResumeRoutine = () => {
    const nextExercise = exercises.find((ex) => !ex.completed);

    if (nextExercise) {
      setShowRoutineTimeline(false);
      setSelectedExercise(nextExercise);
    } else {
      setShowRoutineTimeline(false);
    }
  };

  const handleCompleteAndNext = (currentId) => {
    setExercises((prevExercises) => {
      const currentIndex = prevExercises.findIndex((ex) => ex.id === currentId);

      const updatedExercises = prevExercises.map((ex, idx) =>
        idx === currentIndex ? { ...ex, completed: true } : ex
      );

      const nextExercise = updatedExercises.find(
        (ex, idx) => idx > currentIndex && !ex.completed
      );

      setCalories((prev) => prev + 64);
      setCardio((prev) => prev + 9);
      setXp((prev) => prev + 50);

      if (!nextExercise) {
        setStreak((prev) => prev + 1);
        setGoalPercentage((prev) => Math.min(prev + 5, 100));
        setWeekStats((prev) =>
          prev.map((day) => (day.day === 'J' ? { ...day, done: true } : day))
        );
        setTimeout(() => {
          setSelectedExercise(null);
        }, 100);
      } else {
        setTimeout(() => {
          setSelectedExercise(nextExercise);
        }, 100);
      }

      return updatedExercises;
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-0 md:p-4">
      <div className="w-full max-w-md h-[100dvh] md:min-h-[844px] md:h-[844px] md:max-h-[90vh] bg-slate-950 md:rounded-[3rem] md:border-4 md:border-slate-800 md:shadow-2xl md:shadow-emerald-500/5 relative overflow-hidden">
        <div
          className="relative h-full overflow-y-auto pb-36"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Header streak={streak} />
                <HeroCard onStartRoutine={handleStartRoutine} />
                <WeeklyStreak weekStats={weekStats} />
                <QuickStats
                  calories={calories}
                  cardio={cardio}
                  goalPercentage={goalPercentage}
                />
                <ExerciseSelector
                  exercises={exercises}
                  onSelectExercise={handleSelectExercise}
                  onViewAll={handleViewAll}
                />
              </motion.div>
            )}
            {activeTab === 'chatbot' && (
              <motion.div
                key="chatbot"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ChatbotPage />
              </motion.div>
            )}
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ProfilePage xp={xp} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {!selectedExercise &&
            !showRoutineTimeline &&
            !showExerciseLibrary && (
              <BottomNav
                key="main-bottom-nav"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            )}
        </AnimatePresence>

        <AnimatePresence>
          {showRoutineTimeline && (
            <RoutineTimeline
              exercises={exercises}
              onClose={handleCloseTimeline}
              onResumeRoutine={handleResumeRoutine}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showExerciseLibrary && (
            <ExerciseLibraryModal
              exercises={exercises}
              onClose={handleCloseLibrary}
              onSelectExercise={handleSelectExercise}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedExercise && (
            <ExerciseDetail
              exercise={selectedExercise}
              onClose={handleCloseDetail}
              onCompleteAndNext={handleCompleteAndNext}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
