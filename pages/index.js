import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export default function Index() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h1" component="h1" gutterBottom>
          Laboratorio remoto
        </Typography>
        <Link href="/Login" color="secondary" display="block">
          Ir al login
        </Link>
        <Link href="/about" color="secondary">
          Acerca de
        </Link>
      </Box>
    </Container>
  );
}
