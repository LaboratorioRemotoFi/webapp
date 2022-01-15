import React, { useContext } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Layout from "../src/components/Layout";
import practicesReducer from "../src/hooks/practicesReducer";
import { StudentsContext } from "../src/hooks/studentsProvider";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Row(props) {
  const { row } = props;
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
          {row.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Hora</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.schedules.map((historyRow) => (
                    <TableRow key={historyRow.scheduleID}>
                      <TableCell component="th" scope="row">
                        {historyRow.day}
                      </TableCell>
                      <TableCell>{historyRow.time}</TableCell>
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
    schedules: PropTypes.arrayOf(
      PropTypes.shape({
        scheduleID: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        day: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function Index() {
  //const [state, dispatch] = practicesReducer();

  const [state, dispatch] = useContext(StudentsContext);
  const { user, groups, subjects, practices } = state;

  //const [practiceIndex, setPracticeIndex] = React.useState(0);

  return (
    <Layout>
      <Box>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography component="h5">
                    {subjects["1500"]["name"]}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {practices.map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography component="h5">
                    {subjects["1501"]["name"]}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {practices.map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  );
}
