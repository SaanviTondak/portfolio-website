import { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

import Intro from './components/Intro';
import Navbar from './components/Navbar';
import SocialSidebar from './components/SocialSidebar';
import ResumeCorner from './components/ResumeCorner';
import GlowBlobs from './components/GlowBlobs';
import CursorSparks from './components/CursorSparks';

import Hero from './sections/Hero';
import About from './sections/About';
import Work from './sections/Work';
import TechStack from './sections/TechStack';
import Footer from './sections/Footer';

export default function App() {
  const reducedMotion = usePrefersReducedMotion();

  // The intro plays once on load; when reduced-motion is on we skip it.
  const [introDone, setIntroDone] = useState(reducedMotion);

  // Momentum scrolling — disabled under reduced-motion.
  useLenis(!reducedMotion);

  return (
    <>
      {/* Animated page-load intro sequence */}
      {!reducedMotion && <Intro onComplete={() => setIntroDone(true)} />}

      {/* Ambient drifting pink glow blobs (fixed, behind everything) */}
      <GlowBlobs reducedMotion={reducedMotion} />

      {/* Neon-pink spark trail that follows the cursor (desktop only) */}
      <CursorSparks reducedMotion={reducedMotion} />

      {/* Persistent fixed overlays */}
      <Navbar />
      <SocialSidebar />
      <ResumeCorner />

      {/* Page content */}
      <main>
        <Hero introDone={introDone} reducedMotion={reducedMotion} />
        <About reducedMotion={reducedMotion} />
        <Work reducedMotion={reducedMotion} />
        <TechStack reducedMotion={reducedMotion} />
        <Footer reducedMotion={reducedMotion} />
      </main>
    </>
  );
}
