import { Component, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from '../lib/gsap';
import CharacterModel from './CharacterModel';
import { rig } from './rig';
import './Character.css';

const DESKTOP = '(min-width: 1025px)';

/* If WebGL or the model fails, the page simply renders without a character. */
class SceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * The 3D character that anchors the page.
 *
 * Desktop: a fixed, full-viewport stage. She stands centre-screen in the hero,
 * steps to the left and turns toward the copy for About / What I Do, then
 * scrolls away before the career timeline.
 * Mobile / reduced motion: she simply lives inside the hero.
 *
 * Her head follows the pointer and she waves hello. If the model ships with a dance clip,
 * clicking her plays it.
 */
export default function Character({ reducedMotion = false }) {
  const rootRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [dancing, setDancing] = useState(false);
  const [canHint, setCanHint] = useState(true);
  const [canDance, setCanDance] = useState(false);
  const [isSmall, setIsSmall] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  );
  const handleReady = useCallback((info) => {
    setLoaded(true);
    setCanDance(Boolean(info?.canDance));
  }, []);

  useEffect(() => {
    const onResize = () => setIsSmall(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ---- Scroll choreography (desktop, motion allowed) -----------------------
  useEffect(() => {
    const el = rootRef.current;
    if (!el || reducedMotion) return undefined;

    const mm = gsap.matchMedia();
    mm.add(DESKTOP, () => {
      // Hero → About: step left and turn toward the text.
      gsap
        .timeline({
          scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true },
        })
        .to(el, { xPercent: -24, ease: 'none' }, 0)
        .to(rig, { rotY: 0.5, cx: 0.26, ease: 'none' }, 0);

      // About → What I Do: pull the camera back to a full-body shot.
      gsap
        .timeline({
          scrollTrigger: { trigger: '#what', start: 'top 80%', end: 'top 10%', scrub: true },
        })
        .to(rig, { frame: 1, rotY: 0.72, ease: 'none' }, 0);

      // Leaving What I Do: she scrolls away with the section.
      gsap
        .timeline({
          scrollTrigger: { trigger: '#what', start: 'bottom 90%', end: 'bottom top', scrub: true },
        })
        .to(el, { yPercent: -100, ease: 'none' }, 0);

      return () => {
        gsap.set(el, { clearProps: 'transform' });
        Object.assign(rig, { rotY: 0, frame: 0, cx: 0.5 });
      };
    });

    return () => mm.revert();
  }, [reducedMotion]);

  // ---- Waving hello ----------------------------------------------------------
  // Once the intro curtain has lifted she waves, and again whenever the
  // visitor scrolls back up to the hero.
  useEffect(() => {
    if (!loaded || reducedMotion) return undefined;
    const html = document.documentElement;
    let stopTimer;
    let startTimer;
    let away = false;

    const waveFor = (ms) => {
      rig.wave = true;
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => {
        rig.wave = false;
      }, ms);
    };

    const waitForIntro = () => {
      if (html.classList.contains('is-loading')) startTimer = setTimeout(waitForIntro, 200);
      else startTimer = setTimeout(() => waveFor(2800), 700);
    };
    waitForIntro();

    const onScroll = () => {
      const y = window.scrollY;
      if (y > window.innerHeight * 0.6) {
        away = true;
        rig.wave = false;
      } else if (away && y < 40) {
        away = false;
        waveFor(2400);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(stopTimer);
      clearTimeout(startTimer);
      window.removeEventListener('scroll', onScroll);
      rig.wave = false;
    };
  }, [loaded, reducedMotion]);

  // ---- Pointer tracking + click-to-dance ------------------------------------
  useEffect(() => {
    if (reducedMotion) return undefined;
    const root = document.documentElement;

    // Is the pointer over the character while she is still in the hero?
    const overCharacter = (e) => {
      if (window.scrollY > window.innerHeight * 0.3) return false;
      if (e.target.closest?.('a, button, input, textarea')) return false;
      const dx = Math.abs(e.clientX - window.innerWidth * rig.cx);
      const reach = window.innerHeight * (rig.dance ? 0.3 : 0.17);
      return dx < reach && e.clientY > window.innerHeight * 0.14;
    };

    const onMove = (e) => {
      rig.pointerX = e.clientX / window.innerWidth;
      rig.pointerY = e.clientY / window.innerHeight;
      root.classList.toggle(
        'over-character',
        canDance && e.pointerType === 'mouse' && overCharacter(e)
      );
    };
    const onClick = (e) => {
      if (!canDance || !overCharacter(e)) return;
      rig.dance = !rig.dance;
      setDancing(rig.dance);
      setCanHint(false);
    };
    const onScroll = () => {
      if (rig.dance && window.scrollY > window.innerHeight * 0.3) {
        rig.dance = false;
        setDancing(false);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('click', onClick);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('scroll', onScroll);
      root.classList.remove('over-character');
      rig.dance = false;
    };
  }, [reducedMotion, canDance]);

  const className = [
    'character',
    loaded && 'is-loaded',
    dancing && 'is-dancing',
    reducedMotion && 'character--static',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className} ref={rootRef} aria-hidden="true">
      <div className="character__rim" />
      <SceneBoundary>
        <Canvas
          className="character__canvas"
          camera={{ fov: 25, near: 0.1, far: 50, position: [0, 1.35, 2.6] }}
          dpr={isSmall ? [1, 1.5] : [1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          {/* Soft fill + warm key from the front */}
          <ambientLight intensity={0.35} />
          <directionalLight position={[1.5, 2.6, 4]} intensity={2.4} color="#fff4f8" />
          {/* Pink rim lights from behind, one per shoulder */}
          <directionalLight position={[-3.5, 2.2, -3]} intensity={3.2} color="#ff5fb0" />
          <directionalLight position={[3.5, 1.4, -3]} intensity={2.2} color="#ff8fce" />

          <Suspense fallback={null}>
            <CharacterModel reducedMotion={reducedMotion} onReady={handleReady} />
          </Suspense>
        </Canvas>
      </SceneBoundary>

      {!reducedMotion && canDance && canHint && <span className="character__hint">Click me ♪</span>}
    </div>
  );
}
