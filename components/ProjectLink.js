import Link from 'next/link';
import { linkOf } from '@/lib/util';

// Wraps a whole project card so a click anywhere on it opens the project's Redirect URL
// (set in the admin panel). Internal paths use Next's <Link>; full web addresses open in a new tab.
// With no URL the card is shown but is not a link.
export default function ProjectLink({ url, className = '', style, label, children }) {
  const l = linkOf(url);
  if (!l) return <div className={className + ' nolink'} style={style}>{children}</div>;
  const props = { className, style, 'aria-label': label ? `Open ${label}` : undefined };
  if (l.external) return <a href={l.href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
  return <Link href={l.href} {...props}>{children}</Link>;
}
