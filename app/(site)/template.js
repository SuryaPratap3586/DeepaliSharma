// Re-mounts on every page change, so each page fades in (see .pt in globals.css).
export default function Template({ children }) {
  return <div className="pt">{children}</div>;
}
