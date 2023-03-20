import { useNavigate } from "react-router-dom";
import baseURL from "../../utils/baseURL";
import { makeImagePath } from "../../utils/apiUtils";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { IBannerProps } from "../../types/types";
import { movieType } from "../../types/movie";
import { useState } from "react";
import ModalMovieDetailInfo from "./ModalMovieDetailInfo";

export default function MovieBanner({ movie }: IBannerProps) {
  const navigate = useNavigate();
  const handleBoxClick = (movieId: number) => {
    setClickedListType(movieType.now_playing);
    navigate(`${baseURL}movies/${movieId}`);
  };
  const [clickedListType, setClickedListType] = useState<movieType>(
    movieType.default
  );

  return (
    <Container bgphoto={makeImagePath(`${movie?.backdrop_path || ""}`)}>
      <InfoBtn
        layoutId={String(movie?.id) + movieType.now_playing}
        onClick={() => handleBoxClick(movie?.id || 0)}>
        More info
      </InfoBtn>
      <Title>{movie?.title}</Title>
      <Overview>{movie?.overview}</Overview>
      <AnimatePresence>
        {clickedListType !== movieType.default ? (
          <ModalMovieDetailInfo
            listType={movieType.now_playing}
            clickedListType={movieType.now_playing}
            movieId={movie?.id + clickedListType}
            setClickedListType={setClickedListType}
            movies={movie && [movie]}
          />
        ) : null}
      </AnimatePresence>
    </Container>
  );
}
const Container = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${props => props.bgphoto});
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
