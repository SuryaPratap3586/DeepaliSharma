import Link from 'next/link';
import { getSite } from '@/lib/db';
import { slugOf } from '@/lib/util';
import Reveal from '@/components/Reveal';
import FeaturedTrack from '@/components/FeaturedTrack';
import SocialMarquee from '@/components/SocialMarquee';
import ContactForm from '@/components/ContactForm';
export const dynamic = 'force-dynamic';
const TL = ({ a }) => a.map((x, i) => (<Reveal key={i} delay={i * 90}><div className="tc"><small>{x.year}</small><h4>{x.title}</h4><p>{x.place}</p></div></Reveal>));
export default async function Home() {
  const d = await getSite(); const p = d.profile || {}; const L = (k) => d[k] || [];
  return (<>
    <section className="hero"><div className="blob" />
      <h2 className="hi">{p.greeting}</h2>
      <h1>{p.role} <em>{p.roleAccent}</em></h1>
      <p>{p.subtitle}</p>
      <div className="btns"><Link href="/portfolio" className="btn">{p.ctaText || 'View My Work'} →</Link>{p.resume && <a href={p.resume} download className="btn ghost">⬇ Resume</a>}</div>
      <div className="stats">{L('stats').map((s, i) => <div key={i}><b>{s.num}</b><span>{s.label}</span></div>)}</div>
    </section>

    <section id="portfolio"><Reveal><h2 className="ttl">PORTFOLIO</h2><p className="sub">Featured Projects</p></Reveal>
      <FeaturedTrack items={L('projects').map((x) => ({ ...x, slug: slugOf(x) }))} />
      <div className="ctr"><Link href="/portfolio" className="btn">View all projects</Link></div>
    </section>

    <section id="services"><Reveal><h2 className="ttl">SERVICE</h2><p className="sub">What I Do</p></Reveal>
      <div className="sg">{L('services').map((x, i) => (<Reveal key={i} delay={i * 100}><Link href={'/service/' + slugOf(x)} className="sv tilt"><h3>{x.title}</h3><p>{x.desc}</p></Link></Reveal>))}</div>
    </section>

    <section id="about"><Reveal><h2 className="ttl"><span style={{ color: 'var(--ac)' }}>About</span> <span style={{ color: 'var(--tx)' }}>Me</span></h2><p className="sub">{p.aboutHeadline}</p></Reveal>
      <div className="ab">
        <Reveal>{p.photo && <img src={p.photo} alt="" />}</Reveal>
        <div><Reveal><small className="hl">{p.aboutRole}</small><p>{p.about}</p></Reveal>
          <h3 className="h3">Experience</h3><TL a={L('experience')} />
          <h3 className="h3">Education</h3><TL a={L('education')} />
        </div>
      </div>
      <div className="tools">{L('tools').map((t, i) => <div className="tool" key={i} style={{ animationDelay: i * 200 + 'ms' }}>{t.image ? <img src={t.image} alt={t.name} /> : t.name}</div>)}</div>
    </section>

    {L('posters').length > 0 && <section style={{ maxWidth: 'none', padding: '80px 0 0' }}>
      <Reveal><h2 className="ttl" style={{ color: 'var(--tx)' }}>SOCIAL <em>MEDIA</em></h2></Reveal><br />
      <Reveal><SocialMarquee images={L('posters').map((x) => x.image).filter(Boolean)} /></Reveal>
    </section>}

    <section id="contact"><Reveal><h2 className="ttl" style={{ color: 'var(--tx)' }}>GET IN <em>TOUCH</em></h2></Reveal>
      <Reveal><ContactForm p={p} /></Reveal>
      <h2 className="ttl lets">LET&apos;S TALK</h2>
      <a className="mail" href={'mailto:' + p.email}>{p.email}</a>
    </section>
  </>);
}
