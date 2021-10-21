import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export default function Index() {
  return (
    <>
      <AppBar position="static" style={{backgroundColor: '#EA1F4C', paddingLeft:"30px"}}>
        <Toolbar>
          <Typography variant="h6">Laboratorio Remoto FI</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="false">
        <Box my={4}>
          <Typography variant="h2" component="h1" gutterBottom>
            Grupos disponibles
          </Typography>
          <Typography variant="body1" component="h1" gutterBottom>
            Lista de grupos. WIP.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
