// All text on the site lives here. Receipts are verbatim command output,
// captured from the repositories on 2026-10-15; keep them that way.

export const profile = {
  name: "Daniyal Malik",
  short: "Daniyal",
  role: "Full-stack engineer",
  line: "Full-stack engineer. Ledgers, billing, pricing, authorization: the parts of a product where a wrong number is a bug.",
  email: "dm6008@nyu.edu",
  github: "https://github.com/DaniyalMlk",
  githubUser: "DaniyalMlk",
  linkedin: "https://linkedin.com/in/daniyal-mlk",
  location: "New York, NY",
  // Canonical address of the site. Change this once if you move to a custom domain.
  url: "https://daniyalmlk.github.io",
  // Optional portrait, shown beside "At a glance". Drop a square JPEG (about
  // 800×800, under 150 KB) at public/portrait.jpg and set this to "/portrait.jpg".
  // Leave it undefined and nothing is rendered.
  portrait: undefined as string | undefined,
};

// "At a glance": the four facts a screener checks before reading anything else.
// Work authorization is the one most often missing from student sites, and the
// one most often used to filter. Nothing here is repeated in About.
export const summary = [
  { k: "NYU, CS and Economics", v: "May 2028" },
  { k: "Work authorization", v: "CPT/OPT, no sponsorship needed" },
  { k: "Based in", v: "New York" },
  { k: "Looking for", v: "SWE internships, summer 2027" },
];

// Short, in the third person. Facts only; add to it as you like. The degree,
// city and search live in At a glance above, so this is the rest.
export const about = {
  path: ["Astana", "Shanghai", "New York"],
  paragraphs: [
    "From Astana, Kazakhstan. Two years at NYU Shanghai, then the New York campus for 2026–27, on a full-tuition scholarship; programs the VEX U robotics team's robot in C++. Speaks Kazakh (native), Russian and English (fluent), Chinese and Turkish (intermediate). Plays poker, for the same reason the holdout library below exists: it punishes anyone who confuses a good result with a good decision.",
    "Full-stack engineer on platforms where records and money change hands: a career platform for MBA students, a bilingual patient portal for a dental clinic, and earlier data and research work in Kazakhstan. Author of nine open-source finance libraries, each published with the output that proves it.",
    "Co-founder and mentor of a robotics club in Astana since 2022; its FIRST team won the Connect Award at the FIRST Asia Pacific Open.",
  ],
};

export type Figure = { n: string; unit?: string };

export type Job = {
  // Month-precise, as on the CV. Months are what let a reader see that the
  // overlapping roles were remote and part of a year, not six full-time jobs.
  yr: string;
  org: string;
  // One line on what the organisation is, for a reader who has never heard of it.
  what?: string;
  role: string;
  loc: string;
  // "remote" or "on site", as on the CV. Shown under the location.
  basis?: string;
  href?: string;
  points: string[];
  figure: Figure;
  stack?: string;
};

export const work: Job[] = [
  {
    yr: "Nov 2025 – now",
    org: "Terran Denizen",
    what: "Career platform for MBA students at the M7 business schools",
    role: "Full-Stack Engineering Intern",
    loc: "United States",
    basis: "remote",
    href: "https://terrandenizen.com",
    points: [
      "Founding engineer and largest contributor on a 6-service platform: 4 Next.js apps, a Node API and an iOS app on PostgreSQL.",
      "Shipped member applications, trek booking and job applications, plus Stripe subscription billing for memberships and treks with refund-policy enforcement and webhook refund sync.",
      "Built the 4-tier role system as 133 row-level security policies on 19 tables, enforced in the database for web and iOS.",
      "Closed a cross-subdomain session-hijacking path by replacing URL-fragment login tokens with single-use exchange codes, and fixed login CSRF, open redirects and OTP brute-force.",
      "Ported the iOS app\u2019s pricing, eligibility and application-state logic into 23 framework-free modules with 655 tests, and own the release pipeline: EAS builds, code signing, TestFlight.",
    ],
    figure: { n: "133", unit: "RLS policies" },
    stack: "Next.js · Node · TypeScript · Postgres · Supabase · Stripe · Expo",
  },
  {
    yr: "Jun 2026 – now",
    org: "AidenCare",
    what: "Bilingual patient portal and staff dashboard for a dental clinic",
    role: "Full-Stack Engineering Lead",
    loc: "China",
    basis: "remote",
    href: "https://aidencare.space",
    points: [
      "Led the build with one other engineer: set the architecture, split the work and reviewed their code.",
      "Scoped the LLM assistant (Qwen via Groq) to each user\u2019s role, so it answers only from data that role can see.",
      "Designed the appointment lifecycle, from request to payment, with a database constraint that makes double-booking impossible.",
      "29 row-level security policies across 11 tables, six roles with an approval workflow, and a trigger that blocks privilege escalation.",
    ],
    figure: { n: "1", unit: "database constraint; a double booking cannot be written" },
    stack: "Next.js · Supabase · Deno · Postgres",
  },
  {
    yr: "Jul – Aug 2026",
    org: "North Caspian Operating Company",
    what: "Operator of the Kashagan oil field · Strategy & Business Directorate",
    role: "Full-Stack Engineering Intern",
    loc: "Kazakhstan",
    basis: "on site",
    points: [
      "Built an HSSE platform for 150+ staff in 4 weeks: 6 SPFx web parts (React/TypeScript) on 9 SharePoint lists and a data service.",
      "Wrote a Visio parser that turned 40+ process diagrams into Word guides, cutting each write-up from 2+ hours to under a minute.",
      "Added BPMN and PDF exports on the same process model, letting 12 process owners publish updates without IT.",
    ],
    figure: { n: "2 h → 1 min", unit: "per process guide" },
    stack: "React · TypeScript · SharePoint Framework",
  },
  {
    yr: "Feb – May 2026",
    org: "SolveSim",
    what: "Timed, McKinsey-style case-interview simulator",
    role: "Co-founder",
    loc: "France",
    basis: "remote",
    points: [
      "Co-built and launched a timed McKinsey-style case-interview simulator used by 250+ candidates, 8% on paid plans.",
      "Stored attempts as append-only records in PostgreSQL and derived scores from them, so scoring rules change without migrations.",
      "Built three-tier Stripe subscriptions with plan limits in one config checked by middleware, so new tiers need no code changes.",
    ],
    figure: { n: "250+", unit: "candidates, 8% paid" },
    stack: "Next.js · Postgres · Stripe",
  },
  {
    yr: "Jun – Aug 2024",
    org: "Nazarbayev University",
    what: "ISSAI Robotics & Geotechnical Engineering",
    role: "Research Engineering Intern",
    loc: "Kazakhstan",
    basis: "on site",
    points: [
      "Built a PostgreSQL database of 1,200+ soil lab records for an IoT geotechnical sensing project.",
      "Fit van Genuchten curves in Python (pandas, NumPy), and the results were used in the sensor-system design.",
    ],
    figure: { n: "1,200", unit: "lab records" },
    stack: "Python · pandas · NumPy · Postgres",
  },
  {
    yr: "Jun – Sep 2023",
    org: "National Information Technologies",
    what: "Kazakhstan's e-government IT operator",
    role: "Data Engineering Intern",
    loc: "Kazakhstan",
    basis: "on site",
    points: [
      "Cut a nightly ETL job over 25 tables from 3 hours to under 2 by rewriting 14 production SQL queries with joins and indexes.",
      "Wrote 30+ validation queries that caught ~500 missing or duplicate records a week before they reached reports.",
    ],
    figure: { n: "~500/week", unit: "bad records caught before they reached reports" },
    stack: "SQL · ETL",
  },
];

export type Project = {
  name: string;
  lang: "TypeScript" | "Python";
  tagline: string;
  line: string; // one sentence, shown under the name
  blurb: string; // the longer note, shown with the full output
  headline: string; // a verbatim excerpt of the receipt, always visible
  href: string;
  install: string;
  figure: Figure;
  tests: string;
  receipt: string;
  docs?: string; // a hosted documentation site, if the library has one
  captured: string; // when this library's receipt was captured; per library, so re-capturing one does not imply the rest
  featured?: boolean; // shown with its output open on the page; the rest collapse to a row until opened
};

export const projects: Project[] = [
  {
    name: "tallyd",
    featured: true,
    captured: "15 Oct 2026",
    lang: "TypeScript",
    tagline: "Double-entry ledger and bank reconciliation",
    line: "A ledger that reconciles a bank statement to the books and balances to the penny.",
    headline: `$ tallyd reconcile --ledger books/books.json --statement books/statement.csv --account 1110
Reconciling 1110 against 267 statement lines
  176 matched, 71 to review, 61 + 20 unmatched
  …
Adjusted bank balance                            343461.04
Adjusted ledger balance                          343461.04
Reconciled                                            0.00`,
    blurb:
      "Matches a bank statement against the books when the amounts differ by a processor fee, the dates by settlement lag, and one deposit covers three invoices. Multi-currency with exact rational rates, group consolidation, and a reconciliation that balances to the penny.",
    href: "https://github.com/DaniyalMlk/tallyd",
    install: "git clone https://github.com/DaniyalMlk/tallyd",
    figure: { n: "16.8 s → 0.2 s", unit: "a year of books" },
    tests: "1,904 tests · 79 files",
    receipt: `$ tallyd generate --out books --months 12 --seed 7 --currency USD --truth
Wrote books/books.json, books/statement.csv, books/truth.json
  620 journal entries, 267 statement lines
  259 lines a matcher could explain, of which 12 are batches
  8 bank-only, 5 still outstanding

$ tallyd reconcile --ledger books/books.json --statement books/statement.csv --account 1110
Reconciling 1110 against 267 statement lines
  176 matched, 71 to review, 61 + 20 unmatched

Matched
  high   0.940  2026-01-01 BALANCE BROUGHT FORWARD
  exact  0.950  2026-01-06 SO HALDEN UTILITIES BILL-3031
  exact  0.950  2026-01-08 SQ *SETTLEMENT STL-0108
  …
Review queue
  medium 0.853  2026-02-28 BACS PAYROLL
      · amount: exact at -6468.00
      · date: same day
      · description: shares PAYROLL
  …
Bank reconciliation (USD)
================================================================
Balance per bank statement                       346093.65
  Add: receipts not yet on the statement
    …
Adjusted bank balance                            343461.04

Balance per the ledger                           347640.09
  Add: bank credits not yet booked
    …
Adjusted ledger balance                          343461.04
----------------------------------------------------------------
Reconciled                                            0.00

$ tallyd bench
   size  books  lines    ms  scored    prec    rec   rec+
 1m x10     22     20   9.1   4.09%  100.0%  79.0%  94.7%
 3m x12     77     70  16.3   1.21%  100.0%  76.5%  95.6%
 6m x15    189    171  31.4   0.50%  100.0%  73.5%  96.4%
12m x15    380    329  47.2   0.24%  100.0%  72.7%  95.9%`,
  },
  {
    name: "recalc",
    featured: true,
    captured: "15 Oct 2026",
    lang: "TypeScript",
    tagline: "Spreadsheet formula engine",
    line: "A spreadsheet engine that recalculates only what an edit invalidated.",
    headline: `$ npm run bench
shape                            cells  build ms  edit ms  recalculated
isolated edit in 2000 cells      2,001      32.5    0.012             0
isolated edit in 20000 cells    20,001     468.2    0.014             0
isolated edit in 100000 cells  100,001    2246.3    0.009             0`,
    blurb:
      "Parses formula text into an AST, works out which cells each formula depends on, and recalculates only what an edit invalidated. 158 functions across financial, date, matrix and regression packs, named ranges, goal seek, scenarios, and a virtualised grid. No runtime dependencies.",
    href: "https://github.com/DaniyalMlk/recalc",
    install: "git clone https://github.com/DaniyalMlk/recalc",
    figure: { n: "0.009 ms", unit: "an edit in 100,000 cells" },
    tests: "1,913 tests · 55 files",
    receipt: `$ npm run bench

recalc - recalculation cost

shape                            cells  build ms  edit ms  recalculated
-----------------------------  -------  --------  -------  ------------
chain of 100                       100     5.454    1.209           100
chain of 1000                    1,000      37.7    3.582         1,000
chain of 5000                    5,000     110.3     24.0         5,000
fan-out to 100                     101     1.406    0.440           100
fan-out to 1000                  1,001      10.8    2.720         1,000
fan-out to 5000                  5,001      71.5     17.4         5,000
3 aggregates over 1000           1,003      29.0    0.773             3
3 aggregates over 10000         10,003     213.1     10.7             3
3 named aggregates over 10000   10,003     161.5     10.7             3
isolated edit in 2000 cells      2,001      32.5    0.012             0
isolated edit in 20000 cells    20,001     468.2    0.014             0
isolated edit in 100000 cells  100,001    2246.3    0.009             0

The last three rows are the claim under test: an edit with no dependents
should cost the same in a 2,000-cell sheet as in a 100,000-cell one.

$ npx vitest run
 Test Files  55 passed (55)
      Tests  1913 passed (1913)`,
  },
  {
    name: "moneyness",
    captured: "15 Oct 2026",
    lang: "Python",
    tagline: "Options pricing, Greeks and implied volatility",
    line: "Options pricing that is correct at the boundaries, not only in the textbook middle.",
    headline: `$ moneyness iv --spot 100 --strike 105 --time 0.5 --rate 0.05 --price 4.58
  implied volatility  0.1999401556
              method  newton
          iterations  4
      price residual  -8.882e-15

$ moneyness iv --spot 100 --strike 105 --time 0 --rate 0.05 --price 0
error: time must be positive, got 0.0: an expired option has no implied
volatility, since every volatility reproduces its price`,
    blurb:
      "Prices European options under generalised Black-Scholes-Merton, differentiates them analytically, and recovers implied volatility from a quote. Written to be correct at the boundaries: zero time, zero volatility, deep wings, quotes on the arbitrage bound. Also SABR, Heston, American lattices, barriers, Asians, quantos and variance swaps. Standard library only; mpmath as the reference in the tests.",
    href: "https://github.com/DaniyalMlk/moneyness",
    install: "pip install git+https://github.com/DaniyalMlk/moneyness",
    figure: { n: "−8.9e−15", unit: "price residual after 4 Newton steps" },
    tests: "5,997 tests",
    receipt: `$ moneyness greeks --spot 100 --strike 105 --time 0.5 --rate 0.05 --vol 0.2
      price        4.5816801675
      delta        0.4611602257
      gamma        0.0280756835
       vega       28.0756835274
      theta       -7.6918538257
 rho (rate)       -2.2908400838
rho (carry)       23.0580112860
      vanna        0.4743409778
      volga        3.2706199779
      charm       -0.2352466132
       veta      -29.6977282355
     colour        0.0264536388
      speed       -0.0000871727
      zomma       -0.1371077977
 dual delta       -0.3955651658
 dual gamma        0.0254654726

$ moneyness iv --spot 100 --strike 105 --time 0.5 --rate 0.05 --price 4.58
  implied volatility  0.1999401556
    total volatility  0.1413790398
              method  newton
          iterations  4
      price residual  -8.882e-15
    arbitrage bounds  [0.0000000000, 100.0000000000]

$ moneyness iv --spot 100 --strike 105 --time 0 --rate 0.05 --price 0
error: time must be positive, got 0.0: an expired option has no implied
volatility, since every volatility reproduces its price`,
  },
  {
    name: "abacus",
    featured: true,
    captured: "15 Oct 2026",
    lang: "Python",
    tagline: "MCP server for option, portfolio, execution and backtest analytics",
    line: "An MCP server that hands the five libraries to a language model as tools.",
    headline: `→ tools/call implied_volatility {"spot":100,"strike":105,"time":0.5,"rate":0.05,"price":4.58,"type":"call"}
← {
  "impliedVol": 0.19994015556567887,
  …
  "diagnostics": {
    "method": "newton",
    "iterations": 4,
    "residual": -8.881784197001252e-15,

$ abacus conform
19 passed, 0 failed, 10 skipped, 29 checks`,
    blurb:
      "Language models are unreliable at arithmetic, so the useful thing a tool boundary can do is move the numbers somewhere trustworthy. abacus exposes moneyness, shortfall, tenor, slippage and holdout as 39 tools over the Model Context Protocol, with a conformance suite for the transport. Nothing wraps a third-party pricing API.",
    href: "https://github.com/DaniyalMlk/abacus",
    docs: "https://daniyalmlk.github.io/abacus/",
    install: "pip install git+https://github.com/DaniyalMlk/abacus",
    figure: { n: "39", unit: "tools · 19/19 conformance" },
    tests: "854 tests + 29 conformance checks",
    receipt: `→ {"method":"tools/call","params":{"name":"implied_volatility",
     "arguments":{"spot":100,"strike":105,"time":0.5,"rate":0.05,"price":4.58,"type":"call"}}}
← {
  "impliedVol": 0.19994015556567887,
  "totalVol": 0.14137903983198477,
  "totalVariance": 0.019988032903813933,
  "logMoneyness": 0.02379016416943184,
  "diagnostics": {
    "method": "newton",
    "iterations": 4,
    "residual": -8.881784197001252e-15,
    "attainableRange": { "lower": 0.0, "upper": 100.0 }
  }
}

→ the same call with "option" instead of "type"
← {
  "error": {
    "kind": "invalid_input",
    "message": "implied_volatility was called with invalid arguments: /type: is
      required but was not given; /option: is not a recognised property;
      accepted properties are: carry, price, rate, spot, strike, time, type"
  }
}

$ abacus conform
ok    meta/client-capabilities-required
ok    framing/batch-refused
ok    framing/notification-unanswered
ok    framing/string-id-echoed
ok    errors/allocation-policy
…
19 passed, 0 failed, 10 skipped, 29 checks`,
  },
  {
    name: "tenor",
    captured: "15 Oct 2026",
    lang: "Python",
    tagline: "Fixed-income curve toolkit",
    line: "A fixed-income toolkit where every convention is a named argument, never a default.",
    headline: `$ tenor curve examples/quotes.txt --reference 2021-01-05 --basis ACT_365F
worst_repricing_error: 5.551115123e-17
reprices: True

$ tenor price … --maturity 2031-01-05 --coupon 0.05 --bond-basis THIRTY_360_US --quote 101.25
equivalent_yield: 0.02148273467
modified_duration: 8.154811187
dv01: 0.1029753302
z_spread: 0.02658980017`,
    blurb:
      "Bootstraps a curve from quotes and measures things on it: bond pricing and risk, asset swaps, floating-rate notes, index-linked bonds, embedded options, caplet stripping, credit curves, multi-curve, swaptions, Hull-White and G2++. Every day-count and convention is a named argument, never a default, and each is checked against the published rules.",
    href: "https://github.com/DaniyalMlk/tenor",
    install: "pip install git+https://github.com/DaniyalMlk/tenor",
    figure: { n: "5.6e−17", unit: "worst repricing error" },
    tests: "1,841 tests",
    receipt: `$ tenor curve examples/quotes.txt --reference 2021-01-05 --basis ACT_365F
reference: 2021-01-05
interpolation: log-linear on discount factors
basis: ACT/365F
sweeps: 1
worst_repricing_error: 5.551115123e-17
reprices: True
pillars:
  date=2021-07-05  years=0.49589    discount=0.9989954546  zero=0.002026758939
  date=2023-01-05  years=2          discount=0.9880776416  zero=0.005996999841
  date=2026-01-05  years=5.00274    discount=0.9273386141  zero=0.01507903763
  date=2031-01-06  years=10.008219  discount=0.7993329983  zero=0.02237937112
  date=2041-01-07  years=20.019178  discount=0.5717581988  zero=0.02792517775

$ tenor price examples/quotes.txt --reference 2021-01-05 --basis ACT_365F \\
    --maturity 2031-01-05 --coupon 0.05 --frequency SEMI_ANNUAL \\
    --bond-basis THIRTY_360_US --quote 101.25
bond: 5.000% of 2031-01-05
dirty: 125.5394366
clean: 125.5394366
equivalent_yield: 0.02148273467
solver_iterations: 14
macaulay_duration: 8.242405009
modified_duration: 8.154811187
convexity: 78.884306
dv01: 0.1029753302
z_spread: 0.02658980017
i_spread: 0.0264083526`,
  },
  {
    name: "shortfall",
    captured: "15 Oct 2026",
    lang: "Python",
    tagline: "Portfolio risk engine",
    line: "A risk engine that names its method in the output and says when the data is thin.",
    headline: `$ shortfall risk returns.csv --weights 0.6,0.3,0.1 --confidence 0.99 --distribution student-t
measure                    assumed  historical
value at risk (student-t)   1.843%      1.687%
expected shortfall          2.439%      1.984%

The historical tail rests on 5.0 observations of 500.`,
    blurb:
      "Value at risk and expected shortfall by six methods, each named in the result because the number does not identify it. Euler risk contributions that sum exactly, GARCH forecasts, generalised Pareto tails, copulas fitted separately from the marginals, and a scorer that ranks two forecast series. Pure Python, no dependencies, and it says so when it is working from too little data.",
    href: "https://github.com/DaniyalMlk/shortfall",
    install: "pip install git+https://github.com/DaniyalMlk/shortfall",
    figure: { n: "6", unit: "tail-risk methods, each named in its output" },
    tests: "2,048 tests",
    receipt: `$ shortfall risk returns.csv --weights 0.6,0.3,0.1 --confidence 0.99 --distribution student-t
3 assets over 500 periods, 99.0% confidence

measure                    assumed  historical
-------------------------  -------  ----------
value at risk (student-t)   1.843%      1.687%
expected shortfall          2.439%      1.984%
period volatility           0.707%

The historical tail rests on 5.0 observations of 500.`,
  },
  {
    name: "slippage",
    captured: "15 Oct 2026",
    lang: "Python",
    tagline: "Optimal execution and transaction cost analysis",
    line: "Transaction cost analysis that says where the cost came from, and schedules the rest.",
    headline: `$ slippage tca --orders sample/orders.csv --fills sample/fills.csv --bars sample/bars.csv
60 orders, paper notional 205,208,433, shortfall -63,865 (-3.11 bps)

             orders        delay      trading  opportunity   commission         fees      total
all              60         2.78        -5.89        -0.21         0.21         0.00      -3.11
(basis points of paper notional)`,
    blurb:
      "After the fact: what an order cost and where the cost came from, split into delay, trading, opportunity, commission and fees. Before the fact: how to spread the remaining quantity over the horizon given an impact model and a risk tolerance. Baskets, transient impact kernels, adaptive schedules, limit-order placement, VWAP tracking and venue routing.",
    href: "https://github.com/DaniyalMlk/slippage",
    install: "pip install git+https://github.com/DaniyalMlk/slippage",
    figure: { n: "5", unit: "cost components per order" },
    tests: "971 tests",
    receipt: `$ slippage tca --orders sample/orders.csv --fills sample/fills.csv --bars sample/bars.csv
60 orders, paper notional 205,208,433, shortfall -63,865 (-3.11 bps)

             orders        delay      trading  opportunity   commission         fees      total
-----------------------------------------------------------------------------------------------
SYM00             7        -8.73       -40.84         0.00         0.15         0.00     -49.41
SYM01             8        27.01         4.94         0.00         0.30         0.00      32.25
SYM02             9       -10.46        21.73        -7.04         0.67         0.00       4.90
…
all              60         2.78        -5.89        -0.21         0.21         0.00      -3.11
(basis points of paper notional)

outliers at a modified z-score of 3.5:
  ORD0046    SYM06    sell   -147.36 bps   z = -5.1
  ORD0021    SYM00    buy    -129.57 bps   z = -4.5`,
  },
  {
    name: "holdout",
    captured: "15 Oct 2026",
    lang: "Python",
    tagline: "Backtest overfitting toolkit",
    line: "How much of a strategy search's best result survives the search itself.",
    headline: `$ holdout pbo sample/sweep.csv
30 strategies, 16 blocks, 12,870 splits
probability of backtest overfitting: 0.975
probability of out-of-sample loss:   0.638
degradation: oos = 0.0316 - 1.202 * is   (r^2 0.77)`,
    blurb:
      "How much of a strategy search's best result survives once the search itself is taken into account. Probabilistic and deflated Sharpe ratios, probability of backtest overfitting, purged cross-validation and multiple-testing haircuts. Every statistic is checked against a published worked example, a closed form, or a simulation of its own sampling distribution.",
    href: "https://github.com/DaniyalMlk/holdout",
    install: "pip install git+https://github.com/DaniyalMlk/holdout",
    figure: { n: "12,870", unit: "splits in one PBO run" },
    tests: "559 tests",
    receipt: `$ holdout sample-data --out sample
wrote sample/sweep.csv: 30 strategies
wrote sample/trending.csv: 30 strategies

$ holdout pbo sample/sweep.csv
30 strategies, 16 blocks, 12,870 splits
probability of backtest overfitting: 0.975
probability of out-of-sample loss:   0.638
degradation: oos = 0.0316 - 1.202 * is   (r^2 0.77)
most often selected in-sample:
  ma30_120              16.4%
  ma30_180              14.4%
  ma5_60                13.6%`,
  },
  {
    name: "capstack",
    featured: true,
    lang: "Python",
    tagline: "Leveraged buyout engine",
    line: "A leveraged buyout engine that reports where the case stops working, not only what it returns.",
    headline: `$ capstack report examples/meridian.json
  …
  Where the case stops working
  ----------------------------
    Question                                       Answer
    --------------------------------------------  -------
    Exit multiple returning capital and no more     7.50x
    Exit multiple returning twice capital          10.42x
    Margin shift tripping the first covenant      -0.35pp
    Opening leverage tripping the first covenant    7.94x`,
    blurb:
      "Sources and uses that balance, an operating case through to unlevered free cash flow, a debt schedule with a cash sweep by seniority and a revolver that runs both ways, maintenance covenants with headroom, and returns by security through a preferred waterfall. Sensitivity tables rebuild the whole engine at every cell, and break-evens are solved along any assumption. Exact money arithmetic throughout; no runtime dependencies.",
    href: "https://github.com/DaniyalMlk/capstack",
    install: "pip install git+https://github.com/DaniyalMlk/capstack",
    figure: { n: "7.50x", unit: "exit multiple at which the sponsor only gets its capital back" },
    tests: "1,515 tests",
    captured: "16 Oct 2026",
    receipt: `$ capstack deal examples/meridian.json
Project Meridian   (close 2026-06-30)
=====================================

  Sources
    Term Loan B                 1,150.00   issued at 99.50
    …
    Sponsor equity                994.14   the plug
                                --------
    Total                       2,974.14

  Uses
    Purchase of equity          2,415.00
    …
                                --------
    Total                       2,974.14

  Entry metrics
    Total leverage                       7.71x
    Equity contribution                 36.8%

$ capstack exit examples/meridian.json
    Exit leverage                      4.54x

  Equity
                              invested     proceeds         MoIC          IRR
    Sponsor preferred           845.02     1,241.87        1.47x         8.0%
    Sponsor common              149.12       927.34        6.22x        44.1%
    Management rollover          85.00       203.56        2.39x        19.1%
    -------------------------------------------------------------------------
    Total                     1,079.14     2,372.77        2.20x        17.1%

$ capstack sensitivity examples/meridian.json --rows exit-multiple:9,10,11,12,13 --columns entry-multiple:10.5,11,11.5,12,12.5
  IRR
    entry multiple across, exit multiple down
    base case 17.1%, marked *

                10.50x    11.00x   11.50x*    12.00x    12.50x
    9.00x       14.3%     11.3%      8.6%      6.4%      4.3%
    10.00x      19.1%     15.9%     13.2%     10.8%      8.7%
    11.00x*     23.2%     19.9%     17.1%     14.6%     12.4%
    12.00x      26.8%     23.4%     20.5%     17.9%     15.7%
    13.00x      30.0%     26.6%     23.6%     21.0%     18.7%

    * the assumption the file describes

$ capstack report examples/meridian.json
  …
  Where the case stops working
  ----------------------------

  The sponsor gets its capital back at 7.50x, which is 4.00x below the
  11.50x paid going in.

    Question                                       Answer
    --------------------------------------------  -------
    Exit multiple returning capital and no more     7.50x
    Exit multiple returning twice capital          10.42x
    Margin shift tripping the first covenant      -0.35pp
    Opening leverage tripping the first covenant    7.94x`,
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL", "C++"] },
  { label: "Building", items: ["Next.js", "React", "React Native", "Expo", "Node", "Deno", "Tailwind"] },
  { label: "Data", items: ["PostgreSQL", "Supabase", "Prisma", "Row-level security", "pandas", "NumPy"] },
  { label: "Shipping", items: ["Git", "Vercel", "Stripe", "EAS Build", "App Store Connect", "MCP"] },
];

export const nav = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
] as const;
