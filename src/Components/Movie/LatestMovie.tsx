import styled from "styled-components";
import { IGeLatesttMovie } from "../../types/movie";
import { makeImagePath } from "../../utils/makeImagePath";

export default function LatestMovie({
  title,
  overview,
  poster_path,
}: IGeLatesttMovie) {
  return (
    <>
      <Title>LATEST MOVIE</Title>
      <Wrapper>
        <h3>{title}</h3>
        <p>{overview}</p>
        <Box bgphoto={poster_path && makeImagePath(poster_path)} />
      </Wrapper>
    </>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
  height: 200px;
  margin: 0 30px;
  text-align: end;
  h3 {
    font-size: 30px;
    font-weight: 400;
  }
  p {
    font-size: 20px;
    width: 50vw;
  }
`;
const Title = styled.h2`
  font-weight: 500;
  font-size: 30px;
  margin: 30px;
`;
const Box = styled.div<{ bgphoto?: string }>`
  background-image: url(${props => props.bgphoto});
`;
