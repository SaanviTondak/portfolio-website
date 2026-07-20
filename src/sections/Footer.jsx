import { profile, footerSocials } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import './Footer.css';

/**
 * CTA + Footer.
 *  - Two buttons: "Play With Me" (outline) + "Hire Me" (filled pink).
 *  - Large footer name, Email + Location blocks, animated social links,
 *    and a "Designed and Developed by …" credit with © year.
 */
export default function Footer({ reducedMotion = false }) {
  const scopeRef = useReveal(!reducedMotion);
  const year = new Date().getFullYear();

  return (
    <footer className="footer section" id="contact" ref={scopeRef}>
      <div className="container">
        {/* ---- CTA ---- */}
        <div className="footer__cta">
          <p className="eyebrow reveal">Let&apos;s build something</p>
          <h2 className="footer__cta-title display-heading reveal">
            Have an idea? <span className="accent">Let&apos;s talk.</span>
          </h2>
          <div className="footer__buttons reveal">
            <a className="btn btn--outline" href="#work">
              Play With Me →
            </a>
            <a className="btn btn--filled" href={`mailto:${profile.email}`}>
              Hire Me →
            </a>
          </div>
        </div>

        {/* ---- Large name ---- */}
        <h2 className="footer__name reveal" aria-hidden="true">
          {profile.name}
        </h2>

        {/* ---- Info grid ---- */}
        <div className="footer__grid">
          <div className="footer__block reveal">
            <span className="footer__label">Email</span>
            <a className="footer__value" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>

          <div className="footer__block reveal">
            <span className="footer__label">Location</span>
            <span className="footer__value">{profile.location}</span>
          </div>

          <div className="footer__block footer__block--socials reveal">
            <span className="footer__label">Socials</span>
            <ul className="footer__socials">
              {footerSocials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    <span>{s.label}</span>
                    <span className="footer__arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---- Credit ---- */}
        <div className="footer__credit reveal">
          <span>© {year} {profile.name}</span>
          <span>Designed &amp; Developed by {profile.name}</span>
        </div>
      </div>
    </footer>
  );
}
