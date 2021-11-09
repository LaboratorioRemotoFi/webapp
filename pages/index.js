import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import Link from "../src/components/Link";

export default function Index() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h1" component="h1" gutterBottom>
          Laboratorio remoto
        </Typography>
        <Link href="/login" color="secondary">
          Ir al login
        </Link>
        <br />
        <Link href="/about" color="secondary">
          Acerca de
        </Link>
      </Box>
    </Container>
  );
}
