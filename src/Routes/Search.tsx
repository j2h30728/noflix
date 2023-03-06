import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { searchMovies } from "../api/movie";
import MovieSlider from "../components/Movie/MovieSlider";
import TvSlider from "../components/Tv/TvSlider";
import { querySearchedMovies } from "../queries/movies";
import { querySearchedTvs } from "../queries/tvs";
import { IGetMovies } from "../types/movie";

export default function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const searchedMovies = querySearchedMovies(keyword);
  const searchedTvs = querySearchedTvs(keyword);
  return (
    <>
      <SearchedKeyword>SEARCH : {keyword}</SearchedKeyword>
      <SliderWrapper>
        <Title>MOVIE</Title>
        <MovieSlider movies={searchedMovies.data?.results} />
      </SliderWrapper>
      <SliderWrapper>
        <Title>TV</Title>
        <TvSlider tvs={searchedTvs.data?.results} />
      </SliderWrapper>
    </>
  );
}
const SearchedKeyword = styled.p`
  font-size: 20px;
  margin: 30px 60px;
`;
const Title = styled.h2`
  font-size: 40px;
  margin-left: 60px;
`;
const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 300px;
`;
