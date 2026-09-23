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

export const work = [
  {
    yr: "2025 — NOW",
    org: "Terran Denizen",
    note: "Full-stack engineering intern. Four-level role system, 133 row-level security policies, Stripe billing, iOS releases.",
    loc: "New York",
  },
  {
    yr: "2026",
    org: "North Caspian Operating Company",
    note: "Full-stack engineering intern. HSSE platform for 150 staff in four weeks; Visio parser generating process guides.",
    loc: "Atyrau",
  },
  {
    yr: "2024",
    org: "Nazarbayev University",
    note: "Research engineering intern. Sensor integration on a tensegrity robot; 1,200-record soil database.",
    loc: "Astana",
  },
  {
    yr: "2023",
    org: "National Information Technologies",
    note: "Data engineering intern. Rewrote 14 production SQL queries; nightly ETL from three hours to under two.",
    loc: "Astana",
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
