import { useLocation } from "react-router-dom";
import styled from "styled-components";
import MovieSlider from "../components/movie/MovieSlider";
import TvSlider from "../components/tv/TvSlider";
import { querySearchedMovies } from "../queries/movies";
import { querySearchedTvs } from "../queries/tvs";
import { movieType } from "../types/movie";
import { tvType } from "../types/tv";
import { useEffect, useState } from "react";

export default function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const [settingKeyword, setSettingKeyword] = useState<string | null>("");

  useEffect(() => {
    if (keyword !== null) setSettingKeyword(keyword);
  }, [keyword]);
  const searchedMovies = querySearchedMovies(settingKeyword);
  const searchedTvs = querySearchedTvs(settingKeyword);

  return (
    <Container>
      {searchedMovies.isLoading || searchedTvs.isLoading ? (
        <div>is Loading</div>
      ) : (
        <>
          <SearchedKeyword>SEARCH : {settingKeyword}</SearchedKeyword>
          <SliderWrapper>
            <Title>MOVIE</Title>
            {searchedMovies.data && searchedMovies.data.results.length > 0 ? (
              <MovieSlider
                movies={searchedMovies.data.results}
                listType={movieType.searched}
              />
            ) : (
              <Notice>There are no matching data found.</Notice>
            )}
          </SliderWrapper>
          <SliderWrapper>
            <Title>TV</Title>
            {searchedTvs.data && searchedTvs.data.results.length > 0 ? (
              <TvSlider
                tvs={searchedTvs.data?.results}
                listType={tvType.searched}
              />
            ) : (
              <Notice>There are no matching data found.</Notice>
            )}
          </SliderWrapper>
        </>
      )}
    </Container>
  );
}
const Container = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
`;
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
  height: 300px;
  margin: 0 30px;
`;
const Notice = styled.p`
  font-size: 20px;
  margin-left: 100px;
  margin-top: 30px;
`;
