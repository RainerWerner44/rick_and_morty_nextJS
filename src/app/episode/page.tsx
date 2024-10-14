import { Character } from "@/types/Character";
import { Episode } from "@/types/Episode";
import axios from "axios";
import CharacterCard from "../components/CharacterCard";
import { Info } from "@/types/Info";
import EpisodeFilter from "../components/EpisodeFilter";
import Header from "../components/Header";
import ListOFSearchedEpisodes from "../components/ListOfSearchedEpisodes";
import { getCharacters } from "../utils/getCharacters";
import Footer from "../components/Footer";

export default async function Episodes({
  searchParams,
}: {
  searchParams: { episodeNumber: string; searchQuery: string };
}) {
  const { episodeNumber = "", searchQuery = "" } = searchParams;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const params = new URLSearchParams({
    episodeNumber: episodeNumber.toString(),
    searchQuery: searchQuery.toString(),
  });

  let currentEpisode;
  let episodeCharacters;
  let infoAboutQueryEpisodes;
  let searchedQueryEpisodes;

  if (!searchParams.episodeNumber) {
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

  if (searchParams.episodeNumber) {
    try {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/episode/${searchParams.episodeNumber}`
      );

      const episode: Episode = res.data;

      if (episode) {
        currentEpisode = episode;
      }
    } catch (error) {
      console.error("Error fetching the episode:", error);
    }
  }

  if (searchParams.searchQuery) {
    const res = await axios.get(`
      https://rickandmortyapi.com/api/episode?name=${searchParams.searchQuery}
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

  return (
    <section className="flex flex-col min-h-screen mx-auto max-w-[1200px]">
      <Header />

      <div className="w-full grid grid-cols-3 mt-8 gap-4 flex-grow ">
        <EpisodeFilter currentEpisode={currentEpisode} />

        <div className="col-start-2 col-end-4">
          <h2 className="font-bold text-[40px] text-center mb-4">
            {searchParams.searchQuery !== undefined ? "Episodes" : "Characters"}
          </h2>

          {searchParams.searchQuery !== undefined ? (
            <>
              <ListOFSearchedEpisodes
                searchedQueryEpisodes={searchedQueryEpisodes}
                infoAboutQueryEpisodes={infoAboutQueryEpisodes}
              />
            </>
          ) : (
            <div className="grid grid-cols-2 mb-10 gap-4">
              {episodeCharacters?.length > 0 ? (
                episodeCharacters.map((char: Character) => {
                  return <CharacterCard char={char} key={char.id} />;
                })
              ) : (
                <p>No characters found for this episode.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
}
