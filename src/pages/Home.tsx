import styled from "styled-components";
import MovieSlider from "../components/movie/MovieSlider";
import {
  queryNowPlayingMovies,
  queryTopRatedMovies,
  queryUpComingMovies,
} from "../queries/movies";

import { movieType } from "../types/movie";
import MovieBanner from "../components/movie/MovieBanner";

export default function Home() {
  const nowPlaying = queryNowPlayingMovies();
  const upComing = queryUpComingMovies();
  const topRated = queryTopRatedMovies();

  return (
    <>
      {nowPlaying.isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Container>
          <MovieBanner movie={nowPlaying.data?.results[0]} />
          <TopSliderWrapper>
            <Title>NOW PLAYING</Title>
            <MovieSlider
              listType={movieType.now_playing}
              movies={nowPlaying.data?.results}
            />
          </TopSliderWrapper>
          <SliderWrapper>
            <Title>UPCOMING</Title>
            <MovieSlider
              listType={movieType.upcoming}
              movies={upComing.data?.results}
            />
          </SliderWrapper>
          <SliderWrapper>
            <Title>TopRated</Title>
            <MovieSlider
              listType={movieType.top_rated}
              movies={topRated.data?.results}
            />
          </SliderWrapper>
        </Container>
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
const Container = styled.div`
  background-color: black;
  padding-bottom: 200px;
  display: flex;
  flex-direction: column;
`;
const TopSliderWrapper = styled.div`
  margin: -200px 30px 280px 30px;
`;
const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  margin: 0 30px;
`;
const Title = styled.h2`
  font-size: 30px;
  font-weight: 500;
`;
