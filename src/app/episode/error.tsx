"use client";

import Footer from "../components/Footer";
import Header from "../components/Header";

export default function EpisodeError() {
  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-[1200px]">
      <Header />
      <div className="mt-10 flex flex-col  flex-grow">
        <h1 className="text-center text-[40px]">No episodes found</h1>
      </div>
      <Footer />
    </div>
  );
}
