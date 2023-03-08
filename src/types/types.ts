import { IMovie } from "./movie";
import { ITv } from "./tv";

export interface IVideo {
  id: number;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  popularity: number;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  vote_count: number;
  adult: boolean;
}

export interface IGetVideos {
  dates: {
    maximum: string;
    minimum: string;
  };
  total_pages: number;
  total_results: number;
  page: number;
}

export interface IGeLatest {
  id?: number;
  original_title?: string;
  overview?: string;
  status?: string;
  poster_path?: string;
}
export interface IBannerProps {
  movies?: IMovie;
  tvs?: ITv;
}
export interface ISearchForm {
  keyword: string;
}
export interface IGenres {
  id: number;
  name: string;
}
export interface IGetGenres {
  genres: IGenres[];
}
export interface SeachedType {
  id: string;
  type: SeachedVideoType;
}
export enum SeachedVideoType {
  default = "",
  movie = "movie",
  tv = "tv",
}
