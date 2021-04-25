import { op31JojoSPA } from "./op31JojoSPA";

type Section = {
  bpm: number;
  // ある程度長く続くセクションかどうか
  isMain: boolean;
  // ギアチェンしやすいか
  // difficult: 厳しい、notBad: 数ノーツ捨てればできる、easy: 余裕
  isEasyToOperate: "difficult" | "notBad" | "easy";
};

export type Song = {
  title: string;
  sections: Section[];
};

export const songs: Song[] = [
  {
    title: "-",
    sections: [],
  },
  op31JojoSPA,
];
