import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { queryGenresOfMovies } from "../../queries/movies";
import { IModalMovieDetailProps, movieType } from "../../types/movie";
import { makeImagePath } from "../../utils/apiUtils";

export default function ModalMovieDetailInfo({
  listType,
  movies,
  movieId,
  scrollY,
}: IModalMovieDetailProps) {
  const navigate = useNavigate();
  const handleOverlayClick = () => {
    navigate(-1);
  };

  const clickedMovie = movies?.find(
    movie => String(movie.id) + listType === movieId
  );
  const genresOfMovies = queryGenresOfMovies();
  const genres = genresOfMovies.data?.genres;
  const checkGen = (arr: number[]) => {
    return arr
      .map(x => genres?.find(genre => genre.id === x))
      .map(genre => genre?.name);
  };
  return (
    <>
      {clickedMovie && (
        <>
          <Overlay
            onClick={handleOverlayClick}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <Modal style={{ top: scrollY + 100 }} layoutId={movieId}>
            <ModalCover
              imageUrl={makeImagePath(clickedMovie.backdrop_path, "w500")}>
              <MovieTitle>
                {clickedMovie.title} <span>{clickedMovie.original_title}</span>
              </MovieTitle>
            </ModalCover>
            <ModalContent>
              <ContentWrapper>
                <div>GENRES</div>
                <Genres>
                  {checkGen(clickedMovie.genre_ids).map((genres, idx) => (
                    <li key={idx}>{genres}</li>
                  ))}
                </Genres>
              </ContentWrapper>
              <ContentWrapper>
                <div> IS AUDULT </div>
                <p>{clickedMovie.adult ? "only adult" : "all"}</p>
              </ContentWrapper>
              <ContentWrapper>
                <div> RELEASE DATA</div>
                <p>{clickedMovie.release_date}</p>
              </ContentWrapper>
              <ContentWrapper>
                <div> VOTE AVERAGE</div>
                <p>{clickedMovie.vote_average}</p>
              </ContentWrapper>
              <ContentWrapper>
                <div> VOTE COUNT</div>
                <p>{clickedMovie.vote_count}</p>
              </ContentWrapper>
              <ContentWrapper>
                <div> OVERVIEW</div>
                <p>{clickedMovie.overview}</p>
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
const ModalCover = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 330px;
  background-image: linear-gradient(to top, black, transparent),
    url(${props => props.imageUrl});
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
