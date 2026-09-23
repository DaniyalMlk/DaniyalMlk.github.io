"use client";

import { useEffect, useState } from "react";
import Ornament from "@/components/Ornament";
import Eagle from "@/components/Eagle";
import { credentials, profile, projects, skills, tabs, work } from "@/lib/content";

type Row = { yr: string; org: string; note?: string; loc?: string; href?: string };

function Rows({ items }: { items: Row[] }) {
  return (
    <div>
      {items.map((r) => {
        const inner = (
          <>
            <span className="yr">{r.yr}</span>
            <div>
              <h3>{r.org}</h3>
              {r.note && <p>{r.note}</p>}
            </div>
            <span className="loc">{r.loc ?? (r.href ? "github" : "")}</span>
          </>
        );
        return r.href ? (
          <a className="item" key={r.org} href={r.href} target="_blank" rel="noreferrer noopener">
            {inner}
          </a>
        ) : (
          <div className="item" key={r.org}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}

function ViewHead({ title, label }: { title: string; label: string }) {
  return (
    <div className="vhead">
      <h2>{title}</h2>
      <span>{label}</span>
    </div>
  );
}

export default function Page() {
  const [view, setView] = useState(0);
  const [dark, setDark] = useState(true);
  const [time, setTime] = useState("");

  useEffect(() => {
    setDark(document.documentElement.dataset.theme !== "light");
    const f = new Intl.DateTimeFormat("en-GB", {
      timeZone: "America/New_York",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(f.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  // Left and right arrows move between views, like tabs in an app.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setView((v) => (v + 1) % tabs.length);
      if (e.key === "ArrowLeft") setView((v) => (v - 1 + tabs.length) % tabs.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleTheme = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setDark(!dark);
  };

  return (
    <div className="app">
      <div className="hoist" aria-hidden="true">
        <Ornament />
      </div>

      <div className="main">
        <nav className="nav">
          <div className="nav-top">
            <span className="brand">{profile.name}</span>
            <div className="util">
              <a href={profile.github} aria-label="GitHub" target="_blank" rel="noreferrer noopener">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
                </svg>
              </a>
              <a href={profile.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer noopener">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
                </svg>
              </a>
              <span className="sep" />
              <button type="button" aria-label="Switch light or dark theme" aria-pressed={!dark} onClick={toggleTheme}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" stroke="none" />
                </svg>
              </button>
            </div>
          </div>
          <div className="tabs" role="tablist" aria-label="Sections">
            {tabs.map((t, i) => (
              <button
                key={t}
                role="tab"
                aria-selected={view === i}
                className={view === i ? "on" : ""}
                onClick={() => setView(i)}
              >
                {t}
              </button>
            ))}
          </div>
        </nav>

        <div className="stage">
          <Eagle />

          <section className={`view${view === 0 ? " on" : ""}`} role="tabpanel" aria-label="Home">
            <div className="hero">
              <div>
                <h1 className="big">{profile.name}</h1>
                <p className="role">
                  {profile.role} <span className="dot">·</span> {profile.place}
                  {time && <span className="clock-inline"> {time}</span>}
                </p>
                <p className="sub">{profile.line}</p>
                <a className="cta" href={`mailto:${profile.email}`}>
                  {profile.email}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h13M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
              <div className="stats">
                {credentials.map((c) => (
                  <div className="stat" key={c.k}>
                    <b>{c.k}</b>
                    <span>{c.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={`view${view === 1 ? " on" : ""}`} role="tabpanel" aria-label="Experience">
            <ViewHead title="Experience" label="ЖҰМЫС · FOUR ROLES, THREE COUNTRIES" />
            <Rows items={work} />
          </section>

          <section className={`view${view === 2 ? " on" : ""}`} role="tabpanel" aria-label="Projects">
            <ViewHead title="Projects" label="ЖОБАЛАР · OPEN SOURCE" />
            <Rows items={projects} />
          </section>

          <section className={`view${view === 3 ? " on" : ""}`} role="tabpanel" aria-label="Skills">
            <ViewHead title="Skills" label="ДАҒДЫЛАР · DAILY TOOLS" />
            <Rows items={skills} />
          </section>

          <section className={`view${view === 4 ? " on" : ""}`} role="tabpanel" aria-label="Contact">
            <ViewHead title="Contact" label="БАЙЛАНЫС" />
            <p className="big contact-mail" style={{ fontSize: 38 }}>{profile.email}</p>
            <p className="sub">
              Email is the fastest way to reach me. Code on GitHub, work history on LinkedIn, both linked in the header.
            </p>
            <a className="cta" href={`mailto:${profile.email}`}>
              Write to me
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
