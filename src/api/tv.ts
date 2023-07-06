import { tvType } from "../types/tv";
import { API_KEY, BASE_PATH } from "../utils/apiUtils";

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
export async function getGenresOfTvs() {
  const response = await fetch(
    `${BASE_PATH}/genre/tv/list?api_key=${API_KEY}
`
  );
  return await response.json();
}
