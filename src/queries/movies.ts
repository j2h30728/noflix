import { useQuery } from "@tanstack/react-query";
import { getGenresOfMovies, getMovies, searchMovies } from "../api/movie";
import { IGeLatesttMovie, IGetMovies, movieType } from "../types/movie";
import { IGetGenres } from "../types/types";

export function queryNowPlayingMovies() {
  return useQuery<IGetMovies>(["movies", movieType.now_playing], () =>
    getMovies(movieType.now_playing)
  );
}
export function queryLatestMovie() {
  return useQuery<IGeLatesttMovie>(["movies", movieType.latest], () =>
    getMovies(movieType.latest)
  );
}
export function queryUpComingMovies() {
  return useQuery<IGetMovies>(["movies", movieType.upcoming], () =>
    getMovies(movieType.upcoming)
  );
}
export function queryTopRatedMovies() {
  return useQuery<IGetMovies>(["movies", movieType.top_rated], () =>
    getMovies(movieType.top_rated)
  );
}
export function querySearchedMovies(keyword: string | null) {
  return useQuery<IGetMovies>(["searchedMovies", keyword], () =>
    searchMovies(keyword)
  );
}
export function queryGenresOfMovies() {
  return useQuery<IGetGenres>(["generesMovie"], getGenresOfMovies);
}
