'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { initialExercisesData, weeklyStats } from '@/lib/data';
import type { Exercise, TabId } from '@/lib/types';
import { Header } from './layout/Header';
import { BottomNav } from './layout/BottomNav';
import { HeroCard } from './dashboard/HeroCard';
import { WeeklyStreak } from './dashboard/WeeklyStreak';
import { QuickStats } from './dashboard/QuickStats';
import { ExerciseSelector } from './dashboard/ExerciseSelector';
import { RoutineTimeline } from './exercises/RoutineTimeline';
import { ExerciseLibraryModal } from './exercises/ExerciseLibraryModal';
import { ExerciseDetail } from './exercises/ExerciseDetail';
import { ChatbotPage } from './chat/ChatbotPage';
import { ProfilePage } from './profile/ProfilePage';

/**
 * Root client component for the Alimac Fitness OS prototype.
 *
 * Owns all interaction state and the gamification side effects triggered when an
 * exercise is completed. In the Supabase phase (roadmap stage 4) the local
 * `useState` stores below become server-backed: progress, XP, streak and stats
 * move to Workout Logs + a server action, and `initialExercisesData` is fetched
 * from the `exercises`/`routines` tables.
 */
export function FitnessApp() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [showRoutineTimeline, setShowRoutineTimeline] = useState(false);
  const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);

  const [exercises, setExercises] = useState<Exercise[]>(initialExercisesData);

  const [calories, setCalories] = useState(1240);
  const [cardio, setCardio] = useState(28);
  const [weekStats, setWeekStats] = useState(weeklyStats);

  const [streak, setStreak] = useState(3);
  const [goalPercentage, setGoalPercentage] = useState(85);
  const [xp, setXp] = useState(2450);

  const handleResumeRoutine = () => {
    const nextExercise = exercises.find((ex) => !ex.completed);
    setShowRoutineTimeline(false);
    if (nextExercise) setSelectedExercise(nextExercise);
  };

  const handleCompleteAndNext = (currentId: number) => {
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
        setTimeout(() => setSelectedExercise(null), 100);
      } else {
        setTimeout(() => setSelectedExercise(nextExercise), 100);
      }

      return updatedExercises;
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-0 md:p-4">
      <div className="w-full max-w-md h-[100dvh] md:min-h-[844px] md:h-[844px] md:max-h-[90vh] bg-slate-950 md:rounded-[3rem] md:border-4 md:border-slate-800 md:shadow-2xl md:shadow-emerald-500/5 relative overflow-hidden">
        <div className="relative h-full overflow-y-auto pb-36 no-scrollbar">
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
                <HeroCard onStartRoutine={() => setShowRoutineTimeline(true)} />
                <WeeklyStreak weekStats={weekStats} />
                <QuickStats
                  calories={calories}
                  cardio={cardio}
                  goalPercentage={goalPercentage}
                />
                <ExerciseSelector
                  exercises={exercises}
                  onSelectExercise={setSelectedExercise}
                  onViewAll={() => setShowExerciseLibrary(true)}
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
          {!selectedExercise && !showRoutineTimeline && !showExerciseLibrary && (
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
              onClose={() => setShowRoutineTimeline(false)}
              onResumeRoutine={handleResumeRoutine}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showExerciseLibrary && (
            <ExerciseLibraryModal
              exercises={exercises}
              onClose={() => setShowExerciseLibrary(false)}
              onSelectExercise={setSelectedExercise}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedExercise && (
            <ExerciseDetail
              exercise={selectedExercise}
              onClose={() => setSelectedExercise(null)}
              onCompleteAndNext={handleCompleteAndNext}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
