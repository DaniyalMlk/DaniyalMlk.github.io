// Refreshes lib/repo-stats.json from the GitHub API at build time.
//
// Why at build and not in the browser: an unauthenticated browser call is
// limited to 60 requests an hour per IP address. Nine repositories is nine
// calls per visit, so a handful of visitors behind one office NAT exhaust it
// and every later visitor sees a placeholder where the numbers should be.
// In GitHub Actions the workflow passes GITHUB_TOKEN, which raises the limit to
// 1,000 an hour and never runs from the reader's network.
//
// The script is best-effort: on any failure it leaves the committed JSON as it
// is and exits 0, so a GitHub outage cannot break a deploy.
//
//   node scripts/repo-stats.mjs            # uses GITHUB_TOKEN if set

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "..", "lib", "repo-stats.json");
const user = "DaniyalMlk";
const repos = ["tallyd", "recalc", "moneyness", "abacus", "tenor", "shortfall", "slippage", "holdout", "capstack"];

const headers = { Accept: "application/vnd.github+json", "User-Agent": "daniyalmlk.github.io build" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

let current = {};
try {
  current = JSON.parse(readFileSync(out, "utf8"));
} catch {}

const next = { ...current };
let changed = 0;
for (const name of repos) {
  try {
    const r = await fetch(`https://api.github.com/repos/${user}/${name}`, { headers });
    if (!r.ok) {
      console.warn(`repo-stats: ${name}: HTTP ${r.status}, keeping the committed value`);
      continue;
    }
    const j = await r.json();
    const entry = { pushed: j.pushed_at, stars: j.stargazers_count };
    if (JSON.stringify(entry) !== JSON.stringify(current[name])) changed++;
    next[name] = entry;
  } catch (e) {
    console.warn(`repo-stats: ${name}: ${e?.message ?? e}, keeping the committed value`);
  }
}

if (changed) {
  writeFileSync(out, JSON.stringify(next, null, 2) + "\n");
  console.log(`repo-stats: updated ${changed} of ${repos.length}`);
} else {
  console.log("repo-stats: no changes");
}
