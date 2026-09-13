import { useEffect, useRef, useState } from 'react';

import useDebouncedValue from './useDebouncedValue';

const prefersReducedMotion = () => (
  typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

interface UseAnimatedCountOptions {
  enabled?: boolean;
  durationMs?: number;
  debounceMs?: number;
}

// counts up from zero to the value instead of jumping instantly
const useAnimatedCount = (
  value: number,
  { enabled = true, durationMs = 666, debounceMs = 0 }: UseAnimatedCountOptions = {},
): number => {
  // rapid-fire value changes (e.g. AG Grid's onModelUpdated) settle before animating
  const settledValue = useDebouncedValue(value, debounceMs);
  const [displayValue, setDisplayValue] = useState(settledValue);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    // skip animating the initial mount value; only animate on subsequent changes
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;

      return;
    }

    const to = settledValue;

    if (!enabled || prefersReducedMotion()) {
      const frame = requestAnimationFrame(() => {
        setDisplayValue(to);
      });

      return () => {
        cancelAnimationFrame(frame);
      };
    }

    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3; // ease-out cubic

      setDisplayValue(Math.round(to * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [settledValue, durationMs, enabled]);

  return displayValue;
};

export default useAnimatedCount;
