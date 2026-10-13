import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { getSite } from '@/lib/db';
export const dynamic = 'force-dynamic';
export default async function SiteLayout({ children }) {
  const d = await getSite();
  return (<><Nav p={d.profile || {}} />{children}<Footer d={d} /></>);
}
