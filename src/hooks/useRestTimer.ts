'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface RestTimer {
  timeLeft: number;
  isPaused: boolean;
  isTimeUp: boolean;
  progress: number;
  formatted: string;
  togglePause: () => void;
}

const format = (seconds: number) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

/**
 * Rest-countdown timer for a single exercise set.
 *
 * Replaces the original prototype's two cooperating effects + manual ref
 * juggling with one self-clearing interval whose lifecycle is driven purely by
 * `active` and `isPaused`. Resilient to StrictMode double-invocation.
 *
 * @param restSeconds total rest duration in seconds
 * @param active      whether the workout (and therefore the timer) is running
 */
export function useRestTimer(restSeconds: number, active: boolean): RestTimer {
  const [timeLeft, setTimeLeft] = useState(restSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isTimeUp = timeLeft === 0;

  // (Re)start: reset the clock whenever the timer is activated or the duration
  // changes (i.e. a different exercise is selected).
  useEffect(() => {
    if (active) {
      setTimeLeft(restSeconds);
      setIsPaused(false);
    }
  }, [active, restSeconds]);

  // Tick: a single interval that self-clears at zero. Depends only on the two
  // controls, so it is created/destroyed exactly on play/pause/stop.
  useEffect(() => {
    if (!active || isPaused) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [active, isPaused]);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const progress = restSeconds > 0 ? (timeLeft / restSeconds) * 100 : 0;

  return {
    timeLeft,
    isPaused,
    isTimeUp,
    progress,
    formatted: format(timeLeft),
    togglePause,
  };
}
