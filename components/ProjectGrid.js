'use client';
import Link from 'next/link';
import { useState } from 'react';
export default function ProjectGrid({ items, categories = [] }) {
  const cats = ['All', ...categories];
  const [c, setC] = useState('All');
  return (<>
    <div className="chips">{cats.map((k) => <button key={k} className={k === c ? 'on' : ''} onClick={() => setC(k)}>{k}</button>)}</div>
    <div className="grid">{items.filter((x) => c === 'All' || x.category === c).map((x, i) => (
      <Link key={x.slug + i} href={'/project/' + x.slug} className="pc tilt" style={{ animationDelay: i * 80 + 'ms' }}>
        {x.cover ? <img src={x.cover} alt="" /> : <div className="ph" />}<span className="tag">{x.category}</span><h3>{x.title}</h3>
      </Link>))}</div>
  </>);
}
