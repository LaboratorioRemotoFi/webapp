import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

const labelData = {
  FINISHED: {
    labelText: "Terminada",
    labelColor: "green",
  },
  STARTED: {
    labelText: "Empezada",
    labelColor: "orange",
  },
  SCHEDULED: {
    labelText: "Agendada",
    labelColor: "blue",
  },
  NOT_SCHEDULED: {
    labelText: "Sin agendar",
    labelColor: "red",
  },
};

// TODO: add the table data
// function ProfessorPageTable({ group, practice, students }) {
function ProfessorPageTable({ groupId, practiceId }) {
  const [studentsPracticeInfo, setStudentsPracticeInfo] = React.useState("");
  const [dataStatus, setDataStatus] = React.useState("");

  React.useEffect(() => {
    setDataStatus("loading");

    const subjectId = groupId.split("_")[1];
    const groupNumber = groupId.split("_")[2];

    fetch(
      `/api/students?subjectId=${subjectId}&groupNumber=${groupNumber}&practiceId=${practiceId}`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((fetchedStudents) => {
        setStudentsPracticeInfo(fetchedStudents);
        setDataStatus("");
      });
  }, [groupId, practiceId]);

  console.log("INFO");
  console.log(studentsPracticeInfo);

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      variant="outlined"
      sx={{ width: 1 }}
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>No. Cuenta</TableCell>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="right">Estado</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataStatus === "loading" ? (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <Typography variant="inherit" m={2}>
                Cargando...
              </Typography>
            </TableRow>
          ) : studentsPracticeInfo ? (
            studentsPracticeInfo.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="inherit"
                    color={labelData[row.status]?.labelColor}
                  >
                    {labelData[row.status]?.labelText}
                  </Typography>
                </TableCell>
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
            ))
          ) : (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <Typography variant="inherit" m={2}>
                Sin datos.
              </Typography>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ProfessorPageTable.propTypes = {
  groupId: PropTypes.string.isRequired,
  practiceId: PropTypes.string.isRequired,
};

export default ProfessorPageTable;
