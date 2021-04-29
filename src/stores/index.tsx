import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook,
} from "react-redux";
import { songs } from "utils/data";

// import { songs } from "utils/data";

type InitialState = {
  white: number; // 白数字
  lift: number; // LIFT
  currentGreen: number; // 現在の緑数字
  baseGreen: number; // ギアチェンしたときに戻る緑数字
  isFloating: boolean; // フローティングかどうか
  isClassic: boolean; // クラシックハイスピードかどうか
  lowerThreshold: number; // 緑数字の下限
  upperThreshold: number; // 緑数字の上限
};

// 操作
// TODO: フローティング解除とかやりたい
export const operationArray = [
  "none", // 何もしない
  "scratchWithStart", // 皿チョン
  "changeHighSpeed", // ハイスピ変更
  "hideSuddenPlus", // サドプラ消す
  "showSuddenPlus", // サドプラ出す
  "hideAndShowSuddenPlus", // サドプラ出し入れ;
] as const;

type OperateState = {
  operation: typeof operationArray[number];
  comment?: string;
} & Omit<InitialState, "isClassic" | "lowerThreshold" | "upperThreshold">;

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
      lowerThreshold: 250,
      upperThreshold: 350,
    },
    operations: [],
    songIdx: 0,
  } as SimulatorState,
  reducers: {
    setDefaultState(state, action: PayloadAction<SimulatorState>) {
      // state.sections = [];
      return action.payload;
    },
    setSong(state, action: PayloadAction<SimulatorState["songIdx"]>) {
      state.songIdx = action.payload;
      state.operations = songs[action.payload].sections.map((_) => ({
        operation: operationArray[0],
        white: state.initial.white,
        lift: state.initial.lift,
        currentGreen: state.initial.currentGreen,
        baseGreen: state.initial.baseGreen,
        isFloating: state.initial.isFloating,
      }));
    },
    setOperation(
      state,
      action: PayloadAction<{
        idx: number;
        operation: SimulatorState["operations"][0]["operation"];
      }>
    ) {
      state.operations[action.payload.idx].operation = action.payload.operation;
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
