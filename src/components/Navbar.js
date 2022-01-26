import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSessionContext } from "../../src/hooks/sessionProvider";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const [sessionState, sessionDispatch] = useSessionContext();
  const { isAuthenticated } = sessionState;

  const handleLogout = () => {
    sessionDispatch({ type: "logout" });
    console.log("Navbar Logout");
    console.log(isAuthenticated);
    router.push("/login");
  };

  if (isAuthenticated) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Laboratorio Remoto FI
            </Typography>
            <Button
              onClick={handleLogout}
              type="submit"
              sx={{
                bgcolor: "primary",
                color: "primary",
                "&:hover": { color: "white" },
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
      <AppBar position="static">
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
