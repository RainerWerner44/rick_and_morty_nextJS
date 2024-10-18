import { Character } from "@/types/Character";
import CharacterCard from "../components/CharacterCard";
import EpisodeFilter from "../components/EpisodeFilter";
import Header from "../components/Header";
import ListOFSearchedEpisodes from "../components/ListOfSearchedEpisodes";
import Footer from "../components/Footer";
import { fetchEpisodes } from "../utils/fetchEpisodes";

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

  const {
    currentEpisode,
    episodeCharacters,
    searchedQueryEpisodes,
    infoAboutQueryEpisodes,
  } = await fetchEpisodes(searchParams);

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
            <ListOFSearchedEpisodes
              searchedQueryEpisodes={searchedQueryEpisodes}
              infoAboutQueryEpisodes={infoAboutQueryEpisodes}
            />
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
