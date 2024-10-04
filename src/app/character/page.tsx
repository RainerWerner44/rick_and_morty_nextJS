import { Character } from "@/types/Character";
import Image from "next/image";
import Link from "next/link";
import CharacterFilter from "../components/CharacterFilter";
import axios from "axios";
import React from "react";

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

  function getPaginationNumbers(
    currentPage: number,
    totalPages: number
  ): (number | string)[] {
    const pageNumbers: (number | string)[] = [];

    if (totalPages <= 1) return [1];

    pageNumbers.push(1);

    if (currentPage > 3) {
      pageNumbers.push("...");
    }

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pageNumbers.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push("...");
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages - 1, totalPages);
    }

    if (
      currentPage === totalPages ||
      currentPage === totalPages - 1 ||
      currentPage === totalPages - 2 ||
      currentPage === totalPages - 3
    ) {
      return Array.from(new Set(pageNumbers));
    }

    return pageNumbers;
  }
  return (
    <>
      <div className="grid grid-cols-6 gap-4 p-4 mt-8">
        <CharacterFilter />

        {characters.map((char: Character) => {
          return (
            <Link
              href={`/character/${char.id}`}
              key={char.id}
              className="col-span-2 flex flex-col items-center border rounded p-4 shadow-md cursor-pointer transition-transform duration-300 hover:bg-gray-300"
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
        })}
      </div>

      <div className="flex justify-center items-center mt-8 mb-10">
        {info.prev && (
          <Link
            href={`?page=${
              currentPage - 1
            }&search=${search}&status=${status}&species=${species}&gender=${gender}`}
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
            href={`?page=${
              currentPage + 1
            }&search=${search}&status=${status}&species=${species}&gender=${gender}`}
            className="w-24 px-4 py-2 bg-blue-300 text-white rounded hover:bg-blue-600 transition duration-300 text-center"
          >
            Next
          </Link>
        )}
      </div>
    </>
  );
}
