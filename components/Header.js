export default function Header() {
  return (
    <header
      className="space-y-1
    rounded-xl 
    bg-white/5 
    backdrop-blur-md 
    border border-white/10 
    p-2 md:p-6
    shadow-[0_4px_16px_rgba(0,0,0,0.3)]
    
  "
    >
      <h1 className="text-2xl font-bold text-white">Fake Client</h1>
      <p className="text-zinc-400">Practice with real-world Client briefs</p>
    </header>
  );
}
