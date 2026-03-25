import Script from "next/script";
import Header from "../components/Header";
import BriefForm from "../components/BriefForm";
import { absoluteUrl, siteConfig } from "../lib/site";

const faqItems = [
  {
    question: "What does Fake A Project generate?",
    answer:
      "Fake A Project generates realistic practice client briefs for creative and technical roles like web development, graphic design, UI/UX, mobile apps, copywriting, fashion, and animation.",
  },
  {
    question: "Who is Fake A Project for?",
    answer:
      "It is built for freelancers, students, bootcamp learners, junior designers, developers, and creative professionals who want believable projects to practice proposals, pricing, timelines, and delivery planning.",
  },
  {
    question: "Can I install Fake A Project like an app?",
    answer:
      "Yes. The app now includes a web app manifest and service worker, so supported browsers can install it to the home screen or desktop like a lightweight app.",
  },
];

const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: siteConfig.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: siteConfig.description,
      creator: {
        "@type": "Organization",
        name: siteConfig.creator,
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      url: absoluteUrl("/"),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-10 md:pt-16">
      <Script id="home-jsonld" type="application/ld+json">
        {JSON.stringify(pageJsonLd)}
      </Script>

      <div className="mx-auto w-full max-w-6xl space-y-10">
        <Header />

        <BriefForm />
      </div>
    </main>
  );
}
