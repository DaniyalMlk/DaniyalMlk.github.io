"use client";

import { useEffect, useState } from "react";
import Ecosystem from "@/components/Ecosystem";
import { chartFor } from "@/components/Charts";
import { about, nav, profile, projects, skills, summary, work, type Project } from "@/lib/content";

function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    setDark(document.documentElement.dataset.theme !== "light");
  }, []);
  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setDark(!dark);
  };
  return { dark, toggle };
}

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    let raf = 0;
    const pick = () => {
      raf = 0;
      const line = 96; // just under the sticky header
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      if (atBottom) current = ids[ids.length - 1];
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(pick);
    };
    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ids]);
  return active;
}

type Stats = { pushed: string; stars: number } | null | "loading";

function useRepoStats(name: string): Stats {
  const [stats, setStats] = useState<Stats>("loading");
  useEffect(() => {
    let cancelled = false;
    const key = `gh:${name}`;
    try {
      const cached = sessionStorage.getItem(key);
      if (cached) {
        setStats(JSON.parse(cached));
        return;
      }
    } catch {}
    fetch(`https://api.github.com/repos/${profile.githubUser}/${name}`, { headers: { Accept: "application/vnd.github+json" } })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (cancelled) return;
        const s = j ? { pushed: j.pushed_at as string, stars: j.stargazers_count as number } : null;
        setStats(s);
        try {
          if (s) sessionStorage.setItem(key, JSON.stringify(s));
        } catch {}
      })
      .catch(() => !cancelled && setStats(null));
    return () => {
      cancelled = true;
    };
  }, [name]);
  return stats;
}

function since(iso: string) {
  const d = (Date.now() - new Date(iso).getTime()) / 86400000;
  if (d < 1) return "today";
  if (d < 2) return "yesterday";
  const unit = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"} ago`;
  if (d < 30) return unit(Math.floor(d), "day");
  if (d < 365) return unit(Math.floor(d / 30), "month");
  return unit(Math.floor(d / 365), "year");
}

function CopyLine({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="copy"
      aria-label={`Copy: ${text}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        } catch {}
      }}
    >
      <code>{text}</code>
      <span className="copy-hint">{copied ? "copied" : "copy"}</span>
    </button>
  );
}

function ProjectRow({ p, open, onToggle }: { p: Project; open: boolean; onToggle: () => void }) {
  const stats = useRepoStats(p.name);
  const Chart = chartFor[p.name];
  return (
    <div className={`row row-project${open ? " open" : ""}`}>
      <div className="cell-k">{p.lang}</div>
      <div className="cell-body">
        <h3 className="h3-big">
          <a className="ext" href={p.href} target="_blank" rel="noreferrer noopener">
            {p.name}
            <span className="ext-mark" aria-hidden="true">↗</span>
          </a>
          <span className="tagline"> · {p.tagline}</span>
        </h3>
        <p className="line">{p.line}</p>
        <pre className="headline" tabIndex={0}>
          <code>{p.headline}</code>
        </pre>
        {Chart && (
          <div className="chart-wrap">
            <Chart />
          </div>
        )}
        <div className="meta">
          <span>{p.tests}</span>
          {stats === "loading" && <span className="dim"> · fetching from GitHub…</span>}
          {stats && stats !== "loading" && (
            <span>
              {" "}· last push {since(stats.pushed)}
              {stats.stars > 0 ? ` · ${stats.stars} ★` : ""}
            </span>
          )}
          <span> · </span>
          <button type="button" className="toggle" aria-expanded={open} onClick={onToggle}>
            {open ? "less" : "full output and notes"}
          </button>
        </div>
        {open && (
          <div className="receipt">
            <p>{p.blurb}</p>
            <CopyLine text={p.install} />
            <pre tabIndex={0}>
              <code>{p.receipt}</code>
            </pre>
            <div className="receipt-note">Verbatim output, captured 15 Oct 2026. Every number here is produced by the code, not written into this page.</div>
          </div>
        )}
      </div>
      <div className="cell-fig">
        <b>{p.figure.n}</b>
        {p.figure.unit && <span>{p.figure.unit}</span>}
      </div>
    </div>
  );
}

function SectionHead({ n, title, note }: { n: string; title: string; note?: string }) {
  return (
    <div className="sh">
      <div className="sh-n">{n}</div>
      <h2 className="sh-title">{title}</h2>
      {note && <div className="sh-note">{note}</div>}
    </div>
  );
}

export default function Page() {
  const { dark, toggle } = useTheme();
  const active = useActiveSection(nav.map((n) => n.id));
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="page">
      <header className="top">
        <a className="brand" href="#top">
          Statement of account · No. 0001
        </a>
        <nav aria-label="Sections">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? "on" : ""}>
              {n.label}
            </a>
          ))}
          <a className="social" href={profile.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub">
            <span className="social-text">GitHub ↗</span>
            <svg className="social-icon" viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
              <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
          <a className="social" href={profile.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">
            <span className="social-text">LinkedIn ↗</span>
            <svg className="social-icon" viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
              <path fill="currentColor" d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
            </svg>
          </a>
          <button type="button" className="theme" aria-label="Switch light or dark theme" aria-pressed={!dark} onClick={toggle}>
            {dark ? "light" : "dark"}
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-l">
            <h1>{profile.name}</h1>
            <p className="lede">{profile.line}</p>
            <div className="ctas">
              <a className="btn primary" href={`mailto:${profile.email}`}>
                {profile.email} →
              </a>
              <a className="btn" href={profile.github} target="_blank" rel="noreferrer noopener">
                github.com/{profile.githubUser}
              </a>
            </div>
          </div>
          <div className="hero-r">
            <div className="th">At a glance</div>
            <dl className="summary">
              {summary.map((s) => (
                <div key={s.k}>
                  <dt>{s.k}</dt>
                  <dd>{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="about" className="about">
          <SectionHead n="01" title="About" />
          <div className="about-grid">
            <div className="about-path" aria-label="Path">
              {about.path.map((c, i) => (
                <span key={c}>
                  {i > 0 && <span className="arrow"> → </span>}
                  {c}
                </span>
              ))}
            </div>
            <div className="about-text">
              {about.paragraphs.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="ledger">
          <SectionHead n="02" title="Work" note="Six roles, 2023 to now. The figure on the right is the one number each one comes down to." />
          <div className="th th-grid">
            <span>Date</span>
            <span>Role</span>
            <span className="r">Figure</span>
          </div>
          {work.map((j) => (
            <div className="row" key={j.org}>
              <div className="cell-k">
                <span className="k-yr">{j.yr}</span>
                <span className="k-loc">{j.loc}</span>
              </div>
              <div className="cell-body">
                <h3 className="h3-big">
                  {j.href ? (
                    <a className="ext" href={j.href} target="_blank" rel="noreferrer noopener">
                      {j.org}
                      <span className="ext-mark" aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    j.org
                  )}
                  <span className="tagline"> · {j.role}</span>
                </h3>
                <ul>
                  {j.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                {j.stack && <div className="meta">{j.stack}</div>}
              </div>
              <div className="cell-fig">
                <b>{j.figure.n}</b>
                {j.figure.unit && <span>{j.figure.unit}</span>}
              </div>
            </div>
          ))}
        </section>

        <section id="projects" className="ledger">
          <SectionHead n="03" title="Open source" note="Eight libraries. Under each name is the program's own output from 15 October 2026, not a description of it." />
          <div className="th th-grid">
            <span>Lang</span>
            <span>Library</span>
            <span className="r">Figure</span>
          </div>
          {projects.map((p) => (
            <ProjectRow key={p.name} p={p} open={open === p.name} onToggle={() => setOpen(open === p.name ? null : p.name)} />
          ))}
          <Ecosystem />
        </section>

        <section id="skills" className="skills-wrap">
          <SectionHead n="04" title="Skills" />
          <div className="skills">
          {skills.map((g) => (
            <div key={g.label} className="skill-col">
              <div className="th">{g.label}</div>
              <ul>
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
          </div>
        </section>

        <footer className="foot">
          <span>Balance carried forward. {profile.location}.</span>
          <span>
            Closing balance: <b>all accounts reconciled</b>
          </span>
        </footer>
      </main>
    </div>
  );
}
