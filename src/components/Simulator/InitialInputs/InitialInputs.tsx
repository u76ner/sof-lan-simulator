import React from "react";
import {
  makeStyles,
  Box,
  Container,
  FormControl,
  Select,
  RadioGroup,
  Radio,
  MenuItem,
  Typography,
  OutlinedInput,
  FormControlLabel,
} from "@material-ui/core";

import { actions, useDispatch } from "stores";
import { songs } from "utils/data";

type InitialInputsProps = {};

const LABEL_WIDTH = 250;

// 曲選べる、白数字、LIFT、FHSかどうか、クラシックハイスピかどうか、開始時の緑数字、緑数字の上限、下限

export const InitialInputs: React.FC<InitialInputsProps> = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h5">初期入力</Typography>
      <Container maxWidth={false}>
        {/* 選曲セレクトボックス */}
        <Box display="flex" alignItems="center">
          <Box width={LABEL_WIDTH} pr={2}>
            <Typography align="right">曲名</Typography>
          </Box>
          <FormControl variant="outlined">
            <Select
              defaultValue={0}
              onChange={(event) => {
                dispatch(
                  actions.setSong(parseInt(event.target.value as string))
                );
              }}
            >
              {songs.map((song, idx) => (
                <MenuItem key={song.title} value={idx}>
                  {song.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* 白数字 */}
        <Box display="flex" alignItems="center">
          <Box width={LABEL_WIDTH} pr={2}>
            <Typography align="right">白数字</Typography>
          </Box>
          <OutlinedInput
            defaultValue={0}
            inputProps={{
              type: "number",
              min: 0,
              max: 1000,
            }}
          />
        </Box>
        {/* LIFT */}
        {/* TODO: 白数字+LIFT < 1000になるようにする */}
        <Box display="flex" alignItems="center">
          <Box width={LABEL_WIDTH} pr={2}>
            <Typography align="right">LIFT</Typography>
          </Box>
          <OutlinedInput
            defaultValue={0}
            inputProps={{
              type: "number",
              min: 0,
              max: 1000,
            }}
          />
        </Box>
        {/* FHSかどうか */}
        <Box display="flex" alignItems="center">
          <Box width={LABEL_WIDTH} pr={2}>
            <Typography align="right">フローティングハイスピード</Typography>
          </Box>
          <RadioGroup name="isFloating" defaultValue="true">
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="使用する"
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="使用しない"
            />
          </RadioGroup>
        </Box>
        {/* クラシックハイスピかどうか */}
        <Box display="flex" alignItems="center">
          <Box width={LABEL_WIDTH} pr={2}>
            <Typography align="right">クラシックハイスピード</Typography>
          </Box>
          <RadioGroup name="isClassic" defaultValue="true">
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="使用する"
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="使用しない"
            />
          </RadioGroup>
        </Box>
        {/* 緑数字 */}
        <Box display="flex" alignItems="center">
          <Box width={LABEL_WIDTH} pr={2}>
            <Typography align="right">開始時の緑数字</Typography>
          </Box>
          <OutlinedInput
            defaultValue={0}
            inputProps={{
              type: "number",
              min: 0,
              max: 2000,
            }}
          />
        </Box>
        {/* 緑数字の上限、下限 */}
        <Box display="flex" alignItems="center">
          <Typography>緑数字の</Typography>
          <Typography className={classes.typoBlue}>上限</Typography>
          <OutlinedInput
            defaultValue={0}
            inputProps={{
              type: "number",
              min: 0,
              max: 2000,
            }}
          />
          <Typography>、</Typography>
          <Typography className={classes.typoRed}>下限</Typography>
          <OutlinedInput
            defaultValue={0}
            inputProps={{
              type: "number",
              min: 0,
              max: 2000,
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  typoBlue: {
    color: "blue",
    marginRight: theme.spacing(2),
  },
  typoRed: {
    color: "red",
    marginRight: theme.spacing(2),
  },
}));
