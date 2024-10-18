import { Character } from "@/types/Character";
import CharacterCard from "./CharacterCard";

export default function LocationCharacters({
  locationCharacters,
}: {
  locationCharacters: Character[];
}) {
  return (
    <div className="grid col-start-2 col-end-4">
      <h2 className="text-center text-[40px] mb-8">Residents</h2>

      <div className="grid grid-cols-2 gap-4">
        {locationCharacters.length > 0 ? (
          locationCharacters.map((char) => {
            return <CharacterCard key={char.id} char={char} />;
          })
        ) : (
          <h4 className="text-center font-light text-[20px] grid col-start-1 col-end-3">
            No Residents found
          </h4>
        )}
      </div>
    </div>
  );
}
