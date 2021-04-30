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
  Divider,
} from "@material-ui/core";

import { actions, useSelector, useDispatch } from "stores";
import { songs } from "utils/data";

type InitialInputsProps = {};

const LABEL_WIDTH = 220;

// 曲選べる、白数字、LIFT、FHSかどうか、クラシックハイスピかどうか、開始時の緑数字、緑数字の上限、下限

export const InitialInputs: React.FC<InitialInputsProps> = () => {
  const classes = useStyles();

  const { initial, songIdx } = useSelector((state) => state);
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
              defaultValue={songIdx}
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

        {/* FHSかどうか */}
        <Box display="flex" alignItems="center">
          <Box width={LABEL_WIDTH} pr={2}>
            <Typography align="right">フローティングハイスピード</Typography>
          </Box>
          <RadioGroup
            name="isFloating"
            defaultValue={initial.isFloating ? "true" : "false"}
            onChange={(event) => {
              dispatch(
                actions.setInitialIsFloating(event.target.value === "true")
              );
            }}
          >
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
          <RadioGroup
            name="isClassic"
            defaultValue={initial.isClassic ? "true" : "false"}
            onChange={(event) => {
              dispatch(
                actions.setInitialIsClassic(event.target.value === "true")
              );
            }}
          >
            <FormControlLabel
              disabled={initial.isFloating}
              value="true"
              control={<Radio />}
              label="使用する"
            />
            <FormControlLabel
              disabled={initial.isFloating}
              value="false"
              control={<Radio />}
              label="使用しない"
            />
          </RadioGroup>
        </Box>
        <Divider />
        {/* 白数字 */}
        <Box display="flex" alignItems="center">
          <Box width={LABEL_WIDTH} pr={2}>
            <Typography align="right">白数字</Typography>
          </Box>
          <OutlinedInput
            defaultValue={initial.white}
            inputProps={{
              type: "number",
              min: 0,
              max: 1000,
            }}
            onChange={(event) => {
              dispatch(
                actions.setInitialWhite(parseInt(event.target.value as string))
              );
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
            defaultValue={initial.lift}
            inputProps={{
              type: "number",
              min: 0,
              max: 1000,
            }}
            onChange={(event) => {
              dispatch(
                actions.setInitialLift(parseInt(event.target.value as string))
              );
            }}
          />
        </Box>
        {/* 緑数字 */}
        <Box display="flex" alignItems="center">
          <Box width={LABEL_WIDTH} pr={2}>
            <Typography align="right">開始時の緑数字</Typography>
          </Box>
          <OutlinedInput
            defaultValue={initial.green}
            inputProps={{
              type: "number",
              min: 0,
              max: 2000,
            }}
            onChange={(event) => {
              dispatch(
                actions.setInitialGreen(parseInt(event.target.value as string))
              );
            }}
          />
        </Box>
        {/* 緑数字の上限、下限 */}
        <Box display="flex" alignItems="center">
          <Typography>緑数字の</Typography>
          <Typography className={classes.typoRed}>下限</Typography>
          <OutlinedInput
            defaultValue={initial.greenRange.lower}
            inputProps={{
              type: "number",
              min: 0,
              max: 2000,
            }}
            onChange={(event) => {
              dispatch(
                actions.setInitialGreenRangeLower(
                  parseInt(event.target.value as string)
                )
              );
            }}
          />
          <Typography>、</Typography>
          <Typography className={classes.typoBlue}>上限</Typography>
          <OutlinedInput
            defaultValue={initial.greenRange.upper}
            inputProps={{
              type: "number",
              min: 0,
              max: 2000,
            }}
            onChange={(event) => {
              dispatch(
                actions.setInitialGreenRangeUpper(
                  parseInt(event.target.value as string)
                )
              );
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  typoRed: {
    color: "red",
    marginRight: theme.spacing(2),
  },
  typoBlue: {
    color: "blue",
    marginRight: theme.spacing(2),
  },
}));
