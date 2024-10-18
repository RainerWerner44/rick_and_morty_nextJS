import { Info } from "@/types/Info";
import { Location } from "@/types/Location";
import axios from "axios";

export const fetchLocationsByQuery = async (searchQuery: string, page: number) => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/location?page=${page}&type=${searchQuery}`
    );

    const { info, results }: { info: Info; results: Location[] } = response.data;

    return { info, results };
  } catch (error) {
    console.error("Error fetching locations:", error);
    return { info: { pages: 0 }, results: [] };
  }
};
