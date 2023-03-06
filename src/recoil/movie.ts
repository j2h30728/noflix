import { atom } from "recoil";
import { movieType } from "../types/movie";

export const movieTypeState = atom({
  key: "movieType",
  default: movieType.now_playing,
});
