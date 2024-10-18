"use client";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full  mt-20 bg-blue-100 flex justify-around items-center p-8">
      <Link
        href="/"
        className="flex items-center bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition duration-300"
      >
        Home
      </Link>

      <h2 className="text-[20px] text-gray-700 font-bold">
        Made by Vadym Babisov ©
      </h2>

      <button
        onClick={scrollToTop}
        className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 flex-none"
      >
        Back to top
      </button>
    </footer>
  );
}
