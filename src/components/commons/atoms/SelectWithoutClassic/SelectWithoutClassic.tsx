import React from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";

import { offsetsWithoutClassic } from "utils/consts";

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
      <Select
        // TODO: 初期値ちゃんとする
        value={value}
        onChange={onChange}
      >
        {offsetsWithoutClassic.map((offset) => (
          // TODO: valueを適切に計算する
          <MenuItem key={offset} value={offset}>
            {offset}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
