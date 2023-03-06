import { IMovie } from "./movie";
import { ITv } from "./tv";

export interface IVideo {
  type: "movie";
  id: number;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  popularity: number;
  release_date: string;
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
  id: number;
  original_title: string;
  overview: string;
  status: string;
}
export interface IBannerProps {
  movies?: IMovie;
  tvs?: ITv;
}
export interface ISearchForm {
  keyword: string;
}
