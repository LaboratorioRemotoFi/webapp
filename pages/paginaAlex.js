import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Link from '../src/Link';
import Navbar from '../src/components/navbar';
import AccordionSimple from '../src/components/accordion';

const PaginaAlex = () => {
  const [stateTest, setState] = useState(false);

  return (
    <Grid>
      <Navbar />
      <Grid>
        <Card>
          <CardContent style={{ backgroundColor: '#e0e0e0' }}>
            <Grid container>
              <Grid item xs={4}>
                <img src="/foto_Alex.jpg" alt="" height="200px" />
              </Grid>
              <Grid item xs={8}>
                <h1>Alejandro Puga</h1>
                <h3>Estudiante de 9no semestre - Ingeniería Mecatrónica</h3>
                <p>
                  Primera página para aprender a utilizar Material UI con Next
                  Js
                </p>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid container columnSpacing={1}>
        <Grid item xs={6}>
          <AccordionSimple />
        </Grid>
        <Grid item xs={6}>
          <div>
            <Box sx={{ textAlign: 'center' }}>
              <h1>Experiencia</h1>
              <p>
                Implementación de un sistema automatizado para la realización de
                prácticas del área de mecánica así como el desarrollo de una
                base de datos para el acceso de los estudiantes a la plataforma
                de realización de las prácticas.
              </p>
              <h3>
                El estado es:
                {stateTest ? 'Verdadero' : 'Falso'}
              </h3>
              <Button color="secondary" onClick={() => setState(!stateTest)}>
                Cambio de Estado
              </Button>
            </Box>
          </div>
        </Grid>
      </Grid>
      <Link href="/" style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        Volver al inicio
      </Link>
    </Grid>
  );
};

export default PaginaAlex;
