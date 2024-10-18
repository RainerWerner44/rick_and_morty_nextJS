import { Character } from "@/types/Character";
import axios from "axios";

export const fetchCharactersByLocation = async (
  charactersArray: number[]
): Promise<Character[]> => {
  const charactersEndpoint = `https://rickandmortyapi.com/api/character/${charactersArray}`;

  try {
    const response = await axios.get(charactersEndpoint);
    const data = response.data;

    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
};
