"use client";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function EpisodeError() {
  const clearSearchParams = () => {
    window.location.href = window.location.pathname;
  };
  
  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-[1200px]">
      <Header />
      <div className="mt-10 flex flex-col flex-grow items-center">
        <h1 className="text-center text-[40px]">No episodes found</h1>

        <button
          onClick={clearSearchParams}
          className="w-[200px] mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Clear Filters
        </button>
      </div>
      <Footer />
    </div>
  );
}
