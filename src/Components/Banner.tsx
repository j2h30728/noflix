import { motion } from "framer-motion";
import styled from "styled-components";
import { IBannerProps } from "../types/types";
import { makeImagePath } from "../utils/makeImagePath";
import { useNavigate } from "react-router-dom";
import baseURL from "../utils/baseURL";

export default function Banner({ movies, tvs }: IBannerProps) {
  const navigate = useNavigate();
  const handleBoxClick = (videoId: number) => {
    movies
      ? navigate(`${baseURL}movies/${videoId}`)
      : navigate(`${baseURL}tvs/${videoId}`);
  };

  return (
    <Container
      bgphoto={makeImagePath(
        `${movies?.backdrop_path || tvs?.backdrop_path || ""}`
      )}>
      <InfoBtn
        layoutId={String(movies?.id)}
        onClick={() => handleBoxClick(movies?.id || tvs?.id || 0)}>
        More info
      </InfoBtn>
      <Title>{movies?.title || tvs?.name}</Title>
      <Overview>{movies?.overview || tvs?.overview}</Overview>
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
