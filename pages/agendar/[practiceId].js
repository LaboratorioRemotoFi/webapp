import React, { useContext } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import Link from "../../src/components/Link";
import Layout from "../../src/components/Layout";
import useStoreContext from "../../src/hooks/storeContext";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import esLocale from "date-fns/locale/es";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

let currDate = Date.now();

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
  //dayString = dayString.charAt(0).toUpperCase() + dayString.slice(1);
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

function getDaySchedules(day, noAvailSchedPerDay, timeFrame) {
  let scheduleList = [];

  let temp = new Date(day).getTime();

  for (let j = 1; j < noAvailSchedPerDay; j++) {
    scheduleList.push(temp);
    temp = temp + timeFrame * (1000 * 60);
  }
  scheduleList.push(temp);

  return scheduleList;
}

function isNotAvailable(schedule, scheduleList, currPractice) {
  let disable = !scheduleList
    .filter(
      (schedule) =>
        // Only enable schedule if its end time has not yet come
        schedule + (currPractice.timeFrame - 1) * 60 * 1000 > currDate &&
        // If the schedule isn't on the reserved schedules array
        // or is the schedule the current student reserved,
        // then enable it
        !currPractice.reservedSchedules.find(function (scheduleObj, index) {
          if (scheduleObj.schedule == currPractice.currentStudentSchedule)
            return false;
          if (scheduleObj.schedule == schedule) return true;
        })
    )
    .includes(schedule);
  return disable;
}

export default function Index() {
  const router = useRouter();
  const { practiceId } = router.query;

  const [currentState, currentDispatch] = useStoreContext();
  const { user, subjects, groups, practices } = currentState ? currentState : 0;

  console.log("currentState");
  console.log(currentState);

  // Variables for selected date from date picker
  const [selectedDate, setSelectedDate] = React.useState(null);
  // Disable hour select if there's no date picked
  const [hourIsDisabled, disableHourSelection] = React.useState(true);

  // Final new date selected, obtained after selecting hour
  const [newDate, setNewDate] = React.useState("");
  console.log("New selected date");
  console.log(newDate);
  console.log(new Date(newDate));

  // String for final date
  const [convertedNewDate, setConvertedNewDate] = React.useState(null);

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
              <br />
              <Typography variant="h6">NO DATA</Typography>
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

  // Find current group id from subject id
  for (let i = 0; i < groupsIds.length; i++) {
    if (groupsIds[i].includes(currSubject.id.toString())) {
      currGroup = groups[groupsIds[i]];
      break;
    }
  }

  const firstDayEndTime = [
    new Date(currPractice.startDate).getFullYear(),
    new Date(currPractice.startDate).getMonth(),
    new Date(currPractice.startDate).getDate(),
    new Date(currPractice.endDate).getHours(),
    new Date(currPractice.endDate).getMinutes(),
  ];
  const startDateEndTime = new Date(...firstDayEndTime).getTime();

  const noAvailSchedPerDay =
    ((startDateEndTime - currPractice.startDate) /
      (1000 * 60) /
      currPractice.timeFrame) |
    0;

  // Helper variables, to easily access limit days/hours
  const availableDateStart = convertDate(
    currPractice.startDate,
    currPractice.timeFrame
  );
  const availableDateEnd = convertDate(
    currPractice.endDate,
    currPractice.timeFrame
  );
  const startHour = new Date(currPractice.startDate).getHours();
  const startMinutes = new Date(currPractice.startDate).getMinutes();

  // Previous registered saved schedule
  let previousSchedule;
  if (!isNaN(currPractice.currentStudentSchedule)) {
    const initialConvertedDate = convertDate(
      currPractice.currentStudentSchedule,
      currPractice.timeFrame
    );
    previousSchedule = `Actualmente, se ha reservado el horario con fecha${" "}
    del ${initialConvertedDate[0]}, hora de inicio a las ${
      initialConvertedDate[1]
    }${" "}
    y hora de finalización a las ${initialConvertedDate[2]}.`;
  } else {
    previousSchedule = "No hay un horario reservado actualmente.";
  }

  // Minimum date available to select on day picker
  const minDate =
    new Date().getTime() > currPractice.startDate
      ? new Date().getTime()
      : currPractice.startDate;

  const handleDayChange = (value) => {
    if (value !== null) {
      value.setHours(startHour, startMinutes, 0);
      setSelectedDate(value);
      disableHourSelection(false);
      setNewDate("");
      setConvertedNewDate(null);
    }
  };

  // Calculate schedules for selected day
  let daySchedules =
    selectedDate == null
      ? []
      : getDaySchedules(
          new Date(selectedDate).getTime(),
          noAvailSchedPerDay,
          currPractice.timeFrame
        );

  const handleHourChange = (event) => {
    if (!(event.target.value === "")) {
      setNewDate(event.target.value);
      setConvertedNewDate(
        convertDate(event.target.value, currPractice.timeFrame)
      );
      //convertedNewDate = convertDate(event.target.value, currPractice.timeFrame);
    } else {
      setNewDate("");
      setConvertedNewDate(null);
    }
  };

  const handleReserveSchedule = () => {
    currentDispatch({
      type: "reserveSchedule",
      payload: {
        currPracticeId: currPractice.id,
        reservedSchedule: {
          studentId: user.id,
          schedule: newDate,
        },
      },
    });
    setSelectedDate(null);
    disableHourSelection(true);
    setNewDate("");
    setConvertedNewDate(null);
    //convertedNewDate = null;
  };

  let convertedDate;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
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
            <Typography variant="h6" mt={2} mb={2}>
              {previousSchedule}
            </Typography>
            <Typography variant="inherit" fontWeight="bold">
              Detalles de la práctica:
            </Typography>
            <Typography variant="inherit">
              Está disponible para realizar del {availableDateStart[0]} a las{" "}
              {availableDateStart[1]} al {availableDateEnd[0]} a las{" "}
              {availableDateEnd[1]}.
            </Typography>
            <Typography variant="inherit">
              Duración: {currPractice.timeFrame} minutos.
            </Typography>
            <Typography variant="h6" mt={2} mb={2}>
              Para reservar un horario, selecciona una fecha y hora a
              continuación:
            </Typography>
            <Grid
              container
              spacing={2}
              mb={2}
              columns={{ md: 4, sm: 2, xs: 2 }}
              alignItems="center"
              justifyContent={{ md: "flex-start", sm: "center", xs: "center" }}
            >
              <Grid
                container
                item
                justifyContent={{
                  md: "flex-start",
                  sm: "flex-end",
                  xs: "center",
                }}
                md="auto"
                sm="auto"
                xs="auto"
              >
                <DatePicker
                  mask={"__/__/____"}
                  label="Fecha"
                  value={selectedDate}
                  minDate={minDate}
                  maxDate={currPractice.endDate}
                  shouldDisableDate={(day) => {
                    return currPractice.invalidWeekdays.includes(day.getDay());
                  }}
                  onChange={handleDayChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid
                container
                item
                justifyContent={{
                  md: "flex-start",
                  sm: "flex-start",
                  xs: "center",
                }}
                md="auto"
                sm="auto"
                xs="auto"
              >
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Hora
                  </InputLabel>
                  {!(daySchedules.length > 0) ? (
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={newDate}
                      label="Hora"
                      onChange={handleHourChange}
                      disabled={hourIsDisabled}
                      defaultValue={""}
                    >
                      <MenuItem value="">
                        <em>No disponibles</em>
                      </MenuItem>
                    </Select>
                  ) : (
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={newDate}
                      label="Hora"
                      onChange={handleHourChange}
                      disabled={hourIsDisabled}
                      defaultValue={""}
                    >
                      <MenuItem value="">
                        <em>Selecciona...</em>
                      </MenuItem>
                      {daySchedules.map(
                        (schedule) => (
                          (convertedDate = convertDate(
                            schedule,
                            currPractice.timeFrame
                          )),
                          (
                            <MenuItem
                              key={schedule}
                              value={schedule}
                              disabled={isNotAvailable(
                                schedule,
                                daySchedules,
                                currPractice
                              )}
                            >
                              {convertedDate[1]}
                            </MenuItem>
                          )
                        )
                      )}
                    </Select>
                  )}
                </FormControl>
              </Grid>
              <Box width={{ md: "0%", sm: "100%", sx: "0%" }} />
              {!convertedNewDate ? (
                <Grid
                  container
                  item
                  justifyContent={{
                    md: "flex-start",
                    sm: "center",
                    xs: "center",
                  }}
                  md
                  sm={1}
                  xs={1}
                >
                  <Typography variant="inherit">
                    Seleccione un horario.
                  </Typography>
                </Grid>
              ) : (
                <>
                  <Grid
                    container
                    item
                    justifyContent={{
                      md: "flex-start",
                      sm: "flex-end",
                      xs: "center",
                    }}
                    md="auto"
                    sm="auto"
                    xs={2}
                  >
                    <Button variant="contained" onClick={handleReserveSchedule}>
                      Reservar
                    </Button>
                  </Grid>
                  <Grid
                    container
                    item
                    justifyContent={{
                      md: "flex-start",
                      sm: "flex-start",
                      xs: "center",
                    }}
                    md
                    sm="auto"
                    xs={2}
                  >
                    <Typography
                      variant="inherit"
                      textAlign={{ md: "left", sm: "center", xs: "center" }}
                    >
                      Horario seleccionado: {convertedNewDate[0]} a las{" "}
                      {convertedNewDate[1]}.
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </Container>
      </Layout>
    </LocalizationProvider>
  );
}
