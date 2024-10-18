import BackButton from "@/app/components/BackButton";
import Image from "next/image";
import { FC } from "react";

interface Params {
  params: {
    id: string;
  };
}

const CharactersId: FC<Params> = async ({ params }) => {
  const { id } = params;

  const data = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const character = await data.json();

  return (
    <div className="p-6">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8 justify-center items-start">
        <div className="w-full lg:w-1/3 bg-white p-6 rounded shadow-md">
          <BackButton />

          <h2 className="text-3xl font-bold mb-4 text-center">
            {character.name}
          </h2>
          <Image
            src={character.image}
            alt={character.name}
            width={300}
            height={300}
            className="w-full h-auto rounded shadow-md mb-4"
          />
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Character Details</h2>
            <p>
              <strong>Status:</strong> {character.status}
            </p>
            <p>
              <strong>Species:</strong> {character.species}
            </p>
            <p>
              <strong>Gender:</strong> {character.gender}
            </p>
            <p>
              <strong>Origin:</strong> {character.origin.name}
            </p>
            <p>
              <strong>Location:</strong> {character.location.name}
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/3 bg-white p-6 rounded shadow-md">
          <h3 className="mt-4 font-semibold text-center">Episodes:</h3>
          <ul className="list-disc ml-5">
            {character.episode.map((episodeUrl: string) => (
              <li key={episodeUrl}>
                <a
                  href={`/episode?episodeNumber=${
                    episodeUrl.split("episode/")[1]
                  }`}
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Episode {episodeUrl.split("episode/")[1]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharactersId;
