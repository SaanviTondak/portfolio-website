import { socials } from '../data/content';
import SocialIcon from './icons/SocialIcon';
import './SocialSidebar.css';

/**
 * Fixed vertical social icon rail on the far left.
 * Icons turn pink on hover. Hidden on small screens (footer covers socials).
 */
export default function SocialSidebar() {
  return (
    <aside className="social-rail" aria-label="Social links">
      <ul className="social-rail__list">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="social-rail__link"
              aria-label={s.label}
            >
              <SocialIcon name={s.icon} />
            </a>
          </li>
        ))}
      </ul>
      <span className="social-rail__line" aria-hidden="true" />
    </aside>
  );
}
