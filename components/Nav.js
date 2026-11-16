'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function Nav({ p }) {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  // Solid bar once scrolled; slides away when scrolling down, comes back when scrolling up.
  useEffect(() => {
    let last = window.scrollY, ticking = false;
    const run = () => {
      const y = window.scrollY, dy = y - last;
      setScrolled(y > 20);
      if (y <= 240) setHidden(false);
      else if (dy > 6) setHidden(true);
      else if (dy < -6) setHidden(false);
      if (Math.abs(dy) > 6 || y <= 240) last = y;
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    run();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setHidden(false), [path]);
  return (
    <header className={'nav' + (scrolled ? ' scrolled' : '') + (hidden ? ' hide' : '')}>
      <Link href="/" className="logo">{p.logo && <img src={p.logo} alt="" />}<span>{p.brand}</span></Link>
      <nav className="pill"><Link href="/" className={path === '/' ? 'on' : ''}>HOME</Link><Link href="/portfolio" className={path.startsWith('/portfolio') ? 'on' : ''}>PORTFOLIO</Link></nav>
      <Link href="/#contact" className="cbtn">Contact</Link>
    </header>
  );
}
