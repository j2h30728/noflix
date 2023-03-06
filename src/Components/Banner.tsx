import styled from "styled-components";
import { IBannerProps } from "../types/types";
import { makeImagePath } from "../utils/makeImagePath";

export default function Banner({ movies, tvs }: IBannerProps) {
  return (
    <Container
      bgphoto={makeImagePath(
        `${movies?.backdrop_path || tvs?.backdrop_path || ""}`
      )}>
      <Title>{movies?.title || tvs?.name}</Title>
      <Overview>{movies?.overview || tvs?.overview}</Overview>
    </Container>
  );
}
const Container = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
