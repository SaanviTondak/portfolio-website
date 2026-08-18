import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { profile } from '../data/content';
import './Intro.css';

/**
 * Animated page-load intro. The monogram + name letters slide/fade in, then
 * the whole overlay lifts away to reveal the hero. Calls `onComplete` when the
 * curtain has fully retracted so the hero can start its own animation.
 */
export default function Intro({ onComplete }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    // Prevent scrolling while the intro plays.
    document.documentElement.classList.add('is-loading');

    const letters = root.querySelectorAll('.intro__letter');
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        document.documentElement.classList.remove('is-loading');
        // Scrolling is now unlocked and the real page height is settled —
        // recompute every scroll trigger so reveals fire at the right spots.
        ScrollTrigger.refresh();
        onComplete?.();
      },
    });

    tl.set(root, { autoAlpha: 1 })
      .from('.intro__mono', { yPercent: 120, opacity: 0, duration: 0.7 })
      .from(
        letters,
        { yPercent: 120, opacity: 0, duration: 0.7, stagger: 0.045 },
        '-=0.35'
      )
      .to('.intro__bar', { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, '-=0.3')
      .to(
        ['.intro__mono', letters],
        { yPercent: -120, opacity: 0, duration: 0.55, stagger: 0.02, ease: 'power3.in' },
        '+=0.25'
      )
      .to(root, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, '-=0.15');

    return () => {
      tl.kill();
      document.documentElement.classList.remove('is-loading');
    };
  }, [onComplete]);

  const letters = profile.name.toUpperCase().split('');

  return (
    <div className="intro" ref={rootRef}>
      <div className="intro__content">
        <span className="intro__mono">{profile.monogram}</span>
        <h1 className="intro__name" aria-label={profile.name}>
          {letters.map((ch, i) => (
            <span className="intro__letter" key={i}>
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </h1>
        <span className="intro__bar" />
      </div>
    </div>
  );
}
