import { getSite } from '@/lib/db';
import Reveal from '@/components/Reveal';
import ProjectGrid from '@/components/ProjectGrid';
export const dynamic = 'force-dynamic';
export default async function Portfolio() {
  const d = await getSite();
  return (<section style={{ paddingTop: 120 }}>
    <Reveal><h2 className="ttl" style={{ color: 'var(--tx)' }}>All <em>Projects</em></h2><p className="sub">Click any project to view it</p></Reveal>
    <ProjectGrid categories={(d.categories || []).map((c) => c.name)} items={d.projects || []} /></section>);
}
