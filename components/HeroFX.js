'use client';
import { useEffect, useRef } from 'react';

// Fixed, deterministic positions so server and client render the same markup.
const DOTS = Array.from({ length: 14 }, (_, i) => ({
  '--x': ((i * 37 + 7) % 96) + '%',
  '--y': ((i * 53 + 21) % 88) + '%',
  '--s': (i % 3) + 2 + 'px',
  '--t': 7 + (i % 5) * 1.6 + 's',
  '--dl': -i * 0.9 + 's',
}));

// Animated hero background: gradient orbs, aurora ring, grid, floating dots and a
// cursor spotlight. All colours come from the theme variables (see .hero-fx in globals.css).
export default function HeroFX() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const hero = el?.parentElement;
    if (!hero) return;
    // Pause every animation while the hero is off screen.
    const io = new IntersectionObserver(([e]) => el.classList.toggle('paused', !e.isIntersecting));
    io.observe(hero);
    // Spotlight + soft parallax, only for a real mouse.
    let raf = 0;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const move = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = hero.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        el.style.setProperty('--sx', x + 'px');
        el.style.setProperty('--sy', y + 'px');
        el.style.setProperty('--px', (x / r.width - 0.5).toFixed(3));
        el.style.setProperty('--py', (y / r.height - 0.5).toFixed(3));
      });
    };
    if (fine) hero.addEventListener('pointermove', move, { passive: true });
    return () => {
      io.disconnect();
      hero.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="hero-fx" ref={ref} aria-hidden="true">
      <div className="blob" />
      <div className="hero-grid" />
      <div className="orb o1" />
      <div className="orb o2" />
      <div className="orb o3" />
      <div className="hero-ring" />
      <div className="spot" />
      <div className="dots">
        {DOTS.map((s, i) => <i key={i} style={s} />)}
      </div>
    </div>
  );
}
