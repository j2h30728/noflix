import { atom } from "recoil";

export const movieTypeState = atom({
  key: "movieType",
  default: "",
});

export const tvTypeState = atom({
  key: "tvType",
  default: "",
});
