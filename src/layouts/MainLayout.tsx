import React from "react";
import { Box } from "@material-ui/core";

const MainLayout: React.FC = ({ children }) => {
  return <Box p={2}>{children}</Box>;
};

export default MainLayout;
