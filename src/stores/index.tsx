import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook,
} from "react-redux";
import { songs } from "utils/data";

type InitialState = {
  white: number; // 白数字
  lift: number; // LIFT
  green: number; // 緑数字
  isFloating: boolean; // フローティングかどうか
  isClassic: boolean; // クラシックハイスピードかどうか
  greenRange: {
    lower: number;
    upper: number;
  }; // 緑数字範囲（色が変わる）
};

// 操作
// TODO: フローティング解除とかやりたい
export const operationArray = [
  "none", // 何もしない
  "scratchWithStart", // 皿チョン
  "changeHighSpeed", // ハイスピ変更
  "hideSuddenPlus", // サドプラ消す
  "showSuddenPlus", // サドプラ出す
  "hideAndShowSuddenPlus", // サドプラ出し入れ
] as const;

type PlayState = {
  highSpeed: number; // ハイスピ
} & Omit<InitialState, "isClassic" | "greenRange">;

type OperationState = {
  operation: typeof operationArray[number];
  value?: number; // 操作の値
  before: PlayState; // 操作前
  after?: PlayState; // 操作後
  comment?: string;
};

type SimulatorState = {
  initial: InitialState;
  operations: OperationState[]; // 状態
  songIdx: number;
};

// TODO: ハイスピ計算できるようにする
// const calcAfter = (operation: OperationState): PlayState => operation.before;

const simulatorSlice = createSlice({
  name: "simulator",
  initialState: {
    initial: {
      white: 100,
      lift: 100,
      green: 300,
      isFloating: true,
      isClassic: true,
      greenRange: {
        lower: 250,
        upper: 350,
      },
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
      const { isClassic, greenRange, ...newInitial } = state.initial;
      state.operations = songs[action.payload].sections.map((_) => ({
        operation: operationArray[0],
        before: {
          ...newInitial,
          highSpeed: 0,
        },
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
