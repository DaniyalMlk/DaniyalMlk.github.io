# daniyal-malik

Personal site. Next.js 16, React 19, plain CSS, Geist Mono. One scrolling page laid out as a statement of account: every row has a figure in the right-hand column, and every open-source project carries its real command output as a receipt.

```bash
npm install
npm run dev     # http://localhost:3000
```

## Deploy free on GitHub Pages (recommended)

The site is a static export, so Pages can host it at no cost.

1. Create a repo. Name it `DaniyalMlk.github.io` to get `https://daniyalmlk.github.io`, or any other
   name (say `site`) to get `https://daniyalmlk.github.io/site`. Either works; the workflow handles both.
2. Push this folder to the repo's `main` branch.
3. Repo → Settings → Pages → Build and deployment → Source: **GitHub Actions**.
4. That's it. `.github/workflows/deploy.yml` builds on every push and publishes. The first run takes about
   two minutes; the URL appears in the Actions log and under Settings → Pages.

Custom domain: Settings → Pages → Custom domain, then point a CNAME at `daniyalmlk.github.io` with your registrar.

`npm run build` writes the site to `out/`. You can also drag that folder onto Netlify or Cloudflare Pages.

## Deploy on Vercel (also free)

Vercel's Hobby plan costs nothing for personal projects. Import the repo at vercel.com and it deploys as-is.
If you go this route, you can delete `output: "export"` from `next.config.ts` to get server rendering,
though nothing here needs it.

## Editing

All text lives in `lib/content.ts`: the hero line, the three credentials, and the Work, Projects and Skills rows.

## How it works

- `app/page.tsx` — one page: hero with the account summary, then Work, Projects and Skills as ledger rows. The top bar is sticky and underlines the section in view.
- Projects: each row leads with a `headline`, a verbatim excerpt of that repository's CLI output, always visible; "full output and notes" expands the install line, the complete `receipt`, the longer note and the size of the test suite. Keep the output verbatim; it is the point. "Last push" and stars per repo come from `lib/repo-stats.json`, which `scripts/repo-stats.mjs` refreshes during the deploy with the workflow's `GITHUB_TOKEN`; nothing is fetched in the browser, so the page looks the same from a rate-limited office network as from anywhere else. Run `node scripts/repo-stats.mjs` locally (set `GITHUB_TOKEN` to avoid the 60-an-hour limit) to refresh it by hand.
- Work: each role has a `basis` line under the date ("alongside coursework", "4 weeks, on site") and the section carries `workNote`. Together they explain why six roles fit in four years. Put months in `yr` wherever you have them; a month range beats a bare year for anything that overlaps.
- `components/Charts.tsx` — three inline-SVG charts (recalc edit cost, tallyd precision/recall, holdout PBO scatter) drawn from the same runs as the receipts; `lib/pbo-points.json` holds the 400 sampled CSCV partitions for the holdout one. Regenerate the numbers from the repositories rather than editing them by hand.
- `components/Ecosystem.tsx` — the inline SVG diagram under Projects (five libraries → abacus → a model over MCP); colours follow the theme.
- `app/opengraph-image.tsx` — the link-preview image, rendered at build. `app/not-found.tsx` — the 404 page. There is a print stylesheet at the end of `globals.css`.
- Theme: the button in the header toggles dark/light and stores the choice in `localStorage`. A small script in `app/layout.tsx` applies it before first paint; with no stored choice the site is dark.

## Responsive

Below 760px the three-column rows collapse to one column, the figure moves under the text, the nav scrolls sideways, and receipts scroll horizontally inside their box. Safe-area insets and `viewport-fit=cover` are kept from the previous version.
