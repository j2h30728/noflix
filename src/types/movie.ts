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
  movies: IMovie[];
  scrollY: number;
  listType: string;
  movieId: string;
}
export interface IMovieSliderProps {
  movies?: IMovie[];
  listType: movieType;
}
