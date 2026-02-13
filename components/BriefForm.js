"use client";

import { useRef, useState } from "react";
import BriefOutput from "./BriefOutput";
import { briefDataset } from "../lib/briefDataset";

export default function BriefForm() {
  const [form, setForm] = useState({
    niche: "Website Developer",
    scope: "Full Brief",
    level: "Junior",
  });

  const [brief, setBrief] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [source, setSource] = useState("ai");
  const outputRef = useRef(null);

  async function generateBrief() {
    setLoading(true);
    setBrief("");
    setError("");
    setCopied(false);

    try {
      if (typeof window !== "undefined") {
        const isMobile = window.matchMedia("(max-width: 1023px)").matches;
        if (isMobile && outputRef.current) {
          setTimeout(() => {
            outputRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 60);
        }
      }

      if (source === "dataset") {
        const next = pickDatasetBrief(form);
        setBrief(next);
        return;
      }

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setBrief(data.brief);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function pickDatasetBrief({ niche, scope, level }) {
    const exact = briefDataset.filter(
      (item) => item.niche === niche && item.level === level,
    );
    const fallback = briefDataset.filter((item) => item.niche === niche);
    const pool = exact.length ? exact : fallback;
    if (!pool.length) {
      return "Client Brief\nNo dataset entry matched the current selections.";
    }
    const pick = pool[Math.floor(Math.random() * pool.length)];
    return formatDatasetBrief(pick, scope);
  }

  function formatDatasetBrief(entry, scope) {
    const client = `Client Brief\n${entry.clientName}\n`;
    const quick = `${client}\nYou will deliver work for ${entry.quickFocus}.\nFocus on ${entry.goals}\n\nYou must work within ${entry.constraints} and a budget of ${entry.budget}.`;

    if (scope === "Quick Brief") {
      return quick;
    }

    return `${client}
Summary
${entry.summary}

Business Context
${entry.clientName} is planning a project in the ${entry.niche} space and needs a partner who can deliver quickly and professionally.

Objectives
${entry.goals}

Target Audience
Primary buyers are existing customers and new prospects who need clarity and confidence before committing.

Deliverables
${entry.deliverables}

Constraints
${entry.constraints}

Budget
${entry.budget}

Success Metrics
${entry.successMetrics}`;
  }

  function wrapPdfLines(text, font, fontSize, maxWidth) {
    const words = text.split(/\s+/);
    const lines = [];
    let current = "";

    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      const nextWidth = font.widthOfTextAtSize(next, fontSize);
      if (nextWidth <= maxWidth) {
        current = next;
        continue;
      }
      if (current) lines.push(current);
      current = word;
    }

    if (current) lines.push(current);
    return lines;
  }

  async function handleCopy() {
    if (!brief) return;
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (err) {
      setError("Clipboard access failed. Please copy manually.");
    }
  }

  async function handleDownload() {
    if (!brief) return;
    try {
      setDownloading(true);
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 12;
      const lineHeight = 16;
      const margin = 54;
      const pageWidth = 612;
      const pageHeight = 792;
      const maxWidth = pageWidth - margin * 2;

      const rawLines = brief.split(/\r?\n/);
      const lines = [];
      for (const raw of rawLines) {
        const trimmed = raw.trim();
        if (!trimmed) {
          lines.push("");
          continue;
        }
        lines.push(...wrapPdfLines(trimmed, font, fontSize, maxWidth));
      }

      let page = pdfDoc.addPage([pageWidth, pageHeight]);
      let cursorY = pageHeight - margin;

      for (const line of lines) {
        if (cursorY - lineHeight < margin) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          cursorY = pageHeight - margin;
        }

        page.drawText(line, {
          x: margin,
          y: cursorY - lineHeight,
          size: fontSize,
          font,
          color: rgb(0.1, 0.12, 0.18),
        });
        cursorY -= lineHeight;
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "client-brief.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 800);
    } catch (err) {
      setError("PDF download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.70fr_1.30fr]">
      <div className="reveal rounded-3xl bg-gradient-to-br from-white/20 via-white/5 to-white/10 p-px">
        <div className="panel-shell rounded-[1.45rem] h-full bg-[color:var(--panel)] p-6 md:p-8 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-[color:var(--text-0)]">
                Generate a client brief
              </h2>
              <p className="text-sm text-[color:var(--text-1)]">
                Choose a niche, scope, and seniority level.
              </p>
            </div>
            <div className="rounded-full border border-[color:var(--border-strong)] bg-[color:var(--pill-bg)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[color:var(--text-1)]">
              30 sec setup
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-1)]">
                Niche
              </label>
              <div className="relative">
                <select
                  className="
                    w-full appearance-none rounded-2xl border border-[color:var(--border-soft)]
                    bg-[color:var(--field-bg)] px-4 py-3 text-[color:var(--text-0)]
                    shadow-[var(--field-shadow)]
                    outline-none transition
                    focus:ring-2 focus:ring-[color:var(--ring)]
                  "
                  onChange={(e) => setForm({ ...form, niche: e.target.value })}
                  value={form.niche}
                >
                  <option disabled>Select Niche</option>
                  <option className="text-black bg-white/20">
                    Website Developer
                  </option>
                  <option className="text-black bg-white/20">
                    Graphic Designer
                  </option>
                  <option className="text-black bg-white/20">
                    Mobile App Developer
                  </option>
                  <option className="text-black bg-white/20">UI/UX</option>
                  <option className="text-black bg-white/20">
                    Copy Writing
                  </option>
                  <option className="text-black bg-white/20">
                    Fashion Illustrator
                  </option>
                  <option className="text-black bg-white/20">
                    2D Animator
                  </option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                  <svg
                    className="h-4 w-4 text-[color:var(--text-1)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-1)]">
                Scope
              </label>
              <div className="relative">
                <select
                  className="
                    w-full appearance-none rounded-2xl border border-[color:var(--border-soft)]
                    bg-[color:var(--field-bg)] px-4 py-3 text-[color:var(--text-0)]
                    shadow-[var(--field-shadow)]
                    outline-none transition
                    focus:ring-2 focus:ring-[color:var(--ring)]
                  "
                  onChange={(e) => setForm({ ...form, scope: e.target.value })}
                  value={form.scope}
                >
                  <option disabled>Select Scope</option>
                  <option className="text-black bg-white/20">
                    Quick Brief
                  </option>
                  <option className="text-black bg-white/20">Full Brief</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                  <svg
                    className="h-4 w-4 text-[color:var(--text-1)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-1)]">
                Level
              </label>
              <div className="relative">
                <select
                  className="
                    w-full appearance-none rounded-2xl border border-[color:var(--border-soft)]
                    bg-[color:var(--field-bg)] px-4 py-3 text-[color:var(--text-0)]
                    shadow-[var(--field-shadow)]
                    outline-none transition
                    focus:ring-2 focus:ring-[color:var(--ring)]
                  "
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                  value={form.level}
                >
                  <option disabled>Select Level</option>
                  <option className="text-black bg-white/20">Junior</option>
                  <option className="text-black bg-white/20">Mid</option>
                  <option className="text-black bg-white/20">Senior</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                  <svg
                    className="h-4 w-4 text-[color:var(--text-1)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2 p-2">
            <label className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-1)]">
              Source (optional)
            </label>
            <div className="flex rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--pill-bg)] p-1 shadow-[var(--field-shadow)]">
              <button
                type="button"
                onClick={() => setSource("ai")}
                className={`flex-1 rounded-xl px-3 py-2 text-xs font-semibold  tracking-[0.2em] transition ${
                  source === "ai"
                    ? "bg-white text-slate-900 shadow"
                    : "text-[color:var(--text-1)] hover:text-[color:var(--text-0)]"
                }`}
              >
                Ai
              </button>
              <button
                type="button"
                onClick={() => setSource("dataset")}
                className={`flex-1 rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                  source === "dataset"
                    ? "bg-white text-slate-900 shadow"
                    : "text-[color:var(--text-1)] hover:text-[color:var(--text-0)]"
                }`}
              >
                Dataset
              </button>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={generateBrief}
              disabled={loading}
              className="
                inline-flex items-center justify-center gap-2
                rounded-2xl px-6 py-3 text-sm font-semibold text-slate-950
                bg-gradient-to-r from-[color:var(--accent-1)] via-amber-300 to-orange-200
                shadow-[0_18px_40px_rgba(244,201,93,0.35)]
                transition hover:translate-y-[-1px] hover:shadow-[0_22px_50px_rgba(244,201,93,0.45)]
                disabled:cursor-not-allowed disabled:opacity-60
              "
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
                  Generating...
                </>
              ) : (
                "Generate Client Brief"
              )}
            </button>
            <span className="text-sm text-[color:var(--text-1)]">
              Tip: use the output to practice proposals and timelines.
            </span>
          </div>

          {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
        </div>
      </div>

      <div className="reveal reveal-delay-1">
        <div ref={outputRef}>
          <BriefOutput
            brief={brief}
            onCopy={handleCopy}
            onDownload={handleDownload}
            canCopy={Boolean(brief)}
            canDownload={Boolean(brief)}
            copied={copied}
            loading={loading}
            downloading={downloading}
          />
        </div>
      </div>
    </section>
  );
}
