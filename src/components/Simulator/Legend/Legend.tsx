import React from "react";
import {
  makeStyles,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
} from "@material-ui/core";
import { yellow, lightBlue } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

type LegendProps = {};

export const Legend: React.FC<LegendProps> = (props) => {
  const classes = useStyles();
  const { spacing } = useTheme();

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">凡例</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex" flexDirection="column" gridGap={spacing(1)}>
          <Box display="flex">
            <Box bgcolor={yellow[100]} border={1} borderColor="#000" px={0.5}>
              <Typography variant="h6">背景が黄色</Typography>
            </Box>
            <Typography variant="h6">：容易にギアチェン可能</Typography>
          </Box>
          <Box display="flex">
            <Box
              bgcolor={lightBlue[100]}
              border={1}
              borderColor="#000"
              px={0.5}
            >
              <Typography variant="h6">背景が青色</Typography>
            </Box>
            <Typography variant="h6">
              ：多少捨てれば無理なくギアチェン可能
            </Typography>
          </Box>
          <Box display="flex">
            <Box px={0.5}>
              <Typography className={classes.bold} variant="h6">
                文字が太字
              </Typography>
            </Box>
            <Typography variant="h6">
              ：メインフレーズ（4小節以上続く）
            </Typography>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

const useStyles = makeStyles(() => ({
  bold: {
    fontWeight: 700,
  },
}));
