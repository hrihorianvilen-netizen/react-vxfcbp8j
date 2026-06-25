import { Weight, Percent, Dumbbell, Ruler } from 'lucide-react';
import type {
  Achievement,
  BodyStat,
  Exercise,
  RpgAttribute,
  WeekDayStat,
} from './types';

/**
 * Static seed data extracted from the original prototype.
 *
 * NOTE: In the Supabase phase (roadmap stage 4) these constants are replaced by
 * async queries. They are kept here so the UI renders identically offline and as
 * the source of truth for the `exercises` / routines seed migration.
 */
export const initialExercisesData: Exercise[] = [
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

export const weeklyStats: WeekDayStat[] = [
  { day: 'L', done: true },
  { day: 'M', done: true },
  { day: 'X', done: true },
  { day: 'J', done: false },
  { day: 'V', done: false },
  { day: 'S', done: false },
  { day: 'D', done: false },
];

export const bodyStats: BodyStat[] = [
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

export const rpgAttributes: RpgAttribute[] = [
  { label: 'Fuerza', value: 85, color: 'from-emerald-400 to-cyan-500', icon: '💪' },
  { label: 'Resistencia', value: 60, color: 'from-violet-400 to-fuchsia-500', icon: '🏃' },
  { label: 'Disciplina', value: 90, color: 'from-orange-400 to-red-500', icon: '🔥' },
];

export const achievements: Achievement[] = [
  { icon: '🔥', label: 'Racha 7 días', unlocked: true },
  { icon: '🏆', label: 'Primer Mes', unlocked: true },
  { icon: '⚡', label: 'Fuerza Bruta', unlocked: true },
  { icon: '🎯', label: '100 Entrenos', unlocked: false },
  { icon: '💎', label: 'Miembro VIP', unlocked: true },
  { icon: '🚀', label: 'PR Personal', unlocked: true },
];
