import React from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import useStoreContext from "../../src/hooks/storeContext";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import esLocale from "date-fns/locale/es";
import { convertDate } from "../utils/timeUtils";
import { getDaySchedules, isNotAvailable } from "../utils/scheduleUtils.js";

function AlertDialog(openAlert, setOpenAlert, handleCloseAlert) {
  return (
    <Dialog
      open={openAlert}
      onClose={handleCloseAlert}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"¿Reservar el horario seleccionado?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Podrás cambiar el horario más adelante, siempre que queden horarios
          libres.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAlert}>Cancelar</Button>
        <Button onClick={handleCloseAlert} autoFocus>
          Reservar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function schedulesPerDay(startDate, endDate, timeFrame) {
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

  return noAvailSchedPerDay;
}

export default function ScheduleReservation(practiceId, handleCloseModal) {
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

  // Pop up for reservation confirmation
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleClickOpenAlert = () => {
    setOpenAlert(true);
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
    handleReserveSchedule();
    handleCloseModal();
  };

  if (!currentState) {
    return <Typography variant="h4">NO DATA</Typography>;
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

  const noAvailSchedPerDay = schedulesPerDay(
    currPractice.startDate,
    currPractice.endDate,
    currPractice.timeFrame
  );

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
            <InputLabel id="demo-simple-select-helper-label">Hora</InputLabel>
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
            sm={2}
            xs={2}
          >
            <Typography variant="inherit">Seleccione un horario.</Typography>
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
              <Button variant="contained" onClick={handleClickOpenAlert}>
                Reservar
              </Button>
              {AlertDialog(openAlert, setOpenAlert, handleCloseAlert)}
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
        <Grid
          container
          item
          justifyContent={{
            md: "flex-end",
            sm: "center",
            xs: "center",
          }}
          md={4}
          sm={4}
          xs={4}
        >
          <Button variant="contained" onClick={handleCloseModal}>
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
