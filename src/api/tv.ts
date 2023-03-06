import { tvType } from "../types/tv";
import API_KEY from "../utils/API_KEY";
import BASE_PATH from "../utils/BASE_PATH";

export async function getTvs(type: tvType) {
  const response = await fetch(`${BASE_PATH}/tv/${type}?api_key=${API_KEY}`);
  return await response.json();
}

export async function searchTvs(keyword: string | null) {
  const response = await fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}`
  );
  return await response.json();
}
