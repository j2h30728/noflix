import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import baseURL from "../../utils/baseURL";
import { makeImagePath } from "../../utils/makeImagePath";
import { useSetRecoilState } from "recoil";
import { IMovieSliderProps } from "../../types/movie";
import { movieTypeState } from "../../recoil/movie";

export default function MovieSlider({ movies, type }: IMovieSliderProps) {
  const isMatchedModalMovie = useMatch(`${baseURL}movies/:movieId`);
  const offest = 5;
  const navigate = useNavigate();
  const setMovietype = useSetRecoilState(movieTypeState);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving(prev => !prev);
  const increaseIndex = () => {
    if (movies && movies.length > 0) {
      if (leaving) return;
      toggleLeaving();
      const maxIndex = Math.floor(movies.length / offest) - 1;
      setIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const handleBoxClick = (movieId: number) => {
    if (type) setMovietype(type);
    navigate(`movies/${movieId}`);
  };
  return (
    <Wrrapper>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          initial={{ x: window.innerWidth + 5 }}
          animate={{ x: 0 }}
          exit={{ x: -window.innerWidth - 5 }}
          transition={{ type: "tween", duration: 1 }}
          key={index}>
          {movies &&
            movies.slice(offest * index, offest * index + offest).map(movie => (
              <Box
                layoutId={isMatchedModalMovie ? String(movie.id) : undefined}
                onClick={() => handleBoxClick(movie.id)}
                variants={boxVariants}
                initial="normal"
                whileHover="hover"
                transition={{ type: "tween" }}
                bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                key={movie.id}>
                <motion.span variants={titleVariants}>
                  {movie.title}
                </motion.span>
                <Info variants={infoVariants}>
                  <h4>{movie.title}</h4>
                </Info>
              </Box>
            ))}
        </Row>
        <RARR
          onClick={increaseIndex}
          variants={rarrVariants}
          initial="normal"
          whileHover="hover"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512">
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L370.7 256 233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L178.7 256 41.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
        </RARR>
      </AnimatePresence>
    </Wrrapper>
  );
}
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      type: "tween",
      delay: 0.4,
      duration: 0.2,
    },
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.4,
      duaration: 0.2,
      type: "tween",
    },
  },
};
const titleVariants = {
  hover: {
    opacity: 0,
  },
};
const rarrVariants = {
  normal: {
    scale: 1,
    opacity: 0.2,
  },
  hover: {
    opacity: 0.8,
    scale: 1.1,
    strokeColor: "black",
    transition: {
      delay: 0.1,
      type: "tween",
    },
  },
};

const Wrrapper = styled.div`
  position: relative;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(5, 1fr);
  position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: ${props => props.theme.black.lighter};
  color: red;
  height: 180px;
  font-size: 30px;
  background-image: url(${props => props.bgphoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    opacity: 0.6;
    font-weight: 900;
    font-size: 430;
    color: whitesmoke;
  }
`;
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${props => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
const RARR = styled(motion.svg)`
  position: absolute;
  z-index: 10;
  background-color: none;
  fill: ${props => props.theme.white.darker};
  opacity: 0.1;
  width: 50px;
  height: 80px;
  right: 0;
  margin: auto;
  top: 48px;
  transform-origin: right center;
  cursor: pointer;
`;
