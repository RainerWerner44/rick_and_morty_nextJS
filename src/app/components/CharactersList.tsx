import { Character } from "@/types/Character";
import CharacterCard from "./CharacterCard";

export default function CharactersList({
  characters,
}: {
  characters: Character[];
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {characters.map((character: Character) => (
        <CharacterCard char={character} key={character.id} />
      ))}
    </div>
  );
}
