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
            defaultValue={operationArray[0]}
            onChange={(event) => {
              dispatch(
                actions.setOperationsOperation({
                  idx,
                  operation: event.target
                    .value as typeof operationArray[number],
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
            defaultValue={operations[idx].value}
            onChange={(event) => {
              dispatch(
                actions.setOperationsValue({
                  idx,
                  value: parseInt(event.target.value),
                })
              );
            }}
          />
        ) : (
          currentOperation === "changeHighSpeed" && (
            <FormControl variant="outlined">
              {initial.isFloating ? (
                <Select
                  defaultValue={operations[idx].value}
                  onChange={(event) => {
                    dispatch(
                      actions.setOperationsValue({
                        idx,
                        value: parseFloat(event.target.value as string),
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
              ) : initial.isClassic ? (
                <Select
                  defaultValue={operations[idx].before.highSpeed}
                  onChange={(event) => {
                    dispatch(
                      actions.setOperationsBefore({
                        idx,
                        before: {
                          ...operations[idx].before,
                          highSpeed: parseFloat(event.target.value as string),
                        },
                      })
                    );
                  }}
                >
                  {offsetsWithClassic.map((offset) => (
                    <MenuItem key={offset} value={offset}>
                      {offset.toFixed(2)}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <Select
                  defaultValue={operations[idx].before.highSpeed}
                  onChange={(event) => {
                    dispatch(
                      actions.setOperationsBefore({
                        idx,
                        before: {
                          ...operations[idx].before,
                          highSpeed: parseFloat(event.target.value as string),
                        },
                      })
                    );
                  }}
                >
                  {offsetsWithoutClassic.map((offset) => (
                    // TODO: valueを適切に計算する
                    <MenuItem key={offset} value={offset}>
                      {offset}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
          )
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
              actions.setOperationsComment({
                idx,
                comment: event.target.value,
              })
            );
          }}
        />
      </TableCell>
    </TableRow>
  );
};

const offsetsWithFloating = [
  8,
  7,
  6,
  5,
  4,
  3,
  2,
  1,
  0,
  -1,
  -2,
  -3,
  -4,
  -5,
  -6,
  -7,
  -8,
];

const offsetsWithClassic = [
  4.0,
  3.75,
  3.5,
  3.25,
  3.0,
  2.75,
  2.5,
  2.25,
  2.0,
  1.5,
  1,
];

const offsetsWithoutClassic = [
  20,
  19,
  18,
  17,
  16,
  15,
  14,
  13,
  12,
  11,
  10,
  9,
  8,
  7,
  6,
  5,
  4,
  3,
  2,
  1,
];
