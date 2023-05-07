import { useQuery } from "@tanstack/react-query";
import { getGenresOfTvs, getTvs, searchTvs } from "../api/tv";
import { IGetTvs, tvType } from "../types/tv";
import { IGetGenres } from "../types/types";

export function queryAiringTodayTvs() {
  return useQuery<IGetTvs>(["tvs", tvType.airing_today], () =>
    getTvs(tvType.airing_today)
  );
}

export function queryTopRatedTvs() {
  return useQuery<IGetTvs>(["tvs", tvType.top_rated], () =>
    getTvs(tvType.top_rated)
  );
}
export function querySearchedTvs(keyword: string | null) {
  return useQuery<IGetTvs>(["searchedTv", keyword], () => searchTvs(keyword));
}
export function queryGenresOfTvs() {
  return useQuery<IGetGenres>(["generesTv"], getGenresOfTvs);
}
