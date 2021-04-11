import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook,
} from "react-redux";

// TODO: フローティング解除とかやりたい
type Operation =
  | "none" // 何もしない
  | "scratchWithStart" // 皿チョン
  | "changeHighSpeed" // ハイスピ変更
  | "hideSuddenPlus" // サドプラ消す
  | "showSuddenPlus" // サドプラ出す
  | "hideAndShowSuddenPlus"; // サドプラ出し入れ

type InitialState = {
  white: number; // 白数字
  lift: number; // LIFT
  currentGreen: number; // 現在の緑数字
  baseGreen: number; // ギアチェンしたときに戻る緑数字
  isFloating: boolean; // フローティングかどうか
  isClassic: boolean; // クラシックハイスピードかどうか
};

type SectionState = {
  operation: Operation; // 操作
  visualization: "slower" | "inRange" | "faster"; // 色変える
} & Omit<InitialState, "isClassic">;

type SimulatorState = {
  initial: InitialState;
  sections: SectionState[]; // 状態
};

const simulatorSlice = createSlice({
  name: "simulator",
  initialState: {
    initial: {
      white: 0,
      lift: 0,
      currentGreen: 300,
      baseGreen: 300,
      isFloating: true,
      isClassic: true,
    },
    sections: [],
  } as SimulatorState,
  reducers: {
    setDefaultState(state, action: PayloadAction<SimulatorState>) {
      // state.sections = [];
      return action.payload;
    },
  },
});

const store = configureStore({
  reducer: simulatorSlice.reducer,
});

export const useSelector: TypedUseSelectorHook<SimulatorState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<typeof store.dispatch>();
export const actions = simulatorSlice.actions;

export default store;
