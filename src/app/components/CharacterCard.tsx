import { Character } from "@/types/Character";
import Image from "next/image";
import Link from "next/link";

export default function CharacterCard({char}: {char: Character}) {
  return (
    <Link
      href={`/character/${char.id}`}
      className="flex flex-col items-center border rounded p-4 shadow-md cursor-pointer transition-transform duration-300 hover:bg-gray-300 pb-6"
    >
      <Image
        src={char.image}
        alt={char.name}
        width={200}
        height={200}
        className="rounded mb-4 mt-4"
      />
      
      <div className="text-center">
        <h3 className="text-lg font-bold">{char.name}</h3>
        <p className="text-gray-700">
          <strong>Gender</strong>: {char.gender}
        </p>
        <p className="text-gray-700">
          <strong>Status</strong>: {char.status}
        </p>
        <p className="text-gray-700">
          <strong>Species</strong>: {char.species}
        </p>
      </div>
    </Link>
  );
}
