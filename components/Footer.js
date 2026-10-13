import Link from 'next/link';
import { slugOf } from '@/lib/util';
export default function Footer({ d }) {
  const p = d.profile || {};
  return (
    <footer className="ft"><div className="fg">
      <div><h4>About Us</h4><p>{p.footerAbout}</p><div className="soc">{(d.socials || []).map((s, i) => <a key={i} href={s.url} target="_blank" rel="noreferrer">{s.name}</a>)}</div></div>
      <div><h4>Navigation</h4><Link href="/">Home</Link><Link href="/portfolio">Portfolio</Link></div>
      <div><h4>Services</h4>{(d.services || []).map((s, i) => <Link key={i} href={'/service/' + slugOf(s)}>{s.title}</Link>)}</div>
    </div><p className="cp">{p.copyright}</p></footer>
  );
}
