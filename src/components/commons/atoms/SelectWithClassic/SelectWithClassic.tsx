import React from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";

import { withClassic } from "utils/consts";

type SelectWithClassicProps = {
  value?: number;
  onChange?: (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => void;
};

export const SelectWithClassic: React.FC<SelectWithClassicProps> = (props) => {
  const { value, onChange } = props;

  return (
    <FormControl variant="outlined">
      <Select value={value} onChange={onChange}>
        {withClassic.map((offset) => (
          <MenuItem key={offset} value={offset}>
            {offset.toFixed(2)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
