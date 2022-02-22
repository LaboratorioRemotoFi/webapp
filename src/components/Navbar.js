import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useStoreContext from "../hooks/storeContext";
import { useRouter } from "next/router";

const Navbar = () => {
  const [state, dispatch] = useStoreContext();
  const router = useRouter();

  const handleLogout = () => {
    dispatch({ type: "logout" });
    router.push("/login");
  };

  return state.user ? (
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
  ) : (
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
