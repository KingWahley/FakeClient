export default function BriefOutput({
  brief,
  onCopy,
  onDownload,
  canCopy,
  copied,
  canDownload,
  loading,
  downloading,
}) {
  return (
    <div className="panel-shell rounded-3xl border border-[color:var(--border-soft)] bg-[color:var(--panel-strong)] p-6 md:p-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[color:var(--text-0)]">
            Generated brief
          </h3>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-1)]">
            Ready to review
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-[color:var(--border-soft)] bg-white/5 px-3 py-1 text-xs text-[color:var(--text-1)]">
            Keep refining
          </span>
          <button
            onClick={onDownload}
            disabled={!canDownload}
            className="
              rounded-full border border-[color:var(--border-soft)] bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text-1)]
              transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            <span className="inline-flex items-center gap-2">
              {downloading ? (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[color:var(--text-1)] border-t-transparent" />
              ) : (
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v12m0 0l4-4m-4 4l-4-4M5 21h14"
                  />
                </svg>
              )}
              {downloading ? "Downloading" : "PDF"}
            </span>
          </button>
          <button
            onClick={onCopy}
            disabled={!canCopy}
            className="
              rounded-full border border-[color:var(--border-soft)] bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text-1)]
              transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="h-[22rem] md:h-[26rem] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-[color:var(--text-0)]/90">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="flex items-center gap-3 text-[color:var(--text-1)]">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-[color:var(--text-1)] border-t-transparent" />
              Generating brief...
            </div>
          </div>
        ) : brief ? (
          brief
        ) : (
          <span className="text-[color:var(--text-1)]">
            Your generated brief will appear here. Tweak the options and hit
            generate to get started.
          </span>
        )}
      </div>
    </div>
  );
}

// typewrter feauture below

// "use client";
// import { useEffect, useState } from "react";

// export default function BriefOutput({ brief }) {
//   const [displayedText, setDisplayedText] = useState("");

//   useEffect(() => {
//     if (!brief) return;

//     setDisplayedText("");
//     let index = 0;

//     const interval = setInterval(() => {
//       if (index >= brief.length) {
//         clearInterval(interval);
//         return;
//       }

//       setDisplayedText((prev) => prev + brief[index]);
//       index++;
//     }, 12);

//     return () => clearInterval(interval);
//   }, [brief]);

//   return (
//     <div className="bg-zinc-900 p-6 rounded whitespace-pre-wrap leading-relaxed font-mono text-zinc-100">
//       {displayedText}
//       <span className="animate-pulse">▍</span>
//     </div>
//   );
// }
