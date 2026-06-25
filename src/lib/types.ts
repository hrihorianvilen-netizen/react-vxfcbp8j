import type { LucideIcon } from 'lucide-react';

export interface ExerciseHistoryEntry {
  date: string;
  weight: string;
  reps: string;
}

export interface Exercise {
  id: number;
  name: string;
  /** Display string, e.g. "4 x 12" */
  sets: string;
  /** Display string, e.g. "90s" */
  rest: string;
  muscle: string;
  image: string;
  /** Tailwind gradient classes, e.g. "from-emerald-500/20 to-cyan-500/20" */
  color: string;
  muscles: string[];
  description: string;
  benefits: string;
  completed: boolean;
  history: ExerciseHistoryEntry[];
}

export interface WeekDayStat {
  /** Single-letter Spanish weekday label (L, M, X, J, V, S, D) */
  day: string;
  done: boolean;
}

export interface BodyStat {
  icon: LucideIcon;
  label: string;
  value: string;
  unit: string;
  color: string;
  bg: string;
  border: string;
}

export interface RpgAttribute {
  label: string;
  value: number;
  color: string;
  icon: string;
}

export interface Achievement {
  icon: string;
  label: string;
  unlocked: boolean;
}

export type TabId = 'dashboard' | 'chatbot' | 'profile';
