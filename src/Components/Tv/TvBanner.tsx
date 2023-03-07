import { useNavigate } from "react-router-dom";
import { tvTypeState } from "../../recoil/atoms";
import { IBannerProps } from "../../types/types";
import { useRecoilState } from "recoil";
import { tvType } from "../../types/tv";
import baseURL from "../../utils/baseURL";
import { makeImagePath } from "../../utils/apiUtils";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function TvBanner({ tvs }: IBannerProps) {
  const navigate = useNavigate();
  const [bannerTvType, setBannerTvType] = useRecoilState(tvTypeState);
  const handleBoxClick = (videoId: number) => {
    setBannerTvType(tvType.airing_today);
    navigate(`${baseURL}tvs/${videoId}`);
  };
  return (
    <Container bgphoto={makeImagePath(`${tvs?.backdrop_path || ""}`)}>
      <InfoBtn
        layoutId={String(tvs?.id) + bannerTvType}
        onClick={() => handleBoxClick(tvs?.id || 0)}>
        More info
      </InfoBtn>
      <Title>{tvs?.name}</Title>
      <Overview>{tvs?.overview}</Overview>
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
