import { useEffect, useState } from 'react';
import { profile, navLinks } from '../data/content';
import { scrollTo } from '../hooks/useLenis';
import './Navbar.css';

/**
 * Fixed top navbar: ST monogram (left), email (center),
 * nav links + RESUME (right). Links highlight pink on hover / when active.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  // Add a frosted background once the user scrolls past the hero fold.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track which section is in view to highlight the matching nav link.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace('#', ''));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    scrollTo(href);
  };

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        {/* Monogram */}
        <a
          className="nav__logo"
          href="#top"
          onClick={(e) => handleNav(e, 'body')}
          aria-label={`${profile.name} — home`}
        >
          {profile.monogram}
        </a>

        {/* Centered email */}
        <a className="nav__email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>

        {/* Right-aligned links */}
        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className={`nav__link ${active === link.href ? 'is-active' : ''}`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="nav__link nav__link--resume"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
