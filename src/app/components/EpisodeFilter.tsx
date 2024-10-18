"use client";
import { Episode } from "@/types/Episode";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getDataNumbersArray } from "../utils/getDataNumbersArray";
import Select from "react-select";

const episodesTotalCount = 51;

export default function EpisodeFilter({
  currentEpisode,
}: {
  currentEpisode: Episode | undefined;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedEpisode, setSelectedEpisode] = useState("1");
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

  const episodeOptions = episodeNumberArray.map((num) => ({
    value: num.toString(),
    label: `Episode ${num}`,
  }));

  const handleEpisodeChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setSelectedEpisode(selectedOption ? selectedOption.value : "");
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
          className="w-16 bg-gray-300 text-black h-12 border-0 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            setSearchQuery("");
          }}
          disabled={!Boolean(searchQuery.length)}
        >
          X
        </button>
      </div>

      <div className="container">
        <label htmlFor="episode" className="block mb-1 pl-2">
          Episode:
        </label>
        <Select
          id="episode"
          classNamePrefix="react-select"
          options={episodeOptions}
          value={
            episodeOptions.find((option) => option.value === selectedEpisode) ||
            null
          }
          onChange={handleEpisodeChange}
          isSearchable={false}
          placeholder="Select Episode"
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              height: "48px",
              cursor: "pointer",
            }),
          }}
        />
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
