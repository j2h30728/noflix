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
  default = "default",
}
export interface IModalMovieDetailProps {
  movies?: IMovie[];
  scrollY?: number;
  listType: string;
  movieId?: string;
  clickedListType: string;
  setClickedListType: React.Dispatch<React.SetStateAction<movieType>>;
}
export interface IMovieSliderProps {
  movies?: IMovie[];
  listType: movieType;
}
