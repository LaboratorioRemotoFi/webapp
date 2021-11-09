import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSessionContext } from "../../pages/_app.js";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const { isAuthenticated, userHasAuthenticated } = useSessionContext();

  const handleLogout = () => {
    userHasAuthenticated(false);
    router.push("/login");
  };

  if (isAuthenticated) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ bgcolor: "#cd171e" }} position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Laboratorio Remoto FI
            </Typography>
            <Button
              onClick={handleLogout}
              type="submit"
              sx={{
                bgcolor: "white",
                color: "#cd171e",
                "&:hover": { bgcolor: "#cd171e", color: "white" },
              }}
              variant="contained"
            >
              Cerrar Sesión
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
  return (
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
};

export default Navbar;
