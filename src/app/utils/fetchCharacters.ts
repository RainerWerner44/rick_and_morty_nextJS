import axios from 'axios';

export async function fetchCharacters(params: URLSearchParams) {
  try {
    const res = await axios.get(`https://rickandmortyapi.com/api/character/?${params}`);
    const { results: characters, info } = res.data;
    return { characters, info };
  } catch (error) {
    console.error("Error fetching characters:", error);
    return { characters: [], info: null }; 
  }
}