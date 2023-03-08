import { atom } from "recoil";
import { SeachedType, SeachedVideoType } from "../types/types";

export const movieTypeState = atom({
  key: "movieType",
  default: "",
});

export const tvTypeState = atom({
  key: "tvType",
  default: "",
});

export const searchedVideoIdState = atom<SeachedType>({
  key: "searchedVideoId",
  default: { id: "", type: SeachedVideoType.default },
});

export const isSearchedModalOpenState = atom({
  key: "isSearchedModalOpen",
  default: false,
});
