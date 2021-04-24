import { createMuiTheme } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";

const primary = teal[400];

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
    },
  },
});

export default theme;
