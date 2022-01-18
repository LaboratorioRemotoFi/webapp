import React, { useContext } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Link from "../src/components/Link";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Layout from "../src/components/Layout";
import useStoreContext from "../src/hooks/storeContext";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Row(props) {
  const { row, practices, subject } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.subjectId}
        </TableCell>
        <TableCell align="left">{subject.name}</TableCell>
        <TableCell align="right">{row.groupNumber}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Agendar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(practices).map((practiceRow) => (
                    <TableRow key={practiceRow.id}>
                      <TableCell component="th" scope="row">
                        {practiceRow.practiceNumber}
                      </TableCell>
                      <TableCell>{practiceRow.name}</TableCell>
                      <TableCell>No disponible</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    subjectId: PropTypes.number.isRequired,
    groupNumber: PropTypes.number.isRequired,
  }).isRequired,
  practices: PropTypes.arrayOf(
    PropTypes.shape({
      practiceNumber: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  subject: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default function Index() {
  const [currentState, currentDispatch] = useStoreContext();
  const { user, subjects, groups, practices } = currentState ? currentState : 0;

  let subPractices;

  console.log("Data load Index");
  console.log(currentState);

  return (
    <>
      <Layout>
        <Container maxWidth="false">
          <Box my={4}>
            <Typography variant="h4">Prácticas disponibles</Typography>
            <TableContainer component={Paper} sx={{ width: 0.5 }}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Clave</TableCell>
                    <TableCell>Materia</TableCell>
                    <TableCell align="right">Grupo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!currentState
                    ? "NO DATA"
                    : Object.values(groups).map(
                        (row) => (
                          // Get only the practices for each subject
                          (subPractices = Object.values(practices).filter(
                            (obj) =>
                              subjects[row.subjectId].practicesIds.includes(
                                obj.id
                              )
                          )),
                          (
                            /*console.log(Object.values(practices)),
                      console.log(Object.values(subjects[row.subjectId].practicesIds)),
                      console.log(subPractices)*/
                            <Row
                              key={row.id}
                              row={row}
                              subject={subjects[row.subjectId]}
                              practices={subPractices}
                            />
                          )
                        )
                      )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Link href="/" color="secondary">
            Ir a la página principal
          </Link>
        </Container>
      </Layout>
    </>
  );
}
