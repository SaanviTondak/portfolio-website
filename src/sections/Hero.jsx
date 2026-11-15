import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { profile } from '../data/content';
import './Hero.css';

/**
 * Hero / landing.
 * The 3D character stands centre-screen (see character/Character.jsx); this
 * section frames her with the greeting + name on the left and a rotating
 * role on the right. On small screens the name sits above her and the role
 * below.
 */
export default function Hero({ introDone, reducedMotion = false }) {
  const rootRef = useRef(null);
  const roles = profile.roles;
  const [active, setActive] = useState(0);

  // Cycle through the roles.
  useEffect(() => {
    if (reducedMotion || roles.length < 2) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % roles.length), 3200);
    return () => clearInterval(id);
  }, [reducedMotion, roles.length]);

  // Entrance, once the page-load intro has lifted.
  useEffect(() => {
    if (!introDone || reducedMotion) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('.hero__reveal', {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.15,
      });
    }, rootRef);
    return () => ctx.revert();
  }, [introDone, reducedMotion]);

  // The framing text drifts down and fades as the character walks off.
  useEffect(() => {
    if (reducedMotion) return undefined;
    const ctx = gsap.context(() => {
      gsap.to('.hero__side', {
        yPercent: 35,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '55% top',
          scrub: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  const next = (active + 1) % roles.length;

  return (
    <section className="hero" ref={rootRef} id="top">
      <div className="hero__side hero__side--intro">
        <p className="hero__kicker hero__reveal">Hello! I&apos;m</p>
        <h1 className="hero__name hero__reveal">
          {profile.firstName}
          <br />
          {profile.lastName}
        </h1>
      </div>

      <div className="hero__side hero__side--info">
        <p className="hero__kicker hero__reveal">Interested in</p>
        <div className="hero__roles hero__reveal">
          <span className="sr-only">{roles.join(' and ')}</span>
          <div className="hero__role-flip" aria-hidden="true">
            {roles.map((role, i) => (
              <span
                key={role}
                className={`hero__role ${i === active ? 'is-active' : ''}`}
              >
                {role}
              </span>
            ))}
          </div>
          {roles.length > 1 && (
            <div className="hero__role-ghost" aria-hidden="true" key={next}>
              {roles[next]}
            </div>
          )}
        </div>
      </div>

      <div className="hero__scroll-cue" aria-hidden="true">
        <span>Scroll</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
