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
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!("IntersectionObserver" in window) || els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
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
        <h3>
          <a href={p.href} target="_blank" rel="noreferrer noopener">
            {p.name}
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
          <a href={profile.github} target="_blank" rel="noreferrer noopener">
            GitHub ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
            LinkedIn ↗
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
          <div className="th">About</div>
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
          <div className="th th-grid">
            <span>Date</span>
            <span>Work</span>
            <span className="r">Figure</span>
          </div>
          {work.map((j) => (
            <div className="row" key={j.org}>
              <div className="cell-k">
                {j.yr}
                <br />
                {j.loc}
              </div>
              <div className="cell-body">
                <h3>
                  {j.href ? (
                    <a href={j.href} target="_blank" rel="noreferrer noopener">
                      {j.org}
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
          <div className="th th-grid">
            <span>Lang</span>
            <span>Open source · output attached to each</span>
            <span className="r">Figure</span>
          </div>
          {projects.map((p) => (
            <ProjectRow key={p.name} p={p} open={open === p.name} onToggle={() => setOpen(open === p.name ? null : p.name)} />
          ))}
          <Ecosystem />
        </section>

        <section id="skills" className="skills">
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
