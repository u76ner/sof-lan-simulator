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
  isFloating: boolean; // フローティングかどうか
  isClassic: boolean; // クラシックハイスピードかどうか
  green: number; // 緑数字
  highSpeed: number; // クラシックハイスピード
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

type OperationState = {
  operation: typeof operationArray[number];
  value: number; // 操作の値
  before: Omit<InitialState, "isFloating" | "isClassic" | "greenRange">; // 操作前
  after?: Omit<InitialState, "isFloating" | "isClassic" | "greenRange">; // 操作後
  comment?: string;
};

type SimulatorState = {
  initial: InitialState;
  operations: OperationState[]; // 状態
  songIdx: number;
};

// TODO: ハイスピ計算できるようにする
// const calcAfter = (operation: OperationState): PlayState => operation.before;

// ハイスピ*BPM = 600でサドプラ無しだと緑数字292

const simulatorSlice = createSlice({
  name: "simulator",
  initialState: {
    initial: {
      white: 100,
      lift: 100,
      green: 300,
      highSpeed: 1,
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
        value: 0,
        before: {
          ...newInitial,
          highSpeed: 1.5,
        },
      }));
    },
    setInitialWhite(
      state,
      action: PayloadAction<SimulatorState["initial"]["white"]>
    ) {
      state.initial.white = action.payload;
    },
    setInitialLift(
      state,
      action: PayloadAction<SimulatorState["initial"]["lift"]>
    ) {
      state.initial.lift = action.payload;
    },
    setInitialGreen(
      state,
      action: PayloadAction<SimulatorState["initial"]["green"]>
    ) {
      state.initial.green = action.payload;
    },
    setInitialIsFloating(
      state,
      action: PayloadAction<SimulatorState["initial"]["isFloating"]>
    ) {
      state.initial.isFloating = action.payload;
    },
    setInitialIsClassic(
      state,
      action: PayloadAction<SimulatorState["initial"]["isClassic"]>
    ) {
      state.initial.isClassic = action.payload;
    },
    setInitialGreenRangeLower(
      state,
      action: PayloadAction<SimulatorState["initial"]["greenRange"]["lower"]>
    ) {
      state.initial.greenRange.lower = action.payload;
    },
    setInitialGreenRangeUpper(
      state,
      action: PayloadAction<SimulatorState["initial"]["greenRange"]["upper"]>
    ) {
      state.initial.greenRange.upper = action.payload;
    },
    setOperationsOperation(
      state,
      action: PayloadAction<{
        idx: number;
        operation: SimulatorState["operations"][0]["operation"];
      }>
    ) {
      state.operations[action.payload.idx].operation = action.payload.operation;
    },
    setOperationsValue(
      state,
      action: PayloadAction<{
        idx: number;
        value: SimulatorState["operations"][0]["value"];
      }>
    ) {
      state.operations[action.payload.idx].value = action.payload.value;
    },
    setOperationsBefore(
      state,
      action: PayloadAction<{
        idx: number;
        before: SimulatorState["operations"][0]["before"];
      }>
    ) {
      state.operations[action.payload.idx].before = action.payload.before;
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
