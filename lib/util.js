export const slugOf = (x) => x.slug || String(x.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Turns the "Redirect URL" typed in the admin panel into { href, external }.
// "/about", "#contact", "portfolio" -> internal; "https://..", "www..", "behance.net/x", "mailto:" -> external.
export const linkOf = (raw) => {
  const u = String(raw || '').trim();
  if (!u) return null;
  if (/^(https?:|mailto:|tel:)/i.test(u)) return { href: u, external: true };
  if (u.startsWith('//')) return { href: 'https:' + u, external: true };
  if (u.startsWith('/')) return { href: u, external: false };
  if (u.startsWith('#')) return { href: '/' + u, external: false };
  if (/^[^\s/]+\.[a-z]{2,}(\/|$|\?|#)/i.test(u)) return { href: 'https://' + u, external: true };
  return { href: '/' + u, external: false };
};
