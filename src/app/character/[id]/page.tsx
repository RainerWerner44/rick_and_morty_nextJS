import Image from "next/image";
import Link from "next/link";
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

  console.log(id);

  return (
    <div className="flex flex-col items-center justify-start p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8 justify-center items-start">
        <div className="w-full lg:w-1/3 bg-white p-6 rounded shadow-md">
          
          <Link href="/character">
            <button
              type="button"
              className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-300"
            >
              Back
            </button>
          </Link>

          <h1 className="text-3xl font-bold mb-4 text-center">
            {character.name}
          </h1>
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
            {character.episode.map((episodeUrl: string, index: number) => (
              <li key={episodeUrl}>
                <a
                  href={episodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Episode {index + 1}
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
