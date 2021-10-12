import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MuiLink from "@material-ui/core/Link";
import Link from "../src/Link";
import styled from "styled-components";

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
      </Box>
    </Container>
  );
}
