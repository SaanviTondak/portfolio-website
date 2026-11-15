import { whatIDo } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import './WhatIDo.css';

/**
 * What I Do — two cards that open on hover / focus / tap to show the detail
 * and the tools behind each area.
 */
export default function WhatIDo({ reducedMotion = false }) {
  const scopeRef = useReveal(!reducedMotion);

  return (
    <section className="what section" id="what" ref={scopeRef}>
      <div className="container">
        <div className="what__body split-right">
          <h2 className="what__title display-heading reveal">
            What <span className="accent">I do</span>
          </h2>

          <div className="what__cards">
            {whatIDo.map((item) => (
              <article className="what-card reveal" key={item.title} tabIndex={0}>
                <span className="what-card__corner what-card__corner--tl" aria-hidden="true" />
                <span className="what-card__corner what-card__corner--br" aria-hidden="true" />
                <h3 className="what-card__title">{item.title}</h3>
                <p className="what-card__sub">{item.subtitle}</p>
                <div className="what-card__more">
                  <div>
                    <p className="what-card__desc text-muted">{item.description}</p>
                    <p className="what-card__label">Skillset &amp; tools</p>
                    <ul className="what-card__tags">
                      {item.tools.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
