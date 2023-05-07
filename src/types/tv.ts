import { IGetVideos, IVideo } from "./types";

export interface ITv extends IVideo {
  name: string;
  original_name: string;
}

export interface IGetTvs extends IGetVideos {
  results: ITv[];
}

export enum tvType {
  airing_today = "airing_today",
  top_rated = "top_rated",
  searched = "searched",
  banner = "banner",
}
export interface ITvModalDetailProps {
  tvs?: ITv[];
  tvId: string;
  listType: string;
  scrollY: number;
}
export interface ITvSliderProps {
  tvs?: ITv[];
  listType: tvType;
}
