import { createMuiTheme } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import { size, SizeTheme, SizeThemeOption } from "./size";

const primary = teal[400];

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: "#ffb300",
    },
  },

  typography: {
    fontFamily: `"Roboto", "Noto Sans JP"`,
    fontSize: 12,
    h3: {
      fontWeight: 300,
    },
    h4: {
      fontWeight: 300,
    },
    h5: {
      fontWeight: 300,
    },
    h6: {
      fontWeight: 300,
    },
  },
  extra: {
    size,
  },
});

export default theme;

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    extra: {
      size: SizeTheme;
    };
  }
  // allow configuration using "createMuiTheme"
  interface ThemeOptions {
    extra?: {
      size?: SizeThemeOption;
    };
  }
}
