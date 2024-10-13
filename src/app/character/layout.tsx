import { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CharacterLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col min-h-screen mx-auto max-w-[1200px]">
      <div className="flex-grow">
        <Header />

        {children}
        
      </div>
      <Footer />
    </main>
  );
}
