import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { projects } from '../data/content';
import './Work.css';

/**
 * Work — horizontally-scrolling project gallery.
 * On desktop the section pins and the track translates horizontally as you
 * scroll vertically (classic GSAP horizontal scroll). On mobile / reduced
 * motion it degrades to a native horizontal swipe / vertical stack.
 */
export default function Work({ reducedMotion = false }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' && window.innerWidth >= 900
  );

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 900);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    // Only run the pinned horizontal scroll on desktop w/ motion allowed.
    if (!isDesktop || reducedMotion) return undefined;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });
    }, section);

    return () => ctx.revert();
  }, [isDesktop, reducedMotion]);

  return (
    <section
      className={`work section ${isDesktop && !reducedMotion ? 'work--pinned' : ''}`}
      id="work"
      ref={sectionRef}
    >
      <div className="work__head container">
        <h2 className="display-heading">
          My <span className="accent">Work</span>
        </h2>
      </div>

      <div className="work__track" ref={trackRef}>
        {projects.map((p) => (
          <article className="work-card" key={p.index}>
            <div className="work-card__media">
              {/* Preview image placeholder — drop real image at p.image */}
              <img
                src={p.image}
                alt={`${p.name} preview`}
                loading="lazy"
                onError={(e) => {
                  // Graceful placeholder if the image file isn't added yet.
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.classList.add('is-empty');
                }}
              />
              <span className="work-card__index">{p.index}</span>
              <span className="work-card__placeholder" aria-hidden="true">
                Add image →<br />
                {p.image}
              </span>
            </div>

            <div className="work-card__body">
              <div className="work-card__row">
                <h3 className="work-card__name">{p.name}</h3>
                <span className="work-card__tag">{p.category}</span>
              </div>
              <p className="work-card__label">Tools and features</p>
              <ul className="work-card__tech">
                {p.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <a className="work-card__link" href={p.href}>
                View project →
              </a>
            </div>
          </article>
        ))}

        {/* Closing "see more" card */}
        <article className="work-card work-card--more">
          <h3>Want to see more?</h3>
          <a className="work-card__see-all" href="#">
            See All Works →
          </a>
        </article>
      </div>
    </section>
  );
}
