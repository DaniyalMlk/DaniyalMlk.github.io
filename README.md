# daniyal-malik

Personal site. Next.js 16, React 19, plain CSS, Geist. One page, five views, no scrolling on desktop.

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

- `app/page.tsx` — the five views. Clicking a tab swaps the panel in place; left/right arrow keys also move between views.
- Theme: the button in the header toggles dark/light and stores the choice in `localStorage`. A small script in
  `app/layout.tsx` applies it before first paint, so there is no flash. With no stored choice, the system setting wins.
- `components/Ornament.tsx` — the flag's hoist ornament, traced from the flag and tiled down the left edge.
- `components/Eagle.tsx` — the steppe eagle, taken from a public-domain flag SVG. Both are state symbols of Kazakhstan
  and recolor with the theme.
- The New York clock in the hero updates every 30 seconds.

## Responsive

Desktop holds one screen with no page scrolling. Below 900px the layout switches: the nav stacks, the tabs scroll
sideways, rows become single-column, the button goes full width, and the ornament narrows to 26px (18px under 380px).
Safe-area insets are respected for iPhone notch and home indicator, `100dvh` is used so iOS Safari's toolbars don't
clip the layout, and the viewport is set to `viewport-fit=cover`.
