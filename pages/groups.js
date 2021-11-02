import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Layout from "./Layout";

const groups = [
  {
    id: "1",
    key: "1234",
    course: "Mecánica",
    group: "1",
    schedule: "07:00 a 09:00",
    days: "L",
  },
  {
    id: "2",
    key: "1234",
    course: "Mecánica",
    group: "2",
    schedule: "11:00 a 13:00",
    days: "L",
  },
  {
    id: "3",
    key: "1236",
    course: "Electricidad y Magnetismo",
    group: "2",
    schedule: "09:00 a 11:00",
    days: "M",
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
                  {groups.map((row) => (
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
