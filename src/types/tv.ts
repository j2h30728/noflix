import { IGeLatest, IGetVideos, IVideo } from "./types";

export interface ITv extends IVideo {
  name: string;
  original_name: string;
}

export interface IGetTvs extends IGetVideos {
  results: ITv[];
}

export interface IGeLatesttTv extends IGeLatest {
  name?: string;
}
export enum tvType {
  airing_today = "airing_today",
  latest = "latest",
  top_rated = "top_rated",
  searched = "searched",
}
export interface ITvModalDetailProps {
  tvs?: ITv[];
  tvId?: string;
  scrollY: number;
}
export interface ITvSliderProps {
  tvs?: ITv[];
  listType: tvType;
}
