import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const description =
  "Daniyal Malik, full-stack engineer in New York. Ledgers, billing, pricing, authorization: the parts of a product where a wrong number is a bug. Eight open-source libraries with their output attached.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://daniyalmlk.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Daniyal Malik, full-stack engineer",
  description,
  // One canonical address, so a custom domain and the github.io one do not
  // compete in search, and `profile` so link previews treat this as a person.
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  authors: [{ name: "Daniyal Malik", url: siteUrl }],
  creator: "Daniyal Malik",
  openGraph: {
    title: "Daniyal Malik",
    description,
    type: "profile",
    firstName: "Daniyal",
    lastName: "Malik",
    url: "/",
    siteName: "Daniyal Malik",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: "Daniyal Malik", description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0e" },
    { media: "(prefers-color-scheme: light)", color: "#f1efe8" },
  ],
};

// Applies the saved (or system) theme before first paint, so there is no flash.
const themeScript = `try{var t=localStorage.getItem('theme')||'dark';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Daniyal Malik",
              jobTitle: "Full-stack engineer",
              email: "mailto:dm6008@nyu.edu",
              url: siteUrl,
              sameAs: ["https://github.com/DaniyalMlk", "https://linkedin.com/in/daniyal-mlk"],
              alumniOf: { "@type": "CollegeOrUniversity", name: "New York University" },
              knowsLanguage: ["kk", "ru", "en", "zh", "tr"],
              address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY", addressCountry: "US" },
            }),
          }}
        />
      </body>
    </html>
  );
}
