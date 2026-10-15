// Three small charts, each drawn from numbers the repositories produced
// (the same runs whose text output sits in the receipts). Inline SVG, theme
// colours from CSS variables, values labelled directly so nothing depends on
// colour alone.

import pbo from "@/lib/pbo-points.json";

const W = 760;

function Frame({ title, sub, note, h, children }: { title: string; sub?: string; note: string; h: number; children: React.ReactNode }) {
  return (
    <figure className="chart">
      <figcaption>
        <b>{title}</b>
        {sub && <span className="chart-sub">{sub}</span>}
      </figcaption>
      <svg viewBox={`0 0 ${W} ${h}`} role="img" aria-label={title}>
        {children}
      </svg>
      <div className="chart-note">{note}</div>
    </figure>
  );
}

/* recalc: edit cost against sheet size, log-log. From `npm run bench`. */
const recalc = {
  chain: [
    [100, 1.209],
    [1000, 3.582],
    [5000, 24.0],
  ],
  fanout: [
    [101, 0.44],
    [1001, 2.72],
    [5001, 17.4],
  ],
  isolated: [
    [2001, 0.012],
    [20001, 0.014],
    [100001, 0.009],
  ],
};

export function RecalcChart() {
  const h = 300;
  const L = 64,
    R = 56,
    T = 20,
    B = 44;
  const x = (cells: number) => L + ((Math.log10(cells) - 2) / (5 - 2)) * (W - L - R);
  const y = (ms: number) => T + ((Math.log10(30) - Math.log10(ms)) / (Math.log10(30) - Math.log10(0.005))) * (h - T - B);
  const path = (pts: number[][]) => pts.map(([c, m], i) => `${i ? "L" : "M"}${x(c).toFixed(1)} ${y(m).toFixed(1)}`).join(" ");
  const yTicks = [0.01, 0.1, 1, 10];
  const xTicks = [100, 1000, 10000, 100000];
  return (
    <Frame
      title="An edit with no dependents costs the same in 100,000 cells as in 2,000."
      sub="recalc · edit cost against sheet size, both axes log · from npm run bench"
      note="Milliseconds per edit. The chain and fan-out shapes recalculate every cell, so they grow with the sheet; an isolated edit recalculates nothing and stays flat at about 0.01 ms, which is the claim under test."
      h={h}
    >
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} className="ch-grid" />
          <text x={L - 8} y={y(t) + 4} textAnchor="end" className="ch-tick">
            {t} ms
          </text>
        </g>
      ))}
      {xTicks.map((t, i) => (
        <text key={t} x={x(t)} y={h - B + 18} textAnchor={i === xTicks.length - 1 ? "end" : "middle"} className="ch-tick">
          {t.toLocaleString("en-US")} cells
        </text>
      ))}
      <path d={path(recalc.chain)} className="ch-line ch-muted" />
      <path d={path(recalc.fanout)} className="ch-line ch-muted" />
      <path d={path(recalc.isolated)} className="ch-line ch-accent" />
      {recalc.chain.map(([c, m]) => (
        <circle key={c} cx={x(c)} cy={y(m)} r={3} className="ch-dot ch-muted" />
      ))}
      {recalc.fanout.map(([c, m]) => (
        <circle key={c} cx={x(c)} cy={y(m)} r={3} className="ch-dot ch-muted" />
      ))}
      {recalc.isolated.map(([c, m], i) => (
        <g key={c}>
          <circle cx={x(c)} cy={y(m)} r={4} className="ch-dot ch-accent" />
          <text x={x(c)} y={y(m) + 18} textAnchor={i === 2 ? "end" : "middle"} className="ch-val">
            {m} ms
          </text>
        </g>
      ))}
      <text x={x(5000) + 10} y={y(24.0) + 4} className="ch-label">
        chain, 24.0 ms
      </text>
      <text x={x(5001) + 10} y={y(17.4) + 14} className="ch-label">
        fan-out, 17.4 ms
      </text>
      <text x={x(2001)} y={y(0.012) - 12} textAnchor="middle" className="ch-label ch-accent-text">
        isolated edit
      </text>
    </Frame>
  );
}

/* tallyd: precision and recall by book size. From `tallyd bench`. */
const tallyd = [
  { size: "1m × 10", lines: 20, prec: 100.0, rec: 79.0, recp: 94.7 },
  { size: "3m × 12", lines: 70, prec: 100.0, rec: 76.5, recp: 95.6 },
  { size: "6m × 15", lines: 171, prec: 100.0, rec: 73.5, recp: 96.4 },
  { size: "12m × 15", lines: 329, prec: 100.0, rec: 72.7, recp: 95.9 },
];

export function TallydChart() {
  const h = 280;
  const L = 64,
    R = 24,
    T = 20,
    B = 56;
  const y = (v: number) => T + ((100 - v) / 100) * (h - T - B);
  const groupW = (W - L - R) / tallyd.length;
  const barW = 36;
  return (
    <Frame
      title="Precision stays at 100% as the books grow: the matcher abstains, it never guesses wrong."
      sub="tallyd · matcher over generated books with a known answer key · from tallyd bench"
      note="Per cent of statement lines. Precision: matches it made that were right. Recall: right answers it found on its own. Recall+: counting a correct suggestion in the review queue as found, which is what a reviewer sees."
      h={h}
    >
      {[0, 25, 50, 75, 100].map((t) => (
        <g key={t}>
          <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} className="ch-grid" />
          <text x={L - 8} y={y(t) + 4} textAnchor="end" className="ch-tick">
            {t}%
          </text>
        </g>
      ))}
      {tallyd.map((d, i) => {
        const cx = L + groupW * i + groupW / 2;
        const bars = [
          { v: d.prec, cls: "ch-bar ch-accent", label: "precision" },
          { v: d.recp, cls: "ch-bar ch-ink", label: "recall+" },
          { v: d.rec, cls: "ch-bar ch-muted", label: "recall" },
        ];
        return (
          <g key={d.size}>
            {bars.map((b, j) => {
              const bx = cx - (barW * 3 + 8) / 2 + j * (barW + 4);
              return (
                <g key={b.label}>
                  <rect x={bx} y={y(b.v)} width={barW} height={y(0) - y(b.v)} className={b.cls} />
                  <text x={bx + barW / 2} y={y(b.v) - 5} textAnchor="middle" className="ch-val">
                    {b.v === 100 ? "100" : b.v.toFixed(1)}
                  </text>
                </g>
              );
            })}
            <text x={cx} y={h - B + 18} textAnchor="middle" className="ch-tick">
              {d.size}
            </text>
            <text x={cx} y={h - B + 33} textAnchor="middle" className="ch-tick">
              {d.lines} lines
            </text>
          </g>
        );
      })}
      <g transform={`translate(${L}, ${h - 10})`} className="ch-legend">
        <rect x={0} y={-9} width={10} height={10} className="ch-bar ch-accent" />
        <text x={16} y={0}>precision</text>
        <rect x={100} y={-9} width={10} height={10} className="ch-bar ch-ink" />
        <text x={116} y={0}>recall+</text>
        <rect x={190} y={-9} width={10} height={10} className="ch-bar ch-muted" />
        <text x={206} y={0}>recall</text>
      </g>
    </Frame>
  );
}

/* holdout: in-sample vs out-of-sample Sharpe for the in-sample winner across
   CSCV partitions, with the degradation line. From the same run as `holdout pbo`. */
export function HoldoutChart() {
  const h = 320;
  const L = 64,
    R = 24,
    T = 20,
    B = 44;
  const xs = pbo.pts.map((p) => p[0]);
  const ys = pbo.pts.map((p) => p[1]);
  const xmin = Math.min(...xs),
    xmax = Math.max(...xs);
  const ymin = Math.min(...ys),
    ymax = Math.max(...ys);
  const x = (v: number) => L + ((v - xmin) / (xmax - xmin)) * (W - L - R);
  const y = (v: number) => T + ((ymax - v) / (ymax - ymin)) * (h - T - B);
  const lineY = (v: number) => pbo.intercept + pbo.slope * v;
  const yTicks = [-0.08, -0.04, 0, 0.04];
  const xTicks = [0, 0.04, 0.08];
  return (
    <Frame
      title={`Probability of backtest overfitting 0.975: the in-sample winner lost money out of sample in ${Math.round(pbo.loss * 100)}% of ${pbo.n.toLocaleString("en-US")} splits.`}
      sub="holdout · 30 moving-average strategies, 16 blocks, combinatorially symmetric cross-validation · 400 of 12,870 partitions drawn"
      note={`Each point is one split: the strategy that looked best in-sample, and what it then did out of sample (per-period Sharpe). The line is the fitted degradation, out-of-sample = ${pbo.intercept} ${pbo.slope < 0 ? "−" : "+"} ${Math.abs(pbo.slope)} × in-sample, r² ${pbo.r2}. A slope below zero means the better it looked, the worse it did.`}
      h={h}
    >
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} className={t === 0 ? "ch-zero" : "ch-grid"} />
          <text x={L - 8} y={y(t) + 4} textAnchor="end" className="ch-tick">
            {t.toFixed(2)}
          </text>
        </g>
      ))}
      {xTicks.map((t) => (
        <text key={t} x={x(t)} y={h - B + 18} textAnchor="middle" className="ch-tick">
          {t.toFixed(2)}
        </text>
      ))}
      <text x={W - R} y={h - 6} textAnchor="end" className="ch-tick">
        in-sample Sharpe →
      </text>
      <text x={L + 6} y={T + 10} className="ch-tick">
        ↑ out-of-sample Sharpe
      </text>
      {pbo.pts.map((p, i) => (
        <circle key={i} cx={x(p[0])} cy={y(p[1])} r={2.2} className="ch-pt" />
      ))}
      <line x1={x(xmin)} y1={y(lineY(xmin))} x2={x(xmax)} y2={y(lineY(xmax))} className="ch-line ch-accent" />
      <text x={x(xmax) - 4} y={y(lineY(xmax)) - 8} textAnchor="end" className="ch-label ch-accent-text">
        slope {pbo.slope}
      </text>
    </Frame>
  );
}

export const chartFor: Record<string, () => React.JSX.Element> = {
  recalc: RecalcChart,
  tallyd: TallydChart,
  holdout: HoldoutChart,
};
