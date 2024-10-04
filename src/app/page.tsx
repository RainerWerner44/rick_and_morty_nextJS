import Image from "next/image";
import charactersLogo from "../../public/images/characters.webp";
import episodesLogo from "../../public/images/epispdes.webp";
import locationsLogo from "../../public/images/locations.webp";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-rows-3 md:h-screen overflow-hidden gap-2">
      <div className="relative overflow-hidden group cursor-pointer">
        <Link href="/character">
          <Image
            src={charactersLogo}
            alt="logo"
            className="grayscale w-full h-auto transition-transform duration-300 ease-in-out transform group-hover:scale-110 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-green-100 text-4xl sm:text-6xl font-bold text-center transition-transform duration-300 ease-in-out transform group-hover:text-gray-800">
              Characters
            </h2>
          </div>
        </Link>
      </div>

      <div className="relative overflow-hidden group cursor-pointer">
        <Link href="/episode">
          <Image
            src={episodesLogo}
            alt="logo"
            className="grayscale w-full h-auto transition-transform duration-300 ease-in-out transform group-hover:scale-110 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-green-100 text-4xl sm:text-6xl font-bold text-center transition-transform duration-300 ease-in-out transform group-hover:text-gray-800">
              Episodes
            </h2>
          </div>
        </Link>
      </div>

      <div className="relative overflow-hidden group cursor-pointer">
        <Link href="/location">
          <Image
            src={locationsLogo}
            alt="logo"
            className="grayscale w-full h-auto transition-transform duration-300 ease-in-out transform group-hover:scale-110 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-green-100 text-4xl sm:text-6xl font-bold text-center transition-transform duration-300 ease-in-out transform group-hover:text-gray-800">
              Locations
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
}
