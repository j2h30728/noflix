import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { queryGenresOfTvs } from "../../queries/tvs";
import { ITvModalDetailProps } from "../../types/tv";
import { makeImagePath } from "../../utils/apiUtils";

export default function ModalTvDetailInfo({
  listType,
  tvs,
  tvId,
  scrollY,
}: ITvModalDetailProps) {
  const navigate = useNavigate();
  const handleOverlayClick = () => {
    navigate(-1);
  };
  const clickedTv = tvs?.find(tv => String(tv.id) + listType === tvId);
  const genresOfTvs = queryGenresOfTvs();
  const genres = genresOfTvs.data?.genres;
  const checkGen = (arr: number[]) => {
    return arr
      .map(x => genres?.find(genre => genre.id === x))
      .map(genre => genre?.name);
  };
  return (
    <>
      {clickedTv && (
        <>
          <Overlay
            onClick={handleOverlayClick}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <Modal style={{ top: scrollY + 100 }} layoutId={tvId}>
            <ModalCover
              bgphoto={makeImagePath(clickedTv.backdrop_path, "w500")}>
              <MovieTitle>
                {clickedTv.name} <span>{clickedTv.original_name}</span>
              </MovieTitle>
            </ModalCover>
            <ModalContent>
              <ContentWrapper>
                <div>GENRES</div>
                <Genres>
                  {checkGen(clickedTv.genre_ids).map((genres, idx) => (
                    <li key={idx}>{genres}</li>
                  ))}
                </Genres>
              </ContentWrapper>
              <ContentWrapper>
                <div> IS AUDULT </div>
                <p>{clickedTv.adult ? "only adult" : "all"}</p>
              </ContentWrapper>
              <ContentWrapper>
                <div> RELEASE DATA</div>
                <p>{clickedTv.release_date}</p>
              </ContentWrapper>
              <ContentWrapper>
                <div> VOTE AVERAGE</div>
                <p>{clickedTv.vote_average}</p>
              </ContentWrapper>
              <ContentWrapper>
                <div> VOTE COUNT</div>
                <p>{clickedTv.vote_count}</p>
              </ContentWrapper>
              <ContentWrapper>
                <div> OVERVIEW</div>
                <p>{clickedTv.overview}</p>
              </ContentWrapper>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 1;
`;
const Modal = styled(motion.div)`
  z-index: 50;
  position: absolute;
  top: 0;
  width: 55vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  background-color: ${props => props.theme.black.lighter};
  overflow: hidden;
`;
const ModalCover = styled.div<{ bgphoto: string }>`
  width: 100%;
  height: 330px;
  background-image: linear-gradient(to top, black, transparent),
    url(${props => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border: none;
  position: relative;
`;
const ModalContent = styled.div`
  color: ${props => props.theme.white.lighter};
  padding: 10px 20px;
  position: relative;
  p {
  }
`;
const MovieTitle = styled.h2`
  position: absolute;
  bottom: 15px;
  left: 15px;
  font-size: 40px;
  span {
    bottom: 0;
    font-size: 20px;
    display: block;
    margin-top: 10px;
  }
`;
const Genres = styled.ul`
  display: flex;
  li {
    margin-right: 3px;
  }
`;
const ContentWrapper = styled.span`
  font: 18px;
  width: 100%;
  display: flex;
  margin-bottom: 0.5em;
  div {
    width: 130px;
    color: grey;
  }
  :last-child {
    flex-direction: column;
  }
`;
