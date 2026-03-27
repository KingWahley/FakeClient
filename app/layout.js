import Script from "next/script";
import "./globals.css";
import ServiceWorkerRegister from "../components/ServiceWorkerRegister";
import { absoluteUrl, getSiteUrl, siteConfig } from "../lib/site";
import { Analytics } from "@vercel/analytics/next";

const siteUrl = getSiteUrl();

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  referrer: "origin-when-cross-origin",
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  publisher: siteConfig.creator,
  category: "productivity",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@WebDevii",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.name,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.svg", type: "image/svg+xml" },
      { url: "/icons/icon-512.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icons/icon-192.svg"],
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0f17" },
    { media: "(prefers-color-scheme: light)", color: "#f6f7fb" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Analytics />
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {`try {
            var stored = localStorage.getItem("theme");
            var theme = stored === "light" || stored === "dark"
              ? stored
              : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
            document.documentElement.setAttribute("data-theme", theme);
          } catch (error) {}
          `}
        </Script>
        <Script id="website-jsonld" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteUrl,
            description: siteConfig.description,
            creator: {
              "@type": "Organization",
              name: siteConfig.creator,
            },
            potentialAction: {
              "@type": "UseAction",
              target: absoluteUrl("/"),
              name: "Generate a client brief",
            },
          })}
        </Script>
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
