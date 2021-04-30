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
  currentGreenBefore: number; // 現在の緑数字（変更前）
  currentGreenAfter: number; // 現在の緑数字（変更後）
  baseGreen: number; // ギアチェンしたときに戻る緑数字
  isFloating: boolean; // フローティングかどうか
  isClassic: boolean; // クラシックハイスピードかどうか
  greenRange: number; // 緑数字範囲（色が変わる）
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

type OperateState = {
  operation: typeof operationArray[number];
  comment?: string;
} & Omit<InitialState, "isClassic" | "greenRange">;

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
      currentGreenBefore: 300,
      currentGreenAfter: 300,
      baseGreen: 300,
      isFloating: true,
      isClassic: true,
      greenRange: 20,
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
        ...newInitial,
        operation: operationArray[0],
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
