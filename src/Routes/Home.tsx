import { AnimatePresence, useScroll } from "framer-motion";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import baseURL from "../utils/baseURL";
import Banner from "../components/Banner";
import ModalMovieDetailInfo from "../components/Movie/ModalMovieDetailInfo";
import MovieSlider from "../components/Movie/MovieSlider";
import {
  queryLatestMovie,
  queryNowPlayingMovies,
  queryTopRatedMovies,
  queryUpComingMovies,
} from "../queries/movies";
import { useRecoilValue } from "recoil";
import { movieTypeState } from "../recoil/movie";
import { movieType } from "../types/movie";

export default function Home() {
  const isMatchedModalMovie = useMatch(`${baseURL}movies/:movieId`);
  const { scrollY } = useScroll();
  const movieId = isMatchedModalMovie?.params.movieId;
  const nowPlaying = queryNowPlayingMovies();
  const latest = queryLatestMovie();
  const upComing = queryUpComingMovies();
  const topRated = queryTopRatedMovies();
  const movietype = useRecoilValue(movieTypeState);

  return (
    <>
      {nowPlaying.isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Wrapper>
          <Banner movies={nowPlaying.data?.results[0]} />
          <TopSliderWrapper>
            <Title>nowPlaying</Title>
            <MovieSlider
              type={movieType.now_playing}
              movies={nowPlaying.data?.results}
            />
          </TopSliderWrapper>
          <SliderWrapper>
            <Title>Latest</Title>
            <h2>{latest.data?.title}</h2>
            <p>{latest.data?.overview}</p>
          </SliderWrapper>
          <SliderWrapper>
            <Title>Upcoming</Title>
            <MovieSlider
              type={movieType.upcoming}
              movies={upComing.data?.results}
            />
          </SliderWrapper>
          <TopRatedWrapper>
            <Title>TopRated</Title>
            <MovieSlider
              type={movieType.top_rated}
              movies={topRated.data?.results}
            />
          </TopRatedWrapper>
          <AnimatePresence>
            {isMatchedModalMovie ? (
              <ModalMovieDetailInfo
                movieId={movieId}
                movies={
                  movietype === movieType.now_playing
                    ? nowPlaying.data?.results
                    : movietype === movieType.upcoming
                    ? upComing.data?.results
                    : movietype === movieType.top_rated
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
