import axios from "axios";
import { Episode } from "@/types/Episode";
import { Info } from "@/types/Info";
import { getCharacters } from "./getCharacters";

export const fetchEpisodes = async ({
  episodeNumber = "1",
  searchQuery,
}: {
  episodeNumber: string;
  searchQuery: string;
}) => {
  let currentEpisode;
  let episodeCharacters;
  let infoAboutQueryEpisodes;
  let searchedQueryEpisodes;

  if (episodeNumber) {
    try {
      const res = await axios.get(`https://rickandmortyapi.com/api/episode`);

      const { results: episodes }: { results: Episode[] } = res.data;

      if (episodes.length > 0) {
        currentEpisode = episodes[0];
      }
    } catch (error) {
      console.error("Error fetching episodes:", error);
    }
  }

  if (episodeNumber) {
    try {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/episode/${episodeNumber}`
      );

      const episode: Episode = res.data;

      if (episode) {
        currentEpisode = episode;
      }
    } catch (error) {
      console.error("Error fetching the episode:", error);
    }
  }

  if (searchQuery) {
    const res = await axios.get(`
      https://rickandmortyapi.com/api/episode?name=${searchQuery}
    `);

    const { results: episodes, info }: { results: Episode[]; info: Info } =
      res.data;

    if (res.data) {
      searchedQueryEpisodes = episodes;
    }

    if (info) {
      infoAboutQueryEpisodes = info;
    }
  }

  if (currentEpisode?.characters) {
    const episodeCharactersArray = getCharacters(currentEpisode.characters);

    if (episodeCharactersArray.length > 0) {
      const charsFetch = await axios.get(`
        https://rickandmortyapi.com/api/character/${episodeCharactersArray}
      `);

      episodeCharacters = charsFetch.data;
    }
  }

  return {
    currentEpisode,
    episodeCharacters,
    searchedQueryEpisodes,
    infoAboutQueryEpisodes,
  };
};
