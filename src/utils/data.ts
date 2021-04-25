type Section = {
  bpm: number;
  // ある程度長く続くセクションかどうか
  isMain: boolean;
  // ギアチェンしやすいか
  // difficult: 厳しい、notBad: 数ノーツ捨てればできる、easy: 余裕
  isEasyToOperate: "difficult" | "notBad" | "easy";
  comment?: string;
};

const op31JojoSPA: Section[] = [
  {
    bpm: 180,
    isMain: true,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 200,
    isMain: false,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 100,
    isMain: false,
    isEasyToOperate: "easy",
  },
  {
    bpm: 160,
    isMain: false,
    isEasyToOperate: "notBad",
  },
  {
    bpm: 210,
    isMain: true,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 180,
    isMain: false,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 160,
    isMain: false,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 210,
    isMain: true,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 140,
    isMain: false,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 120,
    isMain: false,
    isEasyToOperate: "notBad",
  },
  {
    bpm: 290,
    isMain: true,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 310,
    isMain: true,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 230,
    isMain: false,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 180,
    isMain: false,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 140,
    isMain: false,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 130,
    isMain: false,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 150,
    isMain: false,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 300,
    isMain: true,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 320,
    isMain: true,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 300,
    isMain: true,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 140,
    isMain: false,
    isEasyToOperate: "notBad",
  },
  {
    bpm: 200,
    isMain: true,
    isEasyToOperate: "easy",
  },
  {
    bpm: 220,
    isMain: true,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 230,
    isMain: true,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 190,
    isMain: false,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 140,
    isMain: false,
    isEasyToOperate: "notBad",
  },
  {
    bpm: 260,
    isMain: false,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 340,
    isMain: true,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 350,
    isMain: true,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 320,
    isMain: true,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 300,
    isMain: true,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 220,
    isMain: false,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 120,
    isMain: false,
    isEasyToOperate: "easy",
  },
  {
    bpm: 260,
    isMain: true,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 240,
    isMain: true,
    isEasyToOperate: "difficult",
  },
  {
    bpm: 130,
    isMain: false,
    isEasyToOperate: "easy",
  },
];

export type Music = {
  title: string;
  minBpm: number;
  maxBpm: number;
  data: Section[];
};

export const data: {
  [key: string]: Music;
} = {
  notSelected: {
    title: "-",
    minBpm: 0,
    maxBpm: 0,
    data: [],
  },
  op31JojoSPA: {
    title: "op.31 叙情(SPA)",
    minBpm: 100,
    maxBpm: 350,
    data: op31JojoSPA,
  },
};
