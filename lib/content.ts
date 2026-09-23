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
    role: "Full-Stack Engineer",
    loc: "Shanghai",
    href: "https://aidencare.space",
    points: [
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
    ],
  },
  {
    yr: "2024",
    org: "Nazarbayev University",
    role: "Research Engineering Intern",
    loc: "Astana",
    points: [
      "Integrated six IMU and load-cell sensors into a tensegrity robot and recalibrated chord tension between runs.",
      "Built a 1,200-record soil database in Postgres and fitted van Genuchten curves in Python for the sensor design.",
    ],
  },
  {
    yr: "2023",
    org: "National Information Technologies",
    role: "Data Engineering Intern",
    loc: "Astana",
    points: [
      "Rewrote 14 production SQL queries and took a nightly ETL job over 25 tables from three hours to under two.",
      "Wrote 30+ validation queries that caught roughly 500 bad records a week before they reached reports.",
    ],
  },
];

export const projects = [
  { yr: "TypeScript", org: "recalc", note: "Spreadsheet formula engine. Parses to an AST and recalculates only what an edit invalidated.", href: "https://github.com/DaniyalMlk/recalc" },
  { yr: "TypeScript", org: "tallyd", note: "Double-entry ledger and reconciliation. A year of transactions in 0.2 s, down from 16.8 s.", href: "https://github.com/DaniyalMlk/tallyd" },
  { yr: "Python", org: "capstack", note: "Leveraged buyout engine: debt schedules with cash sweep, covenant tests, returns waterfall.", href: "https://github.com/DaniyalMlk/capstack" },
  { yr: "Swift", org: "spaceVoyageApp", note: "SwiftUI application with trip planning, search and recommendations.", href: "https://github.com/DaniyalMlk/spaceVoyageApp" },
];

export const skills = [
  { yr: "LANGUAGES", org: "TypeScript, JavaScript, Python, C++, SQL, Bash" },
  { yr: "FRAMEWORKS", org: "Next.js, React, React Native, Expo, Node, Tailwind" },
  { yr: "DATA", org: "PostgreSQL, Supabase, Prisma, pandas, NumPy" },
  { yr: "SHIPPING", org: "Git, Stripe, EAS Build, App Store Connect, Vercel" },
];

export const tabs = ["Home", "Experience", "Projects", "Skills", "Contact"] as const;
