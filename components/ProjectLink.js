import Link from 'next/link';
import { linkOf } from '@/lib/util';

// A project card wrapper: internal links use Next's <Link>, external ones open in a new tab.
export default function ProjectLink({ url, className, style, children }) {
  const l = linkOf(url);
  if (!l) return <div className={className + ' nolink'} style={style}>{children}</div>;
  if (l.external) return <a href={l.href} target="_blank" rel="noopener noreferrer" className={className} style={style}>{children}</a>;
  return <Link href={l.href} className={className} style={style}>{children}</Link>;
}
