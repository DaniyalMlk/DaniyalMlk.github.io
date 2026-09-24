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

export type Job = {
  yr: string;
  org: string;
  role: string;
  loc: string;
  href?: string;
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

export const projects = [
  {
    yr: "MCP · Python",
    org: "abacus",
    href: "https://github.com/DaniyalMlk/abacus",
    note: "MCP server exposing option and portfolio analytics to an AI assistant, with its own validated numerical core rather than a wrapper over someone else's API.",
  },
  {
    yr: "Python",
    org: "moneyness",
    href: "https://github.com/DaniyalMlk/moneyness",
    note: "Options pricing library: Black-Scholes-Merton, analytic Greeks and implied-volatility solving, checked against closed-form results.",
  },
  {
    yr: "Python",
    org: "shortfall",
    href: "https://github.com/DaniyalMlk/shortfall",
    note: "Portfolio risk engine: shrinkage covariance, value at risk, expected shortfall, risk contributions and drawdown statistics.",
  },
  {
    yr: "TypeScript",
    org: "recalc",
    href: "https://github.com/DaniyalMlk/recalc",
    note: "Spreadsheet formula engine: lexer, parser, dependency graph and incremental recalculation, so an edit only touches what depends on it.",
  },
  {
    yr: "TypeScript",
    org: "tallyd",
    href: "https://github.com/DaniyalMlk/tallyd",
    note: "Double-entry ledger and bank reconciliation with a live dashboard. A year of transactions reconciles in 0.2 s, down from 16.8 s.",
  },
];

export const skills = [
  { yr: "LANGUAGES", org: "TypeScript, JavaScript, Python, C++, SQL, Bash" },
  { yr: "FRAMEWORKS", org: "Next.js, React, React Native, Expo, Node, Tailwind" },
  { yr: "DATA", org: "PostgreSQL, Supabase, Prisma, pandas, NumPy" },
  { yr: "SHIPPING", org: "Git, Stripe, EAS Build, App Store Connect, Vercel" },
];

export const tabs = ["Home", "Experience", "Projects", "Skills", "Contact"] as const;
