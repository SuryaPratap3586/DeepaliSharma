'use client';
import { useState } from 'react';
import ProjectLink from '@/components/ProjectLink';
export default function ProjectGrid({ items, categories = [] }) {
  const cats = ['All', ...categories];
  const [c, setC] = useState('All');
  return (<>
    <div className="chips">{cats.map((k) => <button key={k} style={{ '--i': cats.indexOf(k) }} className={k === c ? 'on' : ''} onClick={() => setC(k)}>{k}</button>)}</div>
    <div className="grid" key={c}>{items.filter((x) => c === 'All' || x.category === c).map((x, i) => (
      // The link is the fixed click area; the inner .pc is what lifts/tilts on hover,
      // so the card never moves out from under the cursor.
      <ProjectLink key={i} url={x.link} label={x.title} className="pc-link">
        <div className="pc tilt" style={{ animationDelay: i * 80 + 'ms' }}>
          <div className="pc-media">{x.cover ? <img src={x.cover} alt={x.title || ''} loading="lazy" draggable="false" /> : <div className="ph" />}</div>
          <span className="tag">{x.category}</span><h3>{x.title}</h3>
        </div>
      </ProjectLink>))}</div>
  </>);
}
