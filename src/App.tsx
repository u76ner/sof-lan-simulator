import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider as ReduxProvider } from "react-redux";

import Router from "./routes";
import store from "./stores";
import theme from "./utils/theme";

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default App;
