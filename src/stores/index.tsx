import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook,
} from "react-redux";
import { DeepPartial } from "utility-types";
// import merge from "deepmerge";

import { songs } from "utils/data";
import { stateToHighSpeed, stateToGreen } from "utils/functions";

type InitialState = {
  isFloating: boolean; // フローティングかどうか
  isClassic: boolean; // クラシックハイスピードかどうか
  white: number; // 白数字
  lift: number; // LIFT
  green: number; // 緑数字
  highSpeed: number; // ハイスピード
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
  "scratchWithStartAndChangeHighSpeed", // 皿チョン→ハイスピ変更
] as const;

type OperationState = {
  operation: typeof operationArray[number];
  base: Pick<InitialState, "white" | "green" | "lift">; // 基準となる状態
  before: Omit<InitialState, "isClassic" | "greenRange">; // 操作前
  after?: Omit<InitialState, "isClassic" | "greenRange">; // 操作後
  value?: number; // 操作の値
  value2?: number; // 操作の値2（ad hocだけど多分3つ出てくることはないのでよしとする）
  comment?: string;
};

type SimulatorState = {
  initial: InitialState;
  operations: OperationState[]; // 状態
  songIdx: number;
};

const calcBase = (target: Omit<InitialState, "isClassic" | "greenRange">) => ({
  white: target.white,
  green: target.green,
  lift: target.lift,
});

const calcBefore = (
  target: Omit<InitialState, "isClassic" | "greenRange">,
  songIdx: number,
  idx: number,
  isClassic: boolean
) => ({
  ...target,
  ...(target.isFloating
    ? {
        highSpeed: stateToHighSpeed(target, songs[songIdx].sections[idx].bpm),
      }
    : {
        green: stateToGreen(
          target,
          songs[songIdx].sections[idx].bpm,
          isClassic
        ),
      }),
});

const resetOperations = (state: SimulatorState): OperationState[] => {
  const { isClassic, greenRange, ...before } = state.initial;
  return songs[state.songIdx].sections.map((_, idx) => ({
    operation: operationArray[0],
    base: calcBase(before),
    before: calcBefore(before, state.songIdx, idx, isClassic),
  }));
};

const calcOperations = (
  state: SimulatorState,
  idx: number,
  reset?: boolean
): OperationState[] => {
  const { songIdx, initial, operations } = state;
  const newOperations = operations.slice(0, idx);
  for (let i = idx; i < operations.length; i++) {
    const { isClassic, greenRange, ...before } = initial;
    const target =
      i === 0
        ? before
        : newOperations[i - 1].after ?? newOperations[i - 1].before;
    // TODO: after計算
    newOperations.push({
      ...operations[i],
      ...(reset && { operation: operationArray[0] }),
      base: calcBase(target),
      before: calcBefore(target, songIdx, i, isClassic),
    });
  }
  return newOperations;
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
      state.operations = resetOperations(state);
    },
    setInitial(
      state,
      action: PayloadAction<{
        initial: DeepPartial<SimulatorState["initial"]>;
        reset?: boolean;
      }>
    ) {
      const { initial, reset } = action.payload;
      // FIXME: deepmergeがうまくいかない（mergeの引数がDeepPartialではなくPartialのため）
      // state.initial = merge(state.initial, action.payload.initial);
      state.initial = {
        ...state.initial,
        ...initial,
        greenRange: {
          ...state.initial.greenRange,
          ...initial.greenRange,
        },
      };
      state.operations = calcOperations(state, 0, reset);
    },
    setOperations(
      state,
      action: PayloadAction<{
        idx: number;
        operation: Partial<
          Pick<SimulatorState["operations"][0], "value" | "value2" | "comment">
        >;
      }>
    ) {
      const { idx, operation } = action.payload;
      state.operations[idx] = {
        ...state.operations[idx],
        ...operation,
      };
      // TODO: 緑数字とかハイスピとか更新する
    },
    setOperationsOnInit(
      state,
      action: PayloadAction<{
        idx: number;
        operation: SimulatorState["operations"][0]["operation"];
      }>
    ) {
      const { idx, operation } = action.payload;
      state.operations[idx] = {
        ...state.operations[idx],
        operation,
        value: undefined,
        value2: undefined,
      };
      // TODO: 緑数字とかハイスピとか更新する
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
