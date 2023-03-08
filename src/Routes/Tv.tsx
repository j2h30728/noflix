import styled from "styled-components";
import {
  queryLatestTvs,
  queryAiringTodayTvs,
  queryTopRatedTvs,
} from "../queries/tvs";
import { tvType } from "../types/tv";
import TvSlider from "../components/tv/TvSlider";
import TvBanner from "../components/tv/TvBanner";
import LatestTv from "../components/tv/LatestTv";

export default function Tv() {
  const airingTody = queryAiringTodayTvs();
  const latest = queryLatestTvs();
  const topRated = queryTopRatedTvs();
  return (
    <>
      {airingTody.isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Wrapper>
          <TvBanner tvs={airingTody.data?.results[0]} />
          <TopSliderWrapper>
            <Title>airing_today</Title>
            <TvSlider
              type={tvType.airing_today}
              tvs={airingTody.data?.results}
            />
          </TopSliderWrapper>
          <LatestTv
            name={latest.data?.name}
            overview={latest.data?.name}
            poster_path={latest.data?.overview}
          />
          <SliderWrapper>
            <Title>TopRated</Title>
            <TvSlider type={tvType.top_rated} tvs={topRated.data?.results} />
          </SliderWrapper>
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
  margin: 0 30px;
  top: -180px;
`;
const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 300px;
  margin: 0 30px;
`;
const Title = styled.h2`
  font-size: 30px;
  font-weight: 500;
`;
