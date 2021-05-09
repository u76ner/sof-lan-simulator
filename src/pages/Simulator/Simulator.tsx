import React from "react";
import { Box, Container, Typography } from "@material-ui/core";

import { InitialInputs, SimulatorTable } from "components/Simulator";

const Simulator: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h5">初期入力</Typography>
      <Container maxWidth={false}>
        <InitialInputs />
      </Container>
      <Typography variant="h5">操作</Typography>
      <Container maxWidth={false}>
        <SimulatorTable />
      </Container>
    </Box>
  );
};

export default Simulator;
