import { Location } from "@/types/Location";
import axios from "axios";

export const fetchLocationById = async (locationId: string): Promise<Location | null> => {
  try {
    const locationsByNameResponse = await axios.get(
      `https://rickandmortyapi.com/api/location/${locationId}`
    );

    const data = locationsByNameResponse.data;

    if (locationId.length !== 0) {
      return data as Location;
    } else {
      const { results }: { results: Location[] } = data;
      return results[0] || null;
    }
  } catch (error) {
    console.error("Error fetching locations:", error);
    return null;
  }
};