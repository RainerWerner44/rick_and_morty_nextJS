import Image from "next/image";
import Link from "next/link";
import backToHomeLogo from "../../../public/images/topBanner.webp";

export default function Header() {
  return (
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
  )
}