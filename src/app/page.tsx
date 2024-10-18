import Image from "next/image";
import Link from "next/link";
import { homeSections } from "../app/data/homeSection";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-rows-3 md:h-screen overflow-hidden gap-2">
      {homeSections.map((section) => (
        <div
          key={section.id}
          className="relative overflow-hidden group cursor-pointer"
        >
          <Link href={section.link}>
            <Image
              src={section.image}
              alt={`${section.title} logo`}
              className="grayscale w-full h-auto transition-transform duration-1000 ease-in-out transform group-hover:scale-110 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-green-100 text-4xl sm:text-6xl font-bold text-center transition-transform duration-300 ease-in-out transform group-hover:text-gray-800">
                {section.title}
              </h2>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
