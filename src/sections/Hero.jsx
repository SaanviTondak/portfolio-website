import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { profile } from '../data/content';
import Avatar from './avatar/Avatar';
import './Hero.css';

/**
 * Hero section.
 *  - Left overlay: "Hello! I'm" (pink) + huge SAANVI TONDAK.
 *  - Center: live 3D avatar reacting to scroll (hidden until a real model
 *    is added — see avatar/Avatar.jsx).
 *  - Behind/right: large translucent stacked role text for depth.
 *
 * A ScrollTrigger scrubs a 0→1 value into `progressRef`, which the Avatar
 * reads to animate from "forward-facing" to "working at a desk".
 */
export default function Hero({ introDone, reducedMotion = false }) {
  const rootRef = useRef(null);
  const progressRef = useRef(0);

  // Intro-gated entrance animation for the overlay text.
  useEffect(() => {
    if (!introDone || reducedMotion) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('.hero__reveal', {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.09,
      });
    }, rootRef);
    return () => ctx.revert();
  }, [introDone, reducedMotion]);

  // Scroll → avatar progress + subtle parallax on text.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });

      if (!reducedMotion) {
        // Parallax: name drifts up, roles drift the other way.
        gsap.to('.hero__name', {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to('.hero__roles', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section className="hero section" ref={rootRef} id="top">
      {/* Translucent stacked role text (behind avatar) */}
      <div className="hero__roles" aria-hidden="true">
        {profile.roles.map((role) => (
          <span className="hero__role" key={role}>
            {role}
          </span>
        ))}
      </div>

      {/* Live 3D avatar */}
      <div className="hero__avatar">
        <Avatar progressRef={progressRef} reducedMotion={reducedMotion} />
      </div>

      {/* Left overlay text */}
      <div className="hero__overlay container">
        <p className="hero__hello hero__reveal">
          <span className="accent">Hello! I&apos;m</span>
        </p>
        <h1 className="hero__name">
          <span className="hero__reveal">{profile.firstName}</span>
          <span className="hero__reveal">{profile.lastName}</span>
        </h1>
        <p className="hero__sub hero__reveal text-muted">
          {profile.roles.join(' / ')} — based in {profile.location}.
        </p>
      </div>

      {/* Scroll cue */}
      <div className="hero__scroll-cue" aria-hidden="true">
        <span>Scroll</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
