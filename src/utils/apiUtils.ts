export const BASE_PATH = "https://api.themoviedb.org/3";
export const API_KEY = `08192788a8e5af154550148c8022e396`;

export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
