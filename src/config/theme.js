import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      //main: "#556cd6",
      main: "#cd171e",
      contrastText: "white",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: "#cd171e",
      },
    },
  },
});

export default theme;
