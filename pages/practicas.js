import React, { useContext } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Grid,
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

let currDate = Date.now();
//let currDate = new Date("2022-02-04T07:00").getTime();

function getDateString(date) {
  let optionsDay = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let optionsHour = {
    hour: "numeric",
    minute: "numeric",
  };

  const dayString = new Date(date).toLocaleDateString("es-MX", optionsDay);
  //dayString = dayString.charAt(0).toUpperCase() + dayString.slice(1);
  const hourString = new Date(date)
    .toLocaleDateString("es-MX", optionsHour)
    .slice(-5);

  const dateString = [dayString, hourString];

  return dateString;
}

function ScheduleLink(props) {
  const { practiceId, startDate, endDate, currentStudentSchedule } = props;

  // Days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  const reserveTime = 7 * 24 * 60 * 60 * 1000;

  let state;

  const hasSchedule = !isNaN(currentStudentSchedule);
  const scheduleString = getDateString(currentStudentSchedule);
  const schedulingDate = getDateString(startDate - reserveTime);
  const availableDateStart = getDateString(startDate);
  const availableDateEnd = getDateString(endDate);

  //
  if (currDate > endDate) {
    state = "Expired";
  } else if (
    hasSchedule &&
    currDate > currentStudentSchedule &&
    currDate < endDate
  ) {
    state = "Late reschedule";
  } else if (
    hasSchedule &&
    currDate < currentStudentSchedule &&
    currDate < endDate
  ) {
    state = "Reschedule";
  } else if (
    !hasSchedule &&
    currDate < endDate &&
    currDate >= startDate - reserveTime
  ) {
    state = "Available";
  } else if (currDate < startDate - reserveTime) {
    state = "Not available";
  }

  switch (state) {
    case "Expired":
      console.log("Case Expired");
      if (!hasSchedule) {
        return (
          <>
            <Typography variant="inherit" color="red" fontWeight="bold">
              Expirada
            </Typography>
            <Typography variant="inherit">No fue agendada.</Typography>
            <Typography variant="inherit" fontStyle="italic">
              Estuvo disponible para realizar del {availableDateStart[0]} a las{" "}
              {availableDateStart[1]} al {availableDateEnd[0]} a las{" "}
              {availableDateEnd[1]}.
            </Typography>
          </>
        );
      }
      return (
        <>
          <Typography variant="inherit" fontWeight="bold">
            Terminada
          </Typography>
          <Typography variant="inherit">
            Fue agendada para el {scheduleString[0]} a las {scheduleString[1]} y
            se realizó ([detalles])/no se realizó.
          </Typography>
          <Typography variant="inherit" fontStyle="italic">
            Estuvo disponible para realizar del {availableDateStart[0]} a las{" "}
            {availableDateStart[1]} al {availableDateEnd[0]} a las{" "}
            {availableDateEnd[1]}.
          </Typography>
        </>
      );
      break;
    case "Late reschedule":
      console.log("Case Late reschedule");
      return (
        <>
          <Typography variant="inherit" color="red" fontWeight="bold">
            Expirada
          </Typography>
          <Typography variant="inherit">
            Fue agendada para el {scheduleString[0]} a las {scheduleString[1]}.
          </Typography>
          <Link
            href={`/agendar/${practiceId}`}
            color="secondary"
            fontWeight="bold"
          >
            Reagendar
          </Link>
          <Typography variant="inherit" fontStyle="italic">
            Está disponible para realizar del {availableDateStart[0]} a las{" "}
            {availableDateStart[1]} al {availableDateEnd[0]} a las{" "}
            {availableDateEnd[1]}.
          </Typography>
        </>
      );
      break;
    case "Reschedule":
      console.log("Case Reschedule");
      return (
        <>
          <Typography variant="inherit" fontWeight="bold">
            Agendada
          </Typography>
          <Typography variant="inherit">
            Fue agendada para el {scheduleString[0]} a las {scheduleString[1]}.
          </Typography>
          <Link
            href={`/agendar/${practiceId}`}
            color="secondary"
            fontWeight="bold"
          >
            Reagendar
          </Link>
          <Typography variant="inherit" fontStyle="italic">
            Está disponible para realizar del {availableDateStart[0]} a las{" "}
            {availableDateStart[1]} al {availableDateEnd[0]} a las{" "}
            {availableDateEnd[1]}.
          </Typography>
        </>
      );
      break;
    case "Available":
      console.log("Case Available");
      return (
        <>
          <Link
            href={`/agendar/${practiceId}`}
            color="secondary"
            fontWeight="bold"
          >
            Agendar
          </Link>
          <Typography variant="inherit" fontStyle="italic">
            Está disponible para realizar del {availableDateStart[0]} a las{" "}
            {availableDateStart[1]} al {availableDateEnd[0]} a las{" "}
            {availableDateEnd[1]}.
          </Typography>
        </>
      );
      break;
    case "Not available":
      console.log("Case Not available");
      return (
        <>
          <Typography variant="inherit" fontWeight="bold">
            No disponible
          </Typography>
          <Typography variant="inherit">
            Estará disponible para agendar a partir del {schedulingDate[0]} a
            las {schedulingDate[1]}.
          </Typography>
          <Typography variant="inherit" fontStyle="italic">
            Estará disponible para realizar del {availableDateStart[0]} a las{" "}
            {availableDateStart[1]} al {availableDateEnd[0]} a las{" "}
            {availableDateEnd[1]}.
          </Typography>
        </>
      );
      break;
    default:
      return (
        <Typography variant="inherit" fontWeight="bold">
          No disponible
        </Typography>
      );
      break;
  }
}

ScheduleLink.propTypes = {
  practiceId: PropTypes.string.isRequired,
  startDate: PropTypes.number.isRequired,
  endDate: PropTypes.number.isRequired,
  currentStudentSchedule: PropTypes.number.isRequired,
};

function Row(props) {
  const { row, practices, subject, dispatch } = props;
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
                    <TableCell width="10%">No.</TableCell>
                    <TableCell width="20%">Nombre</TableCell>
                    <TableCell width="70%">Agendar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(practices).map((practiceRow) => (
                    <TableRow key={practiceRow.id}>
                      <TableCell component="th" scope="row">
                        {practiceRow.practiceNumber}
                      </TableCell>
                      <TableCell>{practiceRow.name}</TableCell>
                      <TableCell>
                        <ScheduleLink
                          practiceId={practiceRow.id}
                          startDate={practiceRow.startDate}
                          endDate={practiceRow.endDate}
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

Row.propTypes = {
  row: PropTypes.shape({
    subjectId: PropTypes.number.isRequired,
    groupNumber: PropTypes.number.isRequired,
  }).isRequired,
  practices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      practiceNumber: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      startDate: PropTypes.number.isRequired,
      endDate: PropTypes.number.isRequired,
      currentStudentSchedule: PropTypes.number.isRequired,
    })
  ).isRequired,
  subject: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function getNextPractice(practices) {
  if (!practices) {
    return -1;
  }
  let nearestPractice = practices[Object.keys(practices)[0]];
  for (const [practiceId, attributes] of Object.entries(practices)) {
    if (!isNaN(attributes.currentStudentSchedule)) {
      let temp = attributes.currentStudentSchedule - currDate;
      // Check if the starting time of the practice has passed
      if (temp < 0) {
        // Check if it's outside the practice time frame
        if (-temp > attributes.timeFrame * 60 * 1000) {
          continue;
        }
      }
      let previousPracticeTime =
        nearestPractice.currentStudentSchedule - currDate;
      if (previousPracticeTime > 0) {
        if (temp < previousPracticeTime) {
          nearestPractice = attributes;
        }
      } else {
        if (temp > previousPracticeTime) {
          nearestPractice = attributes;
        }
      }
    }
  }

  const resultTimeDiff = nearestPractice.currentStudentSchedule - currDate;

  // Check if the time of the resulting practice has passed/expired
  if (
    resultTimeDiff < 0 &&
    -resultTimeDiff > nearestPractice.timeFrame * 60 * 1000
  ) {
    return -1;
  }

  return nearestPractice;
}

export default function Index() {
  const [currentState, currentDispatch] = useStoreContext();
  const { user, subjects, groups, practices } = currentState ? currentState : 0;

  let subPractices;

  console.log("Data load Index");
  console.log(currentState);

  currDate = Date.now();
  const currDateString = getDateString(currDate);

  const nearestPractice = getNextPractice(practices);
  const nearestPracticeExists = isNaN(nearestPractice);

  let nearestPracticeSubject;
  let nearestPracticeDate;
  let buttonIsDisabled;

  if (nearestPracticeExists) {
    nearestPracticeSubject = subjects[nearestPractice.id.slice(0, 4)];
    nearestPracticeDate = getDateString(nearestPractice.currentStudentSchedule);
    buttonIsDisabled =
      nearestPractice.currentStudentSchedule - currDate > 0 ? true : false;
  }

  console.log(nearestPractice);
  console.log(nearestPracticeDate);

  return (
    <>
      <Layout>
        <Container maxWidth="false">
          <Box my={4}>
            <Typography>
              Bienvenid@, hoy es {currDateString[0]} a las {currDateString[1]}.
            </Typography>
            <br />
            <Typography variant="h4">Prácticas disponibles</Typography>
            <Grid container spacing={4}>
              <Grid item xs={7}>
                <TableContainer component={Paper} sx={{ width: 1 }}>
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
                                  dispatch={currentDispatch}
                                />
                              )
                            )
                          )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="h6">Próxima práctica:</Typography>
                {nearestPracticeExists ? (
                  <>
                    <Typography variant="body1">
                      Práctica no. {nearestPractice.practiceNumber} &quot;
                      {nearestPractice.name}&quot; de{" "}
                      {nearestPracticeSubject.id} -{" "}
                      {nearestPracticeSubject.name}, el día{" "}
                      {nearestPracticeDate[0]} a las {nearestPracticeDate[1]}{" "}
                      horas.
                    </Typography>
                    <br />
                    <Button variant="contained" disabled={buttonIsDisabled}>
                      <Link href="#" color="primary.contrastText">
                        Ir a la práctica
                      </Link>
                    </Button>
                  </>
                ) : (
                  <Typography variant="body1">
                    No hay prácticas agendadas disponibles.
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
          <Link href="/" color="secondary">
            Ir a la página principal
          </Link>
        </Container>
      </Layout>
    </>
  );
}
