import Header from "../components/Header";
import BriefForm from "../components/BriefForm";

export default function Home() {
  return (
    <main
      className="
        min-h-screen
        px-4 pb-16 pt-10 md:pt-16
      "
    >
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <Header />
        <BriefForm />
      </div>
    </main>
  );
}
