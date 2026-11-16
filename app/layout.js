import './globals.css';
import { Manrope } from 'next/font/google';
import { getSite } from '@/lib/db';
const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-manrope', display: 'swap' });
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Portfolio', description: 'UI/UX Designer Portfolio' };
const F = { sans: 'var(--font-manrope),system-ui,-apple-system,Segoe UI,sans-serif', serif: 'Georgia,"Times New Roman",serif', mono: 'ui-monospace,Menlo,Consolas,monospace' };
const hex = (x) => (/^#[0-9a-f]{3,8}$/i.test(x || '') ? x : null);
// "dark" when the theme background is dark, so styles can adapt (e.g. the resume button).
const scheme = (bg) => {
  let h = (hex(bg) || '#e8f5dc').slice(1);
  if (h.length < 6) h = h.slice(0, 3).split('').map((c) => c + c).join('');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b < 140 ? 'dark' : 'light';
};
export default async function RootLayout({ children }) {
  const t = (await getSite()).theme || {};
  const v = [['--bg', hex(t.bg)], ['--tx', hex(t.text)], ['--ac', hex(t.accent)], ['--ac2', hex(t.accent2)], ['--card', hex(t.card)], ['--btn', hex(t.btn)], ['--font', F[t.font]]].filter((x) => x[1]).map((x) => x.join(':')).join(';');
  return (<html lang="en" className={manrope.variable} data-scheme={scheme(t.bg)}><head><style>{`html:root{${v}}`}</style></head><body>{children}</body></html>);
}
