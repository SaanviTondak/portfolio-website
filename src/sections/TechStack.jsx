import { techStack } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import TechIcon from '../components/icons/TechIcon';
import './TechStack.css';

/**
 * Tech stack grid — translucent rounded tiles with icon + label, lit by a
 * large glowing pink orb that softly pulses behind the grid. Tiles lift and
 * glow pink on hover.
 */
export default function TechStack({ reducedMotion = false }) {
  const scopeRef = useReveal(!reducedMotion, { stagger: 0.05 });

  return (
    <section className="tech section" id="tech" ref={scopeRef}>
      {/* Glowing pink orb behind the grid */}
      <div
        className={`tech__orb ${reducedMotion ? 'tech__orb--static' : ''}`}
        aria-hidden="true"
      />

      <div className="container">
        <header className="tech__head">
          <span className="eyebrow reveal">Toolbox</span>
          <h2 className="display-heading reveal">Tech Stack.</h2>
        </header>

        <ul className="tech__grid">
          {techStack.map((t) => (
            <li className="tech-tile reveal" key={t.label}>
              <span className="tech-tile__icon">
                <TechIcon name={t.icon} label={t.label} />
              </span>
              <span className="tech-tile__label">{t.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
