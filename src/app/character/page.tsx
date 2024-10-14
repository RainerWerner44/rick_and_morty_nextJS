import { Character } from "@/types/Character";
import Link from "next/link";
import CharacterFilter from "../components/CharacterFilter";
import axios from "axios";
import React from "react";
import CharacterCard from "../components/CharacterCard";
import { getPaginationNumbers } from "../utils/getPaginationNumbers";
import { generateHref } from "../utils/generateHref";

export default async function CharacterPage({
  searchParams,
}: {
  searchParams: {
    page: string;
    search: string;
    status: string;
    species: string;
    gender: string;
  };
}) {
  const {
    page = 1,
    search = "",
    status = "",
    species = "",
    gender = "",
  } = searchParams;

  const currentPage = parseInt(page as string, 10);

  const params = new URLSearchParams({
    page: currentPage.toString(),
    name: search.toString(),
    status: status.toString(),
    species: species.toString(),
    gender: gender.toString(),
  });

  const res = await axios.get(
    `https://rickandmortyapi.com/api/character/?${params}`
  );
  const { results: characters, info } = res.data;

  return (
    <div className="flex flex-col mx-auto max-w-[1200px]">
      <div className="grid grid-cols-6 gap-4 p-4 mt-8">
        <CharacterFilter />

        <div className="col-span-6">
          <div className="grid grid-cols-3 gap-4">
            {characters.map((character: Character) => (
              <CharacterCard char={character} key={character.id} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-8 mb-10">
        {info.prev && (
          <Link
            href={generateHref(
              currentPage - 1,
              search,
              status,
              species,
              gender
            )}
            className="w-24 px-4 py-2 bg-blue-300 text-white rounded hover:bg-blue-600 transition duration-300 text-center"
          >
            Previous
          </Link>
        )}
        {getPaginationNumbers(currentPage, info.pages).map((num, index) => (
          <React.Fragment key={index}>
            {typeof num === "string" ? (
              <span className="px-2 py-2 text-gray-500">{num}</span>
            ) : (
              <Link
                href={`?page=${num}&search=${search}&status=${status}&species=${species}&gender=${gender}`}
                className={`px-4 py-2 border rounded hover:bg-gray-200 transition duration-300 ${
                  num === currentPage
                    ? "bg-blue-500 text-white"
                    : "text-blue-500"
                }`}
              >
                {num}
              </Link>
            )}
          </React.Fragment>
        ))}

        {info.next && (
          <Link
            href={generateHref(
              currentPage + 1,
              search,
              status,
              species,
              gender
            )}
            className="w-24 px-4 py-2 bg-blue-300 text-white rounded hover:bg-blue-600 transition duration-300 text-center"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
