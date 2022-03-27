import React from "react";
import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import convertDateToSpanishString from "../utils/timeUtils";
import StudentScheduleReservationModal from "../components/StudentPage/StudentScheduleReservationModal.js";
import { ScheduleDetails } from "../utils/scheduleUtils.js";

let currDate = Date.now();

export default function ScheduleLink(props) {
  const { practice } = props;
  const startDate = practice.startDate;
  const endDate = practice.endDate;
  const timeFrame = practice.timeFrame;
  const currentStudentSchedule = practice.currentStudentSchedule;

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  const reserveTime = 7 * 24 * 60 * 60 * 1000;

  let state;

  const hasSchedule = !isNaN(currentStudentSchedule);
  const scheduleString = convertDateToSpanishString(currentStudentSchedule);
  const schedulingDate = convertDateToSpanishString(startDate - reserveTime);
  const availableDateStart = convertDateToSpanishString(startDate);
  const availableDateEnd = convertDateToSpanishString(endDate);

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
      // Change for !done
      if (!hasSchedule) {
        return (
          <>
            <ScheduleDetails
              header={
                <Typography variant="inherit" color="red" fontWeight="bold">
                  Expirada
                </Typography>
              }
              details={
                <>
                  <Typography variant="inherit">No fue agendada.</Typography>
                  <Typography variant="inherit" fontStyle="italic">
                    Estuvo disponible para realizar del {availableDateStart[0]}{" "}
                    a las {availableDateStart[1]} al {availableDateEnd[0]} a las{" "}
                    {availableDateEnd[1]}.
                  </Typography>
                  <Typography variant="inherit">
                    Duración: {timeFrame} minutos.
                  </Typography>
                </>
              }
            />
          </>
        );
      }
      return (
        <>
          <ScheduleDetails
            header={
              <Typography variant="inherit" fontWeight="bold">
                Terminada
              </Typography>
            }
            details={
              <>
                <Typography variant="inherit">
                  Fue agendada para el {scheduleString[0]} a las{" "}
                  {scheduleString[1]} y se realizó ([detalles])/no se realizó.
                </Typography>
                <Typography variant="inherit" fontStyle="italic">
                  Estuvo disponible para realizar del {availableDateStart[0]} a
                  las {availableDateStart[1]} al {availableDateEnd[0]} a las{" "}
                  {availableDateEnd[1]}.
                </Typography>
                <Typography variant="inherit">
                  Duración: {timeFrame} minutos.
                </Typography>
              </>
            }
          />
        </>
      );
      break;
    // ADD CHECK FOR DONE/NOT DONE
    case "Late reschedule":
      return (
        <>
          <ScheduleDetails
            header={
              <Typography variant="inherit" color="red" fontWeight="bold">
                Expirada (
                <Button
                  sx={{
                    minHeight: 0,
                    minWidth: 0,
                    padding: 0,
                    textTransform: "none",
                  }}
                  color="secondary"
                  fontWeight="bold"
                  onClick={handleOpenModal}
                >
                  Reagendar
                </Button>
                )
                {StudentScheduleReservationModal(
                  practice,
                  openModal,
                  setOpenModal,
                  handleCloseModal
                )}
              </Typography>
            }
            details={
              <>
                <Typography variant="inherit">
                  Fue agendada para el {scheduleString[0]} a las{" "}
                  {scheduleString[1]}.
                </Typography>
                <Typography variant="inherit" fontStyle="italic">
                  Está disponible para realizar del {availableDateStart[0]} a
                  las {availableDateStart[1]} al {availableDateEnd[0]} a las{" "}
                  {availableDateEnd[1]}.
                </Typography>
                <Typography variant="inherit">
                  Duración: {timeFrame} minutos.
                </Typography>
              </>
            }
          />
        </>
      );
      break;
    case "Reschedule":
      return (
        <>
          <ScheduleDetails
            header={
              <Typography variant="inherit" fontWeight="bold">
                Agendada (
                <Button
                  sx={{
                    minHeight: 0,
                    minWidth: 0,
                    padding: 0,
                    textTransform: "none",
                  }}
                  color="secondary"
                  fontWeight="bold"
                  onClick={handleOpenModal}
                >
                  Reagendar
                </Button>
                )
                {StudentScheduleReservationModal(
                  practice,
                  openModal,
                  setOpenModal,
                  handleCloseModal
                )}
              </Typography>
            }
            details={
              <>
                <Typography variant="inherit">
                  Fue agendada para el {scheduleString[0]} a las{" "}
                  {scheduleString[1]}.
                </Typography>
                <Typography variant="inherit" fontStyle="italic">
                  Está disponible para realizar del {availableDateStart[0]} a
                  las {availableDateStart[1]} al {availableDateEnd[0]} a las{" "}
                  {availableDateEnd[1]}.
                </Typography>
                <Typography variant="inherit">
                  Duración: {timeFrame} minutos.
                </Typography>
              </>
            }
          />
        </>
      );
      break;
    case "Available":
      return (
        <>
          <ScheduleDetails
            header={
              <>
                <Button
                  sx={{
                    minHeight: 0,
                    minWidth: 0,
                    padding: 0,
                    textTransform: "none",
                  }}
                  color="secondary"
                  fontWeight="bold"
                  onClick={handleOpenModal}
                >
                  Agendar
                </Button>
                {StudentScheduleReservationModal(
                  practice,
                  openModal,
                  setOpenModal,
                  handleCloseModal
                )}
              </>
            }
            details={
              <>
                <Typography variant="inherit" fontStyle="italic">
                  Está disponible para realizar del {availableDateStart[0]} a
                  las {availableDateStart[1]} al {availableDateEnd[0]} a las{" "}
                  {availableDateEnd[1]}.
                </Typography>
                <Typography variant="inherit">
                  Duración: {timeFrame} minutos.
                </Typography>
              </>
            }
          />
        </>
      );
      break;
    case "Not available":
      return (
        <>
          <ScheduleDetails
            header={
              <Typography variant="inherit" fontWeight="bold">
                No disponible
              </Typography>
            }
            details={
              <>
                <Typography variant="inherit">
                  Estará disponible para agendar a partir del{" "}
                  {schedulingDate[0]} a las {schedulingDate[1]}.
                </Typography>
                <Typography variant="inherit" fontStyle="italic">
                  Estará disponible para realizar del {availableDateStart[0]} a
                  las {availableDateStart[1]} al {availableDateEnd[0]} a las{" "}
                  {availableDateEnd[1]}.
                </Typography>
              </>
            }
          />
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
  practice: PropTypes.object.isRequired,
};
