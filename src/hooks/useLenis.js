import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';

/**
 * Sets up Lenis momentum scrolling and wires it into GSAP's ScrollTrigger so
 * pinned sections / scroll animations stay perfectly in sync.
 *
 * When `enabled` is false (e.g. reduced-motion), we skip Lenis entirely and
 * fall back to the browser's native scrolling.
 *
 * @param {boolean} enabled
 * @returns {React.MutableRefObject<Lenis|null>} ref to the Lenis instance
 */
export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    const lenis = new Lenis({
      duration: 1.15, // momentum feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // Expose globally so components (e.g. nav links) can call scrollTo.
    window.__lenis = lenis;

    // Keep ScrollTrigger updated on every Lenis scroll frame.
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker for a single, synced RAF loop.
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [enabled]);
}

/** Smoothly scroll to a target selector/element via Lenis (or native fallback). */
export function scrollTo(target, options = {}) {
  if (window.__lenis) {
    window.__lenis.scrollTo(target, { offset: -80, duration: 1.2, ...options });
  } else {
    const el =
      typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}
