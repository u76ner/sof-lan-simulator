import React from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";

import { withoutClassic } from "utils/consts";

type SelectWithoutClassicProps = {
  value?: number;
  onChange?: (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => void;
};

export const SelectWithoutClassic: React.FC<SelectWithoutClassicProps> = (
  props
) => {
  const { value, onChange } = props;

  return (
    <FormControl variant="outlined">
      <Select value={value} onChange={onChange}>
        {withoutClassic.map((offset) => (
          <MenuItem key={offset} value={offset}>
            {offset}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
