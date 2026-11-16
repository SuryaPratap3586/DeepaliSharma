'use client';
import { useState } from 'react';
import ProjectLink from '@/components/ProjectLink';
export default function ProjectGrid({ items, categories = [] }) {
  const cats = ['All', ...categories];
  const [c, setC] = useState('All');
  return (<>
    <div className="chips">{cats.map((k) => <button key={k} style={{ '--i': cats.indexOf(k) }} className={k === c ? 'on' : ''} onClick={() => setC(k)}>{k}</button>)}</div>
    <div className="grid" key={c}>{items.filter((x) => c === 'All' || x.category === c).map((x, i) => (
      <ProjectLink key={i} url={x.link} className="pc tilt" style={{ animationDelay: i * 80 + 'ms' }}>
        <div className="pc-media">{x.cover ? <img src={x.cover} alt={x.title || ''} loading="lazy" /> : <div className="ph" />}</div>
        <span className="tag">{x.category}</span><h3>{x.title}</h3>
      </ProjectLink>))}</div>
  </>);
}
