import Header from "../components/Header";
import BriefForm from "../components/BriefForm";

export default function Home() {
  return (
    <main
      className="
    w-Full
    h-[100vh]
    mx-auto 
    p-6 md:p-10 
    space-y-10

 
    bg-white/4
    backdrop-blur-sm
    border border-white/10
   
  "
    >
      <Header />
      <BriefForm />
    </main>
  );
}
