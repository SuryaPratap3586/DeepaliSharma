import ProjectLink from '@/components/ProjectLink';

export default function FeaturedTrack({ items }) {
  const list = [...items, ...items, ...items, ...items];
  return (
    <div className="fwrap">
      <div className="frot">
        <div className="ftrack">
          {list.map((x, i) => (
            <ProjectLink key={i} url={x.link} label={x.title} className="fp">
              {x.cover ? <img src={x.cover} alt={x.title || ''} loading="lazy" draggable="false" /> : <div className="ph" />}
              <span className="tag">{x.category}</span>
            </ProjectLink>
          ))}
        </div>
      </div>
    </div>
  );
}
