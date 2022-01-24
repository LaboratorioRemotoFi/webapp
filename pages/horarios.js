import React, { useContext } from "react";
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
import Link from "../src/components/Link";
import Layout from "../src/components/Layout";
import useStoreContext from "../src/hooks/storeContext";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function checkAvail(practiceSchedules, schedule) {
  for (let i = 0; i < practiceSchedules.length; i++) {
    if (
      JSON.stringify(schedule) == JSON.stringify(practiceSchedules[i].schedule)
    ) {
      return false;
    }
  }
  return true;
}

function getSchedules(user, practice) {
  let availableSchedules = [];

  for (let i = 0; i < practice.reservedSchedules.length; i++) {
    if (practice.reservedSchedules[i].studentId == user.id) {
      return [[practice.reservedSchedules[i].schedule], true];
    }
  }

  let fullStartDate = practice.startDate;
  fullStartDate = fullStartDate.concat(practice.startTime);
  const startDate = new Date(...fullStartDate);

  let firstDayEndTime = practice.startDate;
  firstDayEndTime = firstDayEndTime.concat(practice.endTime);
  const startDateEndTime = new Date(...firstDayEndTime);

  let fullEndDate = practice.endDate;
  fullEndDate = fullEndDate.concat(practice.endTime);
  const endDate = new Date(...fullEndDate);

  const noAvailDays =
    ((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) |
    (0 + 1);

  const noAvailSchedPerDay =
    ((startDateEndTime.getTime() - startDate.getTime()) /
      (1000 * 60) /
      practice.timeFrame) |
    0;

  let temp;
  let tempDate = startDate;
  let tempDateMs = tempDate.getTime(); // / (1000 * 60);
  temp = practice.startDate;
  temp = temp.concat(practice.startTime);

  for (let i = 0; i < noAvailDays; i++) {
    tempDate = new Date(tempDateMs);
    temp[0] = tempDate.getFullYear();
    temp[1] = tempDate.getMonth();
    if (i == 0) {
      temp[2] = tempDate.getDate();
    } else {
      temp[2] = tempDate.getDate() + 1;
    }
    temp[3] = practice.startTime[0];
    temp[4] = practice.startTime[1];
    if (checkAvail(practice.reservedSchedules, temp)) {
      availableSchedules.push(temp.slice());
    }
    tempDate = new Date(...temp);
    tempDateMs = tempDate.getTime();
    for (let j = 1; j < noAvailSchedPerDay; j++) {
      // ADD EXTRA 5 MINUTES TO PREPARE HARDWARE?
      tempDateMs = tempDateMs + practice.timeFrame * (1000 * 60);
      tempDate = new Date(tempDateMs);
      temp[0] = tempDate.getFullYear();
      temp[1] = tempDate.getMonth();
      temp[2] = tempDate.getDate();
      temp[3] = tempDate.getHours();
      temp[4] = tempDate.getMinutes();
      if (checkAvail(practice.reservedSchedules, temp)) {
        availableSchedules.push(temp.slice());
      }
      tempDate = new Date(...temp);
      tempDateMs = tempDate.getTime();
    }
  }

  return [availableSchedules, false];
}

function convertDates(origScheduleList, timeFrame) {
  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  let newSchedList = [];

  for (let i = 0; i < origScheduleList.length; i++) {
    let temp = [];

    const tempDate = new Date(...origScheduleList[i]);
    const month = months[tempDate.getMonth()];
    const day = days[tempDate.getDay()];
    let date =
      day +
      " " +
      origScheduleList[i][2].toString() +
      " de " +
      month +
      " del " +
      origScheduleList[i][0].toString();
    temp.push(date);

    let initTime, finalTime;
    if (origScheduleList[i][3].toString().length < 2) {
      initTime = "0" + origScheduleList[i][3].toString();
    } else {
      initTime = origScheduleList[i][3].toString();
    }
    if (origScheduleList[i][4].toString().length < 2) {
      initTime = initTime + ":0" + origScheduleList[i][4].toString();
    } else {
      initTime = initTime + ":" + origScheduleList[i][4].toString();
    }

    temp.push(initTime);

    let tempFinalHour, tempFinalMinute;

    tempFinalHour = origScheduleList[i][3];
    tempFinalMinute = origScheduleList[i][4] + timeFrame - 1;

    if (tempFinalMinute > 59) {
      tempFinalHour = tempFinalHour + 1;
      tempFinalMinute = tempFinalMinute - 60;
    }

    if (tempFinalHour.toString().length < 2) {
      finalTime = "0" + tempFinalHour.toString();
    } else {
      finalTime = tempFinalHour.toString();
    }
    if (tempFinalMinute.toString().length < 2) {
      finalTime = finalTime + ":0" + tempFinalMinute.toString();
    } else {
      finalTime = finalTime + ":" + tempFinalMinute.toString();
    }

    temp.push(finalTime);

    newSchedList.push(temp.slice());
  }
  return newSchedList;
}

export default function Index() {
  const [currentState, currentDispatch] = useStoreContext();
  const { user, subjects, groups, practices, currPractice } = currentState
    ? currentState
    : 0;

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

  const currSubject = subjects[currPractice.id.slice(0, 4)];

  const groupsIds = Object.getOwnPropertyNames(groups);

  let currGroup;

  for (let i = 0; i < groupsIds.length; i++) {
    if (groupsIds[i].includes(currSubject.id.toString())) {
      currGroup = groups[groupsIds[i]];
    }
  }

  let [availableSchedules, isReserved] = getSchedules(user, currPractice);

  //console.log(availableSchedules);

  let formattedSchedules = convertDates(
    availableSchedules,
    currPractice.timeFrame
  );

  let reservedSchedule;

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
                    : formattedSchedules.map((row, key) => (
                        <TableRow
                          key={key}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row[0]}
                          </TableCell>
                          <TableCell align="left">{row[1]}</TableCell>
                          <TableCell align="left">{row[2]}</TableCell>
                          <TableCell align="right">
                            {!isReserved ? (
                              <Button
                                variant="contained"
                                onClick={() => {
                                  currentDispatch({
                                    type: "reserveSchedule",
                                    payload: {
                                      studentId: user.id,
                                      schedule: availableSchedules[key],
                                    },
                                  });
                                }}
                              >
                                Reservar
                              </Button>
                            ) : (
                              <Typography
                                sx={{ fontWeight: "bold", color: "#CD171E" }}
                              >
                                HORARIO RESERVADO
                              </Typography>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Link href="/practicas" color="secondary">
            Regresar a lista de prácticas
          </Link>
        </Container>
      </Layout>
    </>
  );
}
