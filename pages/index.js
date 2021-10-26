import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import Link from "../src/Link";

export default function Index() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h1" component="h1" gutterBottom>
          Laboratorio remoto
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <br />
        <Link href="/paginaAlex" color="secondary">
          Ir a la pagina de Alex
        </Link>
        <br />
        <Link href="/Login" color="secondary">
          Ir al login
        </Link>
      </Box>
    </Container>
  );
}
