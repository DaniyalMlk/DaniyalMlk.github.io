// The five Python libraries and the MCP server that exposes them, drawn as a
// small diagram so the "one system" reading does not depend on eight rows.
// Colours come from CSS variables so it follows the theme.

const libs = [
  { name: "moneyness", what: "options" },
  { name: "shortfall", what: "risk" },
  { name: "tenor", what: "curves" },
  { name: "slippage", what: "execution" },
  { name: "holdout", what: "backtests" },
];

export default function Ecosystem() {
  const W = 760;
  const boxW = 128;
  const gap = (W - libs.length * boxW) / (libs.length - 1);
  const libY = 150;
  const abX = W / 2 - 110;
  return (
    <figure className="eco">
      <svg viewBox={`0 0 ${W} 230`} role="img" aria-label="Five Python libraries feeding the abacus MCP server, which a language model calls as tools">
        {/* model */}
        <text x={W / 2} y={18} textAnchor="middle" className="eco-label">
          a language model, over MCP
        </text>
        <line x1={W / 2} y1={26} x2={W / 2} y2={54} className="eco-line" markerEnd="url(#arr)" />
        {/* abacus */}
        <rect x={abX} y={56} width={220} height={44} className="eco-box eco-box-top" />
        <text x={W / 2} y={75} textAnchor="middle" className="eco-name">
          abacus
        </text>
        <text x={W / 2} y={91} textAnchor="middle" className="eco-sub">
          39 tools · 19/19 conformance
        </text>
        {/* libs */}
        {libs.map((l, i) => {
          const x = i * (boxW + gap);
          const cx = x + boxW / 2;
          return (
            <g key={l.name}>
              <line x1={cx} y1={libY} x2={cx} y2={116} className="eco-line" markerEnd="url(#arr)" />
              <rect x={x} y={libY} width={boxW} height={44} className="eco-box" />
              <text x={cx} y={libY + 19} textAnchor="middle" className="eco-name">
                {l.name}
              </text>
              <text x={cx} y={libY + 35} textAnchor="middle" className="eco-sub">
                {l.what}
              </text>
            </g>
          );
        })}
        <line x1={64} y1={116} x2={W - 64} y2={116} className="eco-line" />
        <line x1={W / 2} y1={100} x2={W / 2} y2={116} className="eco-line" />
        <text x={W / 2} y={222} textAnchor="middle" className="eco-label">
          pure Python, no runtime dependencies; every figure above is the program's own output
        </text>
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" className="eco-arrow" />
          </marker>
        </defs>
      </svg>
      <figcaption>
        Six of the eight repositories form one system: abacus hands the five libraries to a language model as tools, so the numbers are computed by tested code rather than by the model. tallyd and recalc stand alone.
      </figcaption>
    </figure>
  );
}
