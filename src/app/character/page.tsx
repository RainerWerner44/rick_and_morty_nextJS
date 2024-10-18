import CharacterFilter from "../components/CharacterFilter";
import React from "react";
import { fetchCharacters } from "../utils/fetchCharacters";
import CharactersList from "../components/CharactersList";
import PaginationCharacter from "../components/PaginationCharacter";

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

  const { characters, info } = await fetchCharacters(params);

  return (
    <>
      <div className="grid grid-cols-6 gap-4 p-4 mt-8">
        <CharacterFilter />

        <div className="col-span-6">
          <CharactersList characters={characters} />
        </div>
      </div>

      <PaginationCharacter info={info} />
    </>
  );
}
