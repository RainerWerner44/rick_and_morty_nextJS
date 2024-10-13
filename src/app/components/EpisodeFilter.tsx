"use client";
import { Episode } from "@/types/Episode";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { getDataNumbersArray } from "../utils/getDataNumbersArray";

const episodesTotalCount = 51;

export default function EpisodeFilter({
  currentEpisode,
}: {
  currentEpisode: Episode | undefined;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedEpisode, setSelectedEpisode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");  

   useEffect(() => {
    const episodeFromURL = searchParams.get("episodeNumber");
    const queryFromURL = searchParams.get("searchQuery");

    if (episodeFromURL) {
      setSelectedEpisode(episodeFromURL);
    } else {
      setSelectedEpisode(""); 
    }

    if (queryFromURL) {
      setSearchQuery(queryFromURL);
    } else {
      setSearchQuery(""); 
    }
  }, [searchParams]); 

  useEffect(() => {
      const params = new URLSearchParams();
    if (selectedEpisode) {
      params.set("episodeNumber", selectedEpisode);
    }

    if (searchQuery) {
      params.set("searchQuery", searchQuery);
    }

    router.push(`?${params.toString()}`);

  }, [selectedEpisode, router, searchQuery]);

  const episodeNumberArray = getDataNumbersArray(episodesTotalCount);

  const handleEpisodeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedEpisode(event.target.value);
    setSearchQuery("");
  };

  return (
    <div className="span-1 flex flex-col gap-4 pt-4">
      {" "}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search by name..."
          className="border rounded-l p-2 h-12 w-full"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button
          className="w-16 bg-gray-300 text-black h-12 border-0 hover:bg-gray-100"
          onClick={() => {
            setSearchQuery("");
          }}
          disabled={!Boolean(searchQuery.length)}
        >
          X
        </button>  
      </div>

      <div className="container">
        <label htmlFor="status" className="block mb-1 pl-2">
          Episode:
        </label>
        <select
          id="episode"
          className="border rounded p-2 w-full h-12"
          onChange={handleEpisodeChange}
          value={selectedEpisode}
        >
          {episodeNumberArray.map((num) => {
            return (
              <option value={num} key={num}>
                Episode {num}
              </option>
            );
          })}
        </select>
      </div>
      
      <div className="container bg-gray-100 px-2 pt-4 pb-4">
        <h3>
          <strong>Name:</strong> {currentEpisode?.name}
        </h3>
        <p>
          <strong>Date:</strong> {currentEpisode?.air_date}
        </p>
      </div>
    </div>
  );
}
