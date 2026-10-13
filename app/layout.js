import './globals.css';
import { Manrope } from 'next/font/google';
import { getSite } from '@/lib/db';
const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-manrope', display: 'swap' });
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Portfolio', description: 'UI/UX Designer Portfolio' };
const F = { sans: 'var(--font-manrope),system-ui,-apple-system,Segoe UI,sans-serif', serif: 'Georgia,"Times New Roman",serif', mono: 'ui-monospace,Menlo,Consolas,monospace' };
const hex = (x) => (/^#[0-9a-f]{3,8}$/i.test(x || '') ? x : null);
export default async function RootLayout({ children }) {
  const t = (await getSite()).theme || {};
  const v = [['--bg', hex(t.bg)], ['--tx', hex(t.text)], ['--ac', hex(t.accent)], ['--ac2', hex(t.accent2)], ['--card', hex(t.card)], ['--btn', hex(t.btn)], ['--font', F[t.font]]].filter((x) => x[1]).map((x) => x.join(':')).join(';');
  return (<html lang="en" className={manrope.variable}><head><style>{`html:root{${v}}`}</style></head><body>{children}</body></html>);
}
