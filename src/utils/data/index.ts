import { op31JojoSPA } from "./op31JojoSPA";
import { spukwalzerSPA } from "./supkwalzerSPA";
import { ongakuSPA } from "./ongakuSPA";
import { session9SPA } from "./session9SPA";
// import { fiveOneOneSPA } from "./fiveOneOneSPA";
import { dayDreamSPA } from "./dayDreamSPA";

import { saberWingSPA } from "./saberWingSPA";

export type Song = {
  title: string;
  test?: boolean;
  sections: {
    bpm: number;
    // ある程度長く続くセクションかどうか
    isMain?: boolean;
    // ギアチェンしやすいか
    // notBad: 数ノーツ捨てればできる、easy: 余裕
    isEasyToOperate?: "notBad" | "easy";
  }[];
};

export const songs: Song[] = [
  {
    title: "-",
    sections: [],
  },
  op31JojoSPA,
  spukwalzerSPA,
  ongakuSPA,
  session9SPA,
  // fiveOneOneSPA,
  dayDreamSPA,
  // test
  saberWingSPA,
];
