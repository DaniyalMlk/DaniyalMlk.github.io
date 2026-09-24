export const profile = {
  name: "Daniyal Malik",
  short: "Daniyal",
  role: "Full-stack web and iOS engineer",
  line: "Web platforms and iOS apps, built and shipped end to end.",
  email: "dm6008@nyu.edu",
  github: "https://github.com/DaniyalMlk",
  linkedin: "https://linkedin.com/in/daniyal-mlk",
};

export const credentials = [
  { k: "2023 — NOW", v: "Four engineering internships, three countries" },
  { k: "IN PRODUCTION", v: "Six apps and services, web and iOS" },
  { k: "NYU 2028", v: "Computer Science and Economics" },
];

export type Tag = { label: string; color: string };

export type Job = {
  yr: string;
  tag?: Tag;
  org: string;
  role: string;
  loc: string;
  href?: string;
  clone?: string;
  points: string[];
};

export const work: Job[] = [
  {
    yr: "2025 — Now",
    org: "Terran Denizen",
    role: "Full-Stack Engineering Intern",
    loc: "New York",
    href: "https://terrandenizen.com",
    points: [
      "Lead contributor across four Next.js apps, a Node API and an Expo iOS app on one shared Postgres database.",
      "Built the four-level role system and its 133 row-level security policies, and closed a session-hijacking path between subdomains.",
      "Shipped Stripe subscription billing, and own the iOS pipeline from EAS builds to App Store release.",
    ],
  },
  {
    yr: "2026",
    org: "AidenCare",
    role: "Full-Stack Engineering Lead",
    loc: "Shanghai",
    href: "https://aidencare.space",
    points: [
      "Led the build with two other engineers: set the architecture, split the work between us and reviewed what they wrote.",
      "Bilingual (Chinese and English) platform for a dental clinic: a patient portal for booking, records and documents, and a staff dashboard for appointments, review and reports.",
      "Defence in depth on the database: 29 row-level security policies across 11 tables, six roles with an approval workflow, and a trigger that blocks privilege escalation.",
      "Role-scoped AI assistant as a Deno edge function, so the model key never reaches the browser and patients cannot read clinic-wide data.",
    ],
  },
  {
    yr: "2026",
    org: "North Caspian Operating Company",
    role: "Full-Stack Engineering Intern",
    loc: "Atyrau",
    points: [
      "HSSE platform for 150 staff built in four weeks: six SPFx web parts in React over nine SharePoint lists.",
      "Visio parser that turned 40+ process diagrams into Word guides, cutting each write-up from two hours to under a minute.",
      "Added BPMN and PDF exports on the same process model, so 12 process owners could publish updates without going through IT.",
    ],
  },
  {
    yr: "2024",
    org: "Nazarbayev University",
    role: "Research Engineering Intern",
    loc: "Astana",
    points: [
      "Integrated six IMU and load-cell sensors into a tensegrity robot and recalibrated chord tension between runs.",
      "Built a Postgres database of 1,200 soil lab records for an IoT geotechnical sensing project.",
      "Fitted van Genuchten curves in Python with pandas and NumPy; the results fed the sensor-system design.",
    ],
  },
  {
    yr: "2023",
    org: "National Information Technologies",
    role: "Data Engineering Intern",
    loc: "Astana",
    points: [
      "Rewrote 14 production SQL queries and took a nightly ETL job over 25 tables from three hours to under two.",
      "Wrote 30+ validation queries that caught roughly 500 missing or duplicate records a week before they reached reports.",
      "Turned four analysts' reporting requirements into six ETL output tables and checked the loaded data against their reports.",
    ],
  },
];

export const projects: Job[] = [
  {
    yr: "",
    tag: { label: "MCP server", color: "#e6a63f" },
    org: "abacus",
    role: "MCP server for option and portfolio analytics",
    loc: "",
    href: "https://github.com/DaniyalMlk/abacus",
    clone: "git clone https://github.com/DaniyalMlk/abacus",
    points: [
      "Hands option and portfolio mathematics to a language model as tools, targeting MCP revision 2026-07-28, because models are unreliable at arithmetic and a tool boundary can move the numbers somewhere trustworthy.",
      "Three pure-Python libraries sit behind it: moneyness for the option maths, shortfall for risk estimators, tenor for curves and bonds.",
      "Nothing wraps a third-party pricing API. The numbers are computed by those libraries and tested where they live.",
    ],
  },
  {
    yr: "",
    tag: { label: "TypeScript", color: "#3178c6" },
    org: "recalc",
    role: "Spreadsheet formula engine",
    loc: "",
    href: "https://github.com/DaniyalMlk/recalc",
    clone: "git clone https://github.com/DaniyalMlk/recalc",
    points: [
      "Parses formula text into an AST, works out which cells each formula depends on, and recalculates only what an edit invalidated.",
      "158 functions across financial, date, matrix and regression packs, plus named ranges, goal seek, sensitivity tables and scenarios.",
      "No runtime dependencies, and a virtualised grid so a large sheet stays responsive.",
    ],
  },
  {
    yr: "",
    tag: { label: "TypeScript", color: "#3178c6" },
    org: "tallyd",
    role: "Double-entry ledger and bank reconciliation",
    loc: "",
    href: "https://github.com/DaniyalMlk/tallyd",
    clone: "git clone https://github.com/DaniyalMlk/tallyd",
    points: [
      "Matches a bank statement against the books when the amounts differ by a processor fee, the dates by settlement lag, and one deposit covers three invoices.",
      "CSV and OFX ingestion with duplicate flagging, one-to-many and many-to-one matches, and a reconciliation that balances to the penny.",
      "A year of a busy account, 715 ledger movements against 625 statement lines, went from 16.8 s to 0.2 s with identical accuracy.",
    ],
  },
  {
    yr: "",
    tag: { label: "Python", color: "#4b8bbe" },
    org: "moneyness",
    role: "Options pricing, Greeks and implied volatility",
    loc: "",
    href: "https://github.com/DaniyalMlk/moneyness",
    clone: "git clone https://github.com/DaniyalMlk/moneyness",
    points: [
      "Prices European options under generalised Black-Scholes-Merton, differentiates them analytically, and recovers implied volatility from a quote.",
      "Written to be correct at the boundaries: zero time, zero volatility, deep wings, and quotes sitting exactly on the arbitrage bound.",
      "Standard library only at runtime, with mpmath used in the test suite as an independent reference.",
    ],
  },
  {
    yr: "",
    tag: { label: "Python", color: "#4b8bbe" },
    org: "holdout",
    role: "Backtest overfitting toolkit",
    loc: "",
    href: "https://github.com/DaniyalMlk/holdout",
    clone: "git clone https://github.com/DaniyalMlk/holdout",
    points: [
      "Answers how much of a strategy search's best result survives once the search itself is taken into account.",
      "Deflated and probabilistic Sharpe ratios, probability of backtest overfitting, purged cross-validation and multiple-testing haircuts.",
      "Every statistic is checked against a published worked example, a closed form, or a simulation of its own sampling distribution.",
    ],
  },
];

export type Skill = { name: string; color?: string };
export type SkillGroup = { label: string; kz: string; items: Skill[] };

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    kz: "ТІЛДЕР",
    items: [
      { name: "TypeScript", color: "#3178c6" },
      { name: "JavaScript", color: "#f1e05a" },
      { name: "Python", color: "#4b8bbe" },
      { name: "C++", color: "#f34b7d" },
      { name: "SQL", color: "#e38c00" },
      { name: "Bash", color: "#89e051" },
    ],
  },
  {
    label: "Frameworks",
    kz: "ФРЕЙМВОРКТЕР",
    items: [
      { name: "Next.js" },
      { name: "React" },
      { name: "React Native" },
      { name: "Expo" },
      { name: "Node" },
      { name: "Deno" },
      { name: "Tailwind" },
    ],
  },
  {
    label: "Data",
    kz: "ДЕРЕКТЕР",
    items: [
      { name: "PostgreSQL" },
      { name: "Supabase" },
      { name: "Prisma" },
      { name: "Row-level security" },
      { name: "pandas" },
      { name: "NumPy" },
    ],
  },
  {
    label: "Shipping",
    kz: "ШЫҒАРУ",
    items: [
      { name: "Git" },
      { name: "Stripe" },
      { name: "EAS Build" },
      { name: "App Store Connect" },
      { name: "Vercel" },
      { name: "MCP" },
    ],
  },
];

export const tabs = ["Home", "Experience", "Projects", "Skills", "Contact"] as const;
