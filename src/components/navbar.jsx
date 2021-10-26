import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Navbar = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar sx={{ bgcolor: "#cd171e" }} position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Laboratorio Remoto FI
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Navbar;
