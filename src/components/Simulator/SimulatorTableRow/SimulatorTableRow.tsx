import React from "react";
import {
  TableRow,
  TableCell,
  Typography,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  Box,
} from "@material-ui/core";

import { operationArray, actions, useSelector, useDispatch } from "stores";
import { songs } from "utils/data";
import { SimulatorTableRowInput } from "../SimulatorTableRowInput";
import { SimulatorTableRowSelect } from "../SimulatorTableRowSelect";

type SimulatorTableRowProps = {
  idx: number;
};

const isInCondition = (
  operation: typeof operationArray[number],
  idxs: number[]
) => idxs.map((idx) => operationArray[idx]).some((val) => val === operation);

export const SimulatorTableRow: React.FC<SimulatorTableRowProps> = (props) => {
  const { idx } = props;

  const { songIdx, operations } = useSelector((state) => state);
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
              dispatch(
                actions.setOperationsOperation({
                  idx,
                  operation,
                })
              );
            }}
          >
            <MenuItem value={operationArray[0]}>-</MenuItem>
            {operations[idx].before.white > 0 && (
              <MenuItem value={operationArray[1]}>皿チョン</MenuItem>
            )}
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
            {operations[idx].before.white > 0 && (
              <MenuItem value={operationArray[6]}>
                皿チョン→ハイスピ変更
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="center">
        {currentOperation === "scratchWithStart" ? (
          <SimulatorTableRowInput idx={idx} />
        ) : currentOperation === "changeHighSpeed" ? (
          <SimulatorTableRowSelect idx={idx} />
        ) : (
          currentOperation === "scratchWithStartAndChangeHighSpeed" && (
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Box>
                <SimulatorTableRowInput idx={idx} />
              </Box>
              <Box>
                <SimulatorTableRowSelect isSecondRow idx={idx} />
              </Box>
            </Box>
          )
        )}
      </TableCell>
      <TableCell align="center">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>{Math.floor(operations[idx].before.green)}</Typography>
          {isInCondition(operations[idx].operation, [1, 2, 3, 4, 5, 6]) && (
            <>
              <Typography>↓</Typography>
              <Typography>
                {Math.floor(
                  operations[idx].after?.green ?? operations[idx].before.green
                )}
              </Typography>
            </>
          )}
        </Box>
      </TableCell>
      <TableCell align="center">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>{`${operations[idx].before.white}, ${operations[idx].before.lift}`}</Typography>
          {isInCondition(operations[idx].operation, [1, 3, 4, 6]) && (
            <>
              <Typography>↓</Typography>
              <Typography>
                {`${operations[idx].after?.white}, ${operations[idx].after?.lift}`}
              </Typography>
            </>
          )}
        </Box>
      </TableCell>
      <TableCell align="center">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>{operations[idx].before.highSpeed.toFixed(2)}</Typography>
          {isInCondition(
            operations[idx].operation,
            operations[idx].after?.isFloating ? [1, 2, 4, 5, 6] : [2, 6]
          ) && (
            <>
              <Typography>↓</Typography>
              <Typography>
                {operations[idx].after?.highSpeed.toFixed(2)}
              </Typography>
            </>
          )}
        </Box>
      </TableCell>
      <TableCell align="center">
        <OutlinedInput
          defaultValue={operations[idx].comment ?? ""}
          onChange={(event) => {
            dispatch(
              actions.setOperationsComment({
                idx,
                comment: event.target.value as string,
              })
            );
          }}
        />
      </TableCell>
    </TableRow>
  );
};
