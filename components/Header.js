"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
      return;
    }

    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;
    const next = prefersLight ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("theme", next);
  }

  return (
    <header
      className="
        reveal
        panel-shell
        relative overflow-hidden
        rounded-3xl border border-[color:var(--border-soft)]
        bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.12),_transparent_60%)]
        p-6 md:p-10
      "
    >
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-[color:var(--text-1)]">
        <span>Curated for designers &amp; devs</span>
          <button
          type="button"
          onClick={toggleTheme}
          className="rounded-full border border-[color:var(--border-strong)] bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text-1)] transition hover:bg-white/20"
          aria-label="Toggle light or dark theme"
        >
          {theme === "dark" ? (
            <span className="inline-flex items-center gap-2">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12.8A8.5 8.5 0 1111.2 3a7 7 0 009.8 9.8z"
                />
              </svg>
              Dark
            </span>
          ) : (
            <span className="inline-flex items-center justify-between gap-2">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="4" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.36-6.36l-1.41 1.41M6.05 17.95l-1.41 1.41m0-13.99l1.41 1.41m11.31 11.31l1.41 1.41"
                />
              </svg>
              Light
            </span>
          )}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <h1 className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-[color:var(--text-0)]">
          Brief Lab
        </h1>
      
      </div>

      <p className="max-w-2xl text-base md:text-lg text-[color:var(--text-1)]">
        Generate realistic client briefs in seconds, then practice pitching,
        scoping, and pricing with confidence.
      </p>
    </header>
  );
}
