import React, { useContext } from "react";
import useStoreContext from "/src/hooks/storeContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ScheduleLink from "/src/utils/ScheduleLinkUtil.js";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Collapse,
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function StudentGroupsTableRow({ group }) {
  const [state, dispatch] = useStoreContext();
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
          {group.subjectId}
        </TableCell>
        <TableCell align="left">{group.name}</TableCell>
        <TableCell align="right">{group.groupNumber}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 0 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell width="10%">No.</TableCell>
                    <TableCell width="20%">Nombre</TableCell>
                    <TableCell width="70%">Agendar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {group?.practices.map((practiceRow) => (
                    <TableRow key={practiceRow.id}>
                      <TableCell component="th" scope="row">
                        {practiceRow.practiceNumber}
                      </TableCell>
                      <TableCell>{practiceRow.name}</TableCell>
                      <TableCell>
                        <ScheduleLink
                          practice={practiceRow}
                          startDate={practiceRow.startDate}
                          endDate={practiceRow.endDate}
                          timeFrame={practiceRow.timeFrame}
                          currentStudentSchedule={
                            practiceRow.currentStudentSchedule
                          }
                        />
                      </TableCell>
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

StudentGroupsTableRow.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.string.isRequired,
    subjectId: PropTypes.string.isRequired,
    groupNumber: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    practices: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        practiceNumber: PropTypes.number,
        name: PropTypes.string.isRequired,
        startDate: PropTypes.number.isRequired,
        endDate: PropTypes.number.isRequired,
        currentStudentSchedule: PropTypes.number,
      })
    ).isRequired,
  }).isRequired,
};

export default StudentGroupsTableRow;
