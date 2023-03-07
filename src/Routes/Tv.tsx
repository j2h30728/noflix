import { AnimatePresence, useScroll } from "framer-motion";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import baseURL from "../utils/baseURL";
import Banner from "../components/Banner";
import {
  queryLatestTvs,
  queryAiringTodayTvs,
  queryTopRatedTvs,
} from "../queries/tvs";
import { useRecoilValue } from "recoil";
import { tvTypeState } from "../recoil/tv";
import { tvType } from "../types/tv";
import TvSlider from "../components/Tv/TvSlider";
import TvModalDetail from "../components/Tv/TvModalDetail";

export default function Tv() {
  const modalMovieMatch = useMatch(`${baseURL}tvs/:tvId`);
  const { scrollY } = useScroll();
  const tvId = modalMovieMatch?.params.tvId;
  const airingTody = queryAiringTodayTvs();
  const latest = queryLatestTvs();
  const topRated = queryTopRatedTvs();
  const tvtype = useRecoilValue(tvTypeState);
  return (
    <>
      {airingTody.isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Wrapper>
          <Banner tvs={airingTody.data?.results[0]} />
          <TopSliderWrapper>
            <Title>airing_today</Title>
            <TvSlider
              type={tvType.airing_today}
              tvs={airingTody.data?.results}
            />
          </TopSliderWrapper>
          <SliderWrapper>
            <Title>Latest</Title>
            <h2>{latest.data?.name}</h2>
            <p>{latest.data?.overview}</p>
          </SliderWrapper>
          <TopRatedWrapper>
            <Title>TopRated</Title>
            <TvSlider type={tvType.top_rated} tvs={topRated.data?.results} />
          </TopRatedWrapper>
          <AnimatePresence>
            {modalMovieMatch ? (
              <TvModalDetail
                tvtype={tvtype}
                tvId={tvId + tvtype}
                tvs={
                  tvtype === tvType.airing_today
                    ? airingTody.data?.results
                    : tvtype === tvType.top_rated
                    ? topRated.data?.results
                    : []
                }
                scrollY={scrollY.get()}
              />
            ) : null}
          </AnimatePresence>
        </Wrapper>
      )}
    </>
  );
}
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 200px;
  display: flex;
  flex-direction: column;
`;
const TopSliderWrapper = styled.div`
  position: relative;
  top: -180px;
`;
const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 300px;
`;
const Title = styled.h2`
  font-size: 40px;
`;
const TopRatedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 500px;
`;
