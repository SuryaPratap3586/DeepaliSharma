'use client';
import { useState } from 'react';
export default function Compare({ before, after }) {
  const [v, setV] = useState(50);
  return (<div className="cmp"><img src={after} alt="" />
    <div className="cb" style={{ clipPath: `inset(0 ${100 - v}% 0 0)` }}><img src={before} alt="" /></div>
    <div className="ch" style={{ left: v + '%' }}>↔</div>
    <input type="range" min="0" max="100" value={v} onChange={(e) => setV(+e.target.value)} aria-label="compare" /></div>);
}
