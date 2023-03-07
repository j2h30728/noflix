import { useLocation } from "react-router-dom";
import styled from "styled-components";
import MovieSlider from "../components/Movie/MovieSlider";
import TvSlider from "../components/Tv/TvSlider";
import { querySearchedMovies } from "../queries/movies";
import { querySearchedTvs } from "../queries/tvs";

export default function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const searchedMovies = querySearchedMovies(keyword);
  const searchedTvs = querySearchedTvs(keyword);
  return (
    <Container>
      {searchedMovies.isLoading || searchedTvs.isLoading ? (
        <div>is Loading</div>
      ) : (
        <>
          <SearchedKeyword>SEARCH : {keyword}</SearchedKeyword>
          <SliderWrapper>
            <Title>MOVIE</Title>
            {searchedMovies.data && searchedMovies.data.results.length > 0 ? (
              <MovieSlider movies={searchedMovies.data?.results} />
            ) : (
              <Notice>There are no matching data found.</Notice>
            )}
          </SliderWrapper>
          <SliderWrapper>
            <Title>TV</Title>
            {searchedTvs.data && searchedTvs.data.results.length > 0 ? (
              <TvSlider tvs={searchedTvs.data?.results} />
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
  position: relative;
  height: 300px;
  margin: 0 30px;
`;
const Notice = styled.p`
  font-size: 20px;
  margin-left: 100px;
  margin-top: 30px;
`;
