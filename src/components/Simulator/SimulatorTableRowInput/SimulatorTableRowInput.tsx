import React from "react";
import { TextField } from "@material-ui/core";

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
    <TextField
      type="number"
      variant="outlined"
      label="白数字オフセット"
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
