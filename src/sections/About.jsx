import { about } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import './About.css';

/**
 * About Me — a short statement on the right half of the screen, with the
 * character standing beside it on desktop.
 */
export default function About({ reducedMotion = false }) {
  const scopeRef = useReveal(!reducedMotion);

  return (
    <section className="about section" id="about" ref={scopeRef}>
      <div className="container">
        <div className="about__body split-right">
          <span className="eyebrow reveal">About Me</span>
          {about.paragraphs.map((p) => (
            <p className="about__text reveal" key={p}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
