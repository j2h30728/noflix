import { movieType } from "../types/movie";
import { API_KEY, BASE_PATH } from "../utils/apiUtils";

export async function getMovies(type: movieType) {
  const response = await fetch(`${BASE_PATH}/movie/${type}?api_key=${API_KEY}`);
  return await response.json();
}

export async function searchMovies(keyword: string | null) {
  const response = await fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`
  );
  return await response.json();
}
export async function getGenresOfMovies() {
  const reponse = await fetch(
    `${BASE_PATH}/genre/movie/list?api_key=${API_KEY}
`
  );
  return await reponse.json();
}
