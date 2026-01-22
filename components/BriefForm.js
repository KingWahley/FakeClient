"use client";

import { useState } from "react";
import BriefOutput from "./BriefOutput";

export default function BriefForm() {
  const [form, setForm] = useState({
    niche: "Web Design",
    scope: "Full Branding",
    level: "Junior",
  });

  const [brief, setBrief] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateBrief() {
    setLoading(true);
    setBrief("");
    setError("");

    try {
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

  return (
    <section
      className="space-y-6 
    rounded-2xl 
    bg-white/5 
    backdrop-blur-xl 
    shadow-[0_8px_32px_rgba(0,0,0,0.35)] 
    p-2 md:p-8
    w-full
    h-auto

    "
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="relative">
          <select
            className="w-full p-3 rounded-xl 
          bg-white/10 
          text-white 
          backdrop-blur-md 
          border border-white/10 
          focus:outline-none 
          focus:ring-2 focus:ring-white/30
          appearance-none"
            onChange={(e) => setForm({ ...form, niche: e.target.value })}
            value={form.niche}
          >
            <option disabled>Select Niche</option>
            <option className="text-black bg-white/20">
              Website Developer
            </option>
            <option className="text-black bg-white/20">Graphic Designer</option>
            <option className="text-black bg-white/20">
              Mobile App Developer
            </option>
            <option className="text-black bg-white/20">UI/UX</option>
            <option className="text-black bg-white/20">Copy Writing</option>
            <option className="text-black bg-white/20">
              Fashion Illustrator
            </option>
            <option className="text-black bg-white/20">2D Animator</option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className="w-4 h-4 text-white"
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

        <div className="relative">
          <select
            className="w-full p-3 rounded-xl 
          bg-white/10 
          text-white 
          backdrop-blur-md 
          border border-white/10 
          focus:outline-none 
          focus:ring-2 focus:ring-white/30
          appearance-none"
            onChange={(e) => setForm({ ...form, scope: e.target.value })}
            value={form.scope}
          >
            <option disabled>Select Scope</option>
            <option className="text-black bg-white/20">Quick Brief</option>
            <option className="text-black bg-white/20">Full Brief</option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className="w-4 h-4 text-white"
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

        {/* Level */}
        <div className="relative">
          <select
            className="w-full p-3 rounded-xl 
          w-full p-3 rounded-xl
    bg-white/20  
    text-white
    border border-white/20
    focus:outline-none focus:ring-2 focus:ring-white/30
    appearance-none"
            onChange={(e) => setForm({ ...form, level: e.target.value })}
            value={form.level}
          >
            <option disabled>Select Level</option>
            <option className="text-black bg-white/20">Junior</option>
            <option className="text-black bg-white/20">Mid</option>
            <option className="text-black bg-white/20">Senior</option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className="w-4 h-4 text-white"
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

      <button
        onClick={generateBrief}
        disabled={loading}
        className="px-6 py-3 
      rounded-xl 
      bg-white/90 
      text-black 
      font-semibold 
      backdrop-blur-md 
      hover:bg-white 
      transition 
      flex items-center justify-center gap-2 
      disabled:opacity-60"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
            Generating…
          </>
        ) : (
          "Generate Client Brief"
        )}
      </button>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      {brief && <BriefOutput brief={brief} />}
    </section>
  );
}
