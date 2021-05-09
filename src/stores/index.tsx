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

export type SimulatorState = {
  initial: InitialState;
  operations: OperationState[]; // 状態
  songIdx: number;
};

const calcBase = (
  target: Omit<InitialState, "isClassic" | "greenRange">,
  operation: OperationState["operation"],
  offset?: number
) => ({
  white:
    operation === operationArray[1] || operation === operationArray[6]
      ? target.white + (offset ?? 0)
      : target.white,
  green: target.green,
  lift: target.lift,
});

const calcBefore = (
  target: Omit<InitialState, "isClassic" | "greenRange">,
  songIdx: number,
  sectionIdx: number,
  isClassic: boolean
) => ({
  ...target,
  // TODO: クラシックじゃないときの緑数字再計算
  green: stateToGreen(target, songs[songIdx].sections[sectionIdx].bpm),
});

const resetOperations = (state: SimulatorState): OperationState[] => {
  const { isClassic, greenRange, ...before } = state.initial;
  const operations: OperationState[] = [];
  for (let i = 0; i < songs[state.songIdx].sections.length; i++) {
    const target = i === 0 ? before : operations[i - 1].before;
    operations.push({
      operation: operationArray[0],
      base: calcBase(target, operationArray[0]),
      before:
        i === 0 && target.isFloating
          ? {
              ...target,
              highSpeed: stateToHighSpeed(
                target,
                songs[state.songIdx].sections[0].bpm
              ),
            }
          : calcBefore(target, state.songIdx, i, isClassic),
    });
  }
  return operations;
};

const calcAfter = (
  operation: OperationState,
  songIdx: number,
  sectionIdx: number,
  isClassic: boolean
): Omit<InitialState, "isClassic" | "greenRange"> => {
  const after = { ...operation.before };
  const bpm = songs[songIdx].sections[sectionIdx].bpm;

  switch (operation.operation) {
    case operationArray[1]: // 皿チョン
      // TODO: SUD+飛ばした状態での皿チョン
      after.white += operation.value ?? 0;
      if (after.isFloating) {
        after.green = operation.base.green;
        after.highSpeed = stateToHighSpeed(after, bpm);
      } else {
        // TODO: クラシックじゃないときの緑数字再計算
        after.green = stateToGreen(after, bpm);
      }
      break;
    case operationArray[2]: // ハイスピ変更
      if (after.isFloating) {
        after.highSpeed += operation.value ?? 0;
      } else {
        after.highSpeed = operation.value ?? 1;
      }
      // TODO: クラシックじゃないときの緑数字再計算
      after.green = stateToGreen(after, bpm);
      break;
    case operationArray[3]: // サドプラ消す
      after.white = 0;
      after.green = stateToGreen(after, bpm);
      break;
    case operationArray[4]: // サドプラ出す
      after.white = operation.base.white;
      if (after.isFloating) {
        after.green = operation.base.green;
        after.highSpeed = stateToHighSpeed(after, bpm);
      } else {
        // TODO: クラシックじゃないときの緑数字再計算
        after.green = stateToGreen(after, bpm);
      }
      break;
    case operationArray[5]: // サドプラ出し入れ
      if (after.isFloating) {
        after.green = operation.base.green;
        after.highSpeed = stateToHighSpeed(after, bpm);
      } else {
        // TODO: クラシックじゃないときの緑数字再計算
        after.green = stateToGreen(after, bpm);
      }
      break;
    case operationArray[6]: // 皿チョン→ハイスピ変更
      after.white += operation.value ?? 0;
      if (after.isFloating) {
        after.green = operation.base.green;
        after.highSpeed = stateToHighSpeed(after, bpm);
        after.highSpeed += operation.value2 ?? 0;
      } else {
        // TODO: クラシックじゃないときの緑数字再計算
        after.highSpeed = operation.value2 ?? 1;
      }
      after.green = stateToGreen(after, bpm);
      break;
    default:
      break;
  }
  return after;
};

const calcOperationsOnInit = (
  state: SimulatorState,
  reset?: boolean
): OperationState[] => {
  const { songIdx, initial, operations } = state;
  const newOperations: OperationState[] = [];
  for (let i = 0; i < operations.length; i++) {
    const { isClassic, greenRange, ...initialBefore } = initial;
    const target =
      i === 0
        ? initialBefore
        : newOperations[i - 1].after ?? newOperations[i - 1].before;
    const newOperation = {
      ...operations[i],
      ...(reset && { operation: operationArray[0] }),
      // TODO: フローティング解除対応
      base: calcBase(
        initialBefore,
        reset ? operationArray[0] : operations[i].operation,
        operations[i].value
      ),
      before:
        i === 0 && target.isFloating
          ? {
              ...target,
              highSpeed: stateToHighSpeed(
                target,
                songs[songIdx].sections[0].bpm
              ),
            }
          : calcBefore(target, songIdx, i, isClassic),
    };
    newOperation.after =
      newOperation.operation !== operationArray[0]
        ? calcAfter(newOperation, songIdx, i, isClassic)
        : undefined;
    newOperations.push(newOperation);
  }
  return newOperations;
};

const calcOperations = (
  state: SimulatorState,
  sectionIdx: number,
  operation: Partial<
    Pick<SimulatorState["operations"][0], "operation" | "value" | "value2">
  >
): OperationState[] => {
  const { songIdx, initial, operations } = state;
  const newOperations = operations.slice(0, sectionIdx);
  for (let i = sectionIdx; i < operations.length; i++) {
    const { isClassic, greenRange, ...initialBefore } = initial;
    const target =
      i === 0
        ? initialBefore
        : newOperations[i - 1].after ?? newOperations[i - 1].before;
    // TODO: after計算
    let newOperation = {
      ...operations[i],
    };
    if (i === sectionIdx) {
      if (operation.operation) {
        newOperation = {
          ...newOperation,
          operation: operation.operation,
          value: undefined,
          value2: undefined,
        };
      } else {
        newOperation = {
          ...newOperation,
          ...operation,
        };
      }
    }
    newOperation = {
      ...newOperation,
      // TODO: フローティング解除対応
      base: calcBase(target, newOperation.operation, newOperation.value),
      before: calcBefore(target, songIdx, i, isClassic),
    };
    newOperation.after =
      newOperation.operation !== operationArray[0]
        ? calcAfter(newOperation, songIdx, i, isClassic)
        : undefined;
    newOperations.push(newOperation);
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
      return action.payload;
    },
    setSong(state, action: PayloadAction<SimulatorState["songIdx"]>) {
      const songIdx = action.payload;
      state.songIdx = songIdx;
      if (state.initial.isFloating) {
        state.initial.highSpeed = stateToHighSpeed(
          state.initial,
          songs[songIdx].sections[0].bpm
        );
      } else {
        state.initial.green = stateToGreen(
          state.initial,
          songs[songIdx].sections[0].bpm
        );
      }
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
      const newInitial = {
        ...state.initial,
        ...initial,
        greenRange: {
          ...state.initial.greenRange,
          ...initial.greenRange,
        },
      };
      state.initial = {
        ...newInitial,
        ...(newInitial.isFloating
          ? {
              highSpeed: stateToHighSpeed(
                newInitial,
                songs[state.songIdx].sections[0].bpm
              ),
            }
          : {
              green: stateToGreen(
                newInitial,
                songs[state.songIdx].sections[0].bpm
              ),
            }),
      };
      state.operations = calcOperationsOnInit(state, reset);
    },
    setOperations(
      state,
      action: PayloadAction<{
        idx: number;
        operation: Partial<
          Pick<
            SimulatorState["operations"][0],
            "operation" | "value" | "value2"
          >
        >;
      }>
    ) {
      const { idx, operation } = action.payload;
      state.operations = calcOperations(state, idx, operation);
    },
    setOperationsOperation(
      state,
      action: PayloadAction<{
        idx: number;
        operation: SimulatorState["operations"][0]["operation"];
      }>
    ) {
      const { idx, operation } = action.payload;
      state.operations = calcOperations(state, idx, { operation });
    },
    setOperationsComment(
      state,
      action: PayloadAction<{
        idx: number;
        comment: string;
      }>
    ) {
      const { idx, comment } = action.payload;
      state.operations[idx].comment = comment;
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
