import React from "react";
import { OutlinedInput } from "@material-ui/core";

import { actions, useSelector, useDispatch } from "stores";

type SimulatorTableRowInputProps = {
  idx: number;
};

export const SimulatorTableRowInput: React.FC<SimulatorTableRowInputProps> = (
  props
) => {
  const { idx } = props;

  const value = useSelector((state) => state.operations[idx].value);
  const dispatch = useDispatch();

  return (
    <OutlinedInput
      type="number"
      value={value ?? 0}
      onChange={(event) => {
        dispatch(
          actions.setOperations({
            idx,
            operation: {
              value: parseInt(event.target.value as string),
            },
          })
        );
      }}
    />
  );
};
