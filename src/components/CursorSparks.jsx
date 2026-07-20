import { useEffect, useRef } from 'react';
import './CursorSparks.css';

/**
 * Fixed full-viewport canvas that emits neon-pink glowing dot particles
 * from the cursor as it moves, drawing faint lines between nearby
 * particles so the trail reads as a drifting neural network. Spawn rate
 * + particle speed scale with pointer speed. Disabled under reduced-motion.
 *
 * Perf-sensitive by design: particles are spawned once per animation
 * frame (not per raw mousemove event), links are batched into a handful
 * of stroke() calls per frame via alpha-bucketed Path2Ds, and shadowBlur
 * is avoided entirely — all things that previously made this jank on
 * fast pointer movement.
 */
const MAX_PARTICLES = 150;
const LINK_DIST = 70;
const ALPHA_BUCKETS = 10;

export default function CursorSparks({ reducedMotion = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const colors = ['#ff5fb0', '#ff8fce', '#ff2f9c'];

    let particles = [];

    // Pointer position is only recorded on mousemove; particles are
    // spawned from it once per rAF tick, decoupling spawn rate from the
    // browser's (potentially much higher) mousemove event rate.
    let pointerX = 0;
    let pointerY = 0;
    let prevX = 0;
    let prevY = 0;
    let hasPointer = false;
    let pointerMoved = false;

    const spawnParticles = (x, y, vx, vy) => {
      const speed = Math.hypot(vx, vy);
      const count = Math.min(Math.floor(speed / 8) + 2, 10);

      for (let i = 0; i < count; i++) {
        const spread = (Math.random() - 0.5) * 1.4;
        const angle = Math.atan2(vy, vx) + Math.PI + spread;
        const velocity = 0.6 + Math.random() * 1.8 + speed * 0.03;

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          radius: 1.2 + Math.random() * 2,
          life: 1,
          decay: 0.02 + Math.random() * 0.02,
          color: colors[(Math.random() * colors.length) | 0],
        });
      }

      if (particles.length > MAX_PARTICLES) {
        particles.splice(0, particles.length - MAX_PARTICLES);
      }
    };

    const onPointerMove = (e) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      pointerMoved = true;
      hasPointer = true;
    };

    const onPointerLeave = () => {
      hasPointer = false;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseleave', onPointerLeave, { passive: true });
    window.addEventListener('resize', resize);

    const linkBuckets = new Array(ALPHA_BUCKETS);

    let rafId;
    const tick = () => {
      if (hasPointer && pointerMoved) {
        spawnParticles(pointerX, pointerY, pointerX - prevX, pointerY - prevY);
        pointerMoved = false;
      }
      prevX = pointerX;
      prevY = pointerY;

      ctx.clearRect(0, 0, width, height);

      particles = particles.filter((p) => p.life > 0);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= p.decay;
      }

      ctx.globalCompositeOperation = 'lighter';

      // Bucket links by alpha so the whole web draws in ~10 stroke()
      // calls total, regardless of how many particle pairs are linked.
      for (let i = 0; i < ALPHA_BUCKETS; i++) linkBuckets[i] = null;

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq >= LINK_DIST * LINK_DIST) continue;

          const dist = Math.sqrt(distSq);
          const linkAlpha =
            (1 - dist / LINK_DIST) * Math.min(a.life, b.life) * 0.5;
          if (linkAlpha <= 0.015) continue;

          const bucket = Math.min(
            ALPHA_BUCKETS - 1,
            Math.floor(linkAlpha * ALPHA_BUCKETS)
          );
          let path = linkBuckets[bucket];
          if (!path) {
            path = new Path2D();
            linkBuckets[bucket] = path;
          }
          path.moveTo(a.x, a.y);
          path.lineTo(b.x, b.y);
        }
      }

      ctx.strokeStyle = '#ff5fb0';
      ctx.lineWidth = 1;
      for (let i = 0; i < ALPHA_BUCKETS; i++) {
        const path = linkBuckets[i];
        if (!path) continue;
        ctx.globalAlpha = (i + 1) / ALPHA_BUCKETS;
        ctx.stroke(path);
      }

      for (const p of particles) {
        const alpha = Math.max(p.life, 0);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * alpha, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return <canvas ref={canvasRef} className="cursor-sparks" aria-hidden="true" />;
}
