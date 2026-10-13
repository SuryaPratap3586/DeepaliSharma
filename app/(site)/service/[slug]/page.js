import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSite } from '@/lib/db';
import { slugOf } from '@/lib/util';
export const dynamic = 'force-dynamic';
export default async function Service({ params }) {
  const d = await getSite(); const x = (d.services || []).find((s) => slugOf(s) === params.slug);
  if (!x) notFound();
  return (<article className="page"><Link href="/#services" className="back">← All services</Link>
    <h1>{x.title}</h1><p className="lead">{x.desc}</p>{x.details && <p className="lead" style={{ color: '#fff' }}>{x.details}</p>}
    <Link href="/#contact" className="btn">Hire me for this</Link></article>);
}
