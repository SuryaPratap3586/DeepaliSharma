'use client';
import { useState } from 'react';
export default function ContactForm({ p }) {
  const [f, setF] = useState({ first: '', last: '', email: '', message: '' });
  const [s, setS] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault(); setS('Sending...');
    const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: (f.first + ' ' + f.last).trim(), email: f.email, message: f.message }) });
    if (r.ok) { setS('Thanks! Your message was sent.'); setF({ first: '', last: '', email: '', message: '' }); } else setS('Something went wrong.');
  };
  return (
    <div className="cbox">
      <form onSubmit={submit}>
        <h3>{p.contactTitle}</h3><p>{p.contactText}</p>
        <div className="r2"><input placeholder="First Name" value={f.first} onChange={set('first')} required /><input placeholder="Last Name" value={f.last} onChange={set('last')} /></div>
        <input type="email" placeholder="Email@.com" value={f.email} onChange={set('email')} required />
        <textarea rows={4} placeholder="Message" value={f.message} onChange={set('message')} required />
        <button className="sbm">Submit</button>{s && <small>{s}</small>}
      </form>
      {p.contactImage ? <img src={p.contactImage} alt="" /> : <div className="cph" />}
    </div>
  );
}
