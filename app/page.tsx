"use client";

import { useEffect, useState } from "react";
import Ornament from "@/components/Ornament";
import Eagle from "@/components/Eagle";
import { credentials, profile, projects, skills, tabs, work, type Job } from "@/lib/content";

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


function CopyLine({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={`copyline${copied ? " copied" : ""}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {}
      }}
      aria-label={`Copy: ${text}`}
    >
      <code>{text}</code>
      <span className="copyline-hint">{copied ? "copied" : "copy"}</span>
    </button>
  );
}

function Timeline({ jobs, variant = "work" }: { jobs: Job[]; variant?: "work" | "project" }) {
  const [open, setOpen] = useState(0);
  return (
    <ol className={`tl${variant === "project" ? " tl--tags" : ""}`}>
      {jobs.map((j, i) => {
        const isOpen = open === i;
        return (
          <li key={j.org} className={`tl-item${isOpen ? " open" : ""}`}>
            <span className="tl-dot" aria-hidden="true" />
            <button
              type="button"
              className="tl-head"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              {j.yr && <span className="tl-yr">{j.yr}</span>}
              <span className="tl-title">
                <span className="tl-org">{j.org}</span>
                <span className="tl-role">{j.role}</span>
              </span>
              {j.tag ? (
                <span className="tl-tag">
                  <span className="tl-tag-dot" style={{ background: j.tag.color }} />
                  {j.tag.label}
                </span>
              ) : (
                <span className="tl-loc">{j.loc}</span>
              )}
              <svg className="tl-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className="tl-body">
              <div className="tl-body-inner">
                {j.clone && <CopyLine text={j.clone} />}
                <ul>
                  {j.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                {j.href && (
                  <a className="tl-link" href={j.href} target="_blank" rel="noreferrer noopener">
                    {j.href.replace("https://", "")}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Skills() {
  return (
    <div className="skills">
      {skills.map((g, gi) => (
        <section className="skill-group" key={g.label} style={{ "--g": gi } as React.CSSProperties}>
          <span className="skill-node" aria-hidden="true" />
          <div className="skill-meta">
            <h3>{g.label}</h3>
          </div>
          <ul>
            {g.items.map((it, i) => (
              <li
                className="chip"
                key={it.name}
                style={{ "--i": i, "--chip": it.color ?? "var(--accent)" } as React.CSSProperties}
              >
                {it.color && <span className="chip-dot" />}
                <span className="chip-label">{it.name}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
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
  useEffect(() => {
    setDark(document.documentElement.dataset.theme !== "light");
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
      <Ornament />

      <div className="main">
        <nav className="nav">
          <div className="nav-top">
            <button
              type="button"
              className={`brand${view === 0 ? " on" : ""}`}
              onClick={() => setView(0)}
              aria-label="Home"
              aria-current={view === 0 ? "page" : undefined}
            >
              {profile.short}
            </button>
            <div className="util">
              <a href={profile.github} aria-label="GitHub" data-brand="github" target="_blank" rel="noreferrer noopener">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
                </svg>
              </a>
              <a href={profile.linkedin} aria-label="LinkedIn" data-brand="linkedin" target="_blank" rel="noreferrer noopener">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
                </svg>
              </a>
              <span className="sep" />
              <button type="button" aria-label="Switch light or dark theme" aria-pressed={!dark} onClick={toggleTheme}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" stroke="none" />
                </svg>
              </button>
            </div>
          </div>
          <div className="tabs" role="tablist" aria-label="Sections">
            {tabs.slice(1).map((t, i) => (
              <button
                key={t}
                role="tab"
                aria-selected={view === i + 1}
                className={view === i + 1 ? "on" : ""}
                onClick={() => setView(i + 1)}
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
                <p className="role">{profile.role}</p>
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
            <ViewHead title="Experience" label="ЖҰМЫС · WORK" />
            <Timeline jobs={work} />
          </section>

          <section className={`view${view === 2 ? " on" : ""}`} role="tabpanel" aria-label="Projects">
            <ViewHead title="Projects" label="ЖОБАЛАР · OPEN SOURCE" />
            <Timeline jobs={projects} variant="project" />
          </section>

          <section className={`view${view === 3 ? " on" : ""}`} role="tabpanel" aria-label="Skills">
            <ViewHead title="Skills" label="ДАҒДЫЛАР · DAILY TOOLS" />
            <Skills />
          </section>

          
        </div>
      </div>
    </div>
  );
}
