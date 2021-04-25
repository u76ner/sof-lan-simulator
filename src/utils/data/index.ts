import { op31JojoSPA } from "./op31JojoSPA";

export type Song = {
  title: string;
  sections: {
    bpm: number;
    // ある程度長く続くセクションかどうか
    isMain: boolean;
    // ギアチェンしやすいか
    // difficult: 厳しい、notBad: 数ノーツ捨てればできる、easy: 余裕
    isEasyToOperate: "difficult" | "notBad" | "easy";
  }[];
};

export const songs: Song[] = [
  {
    title: "-",
    sections: [],
  },
  op31JojoSPA,
];
