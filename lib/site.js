const fallbackUrl = "https://fake-a-project.vercel.app/";

export const siteConfig = {
  name: "Fake A Project",
  shortName: "FakeCL",
  creator: "WebDevii",
  title:
    "Fake A Project | AI Client Brief Generator for Designers, Developers, and Creatives",
  description:
    "Generate realistic client briefs for web developers, designers, copywriters, UI/UX specialists, animators, and fashion creatives. Fake Client Lab by WebDevii helps you practice proposals, timelines, and portfolio-ready project thinking.",
  tagline:
    "Generate realistic AI client briefs to practice proposals, scoping, timelines, and creative delivery.",
  keywords: [
    "client brief generator",
    "ai brief generator",
    "design brief generator",
    "web developer practice projects",
    "freelance practice briefs",
    "creative brief generator",
    "portfolio practice tool",
    "proposal practice",
    "ui ux brief generator",
    "copywriting brief generator",
  ],
};

export function getSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    fallbackUrl;

  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

export function absoluteUrl(path = "/") {
  return `${getSiteUrl()}${path}`;
}
