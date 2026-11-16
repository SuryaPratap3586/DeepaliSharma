'use client';
import { useEffect, useRef } from 'react';
// Fades children in once they scroll into view. variant: up | left | right | zoom
export default function Reveal({ children, delay = 0, className = '', variant = 'up' }) {
  const r = useRef();
  useEffect(() => {
    const el = r.current;
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return; }
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { e.target.classList.add('in'); o.disconnect(); } }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    o.observe(el); return () => o.disconnect();
  }, []);
  return <div ref={r} className={`rv rv-${variant} ${className}`.trim()} style={{ transitionDelay: delay + 'ms' }}>{children}</div>;
}
