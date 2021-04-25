import { op31JojoSPA } from "./op31JojoSPA";

export type Section = {
  bpm: number;
  // ある程度長く続くセクションかどうか
  isMain: boolean;
  // ギアチェンしやすいか
  // difficult: 厳しい、notBad: 数ノーツ捨てればできる、easy: 余裕
  isEasyToOperate: "difficult" | "notBad" | "easy";
  comment?: string;
};

export type Song = {
  title: string;
  minBpm: number;
  maxBpm: number;
  data: Section[];
};

export const songs: Song[] = [
  {
    title: "-",
    minBpm: 0,
    maxBpm: 0,
    data: [],
  },
  {
    title: "op.31 叙情(SPA)",
    minBpm: 100,
    maxBpm: 350,
    data: op31JojoSPA,
  },
];
