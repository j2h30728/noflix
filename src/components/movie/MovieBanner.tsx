import { useMatch, useNavigate } from "react-router-dom";
import { makeImagePath } from "../../utils/apiUtils";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { IBannerProps } from "../../types/types";
import { movieType } from "../../types/movie";
import ModalMovieDetailInfo from "./ModalMovieDetailInfo";

export default function MovieBanner({ movie }: IBannerProps) {
  const isMatchedBannerMovie =
    useMatch(`/movies/:listType/:movieId`)?.params.listType ===
    movieType.banner;

  const navigate = useNavigate();
  const handleBoxClick = (movieId: number) => {
    navigate(`movies/${movieType.banner}/${movieId}`);
  };
  return (
    <Container imgUrl={makeImagePath(`${movie?.backdrop_path || ""}`)}>
      <InfoBtn
        layoutId={movie?.id + movieType.banner}
        onClick={() => handleBoxClick(movie?.id || 0)}>
        More info
      </InfoBtn>
      <Title>{movie?.title}</Title>
      <Overview>{movie?.overview}</Overview>
      <AnimatePresence>
        {isMatchedBannerMovie ? (
          <ModalMovieDetailInfo
            listType={movieType.banner}
            movieId={movie?.id + movieType.banner}
            movies={movie && [movie]}
            scrollY={100}
          />
        ) : null}
      </AnimatePresence>
    </Container>
  );
}
const Container = styled.div<{ imgUrl: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${props => props.imgUrl});
  background-size: cover;
  background-position: center center;
`;
const Title = styled.h2`
  font-size: 60px;
  width: 55%;
`;
const Overview = styled.p`
  width: 60vw;
  font-size: 25px;
  top: -100px;
`;
const InfoBtn = styled(motion.button)`
  width: 100px;
  height: 40px;
  border-radius: 5px;
  font-size: 15px;
  border: none;
  background-color: rgba(40, 40, 40, 0.6);
  color: white;
  cursor: pointer;
`;
