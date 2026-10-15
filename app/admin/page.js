"use client";

import { useEffect, useState } from "react";

const LISTS = {
  categories: {
    label: "Categories",
    fields: [["name", "Category name (shows as filter on Portfolio page)"]],
  },
  projects: {
    label: "Projects",
    fields: [
      ["title", "Title"],
      ["slug", "URL slug (optional)"],
      ["category", "Category", "cat"],
      ["cover", "Cover image (card)", "image"],
      ["desc", "Description", "area"],
      ["hero", "Top banner images (3 phone shots)", "images"],
      ["role", "Role card"],
      ["duration", "Duration card"],
      ["tools", "Tools card"],
      ["images", "Screens gallery (select many)", "images"],
      ["process", "Design process steps", "proc"],
      ["finalTitle", "Final UI title"],
      ["finalText", "Final UI text", "area"],
      ["before", "Final UI BEFORE image", "image"],
      ["after", "Final UI AFTER image", "image"],
    ],
  },
  services: {
    label: "Services",
    fields: [
      ["title", "Title"],
      ["slug", "URL slug (optional)"],
      ["desc", "Short description", "area"],
      ["details", "Full details (service page)", "area"],
    ],
  },
  stats: {
    label: "Hero stats",
    fields: [
      ["num", "Number (e.g. 3+)"],
      ["label", "Label"],
    ],
  },
  posters: {
    label: "Posters",
    fields: [["image", "Poster image", "image"]],
  },
  experience: {
    label: "Experience",
    fields: [
      ["year", "Year"],
      ["title", "Title"],
      ["place", "Company"],
    ],
  },
  education: {
    label: "Education",
    fields: [
      ["year", "Year"],
      ["title", "Title"],
      ["place", "Institute"],
    ],
  },
  tools: {
    label: "Tools",
    fields: [
      ["name", "Name"],
      ["image", "Icon", "image"],
    ],
  },
  socials: {
    label: "Socials",
    fields: [
      ["name", "Name"],
      ["url", "Link"],
    ],
  },
};

const PROFILE = [
  ["brand", "Brand text"],
  ["logo", "Logo", "image"],
  ["greeting", "Hero greeting"],
  ["role", "Hero title"],
  ["roleAccent", "Hero title (colored word)"],
  ["subtitle", "Hero subtitle", "area"],
  ["ctaText", "Hero button text"],
  ["resume", "Resume (PDF upload)", "image"],
  ["aboutHeadline", "About headline"],
  ["aboutRole", "About role"],
  ["about", "About text", "area"],
  ["photo", "Your photo", "image"],
  ["contactTitle", "Contact box title"],
  ["contactText", "Contact box text", "area"],
  ["contactImage", "Contact box image", "image"],
  ["email", "Email"],
  ["footerAbout", "Footer about text", "area"],
  ["copyright", "Copyright text"],
];

const PRESETS = {
  "Earthy Green": ["#E8F5DC", "#26321B", "#6F8350", "#55683A", "#CFE1B9"],
  Purple: ["#07050d", "#ffffff", "#a88af5", "#ec6ab8", "#2a2a2d"],
  Blue: ["#050b14", "#ffffff", "#60a5fa", "#22d3ee", "#1c2431"],
  Green: ["#04100a", "#ffffff", "#4ade80", "#a3e635", "#1a2a20"],
  Orange: ["#120803", "#ffffff", "#fb923c", "#f43f5e", "#2d2118"],
  Light: ["#ffffff", "#111827", "#7c3aed", "#ec4899", "#f3f4f6"],
  Cream: ["#faf7f2", "#1f2937", "#b45309", "#e11d48", "#f1ebe0"],
};

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "▦" },
  { id: "profile", label: "Profile", icon: "◉" },
  { id: "theme", label: "Theme", icon: "◐" },
  ...Object.entries(LISTS).map(([id, item]) => ({
    id,
    label: item.label,
    icon: "◇",
  })),
  { id: "messages", label: "Messages", icon: "✉" },
];

async function upload(file) {
  if (!file) return "";

  const fd = new FormData();
  fd.append("file", file);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });

    const result = await response.json();

    if (!response.ok || !result.url) {
      alert(result.error || "Upload failed");
      return "";
    }

    return result.url;
  } catch (error) {
    console.error(error);
    alert("Upload failed. Please try again.");
    return "";
  }
}

function Img({ value, onChange }) {
  const isPdf = typeof value === "string" && /\.pdf(\?.*)?$/i.test(value);

  return (
    <div className="row">
      {value &&
        (isPdf ? (
          <a href={value} target="_blank" rel="noreferrer" className="hl">
            PDF uploaded ✓
          </a>
        ) : (
          <img className="thumb" src={value} alt="Uploaded preview" />
        ))}

      <input
        type="file"
        accept="image/*,application/pdf"
        style={{ width: "auto" }}
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (!file) return;

          const url = await upload(file);
          if (url) onChange(url);
          event.target.value = "";
        }}
      />

      {value && (
        <button
          type="button"
          className="btn danger"
          onClick={() => onChange("")}
        >
          Remove
        </button>
      )}
    </div>
  );
}

function Imgs({ value = [], onChange }) {
  const images = Array.isArray(value) ? value : [];

  return (
    <div>
      <div className="row">
        {images.map((url, index) => (
          <div key={`${url}-${index}`}>
            <img className="thumb" src={url} alt={`Uploaded ${index + 1}`} />
            <button
              type="button"
              className="btn danger"
              onClick={() =>
                onChange(images.filter((_, itemIndex) => itemIndex !== index))
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <input
        type="file"
        accept="image/*"
        multiple
        style={{ width: "auto" }}
        onChange={async (event) => {
          const files = Array.from(event.target.files || []);
          const uploaded = [];

          for (const file of files) {
            const url = await upload(file);
            if (url) uploaded.push(url);
          }

          if (uploaded.length) onChange([...images, ...uploaded]);
          event.target.value = "";
        }}
      />
    </div>
  );
}

function Theme({ d, setD }) {
  const theme = {
    bg: "#E8F5DC",
    text: "#26321B",
    accent: "#6F8350",
    accent2: "#55683A",
    card: "#CFE1B9",
    btn: "#ffffff",
    font: "sans",
    ...(d.theme || {}),
  };

  const set = (changes) =>
    setD({
      ...d,
      theme: { ...theme, ...changes },
    });

  return (
    <div className="item">
      <span className="lbl">Quick presets (then fine-tune below)</span>

      <div className="row">
        {Object.entries(PRESETS).map(([name, colors]) => (
          <button
            key={name}
            type="button"
            className="btn"
            style={{ background: colors[2], color: colors[0] }}
            onClick={() =>
              set({
                bg: colors[0],
                text: colors[1],
                accent: colors[2],
                accent2: colors[3],
                card: colors[4],
                btn: "#ffffff",
              })
            }
          >
            {name}
          </button>
        ))}
      </div>

      {[
        ["bg", "Background"],
        ["text", "Text"],
        ["accent", "Accent (headings, highlights, borders)"],
        ["accent2", "Accent 2 (button gradient end)"],
        ["card", "Cards / boxes"],
        ["btn", "Button text"],
      ].map(([key, label]) => (
        <div key={key}>
          <span className="lbl">{label}</span>
          <div className="row">
            <input
              type="color"
              value={
                /^#[0-9a-f]{6}$/i.test(theme[key]) ? theme[key] : "#ffffff"
              }
              onChange={(event) => set({ [key]: event.target.value })}
              style={{ width: 60, padding: 2, margin: 0 }}
            />
            <input
              value={theme[key]}
              onChange={(event) => set({ [key]: event.target.value })}
              style={{ maxWidth: 140, margin: 0 }}
            />
          </div>
        </div>
      ))}

      <span className="lbl">Font style</span>
      <select
        value={theme.font}
        onChange={(event) => set({ font: event.target.value })}
      >
        <option value="sans">Manrope (default)</option>
        <option value="serif">Serif</option>
        <option value="mono">Mono</option>
      </select>

      <small className="lbl">
        Save changes, then refresh the site to see the new theme.
      </small>
    </div>
  );
}

function Proc({ value = [], onChange }) {
  const steps = Array.isArray(value) ? value : [];

  const setStep = (index, key, nextValue) =>
    onChange(
      steps.map((step, itemIndex) =>
        itemIndex === index ? { ...step, [key]: nextValue } : step,
      ),
    );

  return (
    <div>
      {steps.map((step, index) => (
        <div className="item" key={index}>
          <input
            placeholder="Step title (e.g. Research & Pain Points)"
            value={step.title || ""}
            onChange={(event) => setStep(index, "title", event.target.value)}
          />

          <textarea
            rows={3}
            placeholder="Step text"
            value={step.text || ""}
            onChange={(event) => setStep(index, "text", event.target.value)}
          />

          <Img
            value={step.image || ""}
            onChange={(nextValue) => setStep(index, "image", nextValue)}
          />

          <button
            type="button"
            className="btn danger"
            onClick={() =>
              onChange(steps.filter((_, itemIndex) => itemIndex !== index))
            }
          >
            Delete step
          </button>
        </div>
      ))}

      <button
        type="button"
        className="btn"
        onClick={() => onChange([...steps, {}])}
      >
        + Add step
      </button>
    </div>
  );
}

function Field({ f, value, onChange, cats = [] }) {
  const [, label, type] = f;

  return (
    <div className="admin-editor-field">
      <span className="lbl">{label}</span>

      {type === "cat" ? (
        <select
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">— choose —</option>
          {cats.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      ) : type === "proc" ? (
        <Proc value={value} onChange={onChange} />
      ) : type === "image" ? (
        <Img value={value} onChange={onChange} />
      ) : type === "images" ? (
        <Imgs value={value} onChange={onChange} />
      ) : type === "area" ? (
        <textarea
          rows={3}
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </div>
  );
}

function getDashboardStats(data, messages) {
  const media = new Set();

  function scan(value) {
    if (typeof value === "string") {
      if (
        value.includes("res.cloudinary.com/") ||
        /\.(png|jpe?g|webp|gif|svg|pdf)(\?.*)?$/i.test(value)
      ) {
        media.add(value);
      }
    } else if (Array.isArray(value)) {
      value.forEach(scan);
    } else if (value && typeof value === "object") {
      Object.values(value).forEach(scan);
    }
  }

  scan(data);

  const files = [...media];

  return [
    { label: "Projects", value: (data.projects || []).length, icon: "▣" },
    { label: "Services", value: (data.services || []).length, icon: "◇" },
    { label: "Messages", value: messages.length, icon: "✉" },
    { label: "Categories", value: (data.categories || []).length, icon: "◈" },
    {
      label: "Images in content",
      value: files.filter(
        (url) => !/\.pdf(\?.*)?$/i.test(url) && !url.includes("/raw/upload/"),
      ).length,
      icon: "▧",
    },
    {
      label: "PDFs in content",
      value: files.filter(
        (url) => /\.pdf(\?.*)?$/i.test(url) || url.includes("/raw/upload/"),
      ).length,
      icon: "▤",
    },
  ];
}

export default function Admin() {
  const [auth, setAuth] = useState(null);
  const [pw, setPw] = useState("");
  const [d, setD] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [tab, setTab] = useState("dashboard");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    try {
      const [messageResponse, contentResponse] = await Promise.all([
        fetch("/api/contact", { cache: "no-store" }),
        fetch("/api/content", { cache: "no-store" }),
      ]);

      if (messageResponse.status === 401 || contentResponse.status === 401) {
        setAuth(false);
        return;
      }

      if (!messageResponse.ok || !contentResponse.ok) {
        throw new Error("Could not load admin data");
      }

      const messageData = await messageResponse.json();
      const contentData = await contentResponse.json();

      setMsgs(Array.isArray(messageData) ? messageData : []);
      setD(contentData);
      setAuth(true);
    } catch (error) {
      console.error(error);
      setNote("Could not load data. Please check your API routes.");
      setAuth(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const login = async (event) => {
    event.preventDefault();
    setBusy(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });

      if (response.ok) {
        setPw("");
        await load();
      } else {
        alert("Wrong password");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const save = async () => {
    setBusy(true);
    setNote("");

    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
      });

      setNote(response.ok ? "Saved ✓" : "Save failed");
    } catch (error) {
      console.error(error);
      setNote("Save failed");
    } finally {
      setBusy(false);
      setTimeout(() => setNote(""), 2500);
    }
  };

  const delMsg = async (id) => {
    try {
      const response = await fetch("/api/contact", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        alert("Could not delete message.");
        return;
      }

      setMsgs((previous) => previous.filter((message) => message.id !== id));
    } catch (error) {
      console.error(error);
      alert("Could not delete message.");
    }
  };

  const logout = async () => {
    await fetch("/api/login", { method: "DELETE" });
    setAuth(false);
    setTab("dashboard");
  };

  if (auth === null) {
    return <p className="adm">Loading admin panel...</p>;
  }

  if (!auth) {
    return (
      <main className="admin-login-page">
        <form onSubmit={login} className="admin-login-card">
          <div className="admin-logo">A</div>
          <p className="admin-eyebrow">ADMINISTRATION</p>
          <h1>Welcome back</h1>
          <p className="admin-muted">Sign in to manage your portfolio.</p>

          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            placeholder="Enter admin password"
            value={pw}
            onChange={(event) => setPw(event.target.value)}
            required
          />

          {note && <p className="admin-notice">{note}</p>}

          <button className="admin-primary-button" disabled={busy}>
            {busy ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </main>
    );
  }

  if (!d) return <p className="adm">Loading content...</p>;

  const setProfile = (key, value) =>
    setD({
      ...d,
      profile: { ...(d.profile || {}), [key]: value },
    });

  const setItem = (list, index, key, value) =>
    setD({
      ...d,
      [list]: (d[list] || []).map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item,
      ),
    });

  const add = (list) =>
    setD({
      ...d,
      [list]: [...(d[list] || []), {}],
    });

  const del = (list, index) =>
    setD({
      ...d,
      [list]: (d[list] || []).filter((_, itemIndex) => itemIndex !== index),
    });

  const move = (list, index, direction) => {
    const items = [...(d[list] || [])];
    const nextIndex = index + direction;

    if (nextIndex < 0 || nextIndex >= items.length) return;

    [items[index], items[nextIndex]] = [items[nextIndex], items[index]];

    setD({ ...d, [list]: items });
  };

  const stats = getDashboardStats(d, msgs);
  const currentLabel =
    NAV.find((item) => item.id === tab)?.label || "Dashboard";

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-logo">A</div>
          <div>
            <strong>Portfolio Admin</strong>
            <span>Control panel</span>
          </div>
        </div>

        <p className="admin-sidebar-label">WORKSPACE</p>

        <nav className="admin-nav">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`admin-nav-item ${tab === item.id ? "active" : ""}`}
              onClick={() => {
                setTab(item.id);
                setNote("");
              }}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              <span>{item.label}</span>

              {item.id === "messages" && msgs.length > 0 && (
                <span className="admin-nav-count">{msgs.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-user">
            <div className="admin-avatar">AD</div>
            <div className="admin-user-info">
              <strong>Administrator</strong>
              <span>Portfolio manager</span>
            </div>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="admin-side-link"
          >
            ↗ View website
          </a>

          <button
            type="button"
            className="admin-logout-button"
            onClick={logout}
          >
            ↪ Sign out
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-eyebrow">ADMIN PANEL</p>
            <h1>{currentLabel}</h1>
          </div>

          {tab !== "messages" && (
            <button
              type="button"
              className="admin-primary-button admin-save-button"
              onClick={save}
              disabled={busy}
            >
              {busy ? "Saving..." : note || "✓ Save changes"}
            </button>
          )}
        </header>

        {note && <div className="admin-notice admin-notice-banner">{note}</div>}

        {tab === "dashboard" && (
          <section>
            <div className="admin-welcome">
              <div>
                <p className="admin-eyebrow">OVERVIEW</p>
                <h2>Your portfolio at a glance</h2>
                <p>
                  Manage your profile, projects, services, visual theme and
                  incoming contact messages from one place.
                </p>
              </div>
              <div className="admin-welcome-icon">✦</div>
            </div>

            <div className="admin-stats-grid">
              {stats.map((stat) => (
                <article className="admin-stat-card" key={stat.label}>
                  <div className="admin-stat-top">
                    <span className="admin-stat-icon">{stat.icon}</span>
                    <span className="admin-stat-dot" />
                  </div>
                  <p>{stat.label}</p>
                  <strong className="admin-stat-value">{stat.value}</strong>
                  <small>
                    {stat.label.includes("content")
                      ? "URLs referenced in saved content"
                      : "Current saved count"}
                  </small>
                </article>
              ))}
            </div>

            <div className="admin-dashboard-grid">
              <section className="admin-card">
                <div className="admin-card-heading">
                  <div>
                    <h3>Quick actions</h3>
                    <p>Jump to a section to manage your portfolio.</p>
                  </div>
                </div>

                <div className="admin-quick-actions">
                  {[
                    ["profile", "◉", "Edit profile", "Update your details"],
                    ["projects", "▣", "Manage projects", "Edit portfolio work"],
                    [
                      "services",
                      "◇",
                      "Manage services",
                      "Update your services",
                    ],
                    ["theme", "◐", "Customize theme", "Colors and font"],
                    ["posters", "▧", "Manage posters", "Update your creatives"],
                    ["messages", "✉", "View messages", "Contact submissions"],
                  ].map(([id, icon, title, description]) => (
                    <button type="button" key={id} onClick={() => setTab(id)}>
                      <span>{icon}</span>
                      <strong>{title}</strong>
                      <small>{description}</small>
                    </button>
                  ))}
                </div>
              </section>

              <section className="admin-card">
                <div className="admin-card-heading">
                  <div>
                    <h3>Recent messages</h3>
                    <p>Latest contact form submissions.</p>
                  </div>
                  <button
                    type="button"
                    className="admin-text-button"
                    onClick={() => setTab("messages")}
                  >
                    View all →
                  </button>
                </div>

                {msgs.length === 0 ? (
                  <div className="admin-empty-state">
                    <span>✉</span>
                    <strong>No messages yet</strong>
                    <p>New contact submissions will appear here.</p>
                  </div>
                ) : (
                  <div className="admin-recent-list">
                    {msgs.slice(0, 5).map((message, index) => (
                      <div
                        className="admin-recent-message"
                        key={message.id || index}
                      >
                        <div className="admin-avatar">
                          {(message.name || "M").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <strong>{message.name || "Unnamed sender"}</strong>
                          <p>{message.message || "Contact submission"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </section>
        )}

        {tab === "theme" && (
          <section className="admin-card">
            <SectionHeading
              title="Theme customization"
              description="Choose a preset or customize the colors and font."
            />
            <Theme d={d} setD={setD} />
          </section>
        )}

        {tab === "profile" && (
          <section className="admin-card">
            <SectionHeading
              title="Profile settings"
              description="Edit your website's profile and hero section."
            />
            <div className="admin-editor-grid">
              {PROFILE.map((field) => (
                <Field
                  key={field[0]}
                  f={field}
                  value={d.profile?.[field[0]]}
                  onChange={(value) => setProfile(field[0], value)}
                />
              ))}
            </div>
          </section>
        )}

        {LISTS[tab] && (
          <section>
            <div className="admin-section-intro">
              <div>
                <h2>{LISTS[tab].label}</h2>
                <p>
                  Add, edit, reorder or remove items. Remember to save changes.
                </p>
              </div>
              <button
                type="button"
                className="admin-primary-button"
                onClick={() => add(tab)}
              >
                + Add new
              </button>
            </div>

            {(d[tab] || []).length === 0 ? (
              <div className="admin-card admin-empty-state">
                <span>◇</span>
                <strong>No {LISTS[tab].label.toLowerCase()} yet</strong>
                <p>Click Add new to create your first item.</p>
              </div>
            ) : (
              (d[tab] || []).map((item, index) => (
                <article className="admin-card admin-edit-item" key={index}>
                  <div className="admin-edit-heading">
                    <span className="admin-item-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <strong>
                      {item.title ||
                        item.name ||
                        item.label ||
                        `${LISTS[tab].label} item`}
                    </strong>
                  </div>

                  <div className="admin-editor-grid">
                    {LISTS[tab].fields.map((field) => (
                      <Field
                        key={field[0]}
                        f={field}
                        cats={(d.categories || []).map(
                          (category) => category.name,
                        )}
                        value={item[field[0]]}
                        onChange={(value) =>
                          setItem(tab, index, field[0], value)
                        }
                      />
                    ))}
                  </div>

                  <div className="admin-item-actions">
                    <button
                      type="button"
                      className="btn"
                      disabled={index === 0}
                      onClick={() => move(tab, index, -1)}
                    >
                      ↑ Move up
                    </button>
                    <button
                      type="button"
                      className="btn"
                      disabled={index === (d[tab] || []).length - 1}
                      onClick={() => move(tab, index, 1)}
                    >
                      ↓ Move down
                    </button>
                    <button
                      type="button"
                      className="btn danger"
                      onClick={() => {
                        if (
                          confirm("Delete this item? Remember to save changes.")
                        ) {
                          del(tab, index);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))
            )}

            <button
              type="button"
              className="admin-add-button"
              onClick={() => add(tab)}
            >
              + Add another {LISTS[tab].label.toLowerCase().replace(/s$/, "")}
            </button>
          </section>
        )}

        {tab === "messages" && (
          <section className="admin-card">
            <SectionHeading
              title="Contact messages"
              description={`${msgs.length} message(s) received.`}
            />

            {msgs.length === 0 ? (
              <div className="admin-empty-state">
                <span>✉</span>
                <strong>No messages yet</strong>
                <p>Contact form submissions will appear here.</p>
              </div>
            ) : (
              <div className="admin-messages-grid">
                {msgs.map((message, index) => (
                  <article
                    className="admin-message-card"
                    key={message.id || index}
                  >
                    <div className="admin-message-heading">
                      <div className="admin-avatar">
                        {(message.name || "M").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3>{message.name || "Unnamed sender"}</h3>
                        <p>{message.email || "No email provided"}</p>
                      </div>
                    </div>

                    <p className="admin-message-body">
                      {message.message || "No message text"}
                    </p>

                    <div className="admin-message-footer">
                      <small>
                        {message.date
                          ? new Date(message.date).toLocaleString()
                          : "Date unavailable"}
                      </small>
                      <button
                        type="button"
                        className="btn danger"
                        onClick={() => {
                          if (confirm("Delete this message?"))
                            delMsg(message.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        <footer className="admin-footer">
          Portfolio Admin <span>·</span> All changes should be saved before
          leaving.
        </footer>
      </main>
    </div>
  );
}

function SectionHeading({ title, description }) {
  return (
    <div className="admin-card-heading admin-section-heading">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
