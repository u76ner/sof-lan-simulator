import React from "react";
import {
  TableRow,
  TableCell,
  Typography,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
} from "@material-ui/core";

import { operationArray, actions, useSelector, useDispatch } from "stores";
import { songs } from "utils/data";
import { offsetsWithFloating } from "utils/consts";
import {
  SelectWithClassic,
  SelectWithoutClassic,
} from "components/commons/atoms";

type SimulatorTableRowProps = {
  idx: number;
};

export const SimulatorTableRow: React.FC<SimulatorTableRowProps> = (props) => {
  const { idx } = props;

  const { songIdx, operations, initial } = useSelector((state) => state);
  const currentOperation = operations[idx].operation;
  const dispatch = useDispatch();

  return (
    <TableRow>
      <TableCell align="center">
        <Typography>{songs[songIdx].sections[idx].bpm}</Typography>
      </TableCell>
      <TableCell align="center">
        <FormControl variant="outlined">
          <Select
            value={operations[idx].operation}
            onChange={(event) => {
              const operation = event.target
                .value as typeof operationArray[number];
              const after =
                operation === operationArray[0] // 何もしない
                  ? undefined
                  : {
                      ...operations[idx].before,
                      ...(operation === operationArray[1] // 皿チョン
                        ? {}
                        : operation === operationArray[2] // ハイスピ変更
                        ? {}
                        : operation === operationArray[3] // SUD+消す
                        ? { white: 0 }
                        : operation === operationArray[4] // TODO: SUD+出す
                        ? {} // TODO: フローティングなら緑数字戻す
                        : // SUD+出し入れ
                          { white: initial.white }), // TODO: フローティングなら緑数字戻す
                    };
              dispatch(
                actions.setOperationsWithAfter({
                  idx,
                  operation,
                  after,
                })
              );
            }}
          >
            <MenuItem value={operationArray[0]}>-</MenuItem>
            <MenuItem value={operationArray[1]}>皿チョン</MenuItem>
            <MenuItem value={operationArray[2]}>ハイスピ変更</MenuItem>
            {operations[idx].before.white > 0 && (
              <MenuItem value={operationArray[3]}>SUD+消す</MenuItem>
            )}
            {operations[idx].before.white === 0 && (
              <MenuItem value={operationArray[4]}>SUD+出す</MenuItem>
            )}
            {operations[idx].before.white > 0 && (
              <MenuItem value={operationArray[5]}>SUD+出し入れ</MenuItem>
            )}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="center">
        {currentOperation === "scratchWithStart" ? (
          <OutlinedInput
            type="number"
            defaultValue={0}
            onChange={(event) => {
              dispatch(
                actions.setOperations({
                  idx,
                  operation: {
                    ...operations[idx],
                    after: {
                      ...operations[idx].before,
                      white:
                        operations[idx].before.white +
                        parseInt(event.target.value as string),
                    },
                  },
                })
              );
            }}
          />
        ) : (
          currentOperation === "changeHighSpeed" &&
          (initial.isFloating ? (
            <FormControl variant="outlined">
              <Select
                defaultValue={0}
                onChange={(event) => {
                  dispatch(
                    actions.setOperations({
                      idx,
                      operation: {
                        ...operations[idx],
                        after: {
                          ...operations[idx].before,
                          highSpeed:
                            operations[idx].before.highSpeed +
                            parseInt(event.target.value as string),
                        },
                      },
                    })
                  );
                }}
              >
                {
                  // TODO: ハイスピが0を下回らない処理
                  offsetsWithFloating.map((offset) => (
                    <MenuItem key={offset} value={offset / 2}>
                      {offset === 0
                        ? "-"
                        : offset > 0
                        ? `+${(offset / 2).toFixed(1)}（黒鍵${offset}個）`
                        : `-${(-offset / 2).toFixed(1)}（白鍵${-offset}個）`}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          ) : initial.isClassic ? (
            <SelectWithClassic
              value={operations[idx].before.highSpeed}
              onChange={(event) => {
                dispatch(
                  actions.setOperations({
                    idx,
                    operation: {
                      ...operations[idx],
                      after: {
                        ...operations[idx].before,
                        highSpeed: parseFloat(event.target.value as string),
                      },
                    },
                  })
                );
              }}
            />
          ) : (
            <SelectWithoutClassic
              // TODO: 初期値ちゃんとする
              value={operations[idx].before.highSpeed}
              onChange={(event) => {
                dispatch(
                  actions.setOperations({
                    idx,
                    operation: {
                      ...operations[idx],
                      after: {
                        ...operations[idx].before,
                        // TODO: クラシックじゃないときのハイスピを適切に計算する
                        // highSpeed: parseInt(event.target.value as string),
                      },
                    },
                  })
                );
              }}
            />
          ))
        )}
      </TableCell>
      <TableCell align="center">
        <Typography>{operations[idx].before.green}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography>{`${operations[idx].before.white}, ${operations[idx].before.lift}`}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography>
          {(Math.floor(operations[idx].before.highSpeed * 100) / 100).toFixed(
            2
          )}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <OutlinedInput
          defaultValue={operations[idx].comment ?? ""}
          onChange={(event) => {
            dispatch(
              actions.setOperations({
                idx,
                operation: {
                  ...operations[idx],
                  comment: event.target.value as string,
                },
              })
            );
          }}
        />
      </TableCell>
    </TableRow>
  );
};
