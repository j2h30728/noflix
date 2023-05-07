import { IGeLatest, IGetVideos, IVideo } from "./types";

export interface IMovie extends IVideo {
  title: string;
  original_title: string;
}

export interface IGetMovies extends IGetVideos {
  results: IMovie[];
}

export interface IGeLatesttMovie extends IGeLatest {
  title?: string;
}
export enum movieType {
  now_playing = "now_playing",
  latest = "latest",
  upcoming = "upcoming",
  top_rated = "top_rated",
  searched = "searched",
  banner = "banner",
  default = "default",
}
export interface IModalMovieDetailProps {
  movies?: IMovie[];
  scrollY?: number;
  listType: string;
  movieId?: string;
}
export interface IMovieSliderProps {
  movies?: IMovie[];
  listType: movieType;
}
