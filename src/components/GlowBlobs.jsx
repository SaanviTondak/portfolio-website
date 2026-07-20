import './GlowBlobs.css';

/**
 * Ambient, blurred radial pink glow blobs that slowly drift in the page
 * corners/edges. Purely decorative and fixed behind all content.
 * Animation pauses automatically under reduced-motion.
 */
export default function GlowBlobs({ reducedMotion = false }) {
  return (
    <div
      className={`glow-blobs ${reducedMotion ? 'glow-blobs--static' : ''}`}
      aria-hidden="true"
    >
      <span className="glow-blob glow-blob--1" />
      <span className="glow-blob glow-blob--2" />
      <span className="glow-blob glow-blob--3" />
    </div>
  );
}
