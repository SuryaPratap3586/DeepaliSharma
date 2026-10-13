import Link from 'next/link';

export default function FeaturedTrack({ items }) {
  const list = [...items, ...items, ...items, ...items];
  return (
    <div className="fwrap">
      <div className="frot">
        <div className="ftrack">
          {list.map((x, i) => (
            <Link key={i} href={'/project/' + x.slug} className="fp">
              {x.cover ? <img src={x.cover} alt="" /> : <div className="ph" />}
              <span className="tag">{x.category}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
