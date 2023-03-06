import { atom } from "recoil";
import { movieType } from "../types/movie";

export const movieTypeState = atom({
  key: "moviType",
  default: movieType.now_playing,
});
