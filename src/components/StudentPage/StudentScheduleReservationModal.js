import React from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import useStoreContext from "../../hooks/storeContext";
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
  groupFromPractice,
  schedulesPerDay,
} from "../../utils/reservationUtils.js";
import StudentConfirmReservationDialog from "./StudentConfirmReservationDialog";

function StudentScheduleReservationModal(
  practice,
  openModal,
  setOpenModal,
  handleCloseModal
) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  const [currentState, currentDispatch] = useStoreContext();
  const { groups } = currentState;

  console.log("groups");
  console.log(groups);

  //console.log("PRACTICE");
  //console.log(practice);

  // Variables for selected date from date picker
  const [selectedDate, setSelectedDate] = React.useState(null);
  // Disable hour select if there's no date picked
  const [hourIsDisabled, disableHourSelection] = React.useState(true);

  // Final new date selected, obtained after selecting hour
  const [newDate, setNewDate] = React.useState("");
  //console.log("New selected date");
  //console.log(newDate);
  //console.log(new Date(newDate));

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

  const currGroup = groupFromPractice(practice.id, groups);
  //console.log("GROUP");
  //console.log(currGroup);

  //const currSubject = subjects[currPractice.id.slice(0, 4)];

  //console.log("OBTAINED GROUP");
  //console.log(currGroup);

  //const practice = currGroup.practices[practiceId];

  //console.log("OBTAINED PRACTICE");
  //console.log(practice);

  const noAvailSchedPerDay = schedulesPerDay(
    practice.startDate,
    practice.endDate,
    practice.timeFrame
  );

  // Helper variables, to easily access limit days/hours
  const startHour = new Date(practice.startDate).getHours();
  const startMinutes = new Date(practice.startDate).getMinutes();

  // Previous registered saved schedule
  let previousSchedule;
  if (!isNaN(practice.currentStudentSchedule)) {
    const initialConvertedDate = getFullReservationDate(
      practice.currentStudentSchedule,
      practice.timeFrame
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
      //convertedNewDate = getFullReservationDate(event.target.value, practice.timeFrame);
    } else {
      setNewDate("");
      setConvertedNewDate(null);
    }
  };

  const handleReserveSchedule = () => {
    
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjectId: currGroup.subjectId, practiceId: practice.id, timestamp: newDate, }),
    };
    fetch("/api/reserve", reqOptions)
      .then((response) => response.json())
      .then((reservedSchedule) => {
        currentDispatch({ type: "reserveSchedule", reservedSchedule: reservedSchedule });
        });
    /* currentDispatch({
      type: "reserveSchedule",
      payload: {
        practiceId: practice.id,
        reservedSchedule: {
          //studentId: user.id,
          subjectId: currentState.subjectId,
          schedule: newDate,
        },
      },
    }); */
    setSelectedDate(null);
    disableHourSelection(true);
    setNewDate("");
    setConvertedNewDate(null);
    //convertedNewDate = null;
  };

  let convertedDate;
  const invalidWeekdays = [0, 6];

  return (
    <Modal
      open={openModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} width={{ lg: "70%", xs: "95%" }}>
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
          Selecciona una fecha y hora
        </Typography>
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
                              practice
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
                  <Button variant="contained" onClick={handleClickOpenAlert}>
                    Reservar
                  </Button>
                  {StudentConfirmReservationDialog(
                    openAlert,
                    setOpenAlert,
                    handleCloseAlert
                  )}
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
      </Box>
    </Modal>
  );
}

export default StudentScheduleReservationModal;
