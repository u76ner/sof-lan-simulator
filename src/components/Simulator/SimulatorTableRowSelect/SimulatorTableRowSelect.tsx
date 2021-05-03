import React from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";

import { actions, useSelector, useDispatch } from "stores";
import { withFloating } from "utils/consts";
import {
  SelectWithClassic,
  SelectWithoutClassic,
} from "components/commons/atoms";

type SimulatorTableRowSelectProps = {
  isSecondRow?: boolean;
  idx: number;
};

export const SimulatorTableRowSelect: React.FC<SimulatorTableRowSelectProps> = (
  props
) => {
  const { isSecondRow = false, idx } = props;

  const { before, value, value2 } = useSelector(
    (state) => state.operations[idx]
  );
  const isClassic = useSelector((state) => state.initial.isClassic);
  const dispatch = useDispatch();

  return (
    <>
      {before.isFloating ? (
        <FormControl variant="outlined">
          <Select
            value={(isSecondRow ? value2 : value) ?? 0}
            onChange={(event) => {
              const parsedValue = parseFloat(event.target.value as string);
              dispatch(
                actions.setOperations({
                  idx,
                  operation: {
                    ...(isSecondRow
                      ? { value2: parsedValue }
                      : { value: parsedValue }),
                  },
                })
              );
            }}
          >
            {withFloating
              .filter((offset) => before.highSpeed + offset / 2 > 0)
              .map((offset) => (
                <MenuItem key={offset} value={offset / 2}>
                  {offset === 0
                    ? "-"
                    : offset > 0
                    ? `+${(offset / 2).toFixed(1)}（黒鍵${offset}個）`
                    : `-${(-offset / 2).toFixed(1)}（白鍵${-offset}個）`}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      ) : isClassic ? (
        <SelectWithClassic
          value={(isSecondRow ? value2 : value) ?? before.highSpeed}
          onChange={(event) => {
            const parsedValue = parseFloat(event.target.value as string);
            dispatch(
              actions.setOperations({
                idx,
                operation: {
                  ...(isSecondRow
                    ? { value2: parsedValue }
                    : { value: parsedValue }),
                },
              })
            );
          }}
        />
      ) : (
        <SelectWithoutClassic
          value={(isSecondRow ? value2 : value) ?? before.highSpeed}
          onChange={(event) => {
            const parsedValue = parseInt(event.target.value as string);
            dispatch(
              actions.setOperations({
                idx,
                operation: {
                  ...(isSecondRow
                    ? { value2: parsedValue }
                    : { value: parsedValue }),
                },
              })
            );
          }}
        />
      )}
    </>
  );
};
