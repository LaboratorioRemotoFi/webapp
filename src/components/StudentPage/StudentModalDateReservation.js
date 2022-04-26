import React from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import esLocale from "date-fns/locale/es";
import {
  getDaySchedules,
  scheduleIsNotAvailable,
} from "../../utils/scheduleUtils.js";
import {
  getFullReservationDate,
  schedulesPerDay,
} from "../../utils/reservationUtils.js";

function StudentModalDateReservation(props) {
  const { practice, subjectId, handleNewDate, changeModalState } = props;

  const [reservedSchedules, setReservedSchedules] = React.useState(null);

  // Variables for selected date from date picker
  const [selectedDate, setSelectedDate] = React.useState(null);

  // Disable hour select if there's no date picked
  const [hourIsDisabled, disableHourSelection] = React.useState(true);

  // Final new date selected, obtained after selecting hour
  const [newDate, setNewDate] = React.useState("");

  // String for final date
  const [convertedNewDate, setConvertedNewDate] = React.useState(null);

  const noAvailSchedPerDay = schedulesPerDay(
    practice.startDate,
    practice.endDate,
    practice.timeFrame
  );

  // Helper variables, to easily access limit days/hours
  const startHour = new Date(practice.startDate).getHours();
  const startMinutes = new Date(practice.startDate).getMinutes();

  // Minimum date available to select on day picker
  let minDate =
    new Date().getTime() > practice.startDate
      ? new Date().getTime()
      : practice.startDate;

  const minDayEndTime = [
    new Date(minDate).getFullYear(),
    new Date(minDate).getMonth(),
    new Date(minDate).getDate(),
    new Date(practice.endDate).getHours(),
    new Date(practice.endDate).getMinutes(),
  ];
  const minDateEndTime = new Date(...minDayEndTime).getTime();

  if (minDate > minDateEndTime) {
    const tempDate = [
      new Date(minDate).getFullYear(),
      new Date(minDate).getMonth(),
      new Date(minDate).getDate(),
      new Date(practice.startDate).getHours(),
      new Date(practice.startDate).getMinutes(),
    ];
    minDate = new Date(...tempDate).getTime() + 24 * 60 * 60 * 1000;
  }

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
          practice.timeFrame
        );

  const handleHourChange = (event) => {
    if (!(event.target.value === "")) {
      setNewDate(event.target.value);
      setConvertedNewDate(
        getFullReservationDate(event.target.value, practice.timeFrame)
      );
    } else {
      setNewDate("");
      setConvertedNewDate(null);
    }
  };

  React.useEffect(() => {
    fetch(
      `/api/schedules/timestamp?practiceId=${practice.id}&subjectId=${subjectId}`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((fetchedReservedSchedules) => {
        setReservedSchedules(fetchedReservedSchedules);
      });
  }, [practice, subjectId]);

  let convertedDate;
  const invalidWeekdays = [0, 6];

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
        Selecciona una fecha y hora
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
        <Grid
          id="modal-modal-description"
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
              maxDate={practice.endDate}
              shouldDisableDate={(day) => {
                return invalidWeekdays.includes(day.getDay());
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
                      (convertedDate = getFullReservationDate(
                        schedule,
                        practice.timeFrame
                      )),
                      (
                        <MenuItem
                          key={schedule}
                          value={schedule}
                          disabled={scheduleIsNotAvailable(
                            schedule,
                            daySchedules,
                            practice,
                            reservedSchedules
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
            <Button
              variant="contained"
              onClick={() => {
                handleNewDate(newDate);
                changeModalState();
              }}
              disabled={!convertedNewDate}
            >
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
            {!convertedNewDate ? (
              <Typography variant="inherit">Seleccione un horario.</Typography>
            ) : (
              <Typography
                variant="inherit"
                textAlign={{ md: "left", sm: "center", xs: "center" }}
              >
                Horario seleccionado: {convertedNewDate[0]} a las{" "}
                {convertedNewDate[1]}.
              </Typography>
            )}
          </Grid>
        </Grid>
      </LocalizationProvider>
    </>
  );
}

export default StudentModalDateReservation;