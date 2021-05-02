import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook,
} from "react-redux";
import { DeepPartial } from "utility-types";
import merge from "deepmerge";

import { songs } from "utils/data";

type InitialState = {
  isFloating: boolean; // フローティングかどうか
  isClassic: boolean; // クラシックハイスピードかどうか
  white: number; // 白数字
  lift: number; // LIFT
  green: number; // 緑数字
  highSpeed: number; // ハイスピード
  greenRange: {
    lower?: number;
    upper?: number;
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

type OperationState = {
  operation: typeof operationArray[number];
  before: Omit<InitialState, "isClassic" | "greenRange">; // 操作前
  after?: Omit<InitialState, "isClassic" | "greenRange">; // 操作後
  comment?: string;
};

type SimulatorState = {
  initial: InitialState;
  operations: OperationState[]; // 状態
  songIdx: number;
};

// ハイスピ*BPM = 600でサドプラ無しだと緑数字292

const resetOperations = (state: SimulatorState): OperationState[] => {
  const { isClassic, greenRange, ...newInitial } = state.initial;
  return (state.operations = songs[state.songIdx].sections.map((_) => ({
    operation: operationArray[0],
    before: newInitial,
  })));
};

const simulatorSlice = createSlice({
  name: "simulator",
  initialState: {
    initial: {
      isFloating: true,
      isClassic: true,
      white: 100,
      lift: 100,
      green: 300,
      highSpeed: 1,
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
      resetOperations(state);
    },
    setInitial(
      state,
      action: PayloadAction<{
        initial: DeepPartial<SimulatorState["initial"]>;
        reset?: boolean;
      }>
    ) {
      state.initial = merge(state.initial, action.payload.initial);
      // TODO: ハイスピor緑数字を再計算する処理
      if (action.payload.reset) resetOperations(state);
    },
    // setOperations(
    //   state,
    //   action: PayloadAction<{
    //     idx: number;
    //     operation: SimulatorState["operations"][0];
    //   }>
    // ) {
    //   // TODO: DeepMergeが通るようにする
    //   // state.operations[action.payload.idx] = merge(
    //   //   state.operations[action.payload.idx],
    //   //   action.payload.operation
    //   // );
    //   state.operations[action.payload.idx] = action.payload.operation;
    // },
    setOperationsWithAfter(
      state,
      action: PayloadAction<{
        idx: number;
        operation?: SimulatorState["operations"][0]["operation"];
        after?: Partial<SimulatorState["operations"][0]["after"]>;
      }>
    ) {
      if (action.payload.operation) {
        state.operations[action.payload.idx].operation =
          action.payload.operation;
      }
      const after = action.payload.after;
      state.operations[action.payload.idx].after =
        after != null
          ? {
              ...state.operations[action.payload.idx].before,
              ...after,
            }
          : undefined;
    },
    setOperationsComment(
      state,
      action: PayloadAction<{
        idx: number;
        comment: SimulatorState["operations"][0]["comment"];
      }>
    ) {
      state.operations[action.payload.idx].comment = action.payload.comment;
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
