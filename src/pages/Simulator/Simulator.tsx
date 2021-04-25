import React from "react";
import { Box } from "@material-ui/core";

import { InitialInputs, SimulatorTable } from "components/Simulator";

const Simulator: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Box mb={4}>
        <InitialInputs />
      </Box>
      <Box>
        <SimulatorTable />
      </Box>
    </Box>
  );
};

export default Simulator;
