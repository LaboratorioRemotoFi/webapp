import React, { useState } from "react";
import useStoreContext from "/src/hooks/storeContext";
import { useRouter } from "next/router";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Layout from "../src/components/Layout";

export default function Index() {
  const router = useRouter();

  const [serverIp, setServerIp] = useState("");
  const [, dispatch] = useStoreContext();

  const handleSubmit = () => {
    dispatch({
      type: "setDirectConnectionIp",
      serverIp: serverIp || "localhost:8000",
    });
    router.push("/practica");
  };

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      handleSubmit();
    }
  };

  return (
    <Layout>
      <Typography variant="h2" sx={{ mt: 4 }}>
        Conectarse a un servidor directamente
      </Typography>
      <Stack container spacing={2} sx={{ mt: 4, maxWidth: "400px" }}>
        <TextField
          onChange={(e) => setServerIp(e.target.value)}
          onKeyDown={keyPress}
          label="Ip del servidor a conectarse"
          size="small"
          fullWidth
          required
          variant="filled"
        />
        <Button
          onClick={handleSubmit}
          type="submit"
          sx={{
            bgcolor: "#cd171e",
            "&:hover": { bgcolor: "#cd171e" },
            color: "white",
          }}
          variant="contained"
          fullWidth
        >
          Conectarse
        </Button>
        <Typography variant="p" sx={{ mt: 4 }}>
          En caso de no colocar ninguno se usará el valor por defecto:
          localhost:8000
        </Typography>
      </Stack>
    </Layout>
  );
}
