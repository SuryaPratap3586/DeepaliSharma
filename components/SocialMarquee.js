import Link from 'next/link';

export default function SocialMarquee({ images }) {
  if (!images.length) return null;
  let pool = [...images];
  while (pool.length < 16) pool = [...pool, ...images];
  const cols = [0, 1, 2, 3].map((c) => pool.filter((_, i) => i % 4 === c));
  return (
    <div className="sm">
      <div className="smgrid">
        {cols.map((col, c) => (
          <div className="scol" key={c}>
            <div className="strack">
              {[...col, ...col].map((u, i) => <img key={i} src={u} alt="poster" loading="lazy" />)}
            </div>
          </div>
        ))}
      </div>
      <Link href="/portfolio" className="btn ghost smbtn">View My Work</Link>
    </div>
  );
}
