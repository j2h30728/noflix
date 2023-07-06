import { IGetVideos, IVideo } from "./types";

export interface IMovie extends IVideo {
  title: string;
  original_title: string;
}

export interface IGetMovies extends IGetVideos {
  results: IMovie[];
}

export enum movieType {
  now_playing = "now_playing",
  upcoming = "upcoming",
  top_rated = "top_rated",
  searched = "searched",
  banner = "banner",
}
export interface IModalMovieDetailProps {
  movies?: IMovie[];
  scrollY: number;
  listType: string;
  movieId: string;
}
export interface IMovieSliderProps {
  movies?: IMovie[];
  listType: movieType;
}
interface MOVIE {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
