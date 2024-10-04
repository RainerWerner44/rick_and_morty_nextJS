import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import backToHomeLogo from "../../../public/images/topBanner.webp";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="max-w-[1200px] mx-auto">
      <Link href="/">
        <div className="relative max-h-[200px] w-full overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105">
          <p className="absolute left-[40px] top-[50%] translate-y-[-50%] text-[40px] font-bold text-gray-300">
            Back to home
          </p>
          <Image
            src={backToHomeLogo}
            alt="backToHomeLogo"
            width={1200}
            height={200}         
          />
        </div>
      </Link>

      {children}
    </main>
  );
}
