import { useEffect, useState } from 'react';

/**
 * Returns `true` when the user has requested reduced motion.
 * Also mirrors the state onto <html class="reduced-motion"> so CSS can react.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => {
      setReduced(mq.matches);
      document.documentElement.classList.toggle('reduced-motion', mq.matches);
    };
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
