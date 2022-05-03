import React from "react";
import { Box, Button, Typography } from "@mui/material";
import convertDateToSpanishString from "../../utils/timeUtils";

function StudentModalInformation(props) {
  const { practice, state, changeModalState } = props;

  const startDate = practice.startDate;
  const currentStudentScheduleTimestamp =
    practice?.currentStudentSchedule?.timestamp;

  let scheduleStatus = practice?.currentStudentSchedule?.status;

  if (typeof scheduleStatus === "undefined") {
    scheduleStatus = "NOT SCHEDULED";
  }

  // Days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  const reserveTime = 7 * 24 * 60 * 60 * 1000;

  const scheduleString = convertDateToSpanishString(
    currentStudentScheduleTimestamp
  );
  const schedulingDate = convertDateToSpanishString(startDate - reserveTime);

  const initialDate = convertDateToSpanishString(practice.startDate);

  const finalDate = convertDateToSpanishString(practice.endDate);

  let component;

  switch (state) {
    case "Finished":
      component = (
        <Typography variant="inherit">
          Fue agendada para el {scheduleString[0]} a las {scheduleString[1]}.
        </Typography>
      );
      break;
    case "Started":
      component = (
        <Typography variant="inherit" color="red">
          Fue agendada para el {scheduleString[0]} a las {scheduleString[1]}. No
          ha sido terminada.
        </Typography>
      );
      break;
    case "Scheduled":
      component = (
        <>
          <Typography variant="inherit" mb={2}>
            Fue agendada para el {scheduleString[0]} a las {scheduleString[1]}.
          </Typography>
          <Box textAlign="center">
            <Button
              variant="contained"
              onClick={() => {
                changeModalState();
              }}
            >
              Reagendar
            </Button>
          </Box>
        </>
      );
      break;
    case "Reschedule":
      component = (
        <>
          <Typography variant="inherit" mb={2} color="red">
            Fue agendada para el {scheduleString[0]} a las {scheduleString[1]}.
          </Typography>
          <Box textAlign="center">
            <Button
              variant="contained"
              onClick={() => {
                changeModalState();
              }}
            >
              Reagendar
            </Button>
          </Box>
        </>
      );
      break;
    case "Available":
      component = (
        <>
          <Typography variant="inherit" mb={2}>
            Aún no ha sido agendada.
          </Typography>
          <Box textAlign="center">
            <Button
              variant="contained"
              onClick={() => {
                changeModalState();
              }}
            >
              Agendar
            </Button>
          </Box>
        </>
      );
      break;
    case "Expired":
      if (!scheduleStatus?.localeCompare("NOT SCHEDULED")) {
        component = <Typography variant="inherit">No fue agendada.</Typography>;
      } else {
        component = (
          <Typography variant="inherit">
            Fue agendada para el {scheduleString[0]} a las {scheduleString[1]} y
            no se realizó.
          </Typography>
        );
      }
      break;
    case "Not available":
      component = (
        <Typography variant="inherit">
          Estará disponible para agendar a partir del {schedulingDate[0]} a las{" "}
          {schedulingDate[1]}.
        </Typography>
      );
      break;
    default:
      return (
        <Typography variant="inherit" fontWeight="bold">
          No disponible
        </Typography>
      );
  }

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
        Información sobre la práctica
      </Typography>
      <Typography variant="inherit">
        Duración: {practice.timeFrame} minutos.
      </Typography>
      <Typography variant="inherit">
        Fecha de inicio: {initialDate[0]} a las {initialDate[1]}.
      </Typography>
      <Typography variant="inherit">
        Fecha final: {finalDate[0]} a las {finalDate[1]}.
      </Typography>
      {component}
    </>
  );
}

export default StudentModalInformation;
