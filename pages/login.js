import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Popper,
  Box,
} from "@mui/material";
import Layout from "../src/components/Layout";
import useStoreContext from "../src/hooks/storeContext";

export default function Index() {
  const router = useRouter();

  const [state, dispatch] = useStoreContext();

  const paperStyle1 = { height: "45vh", width: 500, margin: "60px auto" };
  const paperStyle2 = { height: "24vh", width: 570, margin: "5px auto" };

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:3000/api/authenticate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, user }),
    });
    const content = await response.json();

    if (content?.type === "student") {
      dispatch({ type: "setUserData", user: content });
      router.push("/practicas");
    } else if (content?.type === "proffesor") {
      dispatch({ type: "setUserData", user: content });
      router.push("/grupos");
    }
  };

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      handleSubmit();
    }
  };

  return (
    <Layout>
      <Grid>
        <Paper elevation={10} style={paperStyle1}>
          <Grid item container direction="column">
            <Grid item xs align="center">
              <Box
                sx={{
                  bgcolor: "#cd171e",
                  color: "white",
                  minHeight: "75px",
                  border: "1px black",
                }}
              >
                <br />
                <Typography variant="h5" sx={{ flexGrow: 1 }}>
                  Iniciar Sesión
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ margin: "20px" }}>
                <TextField
                  onChange={(e) => setUser(e.target.value)}
                  onKeyDown={keyPress}
                  label="Username"
                  size="small"
                  fullWidth
                  required
                  variant="filled"
                />
                <TextField
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={keyPress}
                  label="Password"
                  size="small"
                  type="password"
                  fullWidth
                  required
                  variant="filled"
                  sx={{ pt: "5px" }}
                />
                <Typography sx={{ pt: "5px" }}>
                  <Link href="#" sx={{ textDecoration: "none" }}>
                    Restablecer contraseña
                  </Link>
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ mx: "20px", mb: "10px" }}>
                <Button
                  onClick={() => handleSubmit()}
                  type="submit"
                  sx={{
                    bgcolor: "#cd171e",
                    "&:hover": { bgcolor: "#cd171e" },
                    color: "white",
                  }}
                  variant="contained"
                  fullWidth
                >
                  Ingresar
                </Button>
                <Popper
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  placement="auto"
                >
                  <Box
                    sx={{
                      border: 1,
                      p: "5px",
                      bgcolor: "background.paper",
                    }}
                  >
                    Contraseña incorrecta
                  </Box>
                </Popper>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={10} style={paperStyle2}>
          <Grid sx={{ ml: "5px" }}>
            <Typography variant="h10">
              Las credenciales de acceso se encuentran definidas de la siguiente
              manera:
            </Typography>
            <Typography>Alumno:</Typography>
            <Typography>Usuario: Número de cuenta</Typography>
            <Typography>Contraseña: Fecha de Nacimiento (DDMMYYYY)</Typography>
            <Typography>Profesor:</Typography>
            <Typography>Usuario: RFC con homoclave</Typography>
            <Typography>Contraseña: Número de trabajador</Typography>
          </Grid>
        </Paper>
      </Grid>
    </Layout>
  );
}
