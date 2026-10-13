'use client';
import { useEffect, useState } from 'react';

const LISTS = {
  categories: { label: 'Categories', fields: [['name', 'Category name (shows as filter on Portfolio page)']] },
  projects: { label: 'Projects', fields: [['title', 'Title'], ['slug', 'URL slug (optional)'], ['category', 'Category', 'cat'], ['cover', 'Cover image (card)', 'image'], ['desc', 'Description', 'area'], ['hero', 'Top banner images (3 phone shots)', 'images'], ['role', 'Role card'], ['duration', 'Duration card'], ['tools', 'Tools card'], ['images', 'Screens gallery (select many)', 'images'], ['process', 'Design process steps', 'proc'], ['finalTitle', 'Final UI title'], ['finalText', 'Final UI text', 'area'], ['before', 'Final UI BEFORE image', 'image'], ['after', 'Final UI AFTER image', 'image']] },
  services: { label: 'Services', fields: [['title', 'Title'], ['slug', 'URL slug (optional)'], ['desc', 'Short description', 'area'], ['details', 'Full details (service page)', 'area']] },
  stats: { label: 'Hero stats', fields: [['num', 'Number (e.g. 3+)'], ['label', 'Label']] },
  posters: { label: 'Posters', fields: [['image', 'Poster image', 'image']] },
  experience: { label: 'Experience', fields: [['year', 'Year'], ['title', 'Title'], ['place', 'Company']] },
  education: { label: 'Education', fields: [['year', 'Year'], ['title', 'Title'], ['place', 'Institute']] },
  tools: { label: 'Tools', fields: [['name', 'Name'], ['image', 'Icon', 'image']] },
  socials: { label: 'Socials', fields: [['name', 'Name'], ['url', 'Link']] },
};
const PROFILE = [['brand', 'Brand text'], ['logo', 'Logo', 'image'], ['greeting', 'Hero greeting'], ['role', 'Hero title'], ['roleAccent', 'Hero title (colored word)'], ['subtitle', 'Hero subtitle', 'area'], ['ctaText', 'Hero button text'], ['resume', 'Resume (PDF upload)', 'image'], ['aboutHeadline', 'About headline'], ['aboutRole', 'About role'], ['about', 'About text', 'area'], ['photo', 'Your photo', 'image'], ['contactTitle', 'Contact box title'], ['contactText', 'Contact box text', 'area'], ['contactImage', 'Contact box image', 'image'], ['email', 'Email'], ['footerAbout', 'Footer about text', 'area'], ['copyright', 'Copyright text']];

async function upload(file) {
  const fd = new FormData(); fd.append('file', file);
  const j = await (await fetch('/api/upload', { method: 'POST', body: fd })).json();
  if (!j.url) alert(j.error); return j.url;
}
function Img({ value, onChange }) {
  return (<div className="row">
    {value && (value.endsWith('.pdf') ? <a href={value} target="_blank" className="hl">PDF uploaded ✓</a> : <img className="thumb" src={value} alt="" />)}
    <input type="file" accept="image/*,application/pdf" style={{ width: 'auto' }} onChange={async (e) => { const u = await upload(e.target.files[0]); if (u) onChange(u); }} />
    {value && <button type="button" className="btn danger" onClick={() => onChange('')}>Remove</button>}
  </div>);
}
function Imgs({ value = [], onChange }) {
  return (<div><div className="row">{value.map((u, i) => (<div key={i}><img className="thumb" src={u} alt="" /><button type="button" className="btn danger" onClick={() => onChange(value.filter((_, j) => j !== i))}>x</button></div>))}</div>
    <input type="file" accept="image/*" multiple style={{ width: 'auto' }} onChange={async (e) => { const us = []; for (const f of e.target.files) { const u = await upload(f); if (u) us.push(u); } onChange([...value, ...us]); }} /></div>);
}
const PRESETS = { 'Earthy Green': ['#E8F5DC', '#26321B', '#6F8350', '#55683A', '#CFE1B9'], Purple: ['#07050d', '#ffffff', '#a88af5', '#ec6ab8', '#2a2a2d'], Blue: ['#050b14', '#ffffff', '#60a5fa', '#22d3ee', '#1c2431'], Green: ['#04100a', '#ffffff', '#4ade80', '#a3e635', '#1a2a20'], Orange: ['#120803', '#ffffff', '#fb923c', '#f43f5e', '#2d2118'], Light: ['#ffffff', '#111827', '#7c3aed', '#ec4899', '#f3f4f6'], Cream: ['#faf7f2', '#1f2937', '#b45309', '#e11d48', '#f1ebe0'] };
function Theme({ d, setD }) {
  const t = { bg: '#E8F5DC', text: '#26321B', accent: '#6F8350', accent2: '#55683A', card: '#CFE1B9', btn: '#ffffff', font: 'sans', ...(d.theme || {}) };
  const set = (o) => setD({ ...d, theme: { ...t, ...o } });
  return (<div className="item">
    <span className="lbl">Quick presets (then fine-tune below)</span>
    <div className="row">{Object.entries(PRESETS).map(([n, v]) => <button key={n} type="button" className="btn" style={{ background: v[2], color: v[0] }} onClick={() => set({ bg: v[0], text: v[1], accent: v[2], accent2: v[3], card: v[4], btn: '#ffffff' })}>{n}</button>)}</div>
    {[['bg', 'Background'], ['text', 'Text'], ['accent', 'Accent (headings, highlights, borders)'], ['accent2', 'Accent 2 (button gradient end)'], ['card', 'Cards / boxes'], ['btn', 'Button text']].map(([k, l]) => (<div key={k}><span className="lbl">{l}</span>
      <div className="row"><input type="color" value={t[k]} onChange={(e) => set({ [k]: e.target.value })} style={{ width: 60, padding: 2, margin: 0 }} /><input value={t[k]} onChange={(e) => set({ [k]: e.target.value })} style={{ maxWidth: 140, margin: 0 }} /></div></div>))}
    <span className="lbl">Font style</span>
    <select value={t.font} onChange={(e) => set({ font: e.target.value })}><option value="sans">Manrope (default)</option><option value="serif">Serif</option><option value="mono">Mono</option></select>
    <small className="lbl">Save changes, then refresh the site to see the new theme.</small></div>);
}
function Proc({ value = [], onChange }) {
  const set = (i, k, v) => onChange(value.map((x, j) => (j === i ? { ...x, [k]: v } : x)));
  return (<div>{value.map((x, i) => (<div className="item" key={i}>
    <input placeholder="Step title (e.g. Research & Pain Points)" value={x.title || ''} onChange={(e) => set(i, 'title', e.target.value)} />
    <textarea rows={3} placeholder="Step text" value={x.text || ''} onChange={(e) => set(i, 'text', e.target.value)} />
    <Img value={x.image} onChange={(v) => set(i, 'image', v)} />
    <button type="button" className="btn danger" onClick={() => onChange(value.filter((_, j) => j !== i))}>Delete step</button></div>))}
    <button type="button" className="btn" onClick={() => onChange([...value, {}])}>+ Add step</button></div>);
}
function Field({ f, value, onChange, cats = [] }) {
  const [, label, type] = f;
  return (<div><span className="lbl">{label}</span>
    {type === 'cat' ? <select value={value || ''} onChange={(e) => onChange(e.target.value)}><option value="">— choose —</option>{cats.map((c) => <option key={c}>{c}</option>)}</select> : type === 'proc' ? <Proc value={value} onChange={onChange} /> : type === 'image' ? <Img value={value} onChange={onChange} /> : type === 'images' ? <Imgs value={value} onChange={onChange} /> : type === 'area' ? <textarea rows={3} value={value || ''} onChange={(e) => onChange(e.target.value)} /> : <input value={value || ''} onChange={(e) => onChange(e.target.value)} />}
  </div>);
}

export default function Admin() {
  const [auth, setAuth] = useState(null);
  const [pw, setPw] = useState('');
  const [d, setD] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [tab, setTab] = useState('profile');
  const [note, setNote] = useState('');

  const load = async () => {
    const m = await fetch('/api/contact');
    if (m.status === 401) return setAuth(false);
    setMsgs(await m.json()); setD(await (await fetch('/api/content')).json()); setAuth(true);
  };
  useEffect(() => { load(); }, []);

  const login = async (e) => {
    e.preventDefault();
    const r = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw }) });
    if (r.ok) load(); else alert('Wrong password');
  };
  const save = async () => {
    const r = await fetch('/api/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
    setNote(r.ok ? 'Saved ✓' : 'Save failed'); setTimeout(() => setNote(''), 2500);
  };
  const delMsg = async (id) => { await fetch('/api/contact', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) }); setMsgs(msgs.filter((m) => m.id !== id)); };
  const logout = async () => { await fetch('/api/login', { method: 'DELETE' }); setAuth(false); };

  if (auth === null) return <p className="adm">Loading...</p>;
  if (!auth) return (<form onSubmit={login} className="adm" style={{ marginTop: 80 }}><h2>Admin Login</h2><input type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} /><button className="btn">Login</button></form>);

  const setProfile = (k, v) => setD({ ...d, profile: { ...d.profile, [k]: v } });
  const setItem = (list, i, k, v) => setD({ ...d, [list]: d[list].map((x, j) => (j === i ? { ...x, [k]: v } : x)) });
  const add = (list) => setD({ ...d, [list]: [...(d[list] || []), {}] });
  const del = (list, i) => setD({ ...d, [list]: d[list].filter((_, j) => j !== i) });
  const move = (list, i, dir) => { const a = [...d[list]]; const j = i + dir; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; setD({ ...d, [list]: a }); };

  return (
    <div className="adm">
      <div className="row" style={{ justifyContent: 'space-between' }}><h2>Admin Panel</h2><div className="row"><a href="/" target="_blank" className="btn">View site</a><button className="btn danger" onClick={logout}>Logout</button></div></div>
      <div className="tabs">
        {['profile', 'theme', ...Object.keys(LISTS), 'messages'].map((t) => (<button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t === 'profile' ? 'Profile' : t === 'theme' ? 'Theme' : t === 'messages' ? `Messages (${msgs.length})` : LISTS[t].label}</button>))}
      </div>

      {tab === 'theme' && <Theme d={d} setD={setD} />}

      {tab === 'profile' && <div className="item">{PROFILE.map((f) => <Field key={f[0]} f={f} value={d.profile?.[f[0]]} onChange={(v) => setProfile(f[0], v)} />)}</div>}

      {LISTS[tab] && <>
        {(d[tab] || []).map((it, i) => (
          <div className="item" key={i}>
            {LISTS[tab].fields.map((f) => <Field key={f[0]} cats={(d.categories || []).map((c) => c.name)} f={f} value={it[f[0]]} onChange={(v) => setItem(tab, i, f[0], v)} />)}
            <div className="row"><button className="btn" onClick={() => move(tab, i, -1)}>↑</button><button className="btn" onClick={() => move(tab, i, 1)}>↓</button><button className="btn danger" onClick={() => del(tab, i)}>Delete</button></div>
          </div>
        ))}
        <button className="btn" onClick={() => add(tab)}>+ Add new</button>
      </>}

      {tab === 'messages' && (msgs.length === 0 ? <p>No messages yet.</p> : msgs.map((m) => (
        <div className="item" key={m.id}><b>{m.name} — <a href={`mailto:${m.email}`} className="hl">{m.email}</a></b><p>{m.message}</p>
          <div className="row" style={{ justifyContent: 'space-between' }}><small>{new Date(m.date).toLocaleString()}</small><button className="btn danger" onClick={() => delMsg(m.id)}>Delete</button></div></div>)))}

      {tab !== 'messages' && <div style={{ overflow: 'hidden', marginTop: 20 }}><button className="btn save" onClick={save}>{note || 'Save changes'}</button></div>}
    </div>
  );
}
