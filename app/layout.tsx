import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const description =
  "Daniyal Malik, full-stack engineer in New York. Ledgers, billing, pricing, authorization: the parts of a product where a wrong number is a bug. Eight open-source libraries with their output attached.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Daniyal Malik, full-stack engineer",
  description,
  openGraph: { title: "Daniyal Malik", description, type: "website" },
  twitter: { card: "summary", title: "Daniyal Malik", description },
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
const themeScript = `try{var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
