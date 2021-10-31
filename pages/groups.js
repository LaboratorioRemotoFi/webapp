import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Layout from "./Layout";

const grupos = [
  {
    id: "1",
    clave: "1234",
    asignatura: "Mecánica",
    grupo: "1",
    horario: "07:00 a 09:00",
    dias: "L",
  },
  {
    id: "2",
    clave: "1234",
    asignatura: "Mecánica",
    grupo: "2",
    horario: "11:00 a 13:00",
    dias: "L",
  },
  {
    id: "3",
    clave: "1236",
    asignatura: "Electricidad y Magnetismo",
    grupo: "2",
    horario: "09:00 a 11:00",
    dias: "M",
  },
];

export default function Index() {
  return (
    <>
      <Layout>
        <Container maxWidth="false">
          <Box my={4}>
            <Typography variant="h4">Grupos disponibles</Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Clave</TableCell>
                    <TableCell align="left">Asignatura</TableCell>
                    <TableCell align="right">Grupo</TableCell>
                    <TableCell align="right">Horario</TableCell>
                    <TableCell align="right">Días</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {grupos.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.clave}
                      </TableCell>
                      <TableCell align="left">{row.asignatura}</TableCell>
                      <TableCell align="right">{row.grupo}</TableCell>
                      <TableCell align="right">{row.horario}</TableCell>
                      <TableCell align="right">{row.dias}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Link href="/index" color="secondary">
            Ir a la página principal
          </Link>
        </Container>
      </Layout>
    </>
  );
}
