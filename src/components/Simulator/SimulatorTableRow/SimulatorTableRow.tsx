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

  const { songIdx, operations } = useSelector((state) => state);
  const currentOperation = operations[idx].operation;
  const dispatch = useDispatch();

  return (
    <TableRow>
      <TableCell>
        <Typography>{songs[songIdx].sections[idx].bpm}</Typography>
      </TableCell>
      <TableCell>
        <FormControl variant="outlined">
          <Select
            defaultValue={operationArray[0]}
            onChange={(event) => {
              dispatch(
                actions.setOperation({
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
            <MenuItem value={operationArray[3]}>SUD+消す</MenuItem>
            <MenuItem value={operationArray[4]}>SUD+出す</MenuItem>
            <MenuItem value={operationArray[5]}>SUD+出し入れ</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        {currentOperation === "none" ||
        currentOperation === "hideSuddenPlus" ||
        currentOperation === "showSuddenPlus" ||
        currentOperation === "hideAndShowSuddenPlus" ? (
          <OutlinedInput disabled defaultValue="-" />
        ) : currentOperation === "scratchWithStart" ? (
          <OutlinedInput type="number" defaultValue={0} />
        ) : (
          <FormControl variant="outlined">
            <Select defaultValue="up">
              <MenuItem value="up">あげたり</MenuItem>
              <MenuItem value="down">さげたり</MenuItem>
            </Select>
          </FormControl>
        )}
      </TableCell>
      <TableCell>
        <Typography>TODO: 緑数字</Typography>
      </TableCell>
      <TableCell>
        <Typography>TODO: ハイスピード値</Typography>
      </TableCell>
      <TableCell>
        <Typography>TODO: コメント</Typography>
      </TableCell>
    </TableRow>
  );
};
