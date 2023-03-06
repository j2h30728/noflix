import { atom } from "recoil";
import { tvType } from "../types/tv";

export const tvTypeState = atom({
  key: "moviType",
  default: tvType.airing_today,
});
