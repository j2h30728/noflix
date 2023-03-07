import styled from "styled-components";
import { IGeLatesttTv } from "../../types/tv";
import { makeImagePath } from "../../utils/apiUtils";

export default function LatestTv({
  name,
  overview,
  poster_path,
}: IGeLatesttTv) {
  return (
    <>
      <Title>LATEST TV</Title>
      <Wrapper>
        <h3>{name}</h3>
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
  margin: 10px 30px 20px 30px;
  text-align: end;
  h3 {
    font-size: 30px;
    font-weight: 400;
  }
  p {
    font-size: 20px;
    width: 80vw;
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
