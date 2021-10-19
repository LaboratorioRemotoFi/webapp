import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MuiLink from "@material-ui/core/Link";
import Link from "../src/Link";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const themeLight = createMuiTheme({
  palette: {
    background: {
      default: "#B3E5FC"
    },
    primary: {
      main: "#00802F"
    },
    secondary: {
      main: "#BF1F1F"
    }
  }
});

const themeDark = createMuiTheme({
  palette: {
    background: {
      default: "#222222"
    },
    primary: {
      main: "#82CBF5"
    },
    secondary: {
      main: "#7AF3A2"
    },
    text: {
      primary: "#E6E6E6"
    }
  }
});

export default function About() {
  const [light, setLight] = React.useState(true);
  return (
    <MuiThemeProvider theme={light ? themeDark : themeLight}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box my={4} mx={5} border="20px solid" borderColor="black.500" padding="15px">
          <Box align="center">
            <Typography variant="h4" component="h1" gutterBottom>
              Example Page
            </Typography>
          </Box>
          <Typography>This is just an example page.</Typography>
          <Box mt={2}>
            <Typography>Do you like...?</Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox color="primary" />} label="Dogs" />
              <FormControlLabel control={<Checkbox color="secondary" />} label="Cats" />
              <FormControlLabel control={<Checkbox color="primary" />} label="Birds" />
              <FormControlLabel control={<Checkbox color="secondary" />} label="Rats" />
            </FormGroup>
          </Box>
        </Box>
        <Box align="center">
          <Button color='secondary' href="/" component={Link}>Main Page</Button>
          <Button onClick={() => setLight(prev => !prev)}>Toggle Theme</Button>
        </Box>
      </Container>
    </MuiThemeProvider>
  );
}
