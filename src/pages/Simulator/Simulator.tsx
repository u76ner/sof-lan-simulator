import React, { useEffect } from "react";
import { Box, Typography } from "@material-ui/core";
import queryString from "query-string";

import { actions, useDispatch, SimulatorState } from "stores";
import {
  InitialInputs,
  UrlShare,
  Legend,
  SimulatorTable,
} from "components/Simulator";

const Simulator: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { state: urlState } = queryString.parse(window.location.search) as {
      state: string;
    };
    if (urlState) {
      dispatch(actions.setDefaultState(JSON.parse(urlState) as SimulatorState));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h5">初期入力</Typography>
      <Box mb={4} px={2}>
        <InitialInputs />
      </Box>
      <Typography variant="h5">結果をシェア</Typography>
      <Box mb={4} px={2}>
        <UrlShare />
      </Box>
      <Box mb={4} px={2}>
        <Legend />
      </Box>
      <Typography variant="h5">操作</Typography>
      <Box px={2}>
        <SimulatorTable />
      </Box>
    </Box>
  );
};

export default Simulator;
