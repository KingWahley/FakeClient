export default function BriefOutput({ brief }) {


  return (
    <div className="bg-zinc-900 p-6 rounded whitespace-pre-wrap leading-relaxed">
      {brief}
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
