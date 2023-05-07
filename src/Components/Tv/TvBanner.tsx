import { useMatch, useNavigate } from "react-router-dom";
import { IBannerProps } from "../../types/types";
import { tvType } from "../../types/tv";
import baseURL from "../../utils/baseURL";
import { makeImagePath } from "../../utils/apiUtils";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import ModalTvDetailInfo from "./ModalTvDetailInfo";

export default function TvBanner({ tv }: IBannerProps) {
  const isMatchedBannerMovie =
    useMatch(`/${baseURL}movies/:listType/:tvId`)?.params.listType ===
    tvType.banner;

  const navigate = useNavigate();
  const handleBoxClick = (videoId: number) => {
    navigate(`${baseURL}tvs/${tvType.banner}/${videoId}`);
  };
  return (
    <Container bgphoto={makeImagePath(`${tv?.backdrop_path || ""}`)}>
      <InfoBtn
        layoutId={tv?.id + tvType.banner}
        onClick={() => handleBoxClick(tv?.id || 0)}>
        More info
      </InfoBtn>
      <Title>{tv?.name}</Title>
      <Overview>{tv?.overview}</Overview>
      <AnimatePresence>
        {isMatchedBannerMovie ? (
          <ModalTvDetailInfo
            listType={tvType.banner}
            tvId={tv?.id + tvType.banner}
            tvs={tv && [tv]}
            scrollY={100}
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
