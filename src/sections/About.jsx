import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { timeline } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import './About.css';

/**
 * About / experience timeline.
 * Vertical line with a glowing pink dot that travels down as you scroll.
 * Each row: role (left) · big faded year (center) · description (right).
 */
export default function About({ reducedMotion = false }) {
  const scopeRef = useReveal(!reducedMotion);
  const lineRef = useRef(null);
  const dotRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const line = lineRef.current;
    if (!line) return undefined;

    const ctx = gsap.context(() => {
      // The dot + fill track scroll progress along the timeline line.
      gsap.to([dotRef.current, fillRef.current], {
        // handled per-element below via onUpdate for precise control
      });

      ScrollTrigger.create({
        trigger: line,
        start: 'top 55%',
        end: 'bottom 60%',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (dotRef.current) dotRef.current.style.top = `${p * 100}%`;
          if (fillRef.current) fillRef.current.style.height = `${p * 100}%`;
        },
      });
    }, scopeRef);

    return () => ctx.revert();
  }, [reducedMotion, scopeRef]);

  return (
    <section className="about section" id="about" ref={scopeRef}>
      <div className="container">
        <header className="about__head">
          <span className="eyebrow reveal">About</span>
          <h2 className="about__title display-heading reveal">
            My career &amp; <span className="accent">experience.</span>
          </h2>
        </header>

        <div className="timeline" ref={lineRef}>
          {/* Track + animated fill + traveling dot */}
          <div className="timeline__line" aria-hidden="true">
            <span className="timeline__fill" ref={fillRef} />
            <span className="timeline__dot" ref={dotRef} />
          </div>

          <ul className="timeline__rows">
            {timeline.map((item, i) => (
              <li className="timeline__row reveal" key={i}>
                <div className="timeline__role">
                  <h3>{item.role}</h3>
                  <p className="timeline__sub text-muted">{item.sub}</p>
                </div>
                <div className="timeline__year" aria-hidden="true">
                  {item.year}
                </div>
                <p className="timeline__desc text-muted">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
