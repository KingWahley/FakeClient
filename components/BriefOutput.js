export default function BriefOutput({ brief }) {
  return (
   <div
  className="
    max-w-4xl 
    mx-auto
    rounded-2xl 
    p-6 md:p-8 
    whitespace-pre-wrap 
    leading-relaxed 
    text-white
    w-full
    h-96          
    overflow-y-auto 
    
    bg-black/50 
    backdrop-blur-xl 
    border border-white/10
  "
>
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
