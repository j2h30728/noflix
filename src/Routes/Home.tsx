import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const offest = 5;
export default function Home() {
  const nowPlaying = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving(prev => !prev);
  const increaseIndex = () => {
    if (nowPlaying.data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = nowPlaying.data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offest) - 1;
      setIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  console.log(nowPlaying.data?.results[0]);
  return (
    <Wrapper>
      {nowPlaying.isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgphoto={makeImagePath(
              `${nowPlaying.data?.results[0].backdrop_path || ""}`
            )}>
            <Title>{nowPlaying.data?.results[0].title}</Title>
            <Overview>{nowPlaying.data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                initial={{ x: window.innerWidth + 5 }}
                animate={{ x: 0 }}
                exit={{ x: -window.innerWidth - 5 }}
                transition={{ type: "tween", duration: 1 }}
                key={index}>
                {nowPlaying.data?.results
                  .slice(offest * index, offest * index + offest)
                  .map(movie => (
                    <Box
                      bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                      key={movie.id}>
                      {movie.title}
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}

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

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 200px;
`;
const Banner = styled.div<{ bgphoto: string }>`
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
  font-size: 25px;
  top: -100px;
`;
const Slider = styled.div`
  position: relative;
  top: -150px;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(5, 1fr);
  position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  height: 180px;
  color: red;
  font-size: 30px;
  background-image: url(${props => props.bgphoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
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
