import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IModalMovieDetailProps } from "../../types/movie";
import { makeImagePath } from "../../utils/makeImagePath";

export default function ModalMovieDetailInfo({
  movies,
  movieId,
  scrollY,
}: IModalMovieDetailProps) {
  const navigate = useNavigate();
  const handleOverlayClick = () => {
    navigate(-1);
  };
  const clickedMovie = movies?.find(movie => String(movie.id) === movieId);
  return (
    <>
      <Overlay
        onClick={handleOverlayClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <ModalMovie style={{ top: scrollY + 100 }} layoutId={movieId}>
        {clickedMovie && (
          <>
            <ModalCover bgphoto={makeImagePath(clickedMovie.backdrop_path)} />
            <ModalContent>
              <h3>{clickedMovie.title}</h3>
              <p>{clickedMovie.overview}</p>
            </ModalContent>
          </>
        )}
      </ModalMovie>
    </>
  );
}
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const ModalMovie = styled(motion.div)`
  position: absolute;
  width: 55vw;
  height: 88vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  background-color: ${props => props.theme.black.lighter};
  overflow: hidden;
`;
const ModalCover = styled.div<{ bgphoto: string }>`
  width: 100%;
  height: 400px;
  background-image: linear-gradient(to top, black, transparent),
    url(${props => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border: none;
`;
const ModalContent = styled.div`
  color: ${props => props.theme.white.lighter};
  padding: 20px;
  position: relative;
  top: -70px;
  h3 {
    font-size: 46px;
  }
`;
