import React, { useContext } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Link from "../../src/components/Link";
import Layout from "../../src/components/Layout";
import useStoreContext from "../../src/hooks/storeContext";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

let currDate = Date.now();
//let currDate = new Date("2022-02-04T07:00").getTime();

function getSchedules(startDate, endDate, timeFrame, invalidWeekdays) {
  let scheduleList = [];

  const firstDayEndTime = [
    new Date(startDate).getFullYear(),
    new Date(startDate).getMonth(),
    new Date(startDate).getDate(),
    new Date(endDate).getHours(),
    new Date(endDate).getMinutes(),
  ];
  const startDateEndTime = new Date(...firstDayEndTime).getTime();

  const noAvailSchedPerDay =
    ((startDateEndTime - startDate) / (1000 * 60) / timeFrame) | 0;

  let temp = new Date(startDate).getTime();
  let tempCurrDay;

  while (temp < endDate) {
    tempCurrDay = new Date(temp).getTime();
    for (let j = 1; j < noAvailSchedPerDay; j++) {
      scheduleList.push(temp);
      temp = temp + timeFrame * (1000 * 60);
    }
    scheduleList.push(temp);
    temp = new Date(tempCurrDay);
    temp.setHours(temp.getHours() + 24);
    temp = temp.getTime();

    // Validate day of the week
    let weekday = new Date(temp).getDay();
    while (invalidWeekdays.includes(weekday)) {
      temp = new Date(temp);
      temp.setHours(temp.getHours() + 24);
      temp = temp.getTime();
      weekday = new Date(temp).getDay();
    }
  }

  return scheduleList;
}

function convertDate(schedule, timeFrame) {
  let newSched;

  let optionsDate = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let optionsHour = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  let dayString = new Date(schedule).toLocaleDateString("es-MX", optionsDate);
  dayString = dayString.charAt(0).toUpperCase() + dayString.slice(1);
  let initHourString = new Date(schedule)
    .toLocaleDateString("es-MX", optionsHour)
    .slice(-5);
  let endHour = new Date(
    new Date(schedule).getTime() + (timeFrame - 1) * 1000 * 60
  );
  let endHourString = endHour
    .toLocaleDateString("es-MX", optionsHour)
    .slice(-5);
  newSched = [dayString, initHourString, endHourString];

  return newSched;
}

export default function Index() {
  const router = useRouter();
  const { practiceId } = router.query;

  const [currentState, currentDispatch] = useStoreContext();
  const { user, subjects, groups, practices } = currentState ? currentState : 0;

  console.log(currentState);

  if (!currentState) {
    return (
      <>
        <Layout>
          <Container maxWidth="false">
            <Box my={4}>
              <Typography variant="h4">Práctica No. X - [NOMBRE]</Typography>
              <Typography variant="h5">
                [CLAVE MATERIA] - [NOMBRE MATERIA], grupo Y
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Día</TableCell>
                      <TableCell align="left">Hora Inicio</TableCell>
                      <TableCell align="left">Hora Fin</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>NO DATA</TableBody>
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

  const currPractice = practiceId && currentState.practices[practiceId];

  const currSubject = subjects[currPractice.id.slice(0, 4)];

  const groupsIds = Object.getOwnPropertyNames(groups);

  let currGroup;

  for (let i = 0; i < groupsIds.length; i++) {
    if (groupsIds[i].includes(currSubject.id.toString())) {
      currGroup = groups[groupsIds[i]];
      break;
    }
  }

  // Last parameter: invalid weekdays (Sunday: 0, Saturday: 6)
  let scheduleList = getSchedules(
    currPractice.startDate,
    currPractice.endDate,
    currPractice.timeFrame,
    [0, 6]
  );

  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let convertedDate;

  return (
    <>
      <Layout>
        <Container maxWidth="false">
          <Box my={4}>
            <Typography variant="h4">
              Práctica No. {currPractice.practiceNumber} - {currPractice.name}
            </Typography>
            <Typography variant="h5">
              {currSubject.id} - {currSubject.name}, grupo{" "}
              {currGroup.groupNumber}
            </Typography>
            <Link href="/practicas" color="secondary">
              Regresar a lista de prácticas
            </Link>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Día</TableCell>
                    <TableCell align="left">Hora Inicio</TableCell>
                    <TableCell align="left">Hora Fin</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!currentState
                    ? "NO DATA"
                    : scheduleList
                        .filter(
                          (schedule) =>
                            // Only show schedule if its end time has not yet come
                            schedule +
                              (currPractice.timeFrame - 1) * 60 * 1000 >
                              currDate &&
                            // If the schedule isn't on the reserved schedules array
                            // or is the schedule the current student reserved,
                            // then show it
                            !currPractice.reservedSchedules.find(function (
                              scheduleObj,
                              index
                            ) {
                              if (
                                scheduleObj.schedule ==
                                currPractice.currentStudentSchedule
                              )
                                return false;
                              if (scheduleObj.schedule == schedule) return true;
                            })
                        )
                        .map(
                          (row, key) => (
                            (convertedDate = convertDate(
                              row,
                              currPractice.timeFrame
                            )),
                            (
                              <TableRow
                                key={key}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {convertedDate[0]}
                                </TableCell>
                                <TableCell align="left">
                                  {convertedDate[1]}
                                </TableCell>
                                <TableCell align="left">
                                  {convertedDate[2]}
                                </TableCell>
                                <TableCell align="right">
                                  {!(
                                    row == currPractice.currentStudentSchedule
                                  ) ? (
                                    <Button
                                      variant="contained"
                                      onClick={() => {
                                        currentDispatch({
                                          type: "reserveSchedule",
                                          payload: {
                                            currPracticeId: currPractice.id,
                                            reservedSchedule: {
                                              studentId: user.id,
                                              schedule: row,
                                            },
                                          },
                                        });
                                      }}
                                    >
                                      Reservar
                                    </Button>
                                  ) : (
                                    <Typography
                                      sx={{
                                        fontWeight: "bold",
                                        color: "#CD171E",
                                      }}
                                    >
                                      HORARIO RESERVADO
                                    </Typography>
                                  )}
                                </TableCell>
                              </TableRow>
                            )
                          )
                        )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </Layout>
    </>
  );
}
