'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function Nav({ p }) {
  const path = usePathname();
  return (
    <header className="nav">
      <Link href="/" className="logo">{p.logo && <img src={p.logo} alt="" />}<span>{p.brand}</span></Link>
      <nav className="pill"><Link href="/" className={path === '/' ? 'on' : ''}>HOME</Link><Link href="/portfolio" className={path.startsWith('/portfolio') ? 'on' : ''}>PORTFOLIO</Link></nav>
      <Link href="/#contact" className="cbtn">Contact</Link>
    </header>
  );
}
