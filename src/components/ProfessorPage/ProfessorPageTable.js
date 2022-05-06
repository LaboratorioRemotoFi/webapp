import React from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

function createData(name, status) {
  return { name, status };
}

const rows = [
  createData("Cecilia Ricarda Bravo Cámara", "Terminado"),
  createData("Alfredo Alonso Luís", "Empezado"),
  createData("Leopoldo Jaume Berrocal", "Sin agendar"),
  createData("Glauco Sáenz Alvarado", "Terminado"),
  createData("Victor Valero Salas", "Agendado"),
];

// TODO: add the table data
// function ProfessorPageTable({ group, practice, students }) {
function ProfessorPageTable() {
  return (
    <TableContainer component={Paper} sx={{ width: 1 }}>
      <Table aria-label="collapsible table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">
                <Button
                  sx={{
                    minHeight: 0,
                    minWidth: 0,
                    padding: 0,
                    textTransform: "none",
                  }}
                  color="secondary"
                  fontWeight="bold"
                >
                  Detalles
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProfessorPageTable;
