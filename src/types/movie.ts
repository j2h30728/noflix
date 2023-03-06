import { IGeLatest, IGetVideos, IVideo } from "./types";

export interface IMovie extends IVideo {
  title: string;
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
}
export interface IModalMovieDetailProps {
  movies?: IMovie[];
  movieId?: string;
  scrollY: number;
  movietype: string;
}
export interface IMovieSliderProps {
  movies?: IMovie[];
  type?: movieType;
}
