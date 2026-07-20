import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

/**
 * Reveals all `.reveal` descendants of the returned ref as they scroll into
 * view (staggered fade + slide up). No-ops when reduced motion is requested.
 *
 * @param {boolean} enabled - pass false for reduced-motion
 * @param {object}  opts
 * @param {number}  opts.y      - vertical offset in px (default 28)
 * @param {number}  opts.stagger- seconds between siblings (default 0.08)
 * @returns {React.MutableRefObject} attach to a wrapping element
 */
export function useReveal(enabled = true, opts = {}) {
  const scopeRef = useRef(null);
  const { y = 28, stagger = 0.08 } = opts;

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return undefined;

    // Reduced motion: just make everything visible, no animation.
    if (!enabled) {
      gsap.set(scope.querySelectorAll('.reveal'), { opacity: 1, y: 0 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.reveal', scope);
      items.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, scope);

    return () => ctx.revert();
  }, [enabled, y, stagger]);

  // Refresh triggers once fonts/images have settled.
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(t);
  }, []);

  return scopeRef;
}
