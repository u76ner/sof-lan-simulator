import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook,
} from "react-redux";

// import { songs } from "utils/data";

type InitialState = {
  white: number; // 白数字
  lift: number; // LIFT
  currentGreen: number; // 現在の緑数字
  baseGreen: number; // ギアチェンしたときに戻る緑数字
  isFloating: boolean; // フローティングかどうか
  isClassic: boolean; // クラシックハイスピードかどうか
};

type OperateState = {
  // TODO: フローティング解除とかやりたい
  operation:
    | "none" // 何もしない
    | "scratchWithStart" // 皿チョン
    | "changeHighSpeed" // ハイスピ変更
    | "hideSuddenPlus" // サドプラ消す
    | "showSuddenPlus" // サドプラ出す
    | "hideAndShowSuddenPlus"; // サドプラ出し入れ; // 操作
  visualization: "slower" | "inRange" | "faster"; // 色変える
} & Omit<InitialState, "isClassic">;

type SimulatorState = {
  initial: InitialState;
  operations: OperateState[]; // 状態
  songIdx: number;
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
    operations: [],
    songIdx: 0,
  } as SimulatorState,
  reducers: {
    setDefaultState(state, action: PayloadAction<SimulatorState>) {
      // state.sections = [];
      return action.payload;
    },
  },
});

// カンペ
// useSelector, useDispatch, actionsをimportする
// const state = useSelector((state) => state);
// or const hoge = useSelector((state) => state.hoge)
// const dispatch = useDispatch();
// dispatch(actions.fuga(fugaのpayload))

const store = configureStore({
  reducer: simulatorSlice.reducer,
});

export const useSelector: TypedUseSelectorHook<SimulatorState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<typeof store.dispatch>();
export const actions = simulatorSlice.actions;

export default store;
