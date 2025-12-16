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
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <select
          className="p-3 bg-zinc-900 rounded"
          onChange={(e) => setForm({ ...form, niche: e.target.value })}
        >
          <option>Website Deveoper</option>
          <option>Graphic Designer</option>
          <option>Mobile App Deveoper</option>
          <option>Ui/Ux</option>
          <option>Copy Writing</option>
          <option>Fashion Illustrator</option>
          <option>2D Animator</option>
        </select>

        <select
          className="p-3 bg-zinc-900 rounded"
          onChange={(e) => setForm({ ...form, scope: e.target.value })}
        >
          <option>Quick Brief</option>
          <option>Full Brief</option>
        </select>

        <select
          className="p-3 bg-zinc-900 rounded"
          onChange={(e) => setForm({ ...form, level: e.target.value })}
        >
          <option>Junior</option>
          <option>Mid</option>
          <option>Senior</option>
        </select>
      </div>

      <button
        onClick={generateBrief}
        disabled={loading}
        className="px-6 py-3 bg-white text-black rounded font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
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
