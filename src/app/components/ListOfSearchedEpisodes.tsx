"use client";
import { Episode } from "@/types/Episode";
import { Info } from "@/types/Info";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ListOFSearchedEpisodes({
  searchedQueryEpisodes,
  infoAboutQueryEpisodes,
}: {
  searchedQueryEpisodes: Episode[] | undefined;
  infoAboutQueryEpisodes: Info | undefined;
}) {
  const [additionalDataFetch, setAdditionalDataFetch] = useState<Episode[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextButton = infoAboutQueryEpisodes?.next;

  useEffect(() => {
    if (nextButton) {
      const fetchEpisodes = async (url: string) => {
        try {
          const res = await axios.get(url);
          const { results: episodes }: { results: Episode[] } = res.data;

          setAdditionalDataFetch(episodes);
        } catch (error) {
          console.error("Failed to fetch episodes:", error);
        }
      };

      fetchEpisodes(nextButton);
    }
  }, [nextButton]);

  const handleLinkClick = (episodeId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("episodeNumber", episodeId);
    params.set("searchQuery", "");

    router.push(`?episodeNumber=${episodeId}`);
  };

  return (
    <>
      <ul className="flex flex-col items-center">
        {searchedQueryEpisodes?.map((e) => (
          <li key={e.id}>
            <button
              onClick={() => handleLinkClick(String(e.id))}
              className="text-gray-500 hover:text-gray-800 text-[20px]"
            >
              {e.name}
            </button>
          </li>
        ))}
      </ul>
      
      <ul className="flex flex-col items-center mb-10">
        {additionalDataFetch &&
          additionalDataFetch?.map((e) => (
            <li key={e.id}>
              <button
                onClick={() => handleLinkClick(String(e.id))}
                className="text-gray-500 hover:text-gray-800 text-[20px]"
              >
                {e.name}
              </button>
            </li>
          ))}
      </ul>
    </>
  );
}
