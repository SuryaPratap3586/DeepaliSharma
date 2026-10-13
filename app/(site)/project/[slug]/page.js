import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSite } from '@/lib/db';
import { slugOf } from '@/lib/util';
import Reveal from '@/components/Reveal';
import Compare from '@/components/Compare';
export const dynamic = 'force-dynamic';
export default async function Project({ params }) {
  const d = await getSite(); const x = (d.projects || []).find((p) => slugOf(p) === params.slug);
  if (!x) notFound();
  const hero = (x.hero || []).slice(0, 3), steps = (x.process || []).filter((s) => s.title || s.text || s.image);
  return (<article className="page wide">
    <Link href="/portfolio" className="back">← All Projects</Link>
    {hero.length > 0 && <div className="phones">{hero.map((u, i) => <img key={i} src={u} alt="" style={{ animationDelay: i * 150 + 'ms' }} />)}</div>}
    <span className="tag s">{x.category}</span>
    <h1>{x.title}</h1><p className="lead">{x.desc}</p>
    <div className="info">{[['👤 Role', x.role], ['⏱ Duration', x.duration], ['🛠 Tools', x.tools]].map(([l, v], i) => (v ? <Reveal key={i} delay={i * 100}><div><small>{l}</small><b>{v}</b></div></Reveal> : null))}</div>
    {(x.images || []).length > 0 && <div className="scr">{x.images.map((u, i) => <Reveal key={i} delay={(i % 2) * 120}><div><img src={u} alt="" /></div></Reveal>)}</div>}
    {steps.length > 0 && <><h2 className="ttl" style={{ color: 'var(--tx)', fontSize: 'clamp(1.8rem,5vw,3rem)' }}>Design Process</h2>
      {steps.map((s, i) => (<Reveal key={i}><div className={'pr' + (i % 2 ? ' rev' : '')}><div className="sc"><h3>{s.title}</h3><p>{s.text}</p></div>{s.image && <img className="pi" src={s.image} alt="" />}</div></Reveal>))}</>}
    {(x.before || x.after) && <Reveal><div className="sc" style={{ margin: '40px 0 20px' }}><h3>{x.finalTitle}</h3><p>{x.finalText}</p></div>
      <Compare before={x.before || x.after} after={x.after || x.before} /></Reveal>}
    <div className="ctr"><Link href="/#contact" className="btn">Start a project</Link></div>
  </article>);
}
